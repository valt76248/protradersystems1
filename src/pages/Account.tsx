import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, CreditCard, Book, Settings, LogOut, ShieldCheck, Lock, BookOpen, GraduationCap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ProfileTab } from '@/components/account/ProfileTab';
import { OrdersTab } from '@/components/account/OrdersTab';
import { SettingsTab } from '@/components/account/SettingsTab';
import { ReferralSection } from '@/components/account/ReferralSection';
import PaymentModal from '@/components/payment/PaymentModal';
import SupportButton from '@/components/shared/SupportButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface Enrollment {
  id: string;
  course_id: string;
  user_id: string;
  enrolled_at: string;
  progress?: number;
}

interface CourseWithAccess {
  id: string;
  title: string;
  description: string;
  price_usdt: number;
  hasAccess: boolean;
  enrollment?: Enrollment;
}

const Account = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseWithAccess[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseWithAccess | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUserAndEnrollments();
  }, []);

  const checkUserAndEnrollments = async () => {
    try {
      setLoading(true);

      // 1. Отримуємо поточного користувача
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      setUser(user);

      setUserInfo({
        firstName: user.user_metadata?.full_name?.split(' ')[0] || '',
        lastName: user.user_metadata?.full_name?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || ''
      });

      // Fetch orders for this user
      fetchOrders(user.id);

      // 2. Отримуємо всі доступні курси
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('position', { ascending: true });

      if (coursesError) throw coursesError;

      // 3. Перевіряємо enrollments для кожного курсу
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (enrollmentsError) {
        console.error('Error fetching enrollments:', enrollmentsError);
      }

      // 4. Об'єднуємо дані
      const coursesWithAccess: CourseWithAccess[] = (coursesData || []).map(course => {
        const enrollment = enrollmentsData?.find(e => e.course_id === course.id);
        return {
          ...course,
          hasAccess: !!enrollment,
          enrollment: enrollment || undefined
        };
      });

      setCourses(coursesWithAccess);

    } catch (error: any) {
      console.error('Error checking account:', error);
      toast({
        title: t('account.error'),
        description: t('account.error_load'),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: t('account.logout_success'), description: t('account.logout_bye') });
    navigate('/');
  };

  const fetchOrders = async (userId: string) => {
    setOrdersLoading(true);
    try {
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select(`
          id,
          course_id,
          amount,
          tx_hash,
          status,
          created_at,
          courses ( title )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to include course title
      const transformedOrders = (ordersData || []).map((order: any) => ({
        ...order,
        course_title: (order.courses as any)?.title || 'Курс'
      }));

      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };



  const handleSaveProfile = async () => {
    try {
      // Оновлюємо метадані користувача
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: `${userInfo.firstName} ${userInfo.lastName}`,
          phone: userInfo.phone
        }
      });

      if (error) throw error;

      toast({
        title: t('account.profile.updated'),
        description: t('account.profile.updated_desc')
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: t('account.error'),
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-trading-dark flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">{t('account.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-trading-dark text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Профіль користувача з аватаром */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">

                    {userInfo.firstName || userInfo.lastName
                      ? `${userInfo.firstName} ${userInfo.lastName}`.trim()
                      : t('account.student')}
                  </h1>
                  <p className="text-gray-400 text-sm md:text-base">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-400">{t('account.verified')}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-red-800/50 text-red-400 hover:bg-red-900/20 hover:border-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" /> {t('account.logout')}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="flex flex-nowrap overflow-x-auto w-full bg-trading-card border-gray-800 md:grid md:grid-cols-5 scrollbar-hide">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span className="hidden sm:inline">{t('account.tab.courses')}</span>
                <span className="sm:hidden">{t('account.tab.courses')}</span>
              </TabsTrigger>
              <TabsTrigger value="referral" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                <span className="hidden sm:inline">{t('account.tab.referral')}</span>
                <span className="sm:hidden">💰</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{t('account.tab.profile')}</span>
                <span className="sm:hidden">{t('account.tab.profile')}</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">{t('account.tab.orders')}</span>
                <span className="sm:hidden">{t('account.tab.orders')}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">{t('account.tab.settings')}</span>
                <span className="sm:hidden">⚙️</span>
              </TabsTrigger>
            </TabsList>

            {/* Вкладка "Мои курси" */}
            <TabsContent value="courses">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{t('account.courses.title')}</h2>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {courses.filter(c => c.hasAccess).length} {t('account.courses.active')}
                  </Badge>
                </div>

                {courses.length === 0 ? (
                  <Card className="bg-trading-card border-gray-800">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">{t('account.courses.not_found')}</p>
                      <Button onClick={() => navigate('/courses')}>
                        {t('account.courses.view_catalog')}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {courses.map((course) => (
                      <Card key={course.id} className={`border-2 transition-all ${course.hasAccess
                        ? 'bg-green-900/10 border-green-800/50 hover:border-green-700'
                        : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                        }`}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-3">
                                {course.hasAccess ? (
                                  <ShieldCheck className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                                ) : (
                                  <Lock className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
                                )}
                                <div>
                                  <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                                  <p className="text-gray-400 text-sm mb-2">{course.description}</p>
                                  {course.hasAccess && course.enrollment && (
                                    <p className="text-xs text-green-400">
                                      {t('account.courses.access_granted')} {new Date(course.enrollment.enrolled_at).toLocaleDateString('ru-RU')}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {course.hasAccess ? (
                                <Badge className="bg-green-600 hover:bg-green-700 mb-3">
                                  {t('account.courses.access_active')}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-gray-700 text-gray-400 mb-3">
                                  {t('account.courses.no_access')}
                                </Badge>
                              )}

                              {/* Прогрес (якщо є доступ) */}
                              {course.hasAccess && course.enrollment?.progress !== undefined && (
                                <div className="mt-3">
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">{t('account.courses.progress')}</span>
                                    <span className="text-gray-300">{course.enrollment.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-green-500 h-2 rounded-full transition-all progress-bar-fill"
                                      style={{ width: `${course.enrollment.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-2 md:min-w-[200px]">
                              {course.hasAccess ? (
                                <>
                                  <Button
                                    className="bg-green-600 hover:bg-green-700 w-full"
                                    onClick={() => navigate(`/course/${course.id}`)}
                                  >
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    {t('account.courses.continue')}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="w-full border-gray-700"
                                    onClick={() => navigate(`/course/${course.id}`)}
                                  >
                                    {t('account.courses.materials')}
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <div className="text-right mb-2">
                                    <p className="text-2xl font-bold text-blue-400">{course.price_usdt} USDT</p>
                                  </div>
                                  <Button
                                    className="bg-blue-600 hover:bg-blue-700 w-full"
                                    onClick={() => {
                                      setSelectedCourse(course);
                                      setIsPaymentOpen(true);
                                    }}
                                  >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    {t('account.courses.buy')}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="w-full border-gray-700"
                                    onClick={() => navigate('/courses')}
                                  >
                                    {t('account.courses.details')}
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>



            <TabsContent value="profile">
              <ProfileTab
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSave={handleSaveProfile}
              />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersTab orders={orders} loading={ordersLoading} />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>

            <TabsContent value="referral">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{t('account.referral.title')}</h2>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {t('account.referral.earn')}
                  </Badge>
                </div>
                <ReferralSection userId={user?.id || ''} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main >

      <Footer />

      {/* Payment Modal */}
      {
        user && selectedCourse && (
          <PaymentModal
            isOpen={isPaymentOpen}
            onClose={() => {
              setIsPaymentOpen(false);
              setSelectedCourse(null);
              // Refresh enrollments after payment submission
              checkUserAndEnrollments();
            }}
            courseId={selectedCourse.id}
            courseTitle={selectedCourse.title}
            price={selectedCourse.price_usdt}
            userId={user.id}
          />
        )
      }

      {/* Floating Support Button */}
      <SupportButton />
    </div >
  );
};

export default Account;

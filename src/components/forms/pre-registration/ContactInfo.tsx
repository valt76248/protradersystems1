
import React from 'react';
import { User, Mail, Phone, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';

export interface ContactInfoProps {
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        messenger: string;
        phone: string;
        telegramNick: string;
        instagramNick: string;
    };
    onChange: (data: Partial<ContactInfoProps['formData']>) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ formData, onChange }) => {
    const { t } = useLanguage();
    const messengerOptions = ['WhatsApp', 'Telegram', 'Viber'];

    return (
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">{t('prereg.contact_info')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="text-gray-300">{t('prereg.first_name')}</Label>
                    <Input
                        required
                        placeholder={t('prereg.first_name_placeholder')}
                        value={formData.firstName}
                        onChange={(e) => onChange({ firstName: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-300">{t('prereg.last_name')}</Label>
                    <Input
                        required
                        placeholder={t('prereg.last_name_placeholder')}
                        value={formData.lastName}
                        onChange={(e) => onChange({ lastName: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center gap-2">
                        <Mail className="w-4 h-4" /> {t('prereg.email')}
                    </Label>
                    <Input
                        type="email"
                        required
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> {t('prereg.phone')}
                    </Label>
                    <Input
                        type="tel"
                        required
                        placeholder={t('prereg.phone_placeholder')}
                        value={formData.phone}
                        onChange={(e) => onChange({ phone: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                </div>
            </div>

            <div className="mt-6 space-y-2">
                <Label className="text-gray-300 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> {t('prereg.messenger')}
                </Label>
                <RadioGroup
                    value={formData.messenger}
                    onValueChange={(value) => onChange({ messenger: value })}
                    className="flex flex-wrap gap-4 mt-3"
                >
                    {messengerOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={option}
                                id={option}
                                className="border-gray-500 text-cyan-500"
                            />
                            <Label htmlFor={option} className="text-gray-300 cursor-pointer">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                    <Label className="text-gray-300">{t('prereg.telegram_nick')}</Label>
                    <Input
                        placeholder="@username"
                        value={formData.telegramNick}
                        onChange={(e) => onChange({ telegramNick: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-300">{t('prereg.instagram_nick')}</Label>
                    <Input
                        placeholder="@username"
                        value={formData.instagramNick}
                        onChange={(e) => onChange({ instagramNick: e.target.value })}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;

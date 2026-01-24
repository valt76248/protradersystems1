
import React from 'react';
import LegalPageLayout from '../components/layout/LegalPageLayout';
import { publicOfferData } from '@/data/legal/publicOfferData';

const PublicOffer = () => {
    return (
        <LegalPageLayout title={publicOfferData.title}>
            <div className="space-y-6 text-gray-300 leading-relaxed">
                {/* Intro */}
                {publicOfferData.intro.map((paragraph, index) => (
                    <p key={`intro-${index}`}>{paragraph}</p>
                ))}

                {/* Sections */}
                {publicOfferData.sections.map((section, sectionIndex) => (
                    <div key={`section-${sectionIndex}`}>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4">{section.title}</h2>
                        {section.content.map((item, itemIndex) => {
                            if (typeof item === 'string') {
                                return (
                                    <p key={`sect-${sectionIndex}-item-${itemIndex}`} className="mt-2 text-gray-300">
                                        {item}
                                    </p>
                                );
                            } else if (item.type === 'list') {
                                return (
                                    <div key={`sect-${sectionIndex}-list-${itemIndex}`} className="space-y-2 mt-2">
                                        {item.items.map((listItem, listIndex) => (
                                            <p key={`list-item-${listIndex}`} className="pl-4 text-gray-300 border-l-2 border-slate-700 ml-1">
                                                {listItem}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}
            </div>
        </LegalPageLayout>
    );
};

export default PublicOffer;

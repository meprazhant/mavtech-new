'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';


const servicesData = {
    web: {
        title: 'Web Development',
        subtitle: 'Building powerful, scalable web applications',
        description: 'We create modern, responsive websites and web applications that drive business growth. From simple landing pages to complex enterprise solutions, our team delivers excellence.',
        features: [
            'Custom Website Development',
            'E-commerce Solutions',
            'Progressive Web Apps (PWA)',
            'Content Management Systems',
            'API Integration & Development',
            'Performance Optimization',
        ],
        benefits: [
            'Responsive & Mobile-First Design',
            'SEO-Optimized Architecture',
            'Fast Loading Times',
            'Scalable & Maintainable Code',
            'Security Best Practices',
            'Cross-Browser Compatibility',
        ],
        process: [
            { step: 'Discovery', description: 'Understanding your business goals and requirements' },
            { step: 'Planning', description: 'Creating architecture and technical specifications' },
            { step: 'Design', description: 'Crafting beautiful, user-friendly interfaces' },
            { step: 'Development', description: 'Building your application with cutting-edge technology' },
            { step: 'Testing', description: 'Rigorous quality assurance and bug fixing' },
            { step: 'Launch', description: 'Deployment and ongoing support' },
        ],
        ctaText: 'Start Your Web Project',
    },
    mobile: {
        title: 'Mobile App Development',
        subtitle: 'Native and cross-platform mobile solutions',
        description: 'Transform your ideas into powerful mobile applications. We build iOS and Android apps that users love, whether using native technologies or cross-platform frameworks.',
        features: [
            'iOS & Android Development',
            'React Native Apps',
            'Flutter Development',
            'Mobile UI/UX Design',
            'App Store Optimization',
            'Push Notifications & Analytics',
        ],
        benefits: [
            'Native Performance',
            'Seamless User Experience',
            'Offline Functionality',
            'Device Integration',
            'Regular Updates & Maintenance',
            'App Store Compliance',
        ],
        process: [
            { step: 'Ideation', description: 'Refining your app concept and features' },
            { step: 'Design', description: 'Creating intuitive mobile interfaces' },
            { step: 'Development', description: 'Building with native or cross-platform tech' },
            { step: 'Testing', description: 'QA across multiple devices and OS versions' },
            { step: 'Deployment', description: 'Publishing to App Store and Play Store' },
            { step: 'Support', description: 'Ongoing maintenance and feature updates' },
        ],
        ctaText: 'Build Your Mobile App',
    },
    design: {
        title: 'Graphics Designing',
        subtitle: 'Creative visual solutions that captivate',
        description: 'Our design team creates stunning visual identities that make your brand stand out. From logos to complete brand systems, we bring your vision to life.',
        features: [
            'Logo & Brand Identity Design',
            'UI/UX Design',
            'Marketing Materials',
            'Social Media Graphics',
            'Packaging Design',
            'Infographics & Illustrations',
        ],
        benefits: [
            'Unique, Custom Designs',
            'Brand Consistency',
            'Professional Quality',
            'Fast Turnaround',
            'Unlimited Revisions*',
            'Source Files Included',
        ],
        process: [
            { step: 'Brief', description: 'Understanding your brand and vision' },
            { step: 'Research', description: 'Analyzing market and competitors' },
            { step: 'Concept', description: 'Creating initial design concepts' },
            { step: 'Refinement', description: 'Iterating based on your feedback' },
            { step: 'Finalization', description: 'Delivering final designs in all formats' },
            { step: 'Support', description: 'Providing design guidelines and assets' },
        ],
        ctaText: 'Start Your Design Project',
    },
    digital: {
        title: 'Digital Marketing',
        subtitle: 'Data-driven strategies for online growth',
        description: 'Grow your online presence with our comprehensive digital marketing services. We help businesses reach their target audience and achieve measurable results.',
        features: [
            'SEO & Content Marketing',
            'Social Media Marketing',
            'Pay-Per-Click (PPC) Advertising',
            'Email Marketing Campaigns',
            'Analytics & Reporting',
            'Conversion Rate Optimization',
        ],
        benefits: [
            'Increased Online Visibility',
            'Higher Quality Leads',
            'Better ROI on Ad Spend',
            'Data-Driven Decisions',
            'Brand Authority Building',
            'Measurable Results',
        ],
        process: [
            { step: 'Audit', description: 'Analyzing your current digital presence' },
            { step: 'Strategy', description: 'Creating a customized marketing plan' },
            { step: 'Implementation', description: 'Executing campaigns across channels' },
            { step: 'Optimization', description: 'Continuous improvement based on data' },
            { step: 'Reporting', description: 'Regular performance reports and insights' },
            { step: 'Scaling', description: 'Expanding successful strategies' },
        ],
        ctaText: 'Boost Your Online Presence',
    },
};

export default function ServicePage({ type }) {
    const [service, setService] = useState(null);


    useEffect(() => {
        const serviceData = servicesData[type];
        if (!serviceData) {
            console.log('Service not found');
            notFound();
        }
        setService(serviceData);
    }, [type]);

    if (!service) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <div className="inline-block px-4 py-2 rounded-full bg-purple-100 border-2 border-purple-600 mb-6">
                            <span className="text-purple-600 font-semibold text-sm">Our Services</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
                            {service.title}
                        </h1>
                        <p className="text-2xl text-gray-600 font-light mb-8 max-w-3xl mx-auto">
                            {service.subtitle}
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
                        What We Offer
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-white font-bold text-xl">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
                        Why Choose Us
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-800 font-semibold">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
                        Our Process
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.process.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">{item.step}</h3>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                </div>
                                {index < service.process.length - 1 && (
                                    <div className="hidden lg:block absolute top-6 left-[calc(100%+1rem)] w-8 h-0.5 bg-purple-300" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Let's discuss your project and bring your vision to life.
                    </p>
                    <button
                        onClick={() => window.location.href = '/contact'}
                        className="bg-white text-purple-600 font-bold text-lg px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                        {service.ctaText}
                    </button>
                </div>
            </section>
        </div>
    );
}

'use client';

import BaseTemplate from '@/components/layout/BaseTemplate';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
    };

    return (
        <BaseTemplate>
            {/* Contact Hero */}
            <section className="relative bg-gray-900 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Get in touch with our team for inquiries about services, training, or emergency response.
                            </p>

                            {/* Emergency Contact */}
                            <div className="bg-orange-500 rounded-2xl p-6 mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Phone className="w-6 h-6 text-white" />
                                    <h2 className="text-xl font-bold text-white">Emergency Line</h2>
                                </div>
                                <a
                                    href="tel:8337278534"
                                    className="text-2xl font-bold text-white hover:underline"
                                >
                                    (833) 727-8534
                                </a>
                                <p className="text-white/80 mt-2">Available 24/7 for emergencies</p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <Mail className="w-6 h-6 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-400">Email us at</p>
                                        <a href="mailto:contact@roguerescue.com" className="hover:text-white transition-colors">
                                            contact@roguerescue.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-gray-300">
                                    <MapPin className="w-6 h-6 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-400">Visit us at</p>
                                        <p>123 Rescue Way, Mountain View, CA 94043</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-gray-300">
                                    <Clock className="w-6 h-6 text-orange-500" />
                                    <div>
                                        <p className="text-sm text-gray-400">Office Hours</p>
                                        <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="services">Services Inquiry</option>
                                        <option value="training">Training Information</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            Send Message <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] bg-gray-100">
                {/* Add map integration here */}
            </section>
        </BaseTemplate>
    );
}
// src/components/training/CalendarModal.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TrainingEvent } from '@/types';
import Link from 'next/link';

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: TrainingEvent[];
}

export default function CalendarModal({ isOpen, onClose, events }: CalendarModalProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Calendar helper functions remain the same
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    // Group events by date with locale date formatting
    const eventsByDate = events.reduce((acc, event) => {
        const dateKey = event.date.toISOString().split('T')[0];
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {} as Record<string, TrainingEvent[]>);

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDayOfMonth = getFirstDayOfMonth(currentDate);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32" />);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateKey = date.toISOString().split('T')[0];
            const dayEvents = eventsByDate[dateKey] || [];

            days.push(
                <div
                    key={day}
                    className="border border-gray-200 p-2 min-h-[6rem] md:min-h-[8rem] relative group hover:bg-gray-50 transition-colors"
                >
                    <span className="text-sm text-gray-500">
                        {date.toLocaleDateString('en-US', { day: 'numeric' })}
                    </span>

                    {dayEvents.length > 0 && (
                        <div className="mt-1 space-y-1">
                            {dayEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/training/${event.slug}?date=${dateKey}`}
                                    className="block"
                                >
                                    <div className="bg-orange-100 text-orange-800 text-xs p-1 rounded truncate hover:bg-orange-200 transition-colors">
                                        {event.title}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    const renderMobileList = () => {
        const monthEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear();
        }).sort((a, b) => a.date.getTime() - b.date.getTime());

        return (
            <div className="space-y-2">
                {monthEvents.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No training events this month</p>
                ) : (
                    monthEvents.map((event) => (
                        <Link
                            key={event.id}
                            href={`/training/${event.slug}?date=${event.date.toISOString().split('T')[0]}`}
                            className="block"
                        >
                            <div className="flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-200">
                                <div className="h-14 w-14 bg-orange-100 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                                    <span className="text-orange-500 font-bold">
                                        {event.date.getDate()}
                                    </span>
                                    <span className="text-orange-500 text-sm">
                                        {event.date.toLocaleString('en-US', { month: 'short' })}
                                    </span>
                                </div>

                                <div className="flex-grow min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{event.title}</h4>
                                    <p className="text-gray-600 truncate">{event.location}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                            {event.category}
                                        </span>
                                        <span className="text-sm text-gray-600">${event.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50">
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-6xl mx-4 my-4 md:my-8 bg-white rounded-2xl shadow-xl"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-white rounded-t-2xl">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                                Training Calendar
                            </h2>
                            <div className="flex items-center justify-between md:justify-start gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevMonth}
                                        className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="text-base md:text-lg font-medium min-w-[150px] text-center">
                                        {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button
                                        onClick={nextMonth}
                                        className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full md:ml-4"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 md:p-6">
                            {/* Mobile List View */}
                            <div className="md:hidden">
                                {renderMobileList()}
                            </div>

                            {/* Desktop Calendar View */}
                            <div className="hidden md:block">
                                {/* Calendar header */}
                                <div className="grid grid-cols-7 gap-px mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar grid */}
                                <div className="grid grid-cols-7 gap-px bg-gray-200">
                                    {renderCalendar()}
                                </div>

                                {/* Legend */}
                                <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-orange-100 rounded" />
                                        <span>Training Available</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
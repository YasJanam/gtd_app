import React from 'react';
import {
    Award,
    BookOpen,
    Play,
    Lock,
    CheckCircle,
    ArrowLeft,
    MapPin,
    Link
} from 'flowbite-react-icons/outline';

type LessonType = {
    _id?: string;
    wp_id: number;
    wp_url: string;
    title: string;
}

type CourseType = {
    title: string;
    description: string;
    wp_id: number;
    wp_url: string;
    lessons: LessonType[];
}

export default function RecommandedLearningPath({ personalLearningPath }: { personalLearningPath: CourseType[] }) {
    if (!personalLearningPath || personalLearningPath.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-white to-purple-50/50 rounded-3xl border border-white shadow-sm">
                <div className="w-20 h-20 bg-purple-100 text-purple-400 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">مسیر شما در حال طراحی است!</h3>
                <p className="text-gray-500 text-sm">به زودی دوره‌های پیشنهادی برای شما اینجا نمایش داده می‌شود.</p>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto py-8">
            {/* خط اتصال مرکزی */}
            <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-200 via-purple-400 to-gray-200 transform translate-x-1/2 rounded-full opacity-30"></div>

            <div className="space-y-8 md:space-y-12 relative z-10">
                {personalLearningPath?.map((course, index) => {
                    const isFirst = index === 0;
                    const isCompleted = false; // این را از دیتابیس بگیرید
                    const isLocked = index > 1; // برای دمو: مرحله سوم به بعد قفل
                    const isEven = index % 2 === 0;

                    return (
                        <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            
                            <div className="hidden md:block w-[45%]"></div>

                            {/* 🔵 نقطه اتصال روی تایم‌لاین */}
                            <div className="absolute right-1/2 transform translate-x-1/2 md:relative md:right-auto md:translate-x-0 flex items-center justify-center z-20">
                                <div className={`
                                    w-14 h-14 rounded-full flex items-center justify-center border-4 shadow-xl
                                    ${isCompleted ? 'bg-green-100 border-white text-green-600' 
                                    : isFirst ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 border-white text-white shadow-purple-500/50 scale-110' 
                                    : 'bg-white border-gray-100 text-gray-300'}
                                `}>
                                    {isCompleted ? <CheckCircle className="w-6 h-6" /> 
                                    : isFirst ? <Play className="w-6 h-6 ml-1" /> 
                                    : <Lock className="w-5 h-5" />}
                                </div>
                            </div>

                            {/* 🎴 کارت دوره */}
                            <div className={`w-full md:w-[45%] mt-6 md:mt-0 relative group`}>
                                <div className={`
                                    absolute -inset-0.5 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500
                                    ${isFirst ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-transparent'}
                                `}></div>
                                
                                <div className={`
                                    relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border transition-all duration-300
                                    ${isFirst ? 'border-purple-100 shadow-[0_8px_30px_rgb(109,40,217,0.08)] hover:shadow-[0_8px_30px_rgb(109,40,217,0.15)]' 
                                    : 'border-gray-100 shadow-sm'}
                                `}>
                                    <div className={`absolute -top-3 ${isEven ? 'left-6' : 'right-6'} px-3 py-1 rounded-full text-xs font-bold shadow-sm
                                        ${isFirst ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}
                                    `}>
                                        گام {index + 1}
                                    </div>

                                    <div className="flex flex-col gap-4 mt-2">
                                        <div className="flex items-start justify-between">
                                            <h4 className={`text-lg font-bold leading-tight ${isFirst ? 'text-[#1C1132]' : 'text-gray-700'}`}>
                                                {course?.title}
                                            </h4>
                                            {isCompleted && (
                                                <Award className="w-6 h-6 text-yellow-500 shrink-0" />
                                            )}
                                        </div>

                                        {/* 📚 لیست درس‌ها با لینک اختصاصی */}
                                        {course.lessons && course.lessons.length > 0 && (
                                            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/50 mt-2">
                                                <h5 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4" />
                                                    درس های منتخب
                                                </h5>
                                                <div className="flex flex-col gap-2">
                                                    {course.lessons.map((lesson: LessonType, lessonIndex: number) => (
                                                        <a
                                                            key={lessonIndex}
                                                            href={isLocked ? '#' : lesson.wp_url}
                                                            target={isLocked ? '_self' : '_blank'}
                                                            rel="noopener noreferrer"
                                                            className={`
                                                                flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 group/lesson
                                                                ${isLocked 
                                                                    ? 'bg-transparent opacity-60 cursor-not-allowed' 
                                                                    : 'bg-white border border-gray-100 hover:border-purple-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'}
                                                            `}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isFirst ? 'bg-purple-400' : 'bg-gray-300'}`} />
                                                                <span className={`text-sm ${isFirst ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>
                                                                    {lesson.title}
                                                                </span>
                                                            </div>
                                                            
                                                            {/* آیکون مشاهده درس */}
                                                            <div className="shrink-0">
                                                                {isLocked ? (
                                                                    <Lock className="w-4 h-4 text-gray-400" />
                                                                ) : (
                                                                    <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover/lesson:bg-purple-600 group-hover/lesson:text-white transition-colors">
                                                                        <Link className="w-3.5 h-3.5" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* دکمه شروع دوره */}
                                        <a 
                                            href={isLocked ? '#' : course.wp_url} 
                                            target={isLocked ? '_self' : '_blank'}
                                            rel="noopener noreferrer"
                                            className={isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                                        >
                                            <button className={`
                                                w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 mt-2
                                                ${isFirst 
                                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5' 
                                                    : isLocked 
                                                        ? 'bg-gray-100 text-gray-400'
                                                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}
                                            `}>
                                                {isLocked ? 'قفل شده' : isCompleted ? 'مرور دوره' : 'شروع یادگیری'}
                                                {!isLocked && <ArrowLeft className="w-4 h-4" />}
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

'use client';

import React, { ComponentType, useEffect, useState } from 'react';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_ZIRESEFR;


import {
    Award,
    Clock,
    Star,
    ArrowUp,
    CheckCircle,
    Lock,
    BookOpen,
    Play,
    Lightbulb,
    CalendarWeek,
    Flag,
    Brain,
   
    ArrowLeft 
} from 'flowbite-react-icons/outline';
import { Button } from 'flowbite-react';

import { useUserStore } from '@/globalStroes/userStore/providers/user-store-provider';
import RecommandedLearningPath from './components/learningPath';


// ---------------------------------
// Types
// ---------------------------------

type IconType = ComponentType<{ className?: string }>;

type StatColor = 'green' | 'orange' | 'purple';

type StepStatus = 'done' | 'active' | 'locked';

type AchievementColor = 'yellow' | 'purple' | 'gray';

interface StatItem {
    value: string;
    label: string;
    change: string;
    icon: IconType;
    color: StatColor;
}

interface LearningStep {
    title: string;
    subtitle: string;
    icon: IconType;
    status: StepStatus;
}

interface Achievement {
    title: string;
    icon: IconType;
    color: AchievementColor;
}

interface SectionTitleProps {
    icon: IconType;
    title: string;
    color?: 'purple' | 'blue' | 'yellow';
}

interface StatCardProps {
    item: StatItem;
}

// ---------------------------------
// Data
// ---------------------------------

const stats: StatItem[] = [
    {
        value: '۸۷٪',
        label: 'پیشرفت کل دوره‌ها',
        change: '۵٪+',
        icon: CheckCircle,
        color: 'green'
    },
    {
        value: '۲.۵ ساعت',
        label: 'زمان یادگیری این هفته',
        change: '۱.۲+ ساعت',
        icon: Clock,
        color: 'orange'
    },
    {
        value: '۷ روز',
        label: 'رکورد یادگیری متوالی',
        change: '۱+ روز',
        icon: Star,
        color: 'purple'
    }
];

const learningSteps: LearningStep[] = [
    {
        title: 'مدیریت زمان',
        subtitle: 'پایان یافته',
        icon: BookOpen,
        status: 'done'
    },
    {
        title: 'هدف‌گذاری',
        subtitle: 'پایان یافته',
        icon: Flag,
        status: 'done'
    },
    {
        title: 'غلبه بر اهمال‌کاری',
        subtitle: 'در حال یادگیری',
        icon: Brain,
        status: 'active'
    },
    {
        title: 'افزایش بهره‌وری',
        subtitle: 'قفل شده',
        icon: Flag,
        status: 'locked'
    },
    {
        title: 'موفقیت پایدار',
        subtitle: 'قفل شده',
        icon: Award,
        status: 'locked'
    }
];

const achievements: Achievement[] = [
    {
        title: 'یادگیرنده برتر',
        icon: Award,
        color: 'yellow'
    },
    {
        title: 'پشتکار',
        icon: Star,
        color: 'purple'
    },
    {
        title: 'در راه است...',
        icon: Lock,
        color: 'gray'
    }
];

// ---------------------------------
// Section Title
// ---------------------------------

function SectionTitle({
    icon: Icon,
    title,
    color = 'purple'
}: SectionTitleProps) {

    const colors = {
        purple: 'text-purple-500',
        blue: 'text-blue-500',
        yellow: 'text-yellow-500'
    };

    return (
        <div className="flex items-center gap-2 mb-5">
            <Icon className={`w-5 h-5 ${colors[color]}`} />

            <h3 className="font-bold text-[#201342] text-sm md:text-base">
                {title}
            </h3>
        </div>
    );
}

// ---------------------------------
// Statistics Card
// ---------------------------------

function StatCard({ item }: StatCardProps) {

    const Icon = item.icon;

    const colors: Record<StatColor, string> = {
        green: 'bg-emerald-100 text-emerald-500',
        orange: 'bg-orange-100 text-orange-500',
        purple: 'bg-purple-100 text-purple-500'
    };

    const waveColors: Record<StatColor, string> = {
        green: 'bg-emerald-300',
        orange: 'bg-orange-300',
        purple: 'bg-purple-300'
    };

    return (
        <div className="bg-white rounded-3xl border border-purple-50 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[190px]">

            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${colors[item.color]}`}>
                <Icon className="w-6 h-6" />
            </div>

            <span className="text-2xl font-extrabold text-[#201342]">
                {item.value}
            </span>

            <span className="text-xs text-gray-500 mt-1 text-center">
                {item.label}
            </span>

            <span className="flex items-center gap-1 text-xs text-emerald-500 mt-2 font-bold">
                <ArrowUp className="w-3 h-3" />
                {item.change}
            </span>

            <div
                className={`absolute bottom-0 left-0 right-0 h-8 opacity-20 ${waveColors[item.color]}`}
                style={{
                    clipPath: 'polygon(0 90%, 15% 60%, 30% 75%, 45% 20%, 60% 50%, 75% 10%, 100% 30%, 100% 100%, 0 100%)'
                }}
            />
        </div>
    );
}

// ---------------------------------
// Learning Path
// ---------------------------------

function LearningPath() {

    return (
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-purple-50 h-full">

            <div className="flex justify-between items-center mb-8">

                <div className="flex items-center gap-2">
                    <Flag className="w-6 h-6 text-pink-500" />

                    <h3 className="font-bold text-[#201342]">
                        مسیر آموزش شخصی شما
                    </h3>
                </div>

                <button className="text-xs text-purple-600 hover:text-purple-800">
                    مشاهده همه مراحل ←
                </button>

            </div>

            <div className="relative">

                <div className="absolute top-5 right-[10%] left-[10%] h-1 bg-gray-100" />

                <div className="absolute top-5 right-[10%] w-[55%] h-1 bg-gradient-to-l from-purple-600 to-emerald-400" />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative">

                    {learningSteps.map((step: LearningStep, index: number) => {

                        const Icon = step.icon;

                        const isDone = step.status === 'done';
                        const isActive = step.status === 'active';
                        const isLocked = step.status === 'locked';

                        return (
                            <div
                                key={index}
                                className={`flex flex-col items-center ${isLocked ? 'opacity-50' : ''}`}
                            >

                                <div className={`w-11 h-11 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 mb-3 ${
                                    isDone
                                        ? 'bg-emerald-400 text-white'
                                        : isActive
                                        ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-300'
                                        : 'bg-gray-100 text-gray-400'
                                }`}>

                                    {isDone ? (
                                        <CheckCircle className="w-6 h-6" />
                                    ) : isLocked ? (
                                        <Lock className="w-5 h-5" />
                                    ) : (
                                        <Icon className="w-6 h-6" />
                                    )}

                                </div>

                                <div className={`w-full min-h-[125px] rounded-2xl p-3 text-center border flex flex-col items-center justify-center ${
                                    isDone
                                        ? 'bg-emerald-50 border-emerald-100'
                                        : isActive
                                        ? 'bg-purple-50 border-purple-300 shadow-md'
                                        : 'bg-gray-50 border-gray-100'
                                }`}>

                                    <Icon className="w-7 h-7 mb-2 text-purple-500" />

                                    <span className="text-xs font-bold text-[#201342]">
                                        {step.title}
                                    </span>

                                    <span className="text-[10px] mt-2 text-gray-400">
                                        ({step.subtitle})
                                    </span>

                                    {isActive && (
                                        <button className="mt-3 bg-purple-600 text-white text-xs rounded-full px-4 py-1.5 hover:bg-purple-700">
                                            ادامه بده ▶
                                        </button>
                                    )}

                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}

// ---------------------------------
// Cognitive Profile
// ---------------------------------

function CognitiveProfile() {

    return (
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-purple-50 h-full">

            <SectionTitle
                icon={Flag}
                title="پروفایل شناختی شما"
            />

            <div className="flex items-center gap-4 mb-6">

                <div
                    className="w-28 h-28 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{
                        background: 'conic-gradient(#7c3aed 78%, #eee9f8 78%)'
                    }}
                >
                    <div className="w-[82px] h-[82px] rounded-full bg-white flex flex-col items-center justify-center">
                        <Brain className="w-7 h-7 text-pink-400" />

                        <span className="font-extrabold text-xl text-[#201342]">
                            ۷۸٪
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 text-xs text-gray-600">

                    <div className="flex gap-2 items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        اهداف اصلی: مدیریت زمان و بهره‌وری
                    </div>

                    <div className="flex gap-2 items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        زمان آزاد روزانه: ۲ ساعت
                    </div>

                    <div className="flex gap-2 items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        سبک یادگیری: دیداری و عملی
                    </div>

                </div>
            </div>

            <button className="w-full py-2.5 bg-purple-50 text-purple-600 rounded-xl text-sm hover:bg-purple-100 flex items-center justify-center gap-2">
                ویرایش پروفایل
                <Lightbulb className="w-4 h-4" />
            </button>

        </div>
    );
}

// ---------------------------------
// Weekly Calendar
// ---------------------------------

interface CalendarDay {
    name: string;
    date: string;
    active?: boolean;
}

const calendarDays: CalendarDay[] = [
    { name: 'شن', date: '۲۴' },
    { name: 'یک', date: '۲۵' },
    { name: 'دوش', date: '۲۶' },
    { name: 'سه', date: '۲۷', active: true },
    { name: 'چهار', date: '۲۸' },
    { name: 'پنج', date: '۲۹' },
    { name: 'جمعه', date: '۳۰' }
];

function WeeklyCalendar() {

    return (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-50 h-full">

            <SectionTitle
                icon={CalendarWeek}
                title="برنامه یادگیری این هفته"
                color="blue"
            />

            <div className="flex justify-between gap-1 mb-6">

                {calendarDays.map((day: CalendarDay, index: number) => (

                    <div key={index} className="flex flex-col items-center gap-2">

                        <span className="text-[10px] text-gray-500">
                            {day.name}
                        </span>

                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                            day.active
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-purple-50 text-[#201342]'
                        }`}>
                            {day.date}
                        </div>

                    </div>
                ))}

            </div>

            <div className="bg-purple-50 rounded-xl p-3 flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5" />
                </div>

                <div>
                    <p className="text-xs font-bold text-[#201342]">
                        امروز: درس غلبه بر اهمال‌کاری
                    </p>

                    <span className="text-[10px] text-gray-500">
                        ساعت ۱۹:۰۰
                    </span>
                </div>

            </div>

        </div>
    );
}

// ---------------------------------
// Recommended Course
// ---------------------------------

function RecommendedCourse() {

    return (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-50 h-full">

            <SectionTitle
                icon={Star}
                title="درس‌های پیشنهادی برای شما"
                color="yellow"
            />

            <div className="flex items-center gap-4">

                <div className="w-32 h-28 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-purple-600 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-blue-200" />
                </div>

                <div className="flex-1 min-w-0">

                    <h4 className="font-bold text-[#201342] text-sm leading-6 mb-2">
                        مدیریت تمرکز در دنیای پرمشغله
                    </h4>

                    <div className="flex flex-wrap gap-3 text-[11px] text-gray-500 mb-3">

                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            مدت: ۱۵ دقیقه
                        </span>

                        <span>
                            سطح: متوسط
                        </span>

                    </div>

                    <button className="bg-purple-600 text-white rounded-full px-4 py-2 text-xs flex items-center gap-2 hover:bg-purple-700">
                        مشاهده درس
                        <Play className="w-4 h-4" />
                    </button>

                </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>

        </div>
    );
}

// ---------------------------------
// Achievements
// ---------------------------------

function Achievements() {

    const colors: Record<AchievementColor, string> = {
        yellow: 'bg-yellow-100 text-yellow-600 border-yellow-300',
        purple: 'bg-purple-100 text-purple-600 border-purple-300',
        gray: 'bg-gray-100 text-gray-400 border-gray-200'
    };

    return (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-50 h-full flex flex-col">

            <SectionTitle
                icon={Award}
                title="افتخارات شما"
                color="yellow"
            />

            <div className="flex justify-between items-center gap-2 mb-6">

                {achievements.map((item: Achievement, index: number) => {

                    const Icon = item.icon;

                    return (
                        <div key={index} className="flex flex-col items-center gap-2">

                            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${colors[item.color]}`}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <span className="text-[10px] text-gray-500 text-center">
                                {item.title}
                            </span>

                        </div>
                    );
                })}

            </div>

            <div className="mt-auto bg-pink-50 rounded-xl p-3 flex items-center gap-2">

                <span className="text-xl">❤️</span>

                <p className="text-xs text-[#201342] leading-5">
                    تو فوق‌العاده‌ای! با یادگیری ادامه بده
                </p>

            </div>

        </div>
    );
}



// function LearningPath2({ personalLearningPath }: { personalLearningPath: CourseType[] }) {
    
//     if (!personalLearningPath || personalLearningPath.length === 0) {
//         return (
//             <div className="text-center py-10 text-gray-500 bg-white/50 rounded-2xl border border-dashed border-gray-300">
//                 هنوز مسیر یادگیری برای شما طراحی نشده است.
//             </div>
//         );
//     }

//     return (
//         <div className="relative border-r-2 border-purple-100 pr-6 ml-4 space-y-8">
//             {personalLearningPath?.map((course, index) => {
              
//                 const isFirst = index === 0;
//                 const isCompleted = false; // این را از دیتابیس بگیرید
//                 const isLocked = false; // این را از دیتابیس بگیرید

//                 return (
//                     <div key={course.wp_id || index} className="relative">
                        
//                         {/* 👈 نقطه‌های روی تایم‌لاین */}
//                         <div className={`absolute -right-[35px] top-6 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10
//                             ${isCompleted ? 'bg-green-500' : isFirst ? 'bg-purple-600' : 'bg-gray-200'}`}
//                         >
//                             {isCompleted ? (
//                                 <CheckCircle className="w-4 h-4 text-white" />
//                             ) : isFirst ? (
//                                 <Play className="w-4 h-4 text-white" />
//                             ) : (
//                                 <Lock className="w-4 h-4 text-gray-500" />
//                             )}
//                         </div>

//                         {/* 👈 کارت اصلی دوره */}
//                         <div className={`bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md
//                             ${isFirst ? 'border-purple-200 ring-1 ring-purple-100' : 'border-gray-100'}`}
//                         >
//                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                                 <div>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-md font-medium">
//                                             گام {index + 1}
//                                         </span>
//                                         {isCompleted && (
//                                             <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md font-medium">
//                                                 تکمیل شده
//                                             </span>
//                                         )}
//                                     </div>
//                                     <h4 className="text-lg font-bold text-[#1C1132]">{course?.title}</h4>
//                                 </div>
                                
//                                 <a 
//                                     href={course.wp_url} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="shrink-0"
//                                 >
//                                     <Button className={`
//                                         ${isFirst 
//                                             ? 'bg-[#6D28D9] hover:bg-[#5b21b6] text-white' 
//                                             : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
//                                         rounded-full px-6 transition-all
//                                     `}>
//                                         مشاهده دوره
//                                         <ArrowLeft className="w-4 h-4 mr-2" />
//                                     </Button>
//                                 </a>
//                             </div>

//                             {/* 👈 لیست درس‌ها */}
//                             {course.lessons && course.lessons.length > 0 && (
//                                 <div className="mt-4 pt-4 border-t border-gray-50">
//                                     <h5 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
//                                         <BookOpen className="w-4 h-4" />
//                                         سرفصل‌های این دوره:
//                                     </h5>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                                         {course.lessons.map((lesson: string, lessonIndex: number) => (
//                                             <div 
//                                                 key={lessonIndex} 
//                                                 className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50/50 p-2 rounded-lg"
//                                             >
//                                                 <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
//                                                 <span>{lesson}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// ---------------------------------
// Main Dashboard
// ---------------------------------

type WpLessonType = {
    id:number,
    title: string,
    url: string,
    completed: boolean,
    progress_percent: number,
    topics: string[]
}

type WpCourseType = {
    course_id : number,
    course_title : string,
    course_url : string,
    total_steps: number,
    completed_steps: number,
    progress_percent: number,
    lessons: WpLessonType[],
}

type LessonType = {
    _id?: string;
    wp_id: number;
    wp_url: string;
    title: string;
}

type CourseType = {
    title : string,
    description: string,
    wp_id: number,
    wp_url: string,
    lessons: LessonType[],
}

type AiResponseLessonType = {
    wp_id:number
}

type AiResponseCourseType = {
    wp_id:number,
    lessons:AiResponseLessonType[],
}

export default function DashboardContent(): React.JSX.Element {

    const [courses,setCourses] = useState<CourseType[]>([]);
    const [personalLearningPath,setPersonalLearningPath] = useState<CourseType[]>([]);
    const recommandedCourses = useUserStore((s) => s.recommandedCourses);
    const setRecommandedCourses = useUserStore((s) => s.setRecommandedCourses);


//     const data = {
//     "courses": [
//         {
//             "wp_id": 20286,
//             "lessons": [
//                 {
//                     "wp_id": 20307
//                 },
//                 {
//                     "wp_id": 20303
//                 },
//                 {
//                     "wp_id": 20304
//                 },
//                 {
//                     "wp_id": 20298
//                 },
//                 {
//                     "wp_id": 20300
//                 },
//                 {
//                     "wp_id": 20308
//                 },
//                 {
//                     "wp_id": 20306
//                 },
//                 {
//                     "wp_id": 20368
//                 },
//                 {
//                     "wp_id": 20366
//                 },
//                 {
//                     "wp_id": 20363
//                 }
//             ]
//         },
//         {
//             "wp_id": 12701,
//             "lessons": [
//                 {
//                     "wp_id": 24080
//                 },
//                 {
//                     "wp_id": 24082
//                 },
//                 {
//                     "wp_id": 24077
//                 }
//             ]
//         },
//         {
//             "wp_id": 12848,
//             "lessons": [
//                 {
//                     "wp_id": 12910
//                 },
//                 {
//                     "wp_id": 12898
//                 },
//                 {
//                     "wp_id": 12891
//                 },
//                 {
//                     "wp_id": 12874
//                 },
//                 {
//                     "wp_id": 12882
//                 },
//                 {
//                     "wp_id": 12886
//                 },
//                 {
//                     "wp_id": 12915
//                 },
//                 {
//                     "wp_id": 12903
//                 }
//             ]
//         },
//         {
//             "wp_id": 12743,
//             "lessons": [
//                 {
//                     "wp_id": 12766
//                 },
//                 {
//                     "wp_id": 12770
//                 },
//                 {
//                     "wp_id": 12757
//                 },
//                 {
//                     "wp_id": 12754
//                 }
//             ]
//         },
//         {
//             "wp_id": 25375,
//             "lessons": [
//                 {
//                     "wp_id": 25386
//                 },
//                 {
//                     "wp_id": 25384
//                 }
//             ]
//         }
//     ]
// }

    useEffect(() => {
        fetchUserProgress();
        fetchRecommandedLearningPath();
        //fetchRecommandedLearningPaths();
        //createUserLearningPath(data?.courses);
    },[]);


    const fetchUserProgress = async() => {
        try {
            const response = await fetch(`${API_BASE_URL}/ziresefr-connection/user-progress/${2772}`,{
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                }
            });

            const res = await response.json();
            setCourses(res.courses);
            
        } catch {

        }
    }




    const createUserLearningPath = async(courses:AiResponseCourseType[]) => {
        try {

        const response = await fetch(`${API_BASE_URL}/ziresefr-user/learning-path`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: "6ab11f532a3b064e04285ed3",
                courses: courses,
             }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error');
        }
    } catch (error) {
        console.error(error);
    } 
    }



    const generateRecommandedLearningPath = async() => {
        try {

            const response = await fetch('/api/ai/ziresefr/users/dashboard/recommand-learning-path', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: "6ab11f532a3b064e04285ed3" }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error');
            }

            const data = await response.json();

            await createUserLearningPath(data.courses);
            await fetchRecommandedLearningPath();
            
        } catch (error) {
            console.error(error);
        } 
    }


    const fetchRecommandedLearningPath = async() => {
        try {

           const response = await fetch(`${API_BASE_URL}/ziresefr-user/learning-path?userId=6ab11f532a3b064e04285ed3`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
           
        });
            const data = await response.json();
            setPersonalLearningPath(data.courses);
            setRecommandedCourses(data.courses);
            console.log(response);
            
            //localStorage.setItem('learnin_path',data);
        } catch (error) {
            console.error(error);
        } 
    }



    /*const fetchRecommandedLearningPaths = async() => {
        try {

           const response = await fetch(`${API_BASE_URL}/ziresefr-user/learning-paths`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
           
        });
            console.log(response);
            
            //localStorage.setItem('learnin_path',data);
        } catch (error) {
            console.error(error);
        } 
    }*/


    

    return (
        <main
            dir="rtl"
            className="w-full min-h-screen bg-[#f6f4ff] p-3 md:p-5 lg:p-6"
        >

            <div className="max-w-[1600px] mx-auto flex flex-col gap-5">

                {/* ردیف اول: بنر و آمار */}

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    <div className="lg:col-span-6 min-h-[210px] rounded-3xl overflow-hidden relative bg-gradient-to-l from-[#e9e3ff] to-[#f6f2ff] border border-purple-100 p-6 flex items-center">

                        <div className="relative z-10 w-full md:w-[65%]">

                            <h2 className="text-xl md:text-2xl font-extrabold text-[#201342] mb-2">
                                مسیر یادگیری شما
                            </h2>

                            <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-3">
                                کاملاً شخصی‌سازی شده است!
                            </h3>

                            <p className="text-xs md:text-sm text-gray-600 leading-7 mb-4">
                                با توجه به اهداف و سبک یادگیری‌تان،
                                بهترین مسیر رو براتون آماده کردیم.
                            </p>

                            <button className="bg-purple-600 text-white rounded-full px-5 py-2.5 text-xs md:text-sm shadow-lg hover:bg-purple-700 transition"
                            onClick={generateRecommandedLearningPath}
                            >
                                مشاهده مسیر یادگیری ←
                            </button>

                        </div>

                        <div className="absolute left-3 bottom-0 text-8xl opacity-80">
                            👩🏻‍💻
                        </div>

                        <div className="absolute left-8 top-5 text-pink-400 text-2xl">
                            ♥
                        </div>

                    </div>



                    {stats.map((item: StatItem, index: number) => (
                        <div key={index} className="lg:col-span-2">
                            <StatCard item={item} />
                        </div>
                    ))}

                </section>

                    <RecommandedLearningPath personalLearningPath={personalLearningPath} />




                {/* ردیف دوم */}

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    <div className="lg:col-span-8">
                        <LearningPath />
                    </div>

                    <div className="lg:col-span-4">
                        <CognitiveProfile />
                    </div>

                </section>

                {/* ردیف سوم */}

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

                    <div className="lg:col-span-4">
                        <WeeklyCalendar />
                    </div>

                    <div className="lg:col-span-5">
                        <RecommendedCourse />
                    </div>

                    <div className="lg:col-span-3">
                        <Achievements />
                    </div>

                </section>

            </div>



            

        </main>
    );
}

'use client'

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

// 👈 آیکون‌های ضروری را از پکیج flowbite-react-icons ایمپورت کنید
import { 
    Home, 
    Book, 
    Chart, 
    UserCircle, 
    Cog, 
    Bell, 
    Search, 
    ArrowRightToBracket, 
    Award,              
    Play 
} from "flowbite-react-icons/outline";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    // لیست آیتم‌های سایدبار دقیقاً طبق تصویر
    const sidebarItems = [
        { name: 'داشبورد', icon: <Home className="w-6 h-6" />, href: '/' },
        { name: 'مسیر یادگیری', icon: <Chart className="w-6 h-6" />, href: '/path' },
        { name: 'دوره‌های من', icon: <Book className="w-6 h-6" />, href: '/courses' },
        { name: 'آزمون‌ها', icon: <Award className="w-6 h-6" />, href: '/exams' },
        { name: 'گواهی‌نامه‌ها', icon: <UserCircle className="w-6 h-6" />, href: '/certificates' },
        { name: 'ریویال', icon: <Play className="w-6 h-6" />, href: '/review' },
        { name: 'تنظیمات', icon: <Cog className="w-6 h-6" />, href: '/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#f3f0fa] font-sans flex flex-col md:flex-row-reverse">
            
            {/* ================================================== */}
            {/* Sidebar (سایدبار سمت راست) */}
            {/* ================================================== */}
            <nav className="
                fixed bottom-0 left-0 right-0 z-50 flex h-[72px] items-center justify-around bg-[#2c1460] px-3 text-white shadow-lg
                md:sticky md:top-0 md:h-screen md:w-[150px] md:flex-col md:justify-start md:border-l md:border-white/10 md:px-4 md:py-8
                rounded-xl
            ">
                {/* لوگو و نام برند در سایدبار */}
                <div className="hidden md:flex items-center gap-3 w-full mb-10 px-2">
                    <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">∞</span>
                    </div>
                    <span className="text-white font-bold text-lg">مسیر یادگیری</span>
                </div>

                {/* آیتم‌های منو */}
                <div className="flex md:flex-col w-full md:gap-2 justify-around md:justify-start">
                    {sidebarItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => router.push(item.href)}
                            className={`
                                flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 rounded-xl transition-all
                                ${index === 0 
                                    ? 'bg-[#7c3aed] text-white shadow-md' // آیتم فعال (داشبورد)
                                    : 'text-gray-300 hover:text-white hover:bg-[#2d1b4e]'
                                }
                            `}
                        >
                            {item.icon}
                            <span className="text-[10px] md:text-sm font-medium">{item.name}</span>
                        </button>
                    ))}
                </div>

                {/* دکمه خروج در پایین سایدبار (فقط دسکتاپ) */}
                <div className="hidden md:block mt-auto w-full">
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-[#2d1b4e] rounded-xl transition-all">
                        <ArrowRightToBracket className="w-5 h-5 rotate-180" />
                        <span className="text-sm font-medium">خروج</span>
                    </button>
                </div>
            </nav>

            {/* ================================================== */}
            {/* Main Content Area */}
            {/* ================================================== */}
            <main className="flex-1 flex flex-col w-full min-w-0 md:pb-0 pb-20">
                
                {/* Header (نوار بالا) */}
                <header className="w-full bg-white/70 backdrop-blur-md flex items-center justify-between px-6 py-4 md:py-5 border-b border-gray-100 shadow-sm sticky top-0 z-40">
                    
                    {/* بخش پروفایل کاربر (سمت راست) */}
                    <div className="flex items-center gap-3">
                        <Image src="/avatar-placeholder.png" width={40} height={40} alt="User" className="rounded-full bg-gray-200" />
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">سلام،</span>
                            <span className="text-sm font-bold text-gray-800">علی جان!</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                    </div>

                    {/* بخش جستجو و زنگوله (وسط و چپ) */}
                    <div className="flex items-center gap-4 flex-1 justify-end md:justify-center">
                        {/* زنگوله اعلان */}
                        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* باکس جستجو */}
                        <div className="relative w-full max-w-md hidden md:block">
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="جستجو در دوره‌ها و محتواها..." 
                                className="w-full bg-[#f3f0fa] text-gray-700 text-sm rounded-full py-2.5 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50"
                            />
                        </div>
                    </div>
                </header>

                {/* محتوای اصلی */}
                <div className="mx-auto w-full max-w-[1500px] p-4 md:p-6 lg:p-8">
                    {children}
                </div>
                
            </main>
        </div>
    );
}

export default DashboardLayout;
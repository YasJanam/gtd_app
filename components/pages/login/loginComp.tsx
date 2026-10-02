'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

const LoginComponent = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!username || !pass) {
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)
        setError('')

        try {
            const tokenResponse = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: pass,
                }),
            })

            const res = await tokenResponse.json()

            if (!tokenResponse.ok) {
                throw new Error(res.message || 'Invalid credentials')
            }

            const { token, timezone, uid } = res.data

            localStorage.setItem('access_token', token)
            localStorage.setItem('user_id', uid)
            localStorage.setItem('timezone', timezone)

            setCookie('access_token', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
                path: '/',
            })

            toast.success('Welcome back! 🎉')

            setTimeout(() => {
                router.push('/home')
            }, 500)

        } catch (err: any) {
            console.error('login error:', err)
            setError(err.message || 'Login failed')
            toast.error(err.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* ====== Background ====== */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src="/nightSky3.webp"
                    alt="GTD background"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/40 to-purple-900/70" />
            </div>

            {/* ====== Content ====== */}
            <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                    {/* ====== Login Card ====== */}
                    <div className="
                        bg-white/10 backdrop-blur-2xl 
                        rounded-3xl 
                        border border-white/20 
                        shadow-2xl 
                        p-8 
                        space-y-6
                        animate-fadeIn
                    ">

                        {/* ====== Logo & Title ====== */}
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-16 h-16 rounded-2xl 
                                            bg-gradient-to-br from-purple-500 to-indigo-600 
                                            flex items-center justify-center
                                            shadow-lg shadow-purple-500/50
                                            animate-pulse-slow">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>

                            <h1 className="text-3xl font-bold text-white">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-gray-300">
                                Sign in to continue to your account
                            </p>
                        </div>

                        {/* ====== Form ====== */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="
                                        w-full px-4 py-3 
                                        bg-white/10 
                                        border border-white/20 
                                        rounded-xl 
                                        text-white 
                                        placeholder-gray-400
                                        focus:outline-none 
                                        focus:ring-2 
                                        focus:ring-purple-500 
                                        focus:border-transparent
                                        transition-all
                                    "
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                        placeholder="Enter your password"
                                        className="
                                            w-full px-4 py-3 pr-12
                                            bg-white/10 
                                            border border-white/20 
                                            rounded-xl 
                                            text-white 
                                            placeholder-gray-400
                                            focus:outline-none 
                                            focus:ring-2 
                                            focus:ring-purple-500 
                                            focus:border-transparent
                                            transition-all
                                        "
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me + Forgot password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                                    />
                                    Remember me
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-purple-300 hover:text-purple-200 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-sm text-red-200 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full py-3.5 
                                    bg-gradient-to-r from-purple-500 to-indigo-600
                                    hover:from-purple-600 hover:to-indigo-700
                                    text-white font-bold
                                    rounded-xl
                                    shadow-lg shadow-purple-500/50
                                    hover:shadow-xl hover:shadow-purple-500/60
                                    transition-all duration-300
                                    transform hover:-translate-y-0.5
                                    active:translate-y-0
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:transform-none
                                "
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* ====== Divider ====== */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 text-gray-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* ====== Social Login ====== */}
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                type="button"
                                className="
                                    flex items-center justify-center gap-2 
                                    py-2.5 
                                    bg-white/10 hover:bg-white/20
                                    border border-white/20
                                    rounded-xl 
                                    text-white text-sm
                                    transition-all
                                    transform hover:-translate-y-0.5
                                "
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </button>
                            {/*<button
                                type="button"
                                className="
                                    flex items-center justify-center gap-2 
                                    py-2.5 
                                    bg-white/10 hover:bg-white/20
                                    border border-white/20
                                    rounded-xl 
                                    text-white text-sm
                                    transition-all
                                    transform hover:-translate-y-0.5
                                "
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                GitHub
                            </button>*/}
                        </div>

                        {/* ====== Sign up Link ====== */}
                        <p className="text-center text-sm text-gray-300">
                            Don't have an account?{' '}
                            <Link
                                href="/sign-up"
                                className="text-purple-300 hover:text-purple-200 font-bold transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* ====== Footer ====== */}
                    <p className="text-center text-xs text-gray-400 mt-6">
                        © 2026 GTD App. All rights reserved.
                    </p>
                </div>
            </main>

            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                    },
                }}
            />
        </div>
    )
}

export default LoginComponent
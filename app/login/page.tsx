"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Ambil callbackUrl dari URL atau default ke dashboard
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const target = e.currentTarget
    const email = target.email.value
    const password = target.password.value

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (!res?.error) {
        setIsLoading(false)
        router.push(callbackUrl)
      } else {
        setIsLoading(false)
        setError("Email atau password salah")
      }
    } catch (err) {
      setIsLoading(false)
      setError("Terjadi kesalahan sistem")
    }
  }

  return (
    <div className="flex min-h-screen">
      
      {/* SEKSI KIRI - FORM LOGIN */}
      <div className="w-full md:w-1/2 bg-[#0f172a] text-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">
              Pantry<span className="text-blue-500">Vision.</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Silahkan masuk untuk mengakses fitur pemindaian penuh.
            </p>
          </div>

          {/* MENAMPILKAN ERROR */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm py-3 px-4 rounded-xl mb-4 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Masukkan email"
                required
                className="w-full mt-1 px-4 py-3 rounded-full bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Masukkan password"
                required
                className="w-full mt-1 px-4 py-3 rounded-full bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? "Sedang Memproses..." : "Login"}
            </button>

            {/* TOMBOL SOSIAL MEDIA */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl })}
                className="flex items-center justify-center gap-2 border border-gray-500 py-2 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Google
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <span>Belum punya akun? </span>
            <Link 
              href="/register" 
              className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* SEKSI KANAN - LANDING INFO */}
      <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-50 z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          <div className="w-20 h-20 bg-gray-900 rounded-[2rem] mb-10 flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
            <div className="w-8 h-8 bg-blue-500 rounded-lg animate-pulse"></div>
          </div> 

          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">
            Pantry<span className="text-blue-600">Vision.</span>
          </h1>

          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Mendeteksi kesegaran bahan makanan dengan Computer Vision. Dibangun dengan metodologi <span className="font-bold">PULP</span> untuk hasil yang presisi.
          </p>

          <div className="flex justify-center gap-10 mt-12 text-sm text-gray-500">
            <div>
              <h2 className="text-xl font-bold text-black">98%</h2>
              Akurasi
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">0.5s</h2>
              Inference
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">2026</h2>
              Tech Stack
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
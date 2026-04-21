"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password.length < 8) {
      setError("Password minimal 8 karakter")
      setIsLoading(false)
      return
    }

    try {
      // Data dikirim ke API, bukan diproses di sini
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()

      if (res.ok) {
        setIsLoading(false)
        router.push("/login")
      } else {
        setError(data.message || "Registrasi gagal")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 bg-[#0f172a] text-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">
              Pantry<span className="text-blue-500">Vision.</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Daftarkan akun Anda untuk mengakses fitur pemindaian penuh.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm py-3 px-4 rounded-xl mb-4 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300">Username</label>
              <input
                type="text"
                placeholder="Masukkan username"
                required
                className="w-full mt-1 px-4 py-3 rounded-full bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                required
                className="w-full mt-1 px-4 py-3 rounded-full bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Masukkan password"
                required
                className="w-full mt-1 px-4 py-3 rounded-full bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <span>Sudah punya akun? </span>
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium underline-offset-4 hover:underline">
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
      
      {/* Visual Side */}
      <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-50 z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-12">
           <div className="w-20 h-20 bg-gray-900 rounded-[2rem] mb-10 flex items-center justify-center shadow-2xl">
            <div className="w-8 h-8 bg-blue-500 rounded-lg animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">
            Pantry<span className="text-blue-600">Vision.</span>
          </h1>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Mendeteksi kesegaran bahan makanan dengan Computer Vision.
          </p>
        </div>
      </div>
    </div>
  )
}
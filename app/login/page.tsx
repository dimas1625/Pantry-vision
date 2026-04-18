"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // LOGIN LOGIC
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(email, password);

    if (
      email === "mahasiswa123@gmail.com" &&
      password === "12345678"
    ) {
      alert("Login berhasil!");
      router.push("/dashboard");

    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="flex min-h-screen">
      
      {/* LEFT - LOGIN */}
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

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                required
                className="w-full mt-1 px-4 py-3 rounded-full bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full mt-1 px-4 py-3 rounded-full bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          {/* REGISTER OPTION */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <span>Belum punya akun? </span>
            <Link 
              href="/register" 
              className="text-blue-400 hover:text-blue-300 font-medium transition underline-offset-4 hover:underline"
            >
              Daftar Sekarang
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            © 2026 PantryVision.
          </p>
        </div>
      </div>

      {/* RIGHT - HOMEPAGE */}
      <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center">
        
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-50 z-0"></div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-900 rounded-[2rem] mb-10 flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-8 h-8 bg-blue-500 rounded-lg animate-pulse"></div>
        </div> 

          <h1 className="text-5xl font-bold">
            Pantry<span className="text-blue-600">Vision.</span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-md mx-auto">
            Mendeteksi kesegaran buah dengan Computer Vision. Dibangun dengan metodologi <span className="font-semibold">PULP</span>.untuk hasil prediksi yang presisi.
          </p>

          <div className="mt-6 flex gap-4 justify-center">
            <button className="bg-black text-white px-6 py-3 rounded-xl">
              Mulai Pemindaian
            </button>
            <button className="border px-6 py-3 rounded-xl">
              Dokumentasi
            </button>
          </div>

          <div className="flex justify-center gap-10 mt-10 text-sm text-gray-500">
            <div>
              <h2 className="text-xl font-bold text-black">98%</h2>
              Akurasi Model
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">0.5s</h2>
              Inference Time
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">2026</h2>
              Tech Stack
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
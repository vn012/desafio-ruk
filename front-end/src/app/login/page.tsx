'use client';

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Credentials } from "@/Dto/credentials";
import { signInAction } from "../actions/auth.acation";
export default function LoginPage() {
  const [form, setForm] = useState<Credentials>({ email: '', password: '' });

  async function handleSubmit(e: React.FormEvent) {
    console.log("passou por aqui")
    e.preventDefault();
    await signInAction(form.email, form.password);
    window.location.href = '/home';
  }

  return (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-3">
      {/* Lado esquerdo / centro */}
     <div className="relative hidden md:flex md:col-span-2 items-center justify-center bg-gradient-to-bl from-purple-400 via-purple-200 to-purple-400">
        
        {/* Efeito branco */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

      </div>

      {/* Lado direito */}
      <div className="flex items-center justify-center bg-white md:col-span-1">
        <div className="w-full max-w-md p-8">
            <div className="mb-3">
                Logo here22
            </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Nice to see you again
          </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Login */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                    Login
                    </label>
                    <input
                    type="text"
                    placeholder="Email or phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                    onChange={ (e) => setForm({ ...form, email: e.target.value }) }
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                    Password
                    </label>
                    <input
                    type="password"
                    placeholder="Enter password" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                    onChange={ (e) => setForm({ ...form, password: e.target.value }) }
                    
                    />
                </div>



                {/* {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )} */}



                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                    </label>

                    <a
                    href="/forgot-password"
                    className="text-blue-600 hover:underline"
                    >
                    Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition"
                >
                    Sign ins
                </button>

                {/* Sign up */}
                <p className="text-center text-sm text-gray-600 mt-11">
                    Don’t have an accousssnt?{' '}
                    <a
                    href="/signup"
                    className="text-blue-600 font-medium hover:underline"
                    >
                    Sign up now
                    </a>
                </p>
            </form>
        </div>
      </div>

    </div>
  );
}

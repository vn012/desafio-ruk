'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating user', form);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen">
      
      {/* Lado esquerdo */}
      <div className="hidden md:flex flex-1 bg-gradient-to-bl from-purple-600 via-purple-300 to-purple-600 relative">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
     
      </div>

      {/* Formulário */}
      <div className="flex items-center justify-center bg-white w-full md:w-1/3 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            New User
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 rounded-lg bg-purple-600 py-2 text-white font-medium hover:bg-purple-700 transition"
            >
              Create User
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/login')}
              className="text-purple-600 hover:underline text-sm"
            >
              &larr; Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

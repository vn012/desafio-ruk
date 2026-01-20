'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FaEye, FaCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const allUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Carol Lee', email: 'carol@example.com' },
    { id: 4, name: 'David Brown', email: 'david@example.com' },
    { id: 5, name: 'Eva White', email: 'eva@example.com' },
    { id: 6, name: 'Frank Green', email: 'frank@example.com' },
    { id: 7, name: 'Grace Black', email: 'grace@example.com' },
    { id: 8, name: 'Henry King', email: 'henry@example.com' },
    { id: 9, name: 'Ivy Adams', email: 'ivy@example.com' },
    { id: 10, name: 'Jack Wilson', email: 'jack@example.com' },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(allUsers);
      setLoading(false);
    }, 500);
  }, []);

  // Filtra usuários
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleUserClick(user: User) {
    router.push(`/dashboard/users/${user.id}`);
  }

  // Fecha dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
<div className="relative min-h-screen bg-gradient-to-bl from-purple-300 via-purple-100 to-purple-300 p-6">
  {/* Overlay com blur */}
  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm pointer-events-none" />
  
  {/* Conteúdo da página */}
  <div className="relative z-10 max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-6 relative">
      <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          
          {/* Icon dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              <FaCog size={20} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  // onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-600"
        />

        {/* Users list */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <ul className="space-y-2">
            {filteredUsers.map(user => (
              <li
                key={user.id}
                onClick={() => handleUserClick(user)}
                className="cursor-pointer p-4 bg-purple-50 rounded flex justify-between items-center hover:bg-purple-100 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <FaEye className="text-purple-600" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

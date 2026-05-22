'use client'

import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

interface HeaderProps {
  user: { name: string; email: string; image?: string | null }
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/login')
  }

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <User size={14} className="text-indigo-700" />
          </div>
          <span className="text-sm font-medium text-gray-700">{user.name}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}

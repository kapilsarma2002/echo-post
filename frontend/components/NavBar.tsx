'use client'

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const NavBar = () => {

  const router = useRouter()

    return (
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">Echopost</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => router.push('/sign-in')}>Log in</Button>
          <Button onClick={() => router.push('/sign-up')}>Sign up free</Button>
        </div>
      </nav>
    )
}
'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/Hero';
import { SocialMedia } from '@/components/SocialMedia';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { useRouter } from "next/navigation";

const Index = () => {

  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <Hero />

      {/* Social Media Integration Section */}
      <SocialMedia />

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action */}
      <section className="bg-indigo-600 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to transform your social media strategy?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of content creators, influencers, and brands who use Echopost to grow their social media presence.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100" onClick={() => router.push('/sign-up')}>
            Get started for free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-indigo-200 mt-4 text-sm">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

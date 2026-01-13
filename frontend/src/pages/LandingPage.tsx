// frontend/src/pages/LandingPage.tsx
import { useState } from "react";
import { Zap, ShieldCheck, Smartphone } from "lucide-react";
import AuthModal from "../components/AuthModal";
import FeatureCard from "../components/FeatureCard";

// A simple, abstract SVG to add visual interest
function HeroGraphic() {
  return (
    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-20 -right-20 opacity-10">
      <g clipPath="url(#clip0_105_2)">
        <path d="M200 0L243.301 86.6025L329.904 123.205L329.904 219.808L243.301 256.41L200 343.013L156.699 256.41L70.0962 219.808L70.0962 123.205L156.699 86.6025L200 0Z" fill="url(#paint0_linear_105_2)"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_105_2" x1="200" y1="0" x2="200" y2="343.013" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb"/>
          <stop offset="1" stopColor="#1d4ed8"/>
        </linearGradient>
        <clipPath id="clip0_105_2">
          <rect width="400" height="400" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-neutral-800">TaskFlow</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary-hover shadow-sm"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-primary to-blue-800 text-white text-center py-20 md:py-32 overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Clarity in Chaos.
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100">
              The simple, visual, and highly effective way to manage your tasks and achieve your goals.
            </p>
          </div>
          <HeroGraphic />
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-neutral-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-neutral-800">Why TaskFlow?</h3>
              <p className="text-neutral-600 mt-2">Everything you need to stay organized and productive.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap size={28} />}
                title="Fast & Intuitive"
                description="A clean, simple interface with drag-and-drop functionality that just works."
              />
              <FeatureCard
                icon={<ShieldCheck size={28} />}
                title="Secure & Private"
                description="Your data is yours alone. With secure authentication, your tasks are always protected."
              />
              <FeatureCard
                icon={<Smartphone size={28} />}
                title="Works Everywhere"
                description="A fully responsive design means you can manage your tasks on desktop, tablet, or mobile."
              />
            </div>
          </div>
        </section>
      </main>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
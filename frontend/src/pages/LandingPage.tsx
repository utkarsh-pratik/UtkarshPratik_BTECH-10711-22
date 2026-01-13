// frontend/src/pages/LandingPage.tsx
import { useState } from "react";
import { Zap, ShieldCheck, LayoutGrid } from "lucide-react";
import AuthModal from "../components/AuthModal";
import Button from "../components/ui/Button";
import FeatureCard from "../components/FeatureCard";

// A decorative background element
function BackgroundBlobs() {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10"
      aria-hidden="true"
    >
      <div className="absolute top-[-20rem] left-[-20rem] w-[40rem] h-[40rem] bg-primary-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-[-15rem] right-[-15rem] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full filter blur-3xl"></div>
    </div>
  );
}

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
      <BackgroundBlobs />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">TaskFlow</h1>
          <Button onClick={() => setIsModalOpen(true)}>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative text-center py-24 md:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-neutral-800 dark:text-neutral-50 tracking-tight mb-6">
              Organize Your Life,
              <br />
              <span className="text-primary-500">One Task at a Time.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-10">
              TaskFlow is the simple, beautiful, and powerful way to manage your
              personal projects and daily to-dos.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setIsModalOpen(true)} className="px-8 py-4">
                Start for Free
              </Button>
              <Button
                variant="secondary"
                className="px-8 py-4"
                onClick={handleScrollToFeatures} // <-- Add this handler
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-neutral-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                A Better Workflow is Waiting
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
                All the features you need to go from cluttered to clear, without
                the clutter.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<LayoutGrid size={28} />}
                title="Visual Kanban Board"
                description="Easily track your progress with a clear, drag-and-drop interface."
              />
              <FeatureCard
                icon={<Zap size={28} />}
                title="Fast & Responsive"
                description="Built with a modern tech stack for a snappy, seamless experience on any device."
              />
              <FeatureCard
                icon={<ShieldCheck size={28} />}
                title="Secure by Design"
                description="Your data is protected with secure authentication and user-specific access."
              />
            </div>
          </div>
        </section>
      </main>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

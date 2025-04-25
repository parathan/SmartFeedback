import MathQuiz from '@/components/MathQuiz';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            Smart Feedback
          </h1>
          <p className="text-xl text-white/90">
            Interactive Mathematics Learning
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <MathQuiz />
        </div>
      </div>
    </main>
  );
}

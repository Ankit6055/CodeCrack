import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Loader, Rocket, Trophy, BarChart2, Users, CheckCircle, ArrowRight, ArrowDown, Code } from "lucide-react";
import ProblemTable from "../components/ProblemTable";

// DSA concepts that will float in the background
const concepts = [
  { text: "Arrays", delay: "0s" },
  { text: "LinkedList", delay: "2s" },
  { text: "Trees", delay: "4s" },
  { text: "Graphs", delay: "6s" },
  { text: "DP", delay: "8s" },
  { text: "Backtracking", delay: "10s" },
  { text: "Sorting", delay: "12s" },
  { text: "Searching", delay: "14s" },
  { text: "Stacks", delay: "16s" },
  { text: "Queues", delay: "18s" },
  { text: "Heaps", delay: "20s" },
  { text: "Hashing", delay: "22s" },
];

const FloatingConcepts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none w-full">
      {concepts.map((concept, index) => {
        // Determine if concept should be on left or right side
        const isLeftSide = index % 2 === 0;
        
        return (
          <div
            key={concept.text}
            className="absolute text-sm font-medium text-gray-400/30 animate-pulse"
            style={{
              // Place elements only on left (0-20%) or right (80-100%) side
              left: isLeftSide ? `${Math.random() * 15 + 5}%` : `${Math.random() * 15 + 80}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: concept.delay,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            {concept.text}
          </div>
        );
      })}
    </div>
  );
};

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if(isProblemsLoading){
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] overflow-hidden">
        <Loader className="size-10 animate-spin text-orange-500"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden w-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center w-full">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-5 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-5 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        
        <FloatingConcepts />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-orange-500/10 px-4 py-2 rounded-full mb-6">
              <Rocket className="h-5 w-5 text-orange-400 mr-2" />
              <span className="text-sm font-medium text-orange-400">NEW: Interview Crash Course</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Advance Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">DSA Mastery</span>
            </h1>
            
            <div className="flex items-center justify-center mb-8">
              <span className="text-xl md:text-2xl text-gray-300">Join the</span>
              <span className="mx-3 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 font-semibold">
                Top 1%
              </span>
              <span className="text-xl md:text-2xl text-gray-300">Today</span>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Master the skills that set you apart in technical interviews with our curated DSA resources and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2 group">
                Start for Free
                <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </button>
              <button className="bg-white/10 hover:bg-orange-500/10 border border-orange-500/30 text-orange-400 font-medium py-3 px-8 rounded-lg transition-all flex items-center gap-2">
                Explore Plus
                <Trophy className="h-5 w-5 text-orange-400" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      {/* Problems Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="absolute -top-10 left-5 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-5 w-60 h-60 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="mb-12 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Curated DSA Problems</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Practice with our hand-picked collection of interview questions from top tech companies.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md border border-orange-500/10 rounded-xl overflow-hidden shadow-lg shadow-orange-500/5 relative z-10 w-full">
          {problems.length > 0 ? (
            <div className="w-full overflow-x-hidden">
              <ProblemTable problems={problems}/>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 mb-4">
                <Code className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No problems found</h3>
              <p className="text-gray-400">We're currently updating our problem database. Check back soon!</p>
            </div>
          )}
        </div>
      </div>

      <FloatingConcepts />
    </div>
  );
};

export default HomePage;
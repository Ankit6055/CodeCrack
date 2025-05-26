import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  ChevronRight,
  ShieldCheck,
  Github,
  Terminal
} from "lucide-react";

import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";

const SignUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name must be at least 3 characters")
})

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigninUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema)
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("signup data", data);
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#121212] text-white flex flex-col justify-center items-center relative overflow-hidden">
      <div className="w-full max-w-md mx-auto px-4 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-10">
          <h2 className="text-3xl font-bold mb-1 text-center">Join DevClash</h2>
          <p className="text-gray-400 text-center">Create your account to get started</p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full bg-[#242424] border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full bg-[#242424] border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full bg-[#242424] border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } rounded-lg py-2.5 pl-10 pr-10 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1A1A1A] transition-all cursor-pointer disabled:cursor-not-allowed"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>Sign up</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Secure Signup</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Github className="h-3.5 w-3.5" /> 
            <span>Open Source</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Terminal className="h-3.5 w-3.5" />
            <span>Developer Focused</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
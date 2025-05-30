"use client";

import axios from 'axios';

import React from 'react';
import Link from 'next/link';

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';

export default function LoginForm() {
  const { login }  =useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password, redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <section className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 rounded-lg overflow-hidden shadow-xl">
          <div className="relative py-10 bg-background flex items-center justify-center">
            <div className="mx-auto w-full max-w-sm flex flex-col justify-center gap-4 p-6">
              <div className="mb-6 flex flex-col items-center text-center">
                <Link href="/" className={cn("flex items-center gap-2 cursor-pointer")}>
                  <img src="/next.svg" alt="Next.js Logo" title="My Next.js App" className="max-h-12" />
                  {/* <h2 className="text-lg font-semibold">My Next.js App</h2> */}
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">ID</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter your ID"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                       <Label htmlFor="remember" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember me
                       </Label>
                    </div>
                    <Link href="#" className={cn("text-sm font-medium text-primary cursor-pointer")}>
                      Forgot password
                    </Link>
                  </div>
                  <Button type="submit" className="w-full mt-2">
                    Login
                  </Button>
                </div>
              </form>

              <div className="mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>계정이 없으신가요?</p>
                <Link href="/signup" className={cn("font-medium text-primary cursor-pointer")}>
                  가입하기
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-gray-950 flex items-center justify-center">
            <img src="/vercel.svg" alt="vercel Logo" title="vercel Logo" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>
    </div>
  );
}

"use client"
import React from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";


const AuthBtns = () => {
  const { userId } = useAuth();

  return (
    <div className="max-sm:w-full">
      
      {userId ? (
        <Link href={"/my-notes"}>
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Access To The App
            </div>
          </button>
        </Link>
      ) : (
        <div className="flex gap-2 max-sm:flex-col max-sm:w-[60%] max-sm:mt-8">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <Link href={"/sign-up"}>Sign Up</Link>
            </div>
          </button>

          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white bg-transparent">
              <Link href={"/sign-in"}>Sign In</Link>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthBtns;

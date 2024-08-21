"use client";
import React from "react";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const AuthBtns = () => {
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="max-sm:w-full">
      {isAuthenticated ? (
        <Link href={"/my-notes"}>
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Dashboard
            </div>
          </button>
        </Link>
      ) : (
        <div className="flex gap-2 max-sm:flex-col max-sm:w-[60%] max-sm:mt-8">
          <SignInButton mode="modal">
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                {/* <Link href={"/sign-up"}>Sign Up</Link> */}
                Sign In
              </div>
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white bg-transparent">
                {/* <Link href={"/sign-in"}>Sign In</Link> */}
                Sign Up
              </div>
            </button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
};

export default AuthBtns;

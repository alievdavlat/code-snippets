import React from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";

const words = [
  {
    text:"Organize"
  },
  {
    text:"Your"
  },
  {
    text:"Code"
  },
  {
    text:"Snippets"
  },
  {
    text:"Efficiently"
  }
]

const CtaSection = () => {
  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6">
      <h2 className="font-bold text-2xl text-center">

      <TypewriterEffect words={words} />
        {/* Organize Your Code Snippets
          {' '}
        <span className="text-primary">Efficiently!</span> */}
      </h2>

      <p className="text-center text-sm w-[450px] max-sm:w-full text-slate-500">
        With our advanced tagging and search features, you can quickly find the
        snippet you need, right when you need it, Spend less time searching for
        code and more time writing it.
      </p>

      <button
      className="block px-9 py-3 text-sm font-medium text-white transition focus:outline-none"
      type="button"
      >
        {`Let's get started!`}
      </button>
    </div>
  );
};

export default CtaSection;

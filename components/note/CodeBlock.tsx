import React from 'react'
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
  atomDark,
  oneDark,
  nightOwl,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface codeblocksProps {
  language: string;
  code:string
}

const CodeBlocks: React.FC<codeblocksProps> = ({ language, code }) => {
  const { theme } = useTheme();

  return (
    <div className="rounded-md overflow-auto text-sm mt-2 h-[300px] w-full">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={theme === "light" ? materialLight : oneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};



export default CodeBlocks
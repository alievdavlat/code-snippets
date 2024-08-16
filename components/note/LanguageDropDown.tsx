"use client";
import React, {  useState } from "react";

import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiCsharp,
  SiPhp,
  SiRuby,
  SiTypescript,
  SiSwift,
  SiKotlin,
  SiGo,
  SiRust,
  SiScala,
  SiPerl,
  SiHaskell,
  SiLua,
  SiR,
  SiDart,
  SiElixir,
  SiFsharp,
  SiClojure,
  SiErlang,
  SiShell,
  SiHtml5,
  SiCss3,
  SiPowershell,
  SiAssemblyscript,
  SiV,
  SiFortran,
  SiJulia,
  SiCrystal,
  SiElm,
  SiVisualstudio,
  SiDelphi,
  SiRacket,
  SiOcaml,
  SiNim,
  SiD,
  SiZig,
  SiPostgresql,
  SiScratch,
  SiLabview,
  SiVala,
  SiRing,
  SiSqlite,
} from "react-icons/si";

import { Control, Controller } from "react-hook-form";
import useQueryParams from "@/hooks/useQueryParams";



const programmingLanguages = [
  {
    id: 1,
    name: "Python",
    icon: <SiPython className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 2,
    name: "JavaScript",
    icon: <SiJavascript className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 3,
    name: "C++",
    icon: <SiCplusplus className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 4,
    name: "C#",
    icon: <SiCsharp className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 5,
    name: "PHP",
    icon: <SiPhp className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 6,
    name: "Ruby",
    icon: <SiRuby className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 7,
    name: "TypeScript",
    icon: <SiTypescript className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 8,
    name: "Swift",
    icon: <SiSwift className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 9,
    name: "Kotlin",
    icon: <SiKotlin className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 10,
    name: "Go",
    icon: <SiGo className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 11,
    name: "Rust",
    icon: <SiRust className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 12,
    name: "Scala",
    icon: <SiScala className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 13,
    name: "Perl",
    icon: <SiPerl className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 14,
    name: "Haskell",
    icon: <SiHaskell className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 15,
    name: "Lua",
    icon: <SiLua className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 16,
    name: "R",
    icon: <SiR className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 17,
    name: "Dart",
    icon: <SiDart className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 18,
    name: "Elixir",
    icon: <SiElixir className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 19,
    name: "F#",
    icon: <SiFsharp className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 20,
    name: "Clojure",
    icon: <SiClojure className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 21,
    name: "Erlang",
    icon: <SiErlang className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 22,
    name: "Shell",
    icon: <SiShell className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 23,
    name: "HTML",
    icon: <SiHtml5 className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 24,
    name: "CSS",
    icon: <SiCss3 className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 25,
    name: "PowerShell",
    icon: <SiPowershell className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 26,
    name: "Assembly",
    icon: (
      <SiAssemblyscript className="mb-[2px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 27,
    name: "V",
    icon: <SiV className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 28,
    name: "Fortran",
    icon: <SiFortran className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 29,
    name: "Julia",
    icon: <SiJulia className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 30,
    name: "Crystal",
    icon: <SiCrystal className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 31,
    name: "Elm",
    icon: <SiElm className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 32,
    name: "Visual Studio",
    icon: (
      <SiVisualstudio className="mb-[2px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 33,
    name: "Delphi",
    icon: <SiDelphi className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 34,
    name: "Racket",
    icon: <SiRacket className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 35,
    name: "OCaml",
    icon: <SiOcaml className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 36,
    name: "Nim",
    icon: <SiNim className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 37,
    name: "D",
    icon: <SiD className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 38,
    name: "Zig",
    icon: <SiZig className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 39,
    name: "PostgreSQL",
    icon: <SiPostgresql className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 40,
    name: "Scratch",
    icon: <SiScratch className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 41,
    name: "LabVIEW",
    icon: <SiLabview className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 42,
    name: "Vala",
    icon: <SiVala className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 43,
    name: "Ring",
    icon: <SiRing className="mb-[2px] dark:text-white text-slate-400" />,
  },
  {
    id: 44,
    name: "SQLite",
    icon: <SiSqlite className="mb-[2px] dark:text-white text-slate-400" />,
  },
];

interface LanguageDropDownProps {
  name: string;
  control: Control;
  placeholder: string;
}
const LanguageDropDown = ({ control, name, placeholder }: LanguageDropDownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const query = useQueryParams()
  const filteredLanguages = programmingLanguages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative w-full">
          <div
            className="border border-slate-400 hover:border-primary active:border-primary rounded-lg p-2 bg-white dark:bg-secondary cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <input
              type="text"
              className="w-full p-2 bg-transparent border-none outline-none dark:text-white text-slate-400"
              placeholder={placeholder}
              value={query.has('id') ? field.value : searchTerm}
              onChange={(e) => {
                field.onChange(e.target.value)
                setSearchTerm(e.target.value)
                }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              // {...field}
            />
          </div>
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-lg shadow-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-secondary max-h-60 overflow-auto">
              {filteredLanguages.length === 0 ? (
                <div className="p-2 dark:text-white text-slate-400">
                  No results found
                </div>
              ) : (
                filteredLanguages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex items-center p-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                    onClick={() => {
                      field.onChange(lang.name);
                      setSearchTerm(lang.name);
                      setIsOpen(false);
                    }}
                  >
                    {lang.icon}
                    <span className="ml-2 dark:text-white text-slate-400">
                      {lang.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default LanguageDropDown;

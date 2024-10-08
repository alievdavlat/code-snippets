"use client";
import React, { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import useQueryParams from "@/hooks/useQueryParams";
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

import {  DeleteForeverRounded, DeleteRounded } from "@mui/icons-material";
import { EditOutlined, FavoriteBorderOutlined } from "@mui/icons-material";

import CodeBlocks from "./CodeBlock";
import moment from "moment";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Id } from "@/convex/_generated/dataModel";
import { GlobalFilter } from "@/context/TableFilterContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


interface NoteItemProps {
  _id: Id<"snippets">;
  _creationTime: number;
  isFavorite?: boolean | undefined;
  isTrash?: boolean | undefined;
  tags: string[];
  clerkUserId: string;
  title: string;
  description: string;
  code: string;
  language: string;
  libery: string;
  deleteWork?: boolean;
}

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

const NoteItem = ({
  _creationTime,
  _id,
  clerkUserId,
  code,
  description,
  language,
  libery,
  tags,
  title,
  isFavorite,
  isTrash,
  deleteWork,
}: NoteItemProps) => {
  const { toggle, isOpen } = useContext<any>(ModalContext);
  const query = useQueryParams();
  const [isLiked, setIsLiked] = React.useState(false);
  const [trash, setIsTrash] = React.useState(false);
  const { setSingleSnippetId } = useContext<any>(GlobalFilter);

  const setIsFavorite = useMutation(api.snippets.setFavorite);
  const setTrash = useMutation(api.snippets.setTrash);
  const deletSnippet = useMutation(api.snippets.deleteSnippt);


  const onDelete = (id:Id<"snippets">) => {
    deletSnippet({
      id:id
    })
  }

  const onSetTrash = (id: Id<"snippets">) => {
    setIsTrash(!isLiked);
    setTrash({
      id,
      isTrash: trash,
    });
  };


  const onSetLike = (id: Id<"snippets">) => {
    setIsLiked(!isLiked);
    setIsFavorite({
      id,
      isFavirite: isLiked,
    });
  };

  const handleOpen = (id: any) => {
    setSingleSnippetId(id);
    query.set("id", id);
    toggle();
  };

  return (
    <div className="z-10 cursor-pointer">
      <div
        className={`dark:bg-slate-800 bg-secondary border border-slate-400 dark:text-white text-slate-500 max-sm:w-full  rounded-md py-4 ${
          isOpen ? "w-full" : "w-[380px]"
        }`}>
        {/* header */}
        <div className="flex justify-between items-center mx-4 gap-2">
          <span className="font-bold text-lg">{title}</span>
          {isFavorite ? (
            <HeartFilledIcon
              fontSize={"2.5rem"}
              onClick={() => onSetLike(_id)}
              className="text-red-500 cursor-pointer z-10 h-[25px] w-[25px]"
            />
          ) : (
            <FavoriteBorderOutlined
              onClick={() => onSetLike(_id)}
              className="text-slate-500 cursor-pointer z-10"
            />
          )}
        </div>

        {/* Date */}
        <div className="text-slate-500 text-[16px] flex gap-1 mt-1 font-light mx-4">
          <span>{moment(_creationTime).format("lll")}</span>
        </div>

        {/* tags */}
        <div className="text-slate-400 text-[15px] mx-4  flex gap-1 mt-4 overflow-x-auto">
          {tags.map((tag) => (
            <span
              className="border border-slate-500 p-1 rounded-md px-2"
              key={tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* code  */}
        <div className="w-full" onClick={() => handleOpen(_id)}>
          <CodeBlocks language={language || "Javascript"} code={code || ""} />
        </div>
        {/* descr  */}
        <div className="dark:text-slate-300 text-slate-600 text-[13px] mt-4 mx-4 overflow-y-scroll">
          {description}
        </div>

        {/* footer */}

        <div className="flex justify-between text-[13px] dark:text-slate-400 text-slate-600 mx-4 mt-3">
          <div className="flex gap-1">
            {
              programmingLanguages.find(
                (language: any) => language.name === language
              )?.icon
            }
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-4">
            <EditOutlined
              sx={{ fontSize: 17 }}
              className="cursor-pointer"
              onClick={() => handleOpen(_id)}
            />
            
            {deleteWork ? (
              <DeleteForeverRounded  className="cursor-pointer" onClick={() => onDelete(_id)} />
            ) : (
              <DeleteRounded sx={{ fontSize: 17 }} className="cursor-pointer" onClick={() => onSetTrash(_id)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

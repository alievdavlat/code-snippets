"use client";
import React from "react";
import { Drawer } from "@mui/material";
import Logo from "./ui/Logo";
import Link from "next/link";
import { HeartIcon, TrashIcon, ViewGridIcon } from "@radix-ui/react-icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname } from "next/navigation";
import ErrorData from "./ErrorData";
import Loader from "./loader";
import GetContainer from "./get-container";
import { SignOutButton, useUser } from "@clerk/nextjs";
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

interface drowerProps {
  open?: boolean;
  onClose?: () => void;
}
interface ISidebarItemProps {
  title: string;
  link: string;
  icon: any;
  index: number;
  id: number;
}

const lang = [
  {
    id: 1,
    name: "Python",
    icon: <SiPython className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 2,
    name: "JavaScript",
    icon: (
      <SiJavascript className="text-[15px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 3,
    name: "C++",
    icon: (
      <SiCplusplus className="text-[15px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 4,
    name: "C#",
    icon: <SiCsharp className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 5,
    name: "PHP",
    icon: <SiPhp className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 6,
    name: "Ruby",
    icon: <SiRuby className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 7,
    name: "TypeScript",
    icon: (
      <SiTypescript className="text-[15px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 8,
    name: "Swift",
    icon: <SiSwift className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 9,
    name: "Kotlin",
    icon: <SiKotlin className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 10,
    name: "Go",
    icon: <SiGo className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 11,
    name: "Rust",
    icon: <SiRust className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 12,
    name: "Scala",
    icon: <SiScala className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 13,
    name: "Perl",
    icon: <SiPerl className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 14,
    name: "Haskell",
    icon: <SiHaskell className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 15,
    name: "Lua",
    icon: <SiLua className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 16,
    name: "R",
    icon: <SiR className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 17,
    name: "Dart",
    icon: <SiDart className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 18,
    name: "Elixir",
    icon: <SiElixir className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 19,
    name: "F#",
    icon: <SiFsharp className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 20,
    name: "Clojure",
    icon: <SiClojure className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 21,
    name: "Erlang",
    icon: <SiErlang className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 22,
    name: "Shell",
    icon: <SiShell className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 23,
    name: "HTML",
    icon: <SiHtml5 className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 24,
    name: "CSS",
    icon: <SiCss3 className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 25,
    name: "PowerShell",
    icon: (
      <SiPowershell className="text-[15px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 26,
    name: "Assembly",
    icon: (
      <SiAssemblyscript className="text-[15px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 27,
    name: "V",
    icon: <SiV className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 28,
    name: "Fortran",
    icon: <SiFortran className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 29,
    name: "Julia",
    icon: <SiJulia className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 30,
    name: "Crystal",
    icon: <SiCrystal className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 31,
    name: "Elm",
    icon: <SiElm className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 32,
    name: "Visual Studio",
    icon: (
      <SiVisualstudio className="text-[15px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 33,
    name: "Delphi",
    icon: <SiDelphi className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 34,
    name: "Racket",
    icon: <SiRacket className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 35,
    name: "OCaml",
    icon: <SiOcaml className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 36,
    name: "Nim",
    icon: <SiNim className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 37,
    name: "D",
    icon: <SiD className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 38,
    name: "Zig",
    icon: <SiZig className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 39,
    name: "PostgreSQL",
    icon: (
      <SiPostgresql className="text-[15px] dark:text-white text-slate-400" />
    ),
  },
  {
    id: 40,
    name: "Scratch",
    icon: <SiScratch className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 41,
    name: "LabVIEW",
    icon: <SiLabview className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 42,
    name: "Vala",
    icon: <SiVala className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 43,
    name: "Ring",
    icon: <SiRing className="text-[15px] dark:text-white text-slate-400" />,
  },
  {
    id: 44,
    name: "SQLite",
    icon: <SiSqlite className="text-[15px] dark:text-white text-slate-400" />,
  },
];

const SidebarItems = ({ title, link, icon, index, id }: ISidebarItemProps) => {
  const p = usePathname();
  return (
    <li
    className={`group ${
      link === p ? "bg-primary" : "hover:bg-primary"
    }`}>
    <Link
      href={link}
      className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
        link === p
          ? "text-white"
          : "dark:text-slate-400 text-slate-700 group-hover:text-white"
      }`}>
      <span
        className={`inline-flex items-center justify-center h-12 w-12 text-lg ${
          link === p
            ? "text-white"
            : "dark:text-slate-400 text-slate-700 group-hover:text-white"
        }`}>
        {icon}
      </span>
      <span className="text-md font-medium">{title}</span>
    </Link>
  </li>
  );
};

const LanguageItems = () => {
  const { user } = useUser();
  return (
    <>
      {user?.id && (
        <GetContainer
          url={"/languages"}
          hideLoading
          params={{
            clerkId: user?.id,
          }}>
          {({ data, isError, isLoading, refetch }) => {
            console.log(data?.data);

            if (isLoading) {
              return <Loader />;
            }

            if (isError) {
              return <ErrorData />;
            }

            if (data?.data?.length <= 0) {
              return <h2></h2>;
            }

            return (
              <div className="mt-12 text-sm px-3">
                <div className="font-bold dark:text-slate-400 text-slate-700">
                  Languages
                </div>

                <div className="mt-5 ml-2 dark:text-slate-400 text-slate-700 flex flex-col gap-4">
                  {data?.data.map((item: any) => (
                    <div className="flex justify-between" key={item?.name}>
                      <div className="flex gap-1 items-center">
                        {lang.map((l: any) =>
                          l?.name === item?.name ? l?.icon : ""
                        )}{" "}
                        {"  "}
                        {item?.name}
                      </div>
                      <span className="font-bold">{item?.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        </GetContainer>
      )}
    </>
  );
};
const MobileSidebar = ({ onClose, open }: drowerProps) => {
  const [active, setActive] = React.useState(0);
  const links = [
    {
      id: 1,
      title: "All Snippets",
      icon: <ViewGridIcon fontSize={2} />,
      link: "/my-notes",
    },
    {
      id: 1,
      title: "Favorites",
      icon: <HeartIcon fontSize={2} />,
      link: "/favorites",
    },
    {
      id: 1,
      title: "Trash",
      icon: <TrashIcon fontSize={2} />,
      link: "/trash",
    },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "85%", sm: "85%", md: "40%" },
        },
        p: "10px",
      }}
      ModalProps={{ keepMounted: false, disableEnforceFocus: true }}>
      <div className="flex flex-col z-50  w-full  overflow-hidden bg-transparent h-[100vh]">
        <div className="flex items-center justify-center p-4 mb-20">
          <Logo />
        </div>

        <ul className="flex flex-col py-4 gap-3">
          {links.map((item, index) => (
            <div key={item.id} onClick={() => setActive(index)}>
              <SidebarItems
                title={item.title}
                link={item.link}
                icon={item.icon}
                id={active}
                index={index}
              />
            </div>
          ))}
        </ul>

        <div className="flex justify-between flex-col h-full pb-10">
          <LanguageItems />

          <SignOutButton>
            <div className="flex items-center dark:text-white text-slate-500 mt-10 px-3 gap-2 cursor-pointer">
              <LogoutIcon sx={{ fontSize: "1.6rem" }} />
              <span>Log Out</span>
            </div>
          </SignOutButton>
        </div>
      </div>
    </Drawer>
  );
};

export default MobileSidebar;

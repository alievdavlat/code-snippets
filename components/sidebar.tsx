"use client"
import React from "react";
import Logo from "./ui/Logo";
import Link from "next/link";
import { HeartIcon, TrashIcon, ViewGridIcon } from "@radix-ui/react-icons";
import { SiJavascript, SiPython, SiCplusplus } from "react-icons/si";
import LogoutIcon from '@mui/icons-material/Logout';
interface ISidebarItemProps {
  title: string;
  link: string;
  icon: any;
  index: number;
  id: number;
}

const SidebarItems = ({ title, link, icon, index, id }: ISidebarItemProps) => {
  return (
    <li
      className={`group ${index === id ? "bg-primary" : "hover:bg-primary"}  `}>
      <Link
        href={link}
        className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${
          index === id ? "text-white " : "dark:text-slate-400 text-slate-700 group-hover:text-white"
        }`}>
        <span
          className={`inline-flex items-center justify-center h-12 w-12 text-lg ${
            index === id ? "text-white" : "dark:text-slate-400 text-slate-700 group-hover:text-white"
          }`}>
          {icon}
        </span>
        <span className="text-md font-medium">{title}</span>
      </Link>
    </li>
  );
};

const LanguageItems = () => {
  return (
    <div className="mt-12 text-sm px-3">
      <div className="font-bold dark:text-slate-400 text-slate-700">Languages</div>

      <div className="mt-5 ml-2 dark:text-slate-400 text-slate-700 flex flex-col gap-4">
        
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <SiJavascript size={15} /> JavaScript
          </div>
          <span className="font-bold">3</span>
        </div>

        <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <SiPython size={15}/> Python
            </div>
            <span className="font-bold">10</span>
          </div>


          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <SiCplusplus size={15}/> C++
            </div>
            <span className="font-bold">2</span>
          </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [active, setActive] = React.useState(0);
  const links = [
    {
      id: 1,
      title: "All Snippets",
      icon: <ViewGridIcon fontSize={2} />,
      link: "/",
    },
    {
      id: 1,
      title: "Favorites",
      icon: <HeartIcon fontSize={2} />,
      link: "/",
    },
    {
      id: 1,
      title: "Trash",
      icon: <TrashIcon fontSize={2} />,
      link: "/",
    },
  ];

  return (
    <div className="flex flex-col w-[15%]  rounded-r-3xl overflow-hidden bg-secondary border  h-[vh] max-md:hidden">
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
        <LanguageItems/>  


          <div className="flex items-center mt-10 px-3 gap-2 cursor-pointer">
          <LogoutIcon sx={{fontSize:'1.6rem'}}/>
          <span>
            Log Out
          </span>
          </div>
        </div>



    </div>
  );
};

export default Sidebar;

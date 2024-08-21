"use client";
import { UserButton, useUser } from "@clerk/clerk-react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { ModeToggle } from "./ui/mode-btn";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Button } from "./ui/button";
import { ModalContext } from "@/context/ModalContext";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface topbarProps {
  openSidebar: boolean;
  setopenSidebar: Dispatch<SetStateAction<boolean>>;
}

const Searchbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <input
          placeholder="search a snippet..."
          className="w-full outline-none text-sm  dark:text-slate-200 text-slate-400 bg-transparent"
          type="text"
        />
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                  <CommandItem
                    value={''}
                    onSelect={(value) => {}}
                    >
                      hh
                  </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const TopBar = ({ openSidebar, setopenSidebar }: topbarProps) => {
  const { user } = useUser();
  const { toggle } = useContext<any>(ModalContext);

  return (
    <>
      <div className="rounded-lg flex justify-between items-center border bg-secondary p-4 z-10">
        {/* searchbar */}

        <div className="relative pl-3 w-[60%] h-[38px] dark:bg-slate-700 bg-slate-200 rounded-3xl flex items-center gap-2">
          <IoMdSearch
            className="dark:text-white text-slate-500"
            size={"1.2rem"}
          />
          <Searchbar />

          <div
            onClick={toggle}
            className="absolute flex gap-2 px-3 rounded-3xl bg-primary p-1 text-[13px] text-white top-[5px] right-[6px] items-center cursor-pointer select-none">
            <div className="font-bold">
              <GoPlus size={"1.2rem"} />
            </div>
            <div className="max-md:hidden block">Snippet</div>
          </div>
        </div>

        {/* left side */}
        <div className="flex items-center justify-between gap-2">
          <ModeToggle />

          {/* user button */}
          {user ? (
            <div className="flex gap-3 items-center">
              <UserButton />
              <div className="flex flex-col text-sm max-md:hidden">
                <span className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-slate-500 text-[15px]">
                  {user?.emailAddresses[0].emailAddress}
                </span>
              </div>
            </div>
          ) : null}

          {/* mobile menu */}

          <Button variant={"ghost"}>
            {!openSidebar ? (
              <IoMdMenu
                size={"1.7rem"}
                className="dark:text-white text-slate-500 cursor-pointer hidden max-[1100px]:block max-md:block"
                onClick={() => setopenSidebar(true)}
              />
            ) : (
              <IoMdClose
                size={"1.7rem"}
                className="dark:text-white text-slate-500 cursor-pointer hidden max-[1100px]:block max-md:block"
                onClick={() => setopenSidebar(false)}
              />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TopBar;

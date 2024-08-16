import { CodeIcon } from "@radix-ui/react-icons";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { AddOutlined } from "@mui/icons-material";
import { ModalContext } from "@/context/ModalContext";

const NoSnippet = () => {
  const { toggle } = useContext<any>(ModalContext);

  return (
    <div className="pt-20 flex flex-col px-10 items-center justify-center h-full">
      <CodeIcon
        className="mb-10 dark:text-slate-400 text-slate-500 h-[100px] w-[100px]"
        fontSize={"5rem"}
      />

      <p className="mb-8 text-sm font-semibold dark:text-slate-400 text-slate-500">
        It looks like there are no snippets
      </p>

      <Button variant={'outline'} className="p-2 cursor-pointer z-50" onClick={toggle}>
      <AddOutlined sx={{ fontSize: 18 }} /> Create Snippet
      </Button>
    </div>
  );
};

export default NoSnippet;

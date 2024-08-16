import { CodeIcon } from "@radix-ui/react-icons";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { AddOutlined } from "@mui/icons-material";

const NoData = () => {

  return (
    <div className="pt-20 flex flex-col px-10 items-center justify-center h-full">
      <CodeIcon
        className="mb-10 dark:text-slate-400 text-slate-500 h-[100px] w-[100px]"
        fontSize={"5rem"}
      />

      <p className="mb-8 text-sm font-semibold dark:text-slate-400 text-slate-500">
        No Data
      </p>

    </div>
  );
};

export default NoData;

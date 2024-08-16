import { ErrorOutlined } from "@mui/icons-material";
import React from "react";

const ErrorData = () => {
  return (
    <div className="pt-20 flex flex-col px-10 items-center justify-center h-full">
      <ErrorOutlined
        sx={{ fontSize: "5rem" }}
        className="dark:text-slate-400 text-slate-500 h-[100px] w-[100px]"
      />
      <p className="mb-8 text-sm font-semibold dark:text-red-400 text-red-500">
       Oops, Somthing Went Wrong , Please Try again later!
      </p>
    </div>
  );
};

export default ErrorData;

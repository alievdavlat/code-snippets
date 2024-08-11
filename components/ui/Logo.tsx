import { DataObject } from "@mui/icons-material";
import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
        <div className={`bg-primary p-[6px] rounded-md`}>
          <DataObject sx={{fontSize:27, color:'white'}}/>
        </div>

        <div className="flex gap-1 text-[19px]">
          <span className={`font-bold text-primary`}>
            Snippet
          </span>
          <span className="text-slate-600">
            Master
          </span>
        </div>
    </div>
  );
};

export default Logo;

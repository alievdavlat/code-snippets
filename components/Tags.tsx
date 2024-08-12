"use client"
import React from "react";
import { AddOutlined } from "@mui/icons-material";
import { Tabs } from "./ui/tabs";




const Tags = () => {

  const [active , setActive] = React.useState(0)

  const tags = [
    {
      id:1,
      title: "Javascript",
      value: "product",
    },
    {
      id:2,
      title: "Python",
      value: "services",
    },
    {
      id:3,
      title: "C++",
      value: "playground",
    },
    {
      id:4,
      title: "React",
      value: "content",
    },
    {
      id:5,
      title: "Vue",
      value: "random",
    },
    {
      id:6,
      title: "Vue",
      value: "random",
    },
    {
      id:7,
      title: "Vue",
      value: "random",
    },
    {
      id:8,
      title: "Vue",
      value: "random",
    },
    {
      id:9,
      title: "Vue",
      value: "random",
    },
  ]

  return (
    <div className="dark:bg-slate-800 dark:text-white bg-secondary text-slate-500 p-3 rounded-lg flex gap-5 justify-between ">
       <div className="overflow-x-auto flex items-center w-[90%]">
        {
          tags.map((item, index) => (
            <div key={item.id} onClick={() => setActive(index)} className={` z-10 transition-all ease-out duration-150 rounded-md p-1 tags  w-20 ${index === active ? 'bg-primary text-white' : 'bg-transparent text-slate-400'}`}>
              {item.title}
            </div>
          ))
        }
       </div>
      
      <button className="bg-primary p-1 rounded-md px-3 flex gap-1 items-center text-white ">
        <AddOutlined sx={{fontSize:18}}/>
        <span>Tag</span>
      </button>
    </div>
  );
};

export default Tags;

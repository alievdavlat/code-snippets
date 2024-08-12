import React from "react";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { SiJavascript } from "react-icons/si";
import {
  materialDark,
  materialLight,
  atomDark,
  oneDark,
  nightOwl,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { DeleteRounded } from "@mui/icons-material";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useTheme } from "next-themes"

interface codeblocksProps {
  language: string;
}

const CodeBlocks: React.FC<codeblocksProps> = ({ language }) => {
  const {theme} = useTheme()
  
  const codeString = `
  import React from "react";

  finction HelloWorld() {
  return  <h1>Hello World!</h1>
  }

  export default HelloWorld;
  `;
  return (
    <div className="rounded-md overflow-hidden text-sm mt-2">
      <SyntaxHighlighter
        language={language}
        style={theme === "light" ? materialLight : nightOwl}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

const Notes = () => {
  return (
    <div className="flex mt-5 flex-wrap gap-4">
      <CardContainer className="inter-var">
        <CardBody
          className={
            "dark:bg-slate-800 bg-secondary dark:text-white text-slate-500 max-sm:w-full w-[420px] rounded-md py-4"
          }>
          {/* header */}
          <CardItem
            as={"div"}
            translateZ="50"
            className="flex justify-between mx-4">
            <CardItem
              as="span"
              translateZ="20"
              className="font-bold text-lg w-[87%]">
              Hover over this card to unleash the power of CSS perspective
            </CardItem>
            <FavoriteBorderOutlined className="text-slate-500 cursor-pointer z-10" />
          </CardItem>

          {/* Date */}
          <div className="text-slate-500 text-[16px] flex gap-1 mt-1 font-light mx-4">
            <CardItem as={"span"} translateZ={20}>
              23th June 2024
            </CardItem>
          </div>

          {/* tags */}
          <div className="text-slate-600 text-[15px] mx-4 flex-wrap flex gap-1 mt-4">
            <span className="bg-purple-100 p-1 rounded-md px-2">Functions</span>
            <span className="bg-purple-100 p-1 rounded-md px-2">Functions</span>

            <span className="bg-purple-100 p-1 rounded-md px-2">Functions</span>

            <span className="bg-purple-100 p-1 rounded-md px-2">Functions</span>
          </div>

          {/* code  */}
          <CardItem
          translateZ="100"
          className="w-full"
          >
          <CodeBlocks language="Javascript" />
          </CardItem>
          {/* descr  */}
          <div className="dark:text-slate-300 text-slate-600 text-[13px] mt-4 mx-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            dolorem illo facere earum beatae tenetur voluptates, necessitatibus
            nostrum dolorum ipsam.
          </div>

          {/* footer */}

          <div className="flex justify-between text-[13px] dark:text-slate-400 text-slate-600 mx-4 mt-3">
            <div className="flex gap-1">
              <SiJavascript size={15} className="mb-[12px]" />
              <span>JavaScript</span>
            </div>
            <DeleteRounded sx={{ fontSize: 17 }} className="cursor-pointer" />
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default Notes;

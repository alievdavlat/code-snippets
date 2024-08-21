"use client";

import React from "react";
import { IconButton } from "@mui/material";
import AceEditor from "react-ace";
import animationData from "../../app/data/conffeti.json";
import Lottie from "react-lottie";
import { toast } from "sonner";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { ContentCopyOutlined, DoneOutlined } from "@mui/icons-material";
import { Control, Controller } from "react-hook-form";
import { data } from "@/app/data";

interface CodeEditorProps {
name: string;
value:any
onchange:(e:any) => void
}

const CodeEditor = (props: CodeEditorProps) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [code, setCode] = React.useState(data.code);

  const defaultOptions = {
    loop: isCopied,
    autoplay: isCopied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(!isCopied);
    toast.success("Code Copied");
  };

  return (
    <div className="flex gap-2 text-slate-400 mt-8">
      <div
        className={`hover:border-primary border-slate-400 border rounded lg p-3  w-full relative`}>
        <div className="absolute  right-4 z-50 mb-2">
          <IconButton>
            {isCopied ? (
              <>
                <Lottie options={defaultOptions} height={50} width={50} />
                <DoneOutlined
                  sx={{ fontSize: 18 }}
                  className={`dark:text-white text-slate-500 ml-1`}
                />
              </>
            ) : (
              <ContentCopyOutlined
                sx={{ fontSize: 18 }}
                onClick={handleCopyCode}
                className={`dark:text-white text-slate-500 ml-1`}
              />
            )}
          </IconButton>
        </div>

        
            <AceEditor
              placeholder="Code"
              mode="javascript"
              theme="solarized_dark"
              name={props.name}
              fontSize={14}
              lineHeight={19}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              className={`dark:bg-transparent dark:text-white bg-white text-slate-500`}
              style={{ background: "transparent" }}
              value={props.value}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              onChange={(value) => {
                setCode(value)
                props.onchange(value)
              }}
            />
      </div>
    </div>
  );
};

export default CodeEditor;

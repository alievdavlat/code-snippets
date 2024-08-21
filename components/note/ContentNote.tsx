//@ts-nocheck
"use client";
import React, { useContext } from "react";
import { ContentCopyOutlined, DoneOutlined } from "@mui/icons-material";
import CustomDrower from "../CustomDrower";
import { ModalContext } from "@/context/ModalContext";
import useQueryParams from "@/hooks/useQueryParams";
import CodeEditor from "./CodeEditor";
import { useUser } from "@clerk/clerk-react";
import ControllerTextArea from "../controlled/ControllerTextArea";
import AsyncAutoComplate from "../auto-complate/AsyncAutoComplate";
import { IconButton } from "@mui/material";
import Lottie from "react-lottie";
import { toast } from "sonner";
import animationData from "../../app/data/conffeti.json";
import LanguageDropDown from "./LanguageDropDown";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GlobalFilter } from "@/context/TableFilterContext";

const ContentNote = () => {
  const { toggle, isOpen } = useContext<any>(ModalContext);
  const {singleSnippetId} = useContext<any>(GlobalFilter)
  const { user } = useUser();
  const query = useQueryParams();
  const [isCopied, setIsCopied] = React.useState(false);
  const [values, setValues] = React.useState({
    title: "",
    isFavorite: false,
    clerkUserId: user?.id,
    description: "",
    isTrash: false,
    libery: "",
  });
  const [language, setLanguage] = React.useState("");
  const [code, setCode] = React.useState("");

  const [tag, setTag] = React.useState([""]);

  const handelOnchage = (e: any) => {
    const { value } = e.target;

    setValues((p) => ({ ...p, [e.target.name]: value }));
  };

  const handleChangeTag = (value: any) => {
    setTag(value);
  };

  const defaultOptions = {
    loop: isCopied,
    autoplay: isCopied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(values.libery);
    setIsCopied(!isCopied);
    toast.success("Copied");
  };

  const tags = useQuery(api.tags.getAllTags);

  const createSnippet = useMutation(api.snippets.createSnippet);
  const updateSnippet = useMutation(api.snippets.updateFields);

  const onCreateSnippet = () => {
    if (user?.id) {
      const promise = createSnippet({
        clerkUserId: user?.id,
        code,
        description: values.description,
        isFavorite: values.isFavorite,
        isTrash: values.isTrash,
        language,
        libery: values.libery,
        title: values.title,
        tags: tag,
      });

      toast.promise(promise, {
        loading: "creating a new snippet...",
        success: "new snippet has been created",
        error: "somthing went error while creating snippet",
      });
    }
  };

  const onUpdateSnippet = () => {
    if (user?.id) {
      const promise = updateSnippet({
        id:query.get('id'),
        clerkUserId: user?.id,
        code,
        description: values.description,
        isFavorite: values.isFavorite,
        isTrash: values.isTrash,
        language,
        libery: values.libery,
        title: values.title,
        tags: tag,
      });

      toast.promise(promise, {
        loading: "updating a new snippet...",
        success: "snippet has been updated",
        error: "somthing went error while updating snippet",
      });
    }
  }
  const singleSnippet = useQuery(api.snippets.getSnippetById, {id:singleSnippetId});
  React.useEffect(() => {
    if (query.has("id") && singleSnippet) {
      setValues({
        title:singleSnippet?.title,
        isFavorite: singleSnippet?.isFavorite,
        clerkUserId: singleSnippet?.clerkUserId,
        description: singleSnippet?.description,
        isTrash: singleSnippet?.isTrash,
        libery: singleSnippet?.libery,
      })
      setTag(singleSnippet.tags)
      setCode(singleSnippet.code)
      setLanguage(singleSnippet.language)
    }

    if (!isOpen) {
      setValues({
        title: "",
        isFavorite: false,
        clerkUserId: user?.id,
        description: "",
        isTrash: false,
        libery: "",
      })
      setTag('')
      setLanguage('')
      setCode('')
    }

  }, [query.has("id"), toggle]);

  return (
    <CustomDrower open={isOpen} onClose={toggle}>
      <div className="p-4">
        {/* note title */}
        <div className="flex gap-2 w-full flex-col mb-8 mt-4">
          <label
            htmlFor="title"
            className="mb-2 text-sm font-normal text-slate-500 dark:text-white">
            Title
          </label>
          <ControllerTextArea
            name="title"
            value={values.title}
            onchange={handelOnchage}
            placeholder="new title.."
            className="font-bold text-sm border border-slate-400 hover:border-primary active:border-primary outline-none resize-none h-auto overflow-auto w-full bg-transparent dark:text-slate-400 text-slate-800 p-2"
          />
        </div>

        {/* libery */}
        <div className="flex gap-2 text-[12px] mt-8 mb-4 w-full">
          <div className="flex gap-2 flex-col w-full">
            <label
              htmlFor="libery"
              className="mb-2 text-sm font-normal text-slate-500 dark:text-white">
              Npm Libery
            </label>
            <ControllerTextArea
              name="libery"
              placeholder="Npm libery"
              value={values.libery}
              onchange={handelOnchage}
              rows={4}
              className={`text-sm outline-none border border-slate-400 hover:border-primary rounded-lg p-2 w-full dark:text-slate-400 text-slate-600 bg-transparent active:border-primary`}
            />
          </div>

          {query?.has("id") && (
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
          )}
        </div>

        {/* note tags */}

        <div className="w-full mt-8">
          <AsyncAutoComplate
            onChange={handleChangeTag}
            options={tags || []}
            onChangevalue={tag}
            name="tags"
            url="/tags"
            label={""}
            getValue={(data) => data?.name}
            getOptionLabel={(data) => data?.name}
            filterOption={(option, search) =>
              option?.data?.name?.toLowerCase().includes(search.toLowerCase())
            }
            getData={(data) => data?.data}
            multiple
            placeholder="Select Tags..."
          />
        </div>

        {/* description */}
        <div className="flex gap-2 text-[12px] mt-8 w-full flex-col">
          <label
            htmlFor="description"
            className="mb-2 text-sm font-normal text-slate-500 dark:text-white">
            Description
          </label>
          <ControllerTextArea
            name="description"
            value={values.description}
            onchange={handelOnchage}
            placeholder="New Description"
            rows={8}
            className={`text-sm outline-none border border-slate-400 hover:border-primary rounded-lg p-2 w-full dark:text-slate-400 text-slate-600 bg-transparent active:border-primary`}
          />
        </div>

        <div className="my-8 w-full">
          <LanguageDropDown
            name="language"
            placeholder="Select Language..."
            onchange={setLanguage}
            value={language}
          />
        </div>

        {/* code */}
        <CodeEditor name="code" value={code} onchange={setCode} />
        <div className="w-full p-2 mt-8 flex items-center justify-center z-50">
          <button
            className="z-10 px-3 py-1 bg-gray-200 text-black dark:bg-primary  dark:text-white   rounded-md text-sm w-28"
            onClick={() => {
              if (query.has('id')) {
                onUpdateSnippet()
              } else {
              onCreateSnippet();
              }
              toggle()
            }}>
            Save
          </button>
        </div>
      </div>
    </CustomDrower>
  );
};

export default ContentNote;

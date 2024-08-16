"use client";

import React, { useContext } from "react";
import { ContentCopyOutlined, DoneOutlined } from "@mui/icons-material";
import CustomDrower from "../CustomDrower";
import { ModalContext } from "@/context/ModalContext";
import Form from "../form";
import useQueryParams from "@/hooks/useQueryParams";
import * as yup from "yup";
import CodeEditor from "./CodeEditor";
import { useUser } from "@clerk/nextjs";
import ControllerTextArea from "../controlled/ControllerTextArea";
import AsyncAutoComplate from "../auto-complate/AsyncAutoComplate";
import { IconButton } from "@mui/material";
import Lottie from "react-lottie";
import { toast } from "sonner";
import animationData from "../../app/data/conffeti.json";
import LanguageDropDown from "./LanguageDropDown";
import { useMutation } from "@tanstack/react-query";
import { hanldeRequest } from "@/configs/req";

const validationSchema = yup.object().shape<any>({
  title: yup.string(),
  tags: yup.array(),
  description: yup.string(),
  language: yup.string(),
  libery: yup.string(),
  code: yup.string(),
});

const ContentNote = () => {
  const { toggle, isOpen } = useContext<any>(ModalContext);
  const { user } = useUser();
  const query = useQueryParams();
  const [isCopied, setIsCopied] = React.useState(false);

  const initialValues = {
    title: "",
    isFavorite: false,
    clerkUserId: user?.id,
    tags: [],
    description: "",
    code: "",
    language: "",
    isTrash: false,
    libery: "",
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
    navigator.clipboard.writeText(initialValues.libery);
    setIsCopied(!isCopied);
    toast.success("Copied");
  };

  const createInfo = useMutation({
    mutationFn: async (data: any) => {
      const response = await hanldeRequest({
        url: `/snippets/${query.get("id")}`,
        data: data,
        method: "PUT",
      });

      return response?.data;
    },
    onSuccess(data) {
      toast.success("Updated");
    },
    onError(error: any) {
      toast.error(String(error.response?.data?.message || error?.message));
    },
  });

  const { mutate: create } = createInfo;

 

  return (
    <CustomDrower open={isOpen} onClose={toggle}>
      <Form
        getUrl={query?.has("id") ? "/snippets/" + query?.get("id") : ""}
        url={query?.has("id") ? `/snippets/${query?.has("id")}` : "/snippets"}
        validationSchema={validationSchema}
        initialValues={initialValues}
        withOutIdOnpUt={true}>
        {({ handleFinish, createInfo, getInfo, form }) => {
          const {
            control,
            handleSubmit,
            formState: { errors },
          } = form;

          return (
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
                  placeholder="new title.."
                  control={control}
                  error={errors.title}
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
                    control={control}
                    error={errors.libery}
                    rows={4}
                    className={`text-sm outline-none border border-slate-400 hover:border-primary rounded-lg p-2 w-full dark:text-slate-400 text-slate-600 bg-transparent active:border-primary`}
                  />
                </div>

                {query?.has("id") && (
                  <IconButton>
                    {isCopied ? (
                      <>
                        <Lottie
                          options={defaultOptions}
                          height={50}
                          width={50}
                        />
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
                  name="tags"
                  url="/tags"
                  label={""}
                  control={control}
                  error={errors?.tags}
                  getValue={(data) => data?.name}
                  getOptionLabel={(data) => data?.name}
                  filterOption={(option, search) =>
                    option?.data?.name
                      ?.toLowerCase()
                      .includes(search.toLowerCase())
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
                  placeholder="New Description"
                  control={control}
                  error={errors.description}
                  rows={8}
                  className={`text-sm outline-none border border-slate-400 hover:border-primary rounded-lg p-2 w-full dark:text-slate-400 text-slate-600 bg-transparent active:border-primary`}
                />
              </div>

              <div className="my-8 w-full">
                <LanguageDropDown
                  control={control}
                  name="language"
                  placeholder="Select Language..."
                />
              </div>

              {/* code */}
              <CodeEditor name="code" control={control} />
              <div className="w-full p-2 mt-8 flex items-center justify-center z-50">
                <button
                  className="z-10 px-3 py-1 bg-gray-200 text-black dark:bg-primary  dark:text-white   rounded-md text-sm w-28"
                  onClick={handleSubmit(async (data: any) => {
                    console.log(data);

                    const transformedData = {
                      ...data,
                      tags: data.tags.map((tag: any) => {
                        if (typeof tag === 'string') {
                          return { name: tag };
                        } else if (typeof tag === 'object' && 'name' in tag) {
                          return { name: tag.name };
                        } else {
                          return { name: tag };
                        }
                      })
                    };
                    
                    console.log(transformedData);
                    
                    {
                      query.has("id")
                        ? create(transformedData)
                        : await handleFinish(transformedData);
                    }
                    // toggle();
                  })}>
                  Save
                </button>
              </div>
            </div>
          );
        }}
      </Form>
    </CustomDrower>
  );
};

export default ContentNote;

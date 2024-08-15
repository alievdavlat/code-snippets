"use client";
import React from "react";
import {
  AddOutlined,
  CloseOutlined,
  DeleteRounded,
  DragIndicatorOutlined,
  EditOutlined,
  StyleOutlined,
} from "@mui/icons-material";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal
} from "./ui/animated-modal";
import ControllerInput from "./controlled/ControllerInput";
import Form from "./form";
import * as yup from "yup";
import { useUser } from "@clerk/nextjs";

const validationSchema = yup.object().shape<any>({
  name: yup.string().required("Toldirilishi Shart Bolgan Maydon"),
});

const tags = [
  {
    id: 1,
    title: "Javascript",
  },
  {
    id: 2,
    title: "Python",
  },
  {
    id: 3,
    title: "C++",
  },
  {
    id: 4,
    title: "React",
  },
  {
    id: 5,
    title: "Vue",
  },
];

const TagWindow = () => {
  const { user } = useUser();
  const initialValues: any = {
    name: "",
    clerkUserId: user?.id,
  };

  const {setOpen} = useModal()

  return (
    <Form
      url={"/tags"}
      validationSchema={validationSchema}
      initialValues={initialValues}>
      {({ handleFinish, createInfo, form }) => {
        const {
          control,
          handleSubmit,
          formState: { errors },
        } = form;

        return (
          <div className="w-full h-full">
            <div className="flex justify-between items-center  mb-3">
              <div className="flex  items-center gap-2">
                <StyleOutlined />
                <span className="text-lg font-bold">Tags</span>
              </div>

              <Modal>
                <ModalTrigger className="bg-primary  text-white flex justify-center group/modal-btn z-50">
                  <Button className="text-white">
                    <AddOutlined sx={{ fontSize: 18 }} /> Add Tag
                  </Button>
                </ModalTrigger>
                <ModalBody className="bg-secondary">
                  <ModalContent>
                    <h2 className="text-lg font-bold dark:text-slate-400 text-slate-500 mb-2">
                      Add New Tag
                    </h2>
                    <ControllerInput
                      name="name"
                      placeholder="tags..."
                      control={control}
                      type="text"
                      label=""
                      error={errors.name}
                    />
                  </ModalContent>
                  <ModalFooter className="gap-4">
                    <button
                      className="z-10 px-3 py-1 bg-gray-200 text-black dark:bg-secondary  dark:text-white   rounded-md text-sm w-28"
                      onClick={handleSubmit(async (data: any) => {
                        console.log(data);
                        
                        await handleFinish(data);
                        setOpen(false)
                      })}>
                      Save
                    </button>
                  </ModalFooter>
                </ModalBody>
              </Modal>
            </div>

            <Command className="rounded-lg  shadow-md w-full h-full bg-transparent">
              <CommandInput
                placeholder="Search Tags..."
                className="text-slate-300"
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {tags.map((tag) => (
                    <CommandItem key={tag.id}>
                      <SingleTag title={tag.title} id={tag.id} />
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </CommandList>
            </Command>
          </div>
        );
      }}
    </Form>
  );
};

export default TagWindow;

const SingleTag = ({ title, id }: { title: string; id: number }) => {
  return (
    <div className="dark:bg-slate-500 bg-slate-600 p-2 rounded-lg flex gap-3 items-center justify-between px-4 w-full ">
      <div className="flex gap-3 items-center">
        <DragIndicatorOutlined className="text-slate-400 cursor-pointer" />
        <div className="w-2 h-2  bg-primary rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-bold">{title}</span>
          <span className="text-slate-400 text-[12px]">{id}</span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer dark:bg-slate-400 bg-slate-600 hover:bg-slate-300">
          <EditOutlined
            className="dark:text-white text-slate-400"
            sx={{
              fontSize: 18,
            }}
          />
        </div>

        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer dark:bg-slate-400 bg-slate-600 hover:bg-slate-300">
          <DeleteRounded
            className="dark:text-white text-slate-400"
            sx={{
              fontSize: 18,
            }}
          />
        </div>
      </div>
    </div>
  );
};

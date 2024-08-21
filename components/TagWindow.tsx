"use client";
import React from "react";
import {
  AddOutlined,
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
} from "@/components/ui/command";
import { Button } from "./ui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "./ui/animated-modal";
import { useUser } from "@clerk/clerk-react";
import Loader from "./loader";
import ControllerInput from "./controlled/ControllerInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

interface tagProps {
  _id: Id<"tags">;
  _creationTime: number;
  name: string;
  clerkUserId: string;
}

const TagWindow = () => {
  const { user } = useUser();
  const [tag, setTag] = React.useState('')
  const { setOpen } = useModal();

  const tags = useQuery(api.tags.getAllTags);

  const handleTagChange = (e:any) => {
    const {value} = e.target
    setTag(value)
  }

  const createSnippet = useMutation(api.tags.createTags);

  const onCreateTag = () => {
    if (user?.id) {   
      const promise = createSnippet({
        name: tag,
        clerkUserId:user?.id
      })
      toast.promise(promise, {
        loading: "creating a new tag...",
        success: "new tag has been created",
        error:"somthing went error while creating tag"
      });
    }

  };

  if (tags === undefined) {
    return <Loader />;
  }



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
                type="text"
                label=""
                value={tag} 
                onchange={handleTagChange}
              />
            </ModalContent>
            <ModalFooter className="gap-4">
              <button
                className="z-10 px-3 py-1 bg-gray-200 text-black dark:bg-secondary  dark:text-white   rounded-md text-sm w-28"
                onClick={() => {
                  setOpen(false)
                  onCreateTag()
                }}>
                Save
              </button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>

      <Command className="rounded-lg  shadow-md w-full h-full bg-transparent">
        <CommandInput placeholder="Search Tags..." className="text-slate-300" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" style={{width:'100%'}}>
            <div className="overflow-x-auto flex items-center flex-wrap w-[90%]">
              {tags?.length > 0 &&
                tags.map((item: tagProps, index: any) => (
                  <CommandItem key={item._id}>
                    <SingleTag title={item.name} id={index + 1} />
                  </CommandItem>
                ))}
            </div>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};

export default TagWindow;

const SingleTag = ({ title, id }: { title: string; id: string }) => {
  return (
    <div className="dark:bg-slate-500 bg-slate-600 p-2 rounded-lg flex gap-3 items-center justify-between px-4 w-full">
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

"use client";
import React, { useContext } from "react";
import { AddOutlined } from "@mui/icons-material";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "./ui/animated-modal";
import TagWindow from "./TagWindow";
import { GlobalFilter } from "@/context/TableFilterContext";
import GetContainer from "./get-container";
import Loader from "./loader";
import NoData from "./NoData";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface tagProps {
  _id: Id<"tags">;
  _creationTime: number;
  name: string;
  clerkUserId: string;
}

const Tags = () => {
  const [active, setActive] = React.useState(0);
  const { handleTags } = useContext(GlobalFilter);
  const { setOpen: setCLose } = useModal();

  const tags = useQuery(api.tags.getAllTags);

  if (tags === undefined) {
    return <Loader />;
  }

  return (
    <div className="dark:bg-slate-800 dark:text-white bg-secondary text-slate-500 p-3 rounded-lg flex gap-5 justify-between ">
      <div className="overflow-x-auto flex items-center w-[90%]">
        <div
          onClick={(e: any) => {
            setActive(0);
            handleTags("all");
          }}
          className={` z-10 transition-all ease-out duration-150 rounded-md  tags  hover:bg-primary hover:text-white ${
            0 === active
              ? "bg-primary text-white"
              : "bg-transparent text-slate-400"
          }`}>
          All
        </div>
        {tags?.length > 0 &&
          tags?.map((item: tagProps, index: number) => (
            <div
              key={item._id}
              onClick={(e: any) => {
                setActive(index + 1);
                handleTags(item.name);
              }}
              className={` z-10 transition-all ease-out duration-150 rounded-md  tags  hover:bg-primary hover:text-white ${
                index === active
                  ? "bg-primary text-white"
                  : "bg-transparent text-slate-400"
              }`}>
              {item.name}
            </div>
          ))}
      </div>

      <Modal>
        <ModalTrigger className="bg-primary  text-white flex justify-center group/modal-btn z-50">
          <button className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 cursor-pointer">
            <AddOutlined sx={{ fontSize: 18 }} />
            <span>Tag</span>
          </button>

          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20 cursor-pointer">
            <AddOutlined sx={{ fontSize: 19 }} />
          </div>
        </ModalTrigger>
        <ModalBody className="bg-secondary">
          <ModalContent>
            <TagWindow />
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className="z-10 px-3 py-1 bg-gray-200 text-black dark:bg-secondary  dark:text-white   rounded-md text-sm w-28"
              onClick={() => setCLose(false)}>
              Cancel
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Tags;

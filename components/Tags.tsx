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

interface tagProps {
  id: string;
  name: string;
  clerkUserId: string;
  createdAt: string;
  updatedAt: string;
}

const Tags = () => {
  const [active, setActive] = React.useState(0);
  const { handleTags } = useContext(GlobalFilter);
  const { setOpen: setCLose } = useModal();

  const tags = [
    {
      id: 1,
      title: "Javascript",
      value: "product",
    },
    {
      id: 2,
      title: "Python",
      value: "services",
    },
    {
      id: 3,
      title: "C++",
      value: "playground",
    },
    {
      id: 4,
      title: "React",
      value: "content",
    },
    {
      id: 5,
      title: "Vue",
      value: "random",
    },
    {
      id: 6,
      title: "Vue",
      value: "random",
    },
    {
      id: 7,
      title: "Vue",
      value: "random",
    },
    {
      id: 8,
      title: "Vue",
      value: "random",
    },
    {
      id: 9,
      title: "Vue",
      value: "random",
    },
  ];

  return (
    <div className="dark:bg-slate-800 dark:text-white bg-secondary text-slate-500 p-3 rounded-lg flex gap-5 justify-between ">
        <GetContainer url={"/tags"} hideLoading>
          {({ data, isError, isLoading, isFetching }) => {
            return (
              <div className="overflow-x-auto flex items-center w-[90%]">
                {data?.data <= 0 && (
                  <h2 className="text-slate-500 text-sm font-bold">No Tags</h2>
                )}
                {data?.data?.length > 0 &&
                  data?.data.map((item: tagProps, index: number) => (
                    <div
                      key={item.id}
                      onClick={(e: any) => {
                        setActive(index);
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
            );
          }}
        </GetContainer>

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

"use client";
import ErrorData from "@/components/ErrorData";
import GetContainer from "@/components/get-container";
import Loader from "@/components/loader";
import Tags from "@/components/Tags";
import { hanldeRequest } from "@/configs/req";
import { GlobalFilter } from "@/context/TableFilterContext";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Navigation } from "swiper/modules";
import NoteItem from "@/components/note/NoteItem";
import NoTrash from "@/components/NoTrash";

interface tagProps {
  id: string;
  name: string;
  clerkUserId: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteItemProps {
  id: string;
  title: string;
  isFavorite: boolean;
  clerkUserId: string;
  tags: tagProps[];
  description: string;
  code: string;
  language: string;
  isTrash: boolean;
  createdAt: string;
  updatedAt: string;
}

const Trashpage = () => {
  const { tags } = useContext(GlobalFilter);
  const [isTrash, setIsTrash] = React.useState(false);

  const createInfo = useMutation({
    mutationFn: async (id: any) => {
      const response = await hanldeRequest({
        url: `/snippets/${id}`,
        method: "DELETE",
      });

      return response?.data;
    },
    onSuccess(data) {
      toast.success("Deleted");
    },
    onError(error: any) {
      toast.error(String(error || error?.message));
    },
  });

  const { mutate } = createInfo;

  const handleTrash = (id: any) => {
    setIsTrash(!isTrash);
    mutate(id);
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <div className={`w-full`}>
          <Tags />
          <GetContainer
            url={"/snippets"}
            hideLoading
            params={{
              // search: globalFilter,
              tags,
            }}>
            {({ data, isError, isLoading, refetch }) => {
              if (isLoading) {
                return <Loader />;
              }

              if (isError) {
                return <ErrorData />;
              }

              if (
                data?.data?.filter(
                  (note: NoteItemProps) => note?.isTrash === true
                ).length <= 0
              ) {
                return <NoTrash />;
              }

              return (
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  centeredSlides={true}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    300: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    420: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    560: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Navigation, FreeMode]}
                  className="mt-10">
                  {data?.data.length > 0 &&
                    data?.data
                      .filter((note: NoteItemProps) => note?.isTrash === true)
                      .map((item: NoteItemProps) => (
                        <SwiperSlide key={item?.id}>
                          <NoteItem
                            {...item}
                            refetch={refetch}
                            onclick={(id: any) => {
                              handleTrash(id);
                              refetch();
                            }}
                          />
                        </SwiperSlide>
                      ))}
                </Swiper>
              );
            }}
          </GetContainer>
        </div>
      </div>
    </div>
  );
};

export default Trashpage;

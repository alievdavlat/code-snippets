"use client";
import React, { useContext } from "react";
import GetContainer from "../get-container";
import NoteItem from "./NoteItem";
import { GlobalFilter } from "@/context/TableFilterContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Pagination, Navigation } from "swiper/modules";
import NoSnippet from "../NoSnippet";
import Loader from "../loader";
import ErrorData from "../ErrorData";
import { useMutation } from "@tanstack/react-query";
import { hanldeRequest } from "@/configs/req";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

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

const Notes = () => {
  const { tags } = useContext(GlobalFilter);
  const [isTrash, setIsTrash] = React.useState(false);
  const {user} = useUser()
  const createInfo = useMutation({
    mutationFn: async (data: any) => {
      const response = await hanldeRequest({
        url: `/snippets/${data.id}`,
        data: data.data,
        method: "PUT",
      });

      return response?.data;
    },
    onSuccess(data) {
      toast.success("Updated");
    },
    onError(error: any) {
      toast.error(String(error || error?.message));
    },
  });

  const { mutate } = createInfo;

  const handleTrash = (id: any) => {
    setIsTrash(!isTrash);

    mutate({
      data: {
        isTrash: true,
      },
      id,
    });
  };

  return (
  <GetContainer
    url={"/snippets"}
    hideLoading
    params={{
      // search: globalFilter,
      clerkId:user?.id,
      tag: tags.includes('all') ? '' : tags,
    }}>
    {({ data, isError, isLoading, refetch }) => {
      if (isLoading) {
        return <Loader />;
      }

      if (isError) {
        return <ErrorData />;
      }

      if (data?.data?.length <= 0) {
        return <NoSnippet />;
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
          className="mt-20">
          {data?.data.length > 0 &&
            data?.data
              .filter((note: NoteItemProps) => note?.isTrash === false)
              .map((item: NoteItemProps) => (
                <SwiperSlide key={item?.id}>
                  <NoteItem
                    refetch={refetch}
                    {...item}
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
  );
};

export default Notes;

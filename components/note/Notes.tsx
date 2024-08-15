"use client";
import React, { useContext} from "react";
import GetContainer from "../get-container";
import NoteItem from "./NoteItem";
import { GlobalFilter } from "@/context/TableFilterContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import { FreeMode, Pagination , Navigation, Autoplay} from "swiper/modules";

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

  
 
  return (
    <GetContainer
      url={"/snippets"}
      hideLoading
      params={{
        // search: globalFilter,
        tags,
      }}>
      {({ data, isError, isLoading, isFetching }) => {
        return (
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation, FreeMode]}
              className="mySwiper"
              >
            {data?.data.length > 0 &&
              data?.data.map((item: NoteItemProps) => (
                <SwiperSlide key={item?.id}>
                  <NoteItem {...item}  />
                </SwiperSlide>
              ))}

            {data?.data?.length <= 0 && <h1>no data</h1>}
            </Swiper>
        );
      }}
    </GetContainer>
  );
};

export default Notes;

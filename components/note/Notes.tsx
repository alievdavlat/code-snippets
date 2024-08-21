"use client";
import React, { useContext } from "react";
import NoteItem from "./NoteItem";
import { GlobalFilter } from "@/context/TableFilterContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Navigation } from "swiper/modules";
import NoSnippet from "../NoSnippet";
import Loader from "../loader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface tagProps {
  id: string;
  name: string;
  clerkUserId: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteItemProps {
  _id: Id<"snippets">;
  _creationTime: number;
  isFavorite?: boolean | undefined;
  isTrash?: boolean | undefined;
  tags: string[];
  clerkUserId: string;
  title: string;
  description: string;
  code: string;
  language: string;
  libery: string;
}

const Notes = () => {
  const { tags , globalFilter} = useContext(GlobalFilter);
  const snippet = useQuery(api.snippets.getAllSnippets, {
    search:globalFilter, 
    tag:tags
  });

  if (snippet === undefined) {
    return <Loader />;
  }

  if (snippet?.length <= 0) {
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
      {snippet?.length > 0 && snippet?.map((item: NoteItemProps) => (
        <SwiperSlide key={item?._id}>
          <NoteItem  {...item}  deleteWork={false}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Notes;

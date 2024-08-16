"use client"
import ErrorData from "@/components/ErrorData";
import GetContainer from "@/components/get-container";
import Loader from "@/components/loader";
import Tags from "@/components/Tags";
import { GlobalFilter } from "@/context/TableFilterContext";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import NoteItem from "@/components/note/NoteItem";
import NOFavorites from "@/components/NOFavorites";

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

const Favoritepage = () => {
  const { tags } = useContext(GlobalFilter);


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

              if (data?.data?.filter((note: NoteItemProps) => note?.isFavorite === true).length <= 0) {
                return <NOFavorites />;
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
                  modules={[  Navigation, FreeMode]}
                  className="mt-10">
                  {data?.data.length > 0 &&
                    data?.data
                      .filter(
                        (note: NoteItemProps) => note?.isFavorite === true
                      )
                      .map((item: NoteItemProps) => (
                        <SwiperSlide key={item?.id}>
                          <NoteItem {...item} refetch={refetch}/>
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

export default Favoritepage;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "../App.css";


import { FreeMode, Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../hooks/useGetAllJobs";
const category = [
  "Software Developer",
  "Software Engineer",
  "Frontend Development",
  "Backend Developer",
  "Graphic Designer",
  "Fullstack Developer",
  "Data Science",
  "Al Engineer",
  "Matchine Learning",
];
const CategoryCarousel = () => {
    useGetAllJobs()
  const dispatch=useDispatch()
 const navigate = useNavigate()

  const searchJobHandler = (query) => {
    // Handle special cases
    let searchQuery = query;
    if (query.includes("Graphic Designer")) {
      searchQuery = "Graphic Designer|Graphix design";
    }else if (query.includes("Software Developer")) {
      searchQuery = "Software Developer|software developer|softwaredeveloper";
    }

    dispatch(setSearchedQuery(searchQuery));
    navigate("/browser");
  };
  return (
    <div className="relative w-full   px-5 pb-24  overflow-x-scroll   max-w-[1200vw]">
      {/* Swiper Component */}
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        freeMode={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[FreeMode, Navigation]}
        className="mySwiper"
      >
        {category.map((show, i) => (
          <SwiperSlide
            key={i}
            onClick={() => searchJobHandler(show)}
            className="bg-amber-500 hover:bg-amber-700 text-white  py-3 cursor-pointer text-center rounded-lg"
          >
            {show}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 
      <button className="swiper-button-prev absolute left-0 top-3 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg"></button>
      <button className="swiper-button-next absolute right-0 top-3 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg"></button> */}
    </div>
  );
};

export default CategoryCarousel;

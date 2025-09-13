"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const DozensCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={4}
      autoplay={{ delay: 2000 }}
      centeredSlides={true}
      loop
      breakpoints={{
        1024: {
          slidesPerView: 4,
          centeredSlides: true,
        },
        480: {
          slidesPerView: 1,
          centeredSlides: true,
        },
        0: {
          slidesPerView: 1,
          centeredSlides: true,
        },
      }}
    >
      {[
        "/images/landingpage/demos/shop1.png",
        "/images/landingpage/demos/shop7.jpg",
        "/images/landingpage/demos/shop3.png",
        "/images/landingpage/demos/shop4.png",
        "/images/landingpage/demos/shop5.png",
        "/images/landingpage/demos/shop6.jpg",
        "/images/landingpage/demos/shop2.png",
      ].map((src, index) => (
        <SwiperSlide
          key={index}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            width={250}
            height={250}
            borderRadius="16px"
            sx={{ boxShadow: (theme) => theme.shadows[10] }}
          >
            <img
              src={src}
              alt={`user-img-${index + 1}`}
              width={250}
              height={250}
              style={{ borderRadius: "16px" }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DozensCarousel;

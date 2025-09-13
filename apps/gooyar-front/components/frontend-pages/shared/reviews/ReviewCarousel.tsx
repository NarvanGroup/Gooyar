"use client";
import React, { useRef, useState } from "react";
import {
  Avatar,
  CardContent,
  Divider,
  Stack,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const Reviews = [
  {
    id: 1,
    img: "/images/profile/user-2.jpg",
    name: "مینا احمدی",
    text: "خدمات شناس‌بان واقعاً فوق‌العاده است! با استفاده از سیستم بررسی هویت، توانستم از یک کلاهبرداری بزرگ جلوگیری کنم. این سرویس اعتماد من را به مشتریانم افزایش داده است.",
  },
  {
    id: 2,
    img: "/images/profile/user-5.jpg",
    name: "علی مرادی",
    text: "به عنوان صاحب یک فروشگاه موبایل، امنیت برای من اهمیت زیادی دارد. شناس‌بان با بررسی دقیق خریداران، اطمینان من را در انجام معاملات افزایش داده است. واقعاً کاربردی و ضروری است.",
  },
  {
    id: 3,
    img: "/images/profile/user-1.jpg",
    name: "محمدعلی کریمی",
    text: "سیستم شناس‌بان نه تنها کلاهبرداری را کاهش می‌دهد بلکه باعث می‌شود مشتریان معتبر راحت‌تر با ما ارتباط برقرار کنند. این سرویس را به همه فروشندگان پیشنهاد می‌کنم.",
  },
  {
    id: 4,
    img: "/images/profile/user-4.jpg",
    name: "محمد رضایی",
    text: "شناس‌بان برای کسب‌وکارهای طلافروشی یک نعمت است. از زمانی که از این سرویس استفاده می‌کنم، معاملاتم بسیار امن‌تر شده است. پیشنهاد می‌کنم امتحان کنید.",
  },
  {
    id: 5,
    img: "/images/profile/user-3.jpg",
    name: "سمیرا جوانی",
    text: "با شناس‌بان خیالم از بابت هویت خریداران راحت است. این سرویس نه تنها امنیت کسب‌وکارم را بالا برده بلکه باعث شده مشتریان معتبر بیشتری جذب کنم. بی‌نظیر است!",
  },
];

const ReviewCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  return (
    <Box position="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4500 }}
        spaceBetween={50}
        slidesPerView={1}
        loop={true} // Enables infinite loop
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex + 1)}
        navigation={{
          nextEl: nextButtonRef.current,
          prevEl: prevButtonRef.current,
        }}
        dir="rtl"
      >
        {Reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
              <CardContent sx={{ p: "48px !important" }}>
                <Stack direction="row" alignItems="center" gap={3} mb={3}>
                  <Avatar src={review.img} alt="user" />
                  <Typography variant="body1" fontWeight={600}>
                    {review.name}
                  </Typography>
                </Stack>
                <Typography variant="body1" lineHeight={1.8} mb={2}>
                  {review.text}
                </Typography>
                <Divider />
                <Typography fontSize="14px" fontWeight={500} ml={5} mt={3}>
                  {activeSlide} / {Reviews.length}
                </Typography>
              </CardContent>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <Box
        ref={nextButtonRef}
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          right: "10px",
          zIndex: 10,
          transform: "translateY(-50%)",
          backgroundColor: (theme) => theme.palette.grey[100],
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconChevronLeft strokeWidth={1.5} size={20} />
      </Box>
      <Box
        ref={prevButtonRef}
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          left: "10px",
          zIndex: 10,
          transform: "translateY(-50%)",
          backgroundColor: (theme) => theme.palette.grey[100],
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconChevronRight strokeWidth={1.5} size={20} />
      </Box>
    </Box>
  );
};

export default ReviewCarousel;

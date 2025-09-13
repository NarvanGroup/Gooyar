import { Star } from "@mui/icons-material";
import Slider from "react-slick";
const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  arrows: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: "0",
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: "170px",
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: "0px",
      },
    },
  ],
};
export default function Testimonial1() {
  return (
    <>
      <section className="testimonial-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="section-title text-center mb-70">
                <h2 className="title title-animation">
                  <span>50+</span> <br /> کسب‌وکارها ما را انتخاب کرده اند
                </h2>
              </div>
            </div>
          </div>
          <div className="testimonial-item-wrap">
            <Slider {...settings} className="row testimonial-active">
              <div className="col">
                <div className="testimonial-item">
                  <div className="testimonial-shape">
                    <svg
                      viewBox="0 0 561 274"
                      fill="none"
                      x="0px"
                      y="0px"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M97.8407 0H531C547.569 0 561 13.4315 561 30V244C561 260.569 547.569 274 531 274H127.841C111.272 274 97.8407 260.569 97.8407 244V78.4298C97.8407 66.4626 90.7283 55.6401 79.7433 50.8921L6.37287 19.1792C-3.59343 14.8715 -0.516972 0 10.3404 0H97.8407Z"
                        fill="currentcolor"
                      />
                    </svg>
                  </div>
                  <div className="testimonial-thumb">
                    <img src="/assets/img/images/testi_avatar01.png" alt="" />
                  </div>
                  <div className="testimonial-content">
                    <div className="rating">
                      <Star />

                      <Star />

                      <Star />

                      <Star />

                      <Star />
                    </div>
                    <p>
                      از وقتی دستیار هوشمندتون رو وصل کردیم به واتساپ فروشگاه،
                      دیگه شب‌ها نگران پاسخ دادن به مشتریا نیستم. فروشمون هم
                      بیشتر شده چون هیچ سوالی بی‌جواب نمی‌مونه!
                    </p>
                    <div className="testimonial-bottom">
                      <h5 className="title">لهام محمدی</h5>
                      <span>مدیر فروشگاه لباس زنانه ماه‌پوش</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="testimonial-item">
                  <div className="testimonial-shape">
                    <svg
                      viewBox="0 0 561 274"
                      fill="none"
                      x="0px"
                      y="0px"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M97.8407 0H531C547.569 0 561 13.4315 561 30V244C561 260.569 547.569 274 531 274H127.841C111.272 274 97.8407 260.569 97.8407 244V78.4298C97.8407 66.4626 90.7283 55.6401 79.7433 50.8921L6.37287 19.1792C-3.59343 14.8715 -0.516972 0 10.3404 0H97.8407Z"
                        fill="currentcolor"
                      />
                    </svg>
                  </div>
                  <div className="testimonial-thumb">
                    <img src="/assets/img/images/testi_avatar02.png" alt="" />
                  </div>
                  <div className="testimonial-content">
                    <div className="rating">
                      <Star />

                      <Star />

                      <Star />

                      <Star />

                      <Star />
                    </div>
                    <p>
                      وقت‌گیری بیماران الان کاملاً اتوماتیکه. دستیار شما با دقت
                      و احترام کامل جواب می‌ده و تیم من تمرکزش روی درمان بیماران
                      مونده. عالی بود!
                    </p>
                    <div className="testimonial-bottom">
                      <h5 className="title"> دکتر فرشاد عزیزی</h5>
                      <span>مدیر کلینیک پوست و مو در تهران</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="testimonial-item">
                  <div className="testimonial-shape">
                    <svg
                      viewBox="0 0 561 274"
                      fill="none"
                      x="0px"
                      y="0px"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M97.8407 0H531C547.569 0 561 13.4315 561 30V244C561 260.569 547.569 274 531 274H127.841C111.272 274 97.8407 260.569 97.8407 244V78.4298C97.8407 66.4626 90.7283 55.6401 79.7433 50.8921L6.37287 19.1792C-3.59343 14.8715 -0.516972 0 10.3404 0H97.8407Z"
                        fill="currentcolor"
                      />
                    </svg>
                  </div>
                  <div className="testimonial-thumb">
                    <img src="/assets/img/images/testi_avatar03.png" alt="" />
                  </div>
                  <div className="testimonial-content">
                    <div className="rating">
                      <Star />

                      <Star />

                      <Star />

                      <Star />

                      <Star />
                    </div>
                    <p>
                      ما تو فصل سفر با حجم بالای پیام‌ها مواجهیم. این پلتفرم
                      کمکمون کرد به‌موقع جواب بدیم و حتی کارهای رزرو و پرداخت رو
                      هوشمند کنیم. بی‌نظیره!
                    </p>
                    <div className="testimonial-bottom">
                      <h5 className="title">نسرین بختیاری</h5>
                      <span>مدیر آژانس مسافرتی آوای سفر</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="testimonial-item">
                  <div className="testimonial-shape">
                    <svg
                      viewBox="0 0 561 274"
                      fill="none"
                      x="0px"
                      y="0px"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M97.8407 0H531C547.569 0 561 13.4315 561 30V244C561 260.569 547.569 274 531 274H127.841C111.272 274 97.8407 260.569 97.8407 244V78.4298C97.8407 66.4626 90.7283 55.6401 79.7433 50.8921L6.37287 19.1792C-3.59343 14.8715 -0.516972 0 10.3404 0H97.8407Z"
                        fill="currentcolor"
                      />
                    </svg>
                  </div>
                  <div className="testimonial-thumb">
                    <img src="/assets/img/images/testi_avatar04.png" alt="" />
                  </div>
                  <div className="testimonial-content">
                    <div className="rating">
                      <Star />

                      <Star />

                      <Star />

                      <Star />

                      <Star />
                    </div>
                    <p>
                      وی واتساپ و اینستاگرام همیشه درگیر سوالات تکراری بودیم.
                      الان هم پاسخ‌ها حرفه‌ای شده، هم تو وقت تیم پشتیبانی‌مون
                      صرفه‌جویی می‌شه. خیلی راضی‌ایم.
                    </p>
                    <div className="testimonial-bottom">
                      <h5 className="title">مهدی ابراهیمی</h5>
                      <span>مدیر آموزشگاه زبان پارس‌تاک </span>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}

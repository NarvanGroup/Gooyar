import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function Banner1() {
  return (
    <>
      <section className="banner-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-content ta-animated-headline">
                <h2
                  className="title ah-headline wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  <span>پشتیبانی هوشمند، ساده‌تر از همیشه </span>
                  <Typewriter
                    tag="span"
                    options={{
                      wrapperClassName: "ah-words-wrapper",
                      strings: ["گویار پاسخگوی شماست"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h2>
                <h2 className="title d-none wow fadeInUp" data-wow-delay=".2s">
                  پشتیبانی هوشمند، ساده‌تر از همیشه{" "}
                  <span>گویار پاسخگوی شماست</span>
                </h2>
                <p className="wow fadeInUp" data-wow-delay=".4s">
                  یک دستیار هوش مصنوعی قدرتمند برای کسب‌وکار شما؛ آماده برای
                  پشتیبانی در واتساپ، اینستاگرام، وب‌سایت، و حتی تماس تلفنی.
                </p>
                <div className="banner-btn">
                  <Link
                    href="/login"
                    className="gradient-btn wow fadeInLeft"
                    data-wow-delay=".6s"
                  >
                    شروع
                  </Link>
                  <Link
                    href="/work"
                    className="gradient-btn gradient-btn-two wow fadeInRight"
                    data-wow-delay=".6s"
                  >
                    گویار چگونه کار میکند؟
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

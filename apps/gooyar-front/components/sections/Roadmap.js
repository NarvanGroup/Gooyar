export default function Roadmap() {
  return (
    <>
      <section className="roadmap-area pt-140 pb-130">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb-70">
                <h2 className="title title-animation">
                  چگونه <span>کار میکند؟</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-9">
              <div className="roadmap-timeline-wrap">
                <div
                  className="roadmap-line"
                  data-background="assets/img/brand/Line.svg"
                />
                <ul className="list-wrap">
                  <li>
                    <div className="roadmap-item">
                      <div
                        className="roadmap-img wow fadeInLeft"
                        data-wow-delay=".2s"
                      >
                        <img
                          src="/assets/img/images/roadmap_img01.png"
                          alt=""
                        />
                        <span className="number">01</span>
                      </div>
                      <div
                        className="roadmap-content wow fadeInRight"
                        data-wow-delay=".2s"
                      >
                        <h4 className="title">دستیار هوشمندت رو بساز</h4>
                        <p>
                          تو پنل کاربری ما وارد شو، کسب‌و‌کارت رو تعریف کن،
                          اطلاعات مهم رو وارد کن (مثل سوالات پرتکرار، خدمات،
                          ساعات کاری و...) و در چند دقیقه دستیار اختصاصی خودت رو
                          بساز.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="roadmap-item">
                      <div
                        className="roadmap-content wow fadeInLeft"
                        data-wow-delay=".2s"
                      >
                        <h4 className="title">
                          دستیارت رو به کسب‌و‌کارت وصل کن
                        </h4>
                        <p>
                          شماره واتساپ، تلگرام، یا اینستاگرام کسب‌و‌کارت رو به
                          دستیار هوش مصنوعی‌ت وصل کن تا از همین حالا با
                          مشتری‌هات در ارتباط باشه.
                        </p>
                      </div>
                      <div
                        className="roadmap-img wow fadeInRight"
                        data-wow-delay=".2s"
                      >
                        <img
                          src="/assets/img/images/roadmap_img02.png"
                          alt=""
                        />
                        <span className="number">02</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="roadmap-item">
                      <div
                        className="roadmap-img wow fadeInLeft"
                        data-wow-delay=".2s"
                      >
                        <img
                          src="/assets/img/images/roadmap_img03.png"
                          alt=""
                        />
                        <span className="number">03</span>
                      </div>
                      <div
                        className="roadmap-content wow fadeInRight"
                        data-wow-delay=".2s"
                      >
                        <h4 className="title">منتظر جادوی کانورا باش</h4>
                        <p>
                          از اینجا به بعد، دستیار هوشمندت ۲۴ ساعته، سریع و
                          حرفه‌ای به مشتری‌ها پاسخ می‌ده — با نظارت کامل تو،
                          گزارش‌گیری دقیق و امکان مداخله‌ی انسانی هر وقت که
                          بخوای.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

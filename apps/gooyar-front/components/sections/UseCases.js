import Link from "next/link";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <section className="use-cases-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="use-cases-content">
                <div className="section-title mb-25">
                  <h2 className="title title-animation">
                    با پشتیبانی هوشمند <span>سریع‌تر</span> و بهتر باشید
                  </h2>
                </div>
                <p>
                  فقط با چند کلیک پشتیبان هوشمند خودتون رو بسازید. با هوش مصنوعی
                  فرآیندهاتون رو اتوماتیک کنید و در جند ثانیه گزارش دقیق و کامل
                  دریافت کنید
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="use-cases-nav-wrap">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" onClick={() => handleOnClick(1)}>
                    <button
                      className={
                        activeIndex == 1 ? "nav-link active" : "nav-link"
                      }
                    >
                      فروشگاه آنلاین
                    </button>
                  </li>
                  <li className="nav-item" onClick={() => handleOnClick(2)}>
                    <button
                      className={
                        activeIndex == 2 ? "nav-link active" : "nav-link"
                      }
                    >
                      مراکز درمانی
                    </button>
                  </li>
                  <li className="nav-item" onClick={() => handleOnClick(3)}>
                    <button
                      className={
                        activeIndex == 3 ? "nav-link active" : "nav-link"
                      }
                    >
                      هتل
                    </button>
                  </li>
                  <li className="nav-item" onClick={() => handleOnClick(4)}>
                    <button
                      className={
                        activeIndex == 4 ? "nav-link active" : "nav-link"
                      }
                    >
                      شرکت خدماتی
                    </button>
                  </li>
                  <li className="nav-item" onClick={() => handleOnClick(5)}>
                    <button
                      className={
                        activeIndex == 5 ? "nav-link active" : "nav-link"
                      }
                    >
                      مشاوره و آموزش
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className={
                      activeIndex == 1
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                  >
                    <div className="cases-details-wrap">
                      <div className="cases-details-img">
                        <img src="/assets/img/images/cases_img01.png" alt="" />
                      </div>
                      <div className="cases-details-content">
                        <div className="icon">
                          <HomeIcon />
                        </div>
                        <p>
                          شما یک دستیار فروش آنلاین برای یک فروشگاه اینترنتی
                          هستید. با استفاده از داده‌های محصولات، قیمت‌ها،
                          موجودی، توضیحات فنی، و دسته‌بندی‌ها، به کاربران در
                          انتخاب و خرید محصولات مشاوره بده. به سوالات پرتکرار
                          مانند تفاوت مدل‌ها، شرایط ارسال، نحوه پرداخت و مرجوعی
                          پاسخ بده و در صورت نیاز، کاربر را به صفحه مناسب هدایت
                          کن.
                        </p>
                        <div className="content-bottom">
                          <ul className="list-wrap">
                            <li>
                              <Link href="#">
                                <ContentCopyIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DownloadIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <ContentPasteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DeleteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <AddCircleIcon />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      activeIndex == 2
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                  >
                    <div className="cases-details-wrap">
                      <div className="cases-details-img">
                        <img src="/assets/img/images/cases_img01.png" alt="" />
                      </div>
                      <div className="cases-details-content">
                        <div className="icon">
                          <i className="fas fa-home-alt" />
                        </div>
                        <p>
                          شما دستیار هوشمند یک کلینیک پزشکی هستید. اطلاعات مربوط
                          به خدمات، پزشکان، تخصص‌ها، ساعت کاری و روند نوبت‌گیری
                          را دارید. به سوالات بیماران در مورد نوبت‌دهی، تخصص
                          پزشکان، شرایط مراجعه، پوشش بیمه، آدرس و... پاسخ بده.
                          در صورت نیاز، لینک نوبت‌دهی آنلاین را ارسال کن.
                        </p>
                        <div className="content-bottom">
                          <ul className="list-wrap">
                            <li>
                              <Link href="#">
                                <ContentCopyIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DownloadIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <ContentPasteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DeleteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <AddCircleIcon />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      activeIndex == 3
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                  >
                    <div className="cases-details-wrap">
                      <div className="cases-details-img">
                        <img src="/assets/img/images/cases_img01.png" alt="" />
                      </div>
                      <div className="cases-details-content">
                        <div className="icon">
                          <i className="fas fa-home-alt" />
                        </div>
                        <p>
                          شما دستیار یک آژانس مسافرتی هستید. اطلاعات تورها،
                          مقاصد گردشگری، قیمت‌ها، شرایط سفر، و خدمات اقامتی را
                          دارید. به سوالات کاربران درباره زمان تورها، شرایط
                          ثبت‌نام، ویزا، قیمت و نوع خدمات پاسخ بده و پیشنهادهای
                          مناسب براساس علایق کاربر بده.
                        </p>
                        <div className="content-bottom">
                          <ul className="list-wrap">
                            <li>
                              <Link href="#">
                                <ContentCopyIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DownloadIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <ContentPasteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DeleteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <AddCircleIcon />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      activeIndex == 4
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                  >
                    <div className="cases-details-wrap">
                      <div className="cases-details-img">
                        <img src="/assets/img/images/cases_img01.png" alt="" />
                      </div>
                      <div className="cases-details-content">
                        <div className="icon">
                          <i className="fas fa-home-alt" />
                        </div>
                        <p>
                          شما پشتیبان یک شرکت خدماتی هستید که خدماتی مثل نظافت،
                          برق‌کاری، لوله‌کشی و تعمیرات خانگی ارائه می‌دهد.
                          براساس اطلاعات خدمات، تعرفه‌ها، مناطق تحت پوشش و
                          زمان‌بندی، به سوالات کاربران پاسخ بده و سفارش خدمات را
                          ثبت کن یا لینک ثبت سفارش را ارسال کن.
                        </p>
                        <div className="content-bottom">
                          <ul className="list-wrap">
                            <li>
                              <Link href="#">
                                <ContentCopyIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DownloadIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <ContentPasteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DeleteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <AddCircleIcon />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      activeIndex == 5
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                  >
                    <div className="cases-details-wrap">
                      <div className="cases-details-img">
                        <img src="/assets/img/images/cases_img01.png" alt="" />
                      </div>
                      <div className="cases-details-content">
                        <div className="icon">
                          <i className="fas fa-home-alt" />
                        </div>
                        <p>
                          شما دستیار یک پلتفرم آموزشی/مشاوره‌ای هستید. اطلاعات
                          مربوط به دوره‌ها، مشاوران، هزینه‌ها، نحوه شرکت، و
                          زمان‌بندی جلسات را دارید. به سوالات کاربران درباره
                          انتخاب دوره مناسب، سطح محتوا، هزینه‌ها، شرایط ثبت‌نام
                          و دسترسی به مشاوران پاسخ بده.
                        </p>
                        <div className="content-bottom">
                          <ul className="list-wrap">
                            <li>
                              <Link href="#">
                                <ContentCopyIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DownloadIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <ContentPasteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <DeleteIcon />
                              </Link>
                            </li>
                            <li>
                              <Link href="#">
                                <AddCircleIcon />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import LanguageDropdown from "@/components/elements/LanguageDropdown";
import Link from "next/link";
import Sidebar from "../Sidebar";

export default function Header1({ scroll, handleMobileMenu }) {
  return (
    <>
      <header>
        <div
          id="sticky-header"
          className={`menu-area transparent-header ${
            scroll ? "sticky-menu" : ""
          }`}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                  <i className="fas fa-bars" />
                </div>
                <div className="menu-wrap">
                  <nav className="menu-nav">
                    <div className="logo">
                      <Link href="/">
                        <img src="/assets/img/logo/logo.png" alt="Logo" />
                      </Link>
                    </div>
                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                      <ul className="navigation">
                        {/* <li className="active menu-item-has-children tg-mega-menu-has-children">
                          <Link href="#">Home</Link>
                          <div className="tg-mega-menu-wrap black-bg">
                            <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-4">
                              <div className="col">
                                <div className="mega-menu-item active">
                                  <div className="mega-menu-thumb">
                                    <Link href="/">
                                      <img
                                        src="/assets/img/images/home_img01.jpg"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="mega-menu-content">
                                    <h4 className="title">
                                      <Link href="/">
                                        01: Ai Content Writer
                                      </Link>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="mega-menu-item">
                                  <div className="mega-menu-thumb">
                                    <Link href="/index-2">
                                      <img
                                        src="/assets/img/images/home_img02.jpg"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="mega-menu-content">
                                    <h4 className="title">
                                      <Link href="/index-2">
                                        02: Text to Video Ai
                                      </Link>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="mega-menu-item">
                                  <div className="mega-menu-thumb">
                                    <Link href="/index-3">
                                      <img
                                        src="/assets/img/images/home_img03.jpg"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="mega-menu-content">
                                    <h4 className="title">
                                      <Link href="/index-3">
                                        03:Text to Speech Ai
                                      </Link>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="mega-menu-item">
                                  <div className="mega-menu-thumb">
                                    <img
                                      src="/assets/img/images/coming_soon.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="mega-menu-content">
                                    <h4 className="title">04: Coming Soon</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li> */}
                        <li className="menu-item-has-children">
                          <Link href="#">سرویس ها</Link>
                          <ul className="sub-menu">
                            <li>
                              <Link href="/work">منشی هوشمند</Link>
                            </li>
                            <li>
                              <Link href="/faq">پذیرش هوشمند</Link>
                            </li>
                            <li>
                              <Link href="/help">رزروکننده هوشمند</Link>
                            </li>
                            <li>
                              <Link href="/job">پشتیبانی مشتریان هوشمند</Link>
                            </li>
                            <li>
                              <Link href="/job-details">دستیار هوشمند</Link>
                            </li>
                            <li>
                              <Link href="/job-details">
                                مشاور مشتریان هوشمند
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link href="#">راه‌حل‌ها</Link>
                          <ul className="sub-menu">
                            <li>
                              <Link href="/work">آموزش</Link>
                            </li>
                            <li>
                              <Link href="/work">خدمات بانکی</Link>
                            </li>
                            <li>
                              <Link href="/faq">املاک</Link>
                            </li>
                            <li>
                              <Link href="/help">اتوموبیل</Link>
                            </li>
                            <li>
                              <Link href="/job">بیمه</Link>
                            </li>
                            <li>
                              <Link href="/job-details">درمان و سلامت</Link>
                            </li>
                            <li>
                              <Link href="/login">SaaS</Link>
                            </li>
                            <li>
                              <Link href="/404">تجارت الکترونیکی</Link>
                            </li>
                            <li>
                              <Link href="/404">تولید محتوا</Link>
                            </li>
                            <li>
                              <Link href="/404">مارکتینگ</Link>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children">
                          <Link href="#">نمونه کارها</Link>
                          <ul className="sub-menu">
                            <li>
                              <Link href="/blog">Our Blog</Link>
                            </li>
                            <li>
                              <Link href="/blog-details">Blog Details</Link>
                            </li>
                          </ul>
                        </li>{" "}
                        <li>
                          <Link href="/about">اینتگریشن</Link>
                        </li>
                        <li>
                          <Link href="/about">درباره ما</Link>
                        </li>
                        <li>
                          <Link href="/contact">تماس با ما</Link>
                        </li>
                        <li>
                          <Link href="/blog">بلاگ</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="header-action d-none d-md-block">
                      <ul className="list-wrap">
                        {/* <li className="header-lang">
                          <LanguageDropdown />
                        </li> */}
                        <li className="header-btn">
                          <Link href="/login" className="btn">
                            ورود/ثبت نام
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                {/* Mobile Menu  */}
                <div className="mobile-menu">
                  <nav className="menu-box">
                    <div className="close-btn" onClick={handleMobileMenu}>
                      <i className="fas fa-times" />
                    </div>
                    <div className="nav-logo">
                      <Link href="/">
                        <img src="/assets/img/logo/logo.png" alt="Logo" />
                      </Link>
                    </div>
                    <div className="menu-outer">
                      <Sidebar />
                    </div>
                    <div className="social-links">
                      <ul className="clearfix list-wrap">
                        <li>
                          <Link href="#">
                            <i className="fab fa-facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-instagram" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-linkedin-in" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-youtube" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="menu-backdrop" onClick={handleMobileMenu} />
                {/* End Mobile Menu */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

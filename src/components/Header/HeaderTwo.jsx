import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import logoImage from "../../../src/assets/img/logo/logo.png";
import $ from "jquery";
import BuyNow from "../Buttons/BuyNow";
import { useContext } from "react";
import { IcoContext } from "../../contexts/context";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectWallet from "../Buttons/ConnectWallet";
import GenerateReferral from "../Buttons/GenerateReferral";
// import { IcoContext } from ;

const HeaderTwo = () => {
  const { currentAccount, isWhitelisted } = useContext(IcoContext);

  // sticky nav bar
  const [stickyClass, setStickyClass] = useState({
    fixed: "",
    header: "",
  });

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight < 245
        ? setStickyClass({ fixed: "", header: "" })
        : setStickyClass({ fixed: "active-height", header: "sticky-menu" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  // mobile menu
  useEffect(() => {
    //SubMenu Dropdown Toggle
    if ($(".menu-area li.menu-item-has-children ul").length) {
      $(".menu-area .navigation li.menu-item-has-children").append(
        '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
      );
    }

    //Mobile Nav Hide Show
    if ($(".mobile-menu").length) {
      var mobileMenuContent = $(".menu-area .main-menu").html();
      $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);

      //Dropdown Button
      $(".mobile-menu li.menu-item-has-children .dropdown-btn").on(
        "click",
        function () {
          $(this).toggleClass("open");
          $(this).prev("ul").slideToggle(500);
        }
      );
      //Menu Toggle Btn
      $(".mobile-nav-toggler").on("click", function () {
        $("body").addClass("mobile-menu-visible");
      });

      //Menu Toggle Btn
      $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
    }
  }, []);

  // scroll to element by id
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // active link switching
  const { hash, pathname } = useLocation();
  const isActiveLink = (id) => {
    return id == hash ? "active" : "";
  };

  // const handleWalletConnect = async () => {
  //   if (window.ethereum) {
  //     connectWallet();
  //   } else {
  //     toast.error("Install Metamask", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  return (
    <header id="header">
      <ToastContainer />
      <div
        id="sticky-header"
        className={cn(
          "menu-area menu-style-two transparent-header",
          stickyClass.header
        )}
      >
        <div className="container custom-container-three">
          <div className="row">
            <div className="col-12">
              <div className="mobile-nav-toggler">
                <i className="fas fa-bars"></i>
              </div>

              <div className="menu-wrap">
                <nav className="menu-nav">
                  <div className="logo">
                    <Link to="/#">
                      <img
                        src={logoImage}
                        width={"70px"}
                        height={"70px"}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="navbar-wrap main-menu d-none d-lg-flex">
                    <ul className="navigation">
                      <li
                        className={cn(
                          hash == "" && "active",
                          " menu-item-has-children"
                        )}
                      >
                        <Link
                          to="/#home"
                          className="section-link"
                          onClick={() => handleClickScroll("home")}
                        >
                          Home
                        </Link>
                        {/* <ul className={cn("sub-menu")}>
                          <li className={cn(pathname == "/" && "active")}>
                            <NavLink to="/">Home One</NavLink>
                          </li>
                          <li
                            className={cn(pathname == "/home-two" && "active")}
                          >
                            <NavLink to="/home-two">Home Two</NavLink>
                          </li>
                        </ul> */}
                      </li>
                      <li className={cn(hash == "#about" && "active")}>
                        <Link
                          to="/#about"
                          className="section-link"
                          onClick={() => handleClickScroll("about")}
                        >
                          About us
                        </Link>
                      </li>
                      <li className={isActiveLink("#roadmap")}>
                        <Link
                          to="/#roadmap"
                          className="section-link"
                          onClick={() => handleClickScroll("roadmap")}
                        >
                          Roadmap
                        </Link>
                      </li>
                      <li className={isActiveLink("#faq")}>
                        <Link
                          to="/#faq"
                          className="section-link"
                          onClick={() => handleClickScroll("faq")}
                        >
                          Faq
                        </Link>
                      </li>
                      {/* <li className={"menu-item-has-children"}>
                        <Link to="/blog">Blog</Link>
                        <ul className={cn("sub-menu")}>
                          <li className={cn(pathname == "/blog" && "active")}>
                            <Link to="/blog">Our Blog</Link>
                          </li>
                          <li
                            className={cn(
                              pathname == "/blog-details" && "active"
                            )}
                          >
                            <Link to="/blog-details">Blog Details</Link>
                          </li>
                        </ul>
                      </li> */}
                      <li className={isActiveLink("#contact")}>
                        <Link
                          to="/#contact"
                          className="section-link"
                          onClick={() => handleClickScroll("contact")}
                        >
                          Contact us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="header-action d-none d-md-block">
                    <ul>
                      {currentAccount == null ? (
                        <>
                          <li className="header-lang"></li>

                          <li className="header-btn">
                            {/* <BuyNow label={"Buy Now"} /> */}
                            {/* <button
                              className="btn"
                              onClick={handleWalletConnect}
                            >
                              Connect Wallet
                            </button> */}
                            <ConnectWallet />
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="header-lang">
                            {`${currentAccount?.slice(
                              0,
                              5
                            )}...${currentAccount?.slice(
                              currentAccount?.length - 4
                            )}`}
                            <br />
                            {
                              <p>
                                <GenerateReferral label={"Referral Code"} />
                              </p>
                            }
                          </li>

                          <li className="header-btn">
                            <BuyNow label={"Buy Now"} />
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </nav>
              </div>

              {/* <!-- Mobile Menu  --> */}
              <div className="mobile-menu">
                <nav className="menu-box">
                  <div className="close-btn">
                    <i className="fas fa-times"></i>
                  </div>
                  <div className="nav-logo">
                    <Link to="/">
                      <img
                        src={"/images/icons/logo_dark.png"}
                        alt=""
                        title=""
                      />
                    </Link>
                  </div>

                  <div className="menu-outer">
                    {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
                  </div>
                  <div className="social-links">
                    <ul className="clearfix">
                      <li>
                        <Link to="#">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="#">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fab fa-youtube"></i>
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="menu-backdrop"></div>
              {/* <!-- End Mobile Menu --> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTwo;

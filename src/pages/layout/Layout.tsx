import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header>
        <Link className="home-button" onClick={scrollToTop} to="/">
          <img
            className="icon"
            src={require("../../assets/home.png")}
            alt={"home"}
          />
        </Link>
        <div className="logo-div">
          {" "}
          <img
            src={require("../../assets/logo.png")}
            alt={"pokedex-logo"}
          ></img>
        </div>
      </header>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

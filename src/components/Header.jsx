import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import WalletConnect from "./WalletConnect";
import { useSideBar } from "@/context/SideBar";
import { useRouter } from "next/router";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
const MainHeader = () => {
  const [width] = useWindowSize();
  const router = useRouter();
  const [tokenPrice, setTokenPrice] = useState(null);
  const { isOpen, openSidebar, closeSidebar } = useSideBar();
  const toggleSideBar = () => {
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const getTokenPrice = async () => {
    try {
      let result = await axios.get(
        "https://coins.llama.fi/prices/current/solana:5Wsd311hY8NXQhkt9cWHwTnqafk7BGEbLu8Py3DSnPAr"
      );
      if (result.data) {
        setTokenPrice(
          result.data.coins[
            "solana:5Wsd311hY8NXQhkt9cWHwTnqafk7BGEbLu8Py3DSnPAr"
          ].price
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTokenPrice();
  }, []);

  return (
    <div className="header-container">
      <div className="header smallHeader">
        <div className="header-content">
          <button
            className="header__logo"
            style={width > 910 ? {} : { marginRight: "0em", marginLeft: "1em" }}
          >
            <img src={"/assets/img/logo.jpg"} alt="" />
            <span
              id="compendex_name"
              style={{
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: 600,
                color: "rgb(255, 255, 255)",
                marginLeft: "0.6em",
              }}
            >
              Cyborg Dragon
            </span>
          </button>
          <div className="navbar-menu">
            <Link
              className={`${
                router.pathname === "/"
                  ? "header-link-btn-selected"
                  : "header-link-btn"
              } `}
              href={"/"}
            >
              <span>Swap</span>
            </Link>
          </div>
        </div>
        <div className="header-content-mobile">
          <button
            className="header__logo"
            onClick={() => {
              if (width > 910) {
                history.push("/");
              } else {
                toggleSideBar();
              }
            }}
            style={width > 910 ? {} : { marginRight: "0em", marginLeft: "1em" }}
          >
            <img src={"assets/img/logo.jpg"} alt="" />
            <span
              id="compendex_name"
              style={{
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: 600,
                color: "rgb(255, 255, 255)",
                marginLeft: "0.6em",
              }}
            >
              Cyborg Dragon
            </span>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "10px",
          }}
        >
          <button
            className="header__logo menu-icon"
            style={{ marginRight: "-10px" }}
          ></button>
          <a className="header__user wallet-btn">
            <WalletConnect />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;

import {
  mdiSwapHorizontalVariant,
  mdiToolboxOutline,
  mdiViewDashboard,
} from "@mdi/js";
import Icon from "@mdi/react";
import CandlestickChart from "@mui/icons-material/CandlestickChart";
import CloseIcon from "@mui/icons-material/Close";

import { Tooltip } from "@mantine/core";
import { HelpOutline } from "@material-ui/icons";
import DataObjectIcon from "@mui/icons-material/DataObject";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useSideBar } from "../context/SideBar";
import { useRouter } from "next/router";
const Sidebar = () => {
  const { isOpen, openSidebar, closeSidebar } = useSideBar();
  const router = useRouter();

  const toggleSideBar = () => {
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };
  const linkTarget = {
    pathname: "/",
    key: uuidv4(), // we could use Math.random, but that's not guaranteed unique.
    state: {
      applied: true,
    },
  };
  return (
    <div
      className={`sidebar sidebar_color ${isOpen ? "active" : ""} `}
      style={{
        backgroundColor: "#1f2024!important",
        borderColor: "#000000!important",
        zIndex: 99999,
      }}
    >
      <div className="sidebar__head">
        <Link className="sidebar__logo" href="/">
          <img
            alt=""
            className="sidebar__pic sidebar__pic_light"
            src={"/assets/img/logo.jpg"}
            style={{ height: 50, width: 50 }}
          />
          <img
            alt=""
            className="sidebar__pic sidebar__pic_dark"
            src={"/assets/img/logo.jpg"}
            style={{ height: 50, width: 50 }}
          />
        </Link>
        <button className="sidebar__toggle" onClick={toggleSideBar}>
          toggle
        </button>

        <button
          className="sidebar__close"
          onClick={() => {
            closeSidebar();
          }}
        >
          {/* <svg className="icon icon-close">
            <use xlinkHref="img/sprite.svg#icon-close" />
          </svg> */}
          <CloseIcon style={{ color: "#FFF" }} />
        </button>
      </div>
      <div className="sidebar__body">
        <nav className="sidebar__nav">
          <Tooltip placement="rightTop" title="Swap" color="dark">
            <Link
              href="/swap"
              className={`sidebar__item ${
                router.pathname === "/swap" ? "active" : ""
              }`}
            >
              <div className="sidebar__icon">
                <Icon path={mdiSwapHorizontalVariant} size={1} color="#FFF" />
              </div>
              <div className="sidebar__text">Swap</div>
            </Link>
          </Tooltip>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

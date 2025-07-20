import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { globalVar } from "../globalContext/GlobalContext";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Addtheatre from "./Addtheatre";
import SelectLocation from "./SelectLocation";
import SignUp from "../pages/SignUp";
import Addmovie from "./Addmovie";
import Corousel2 from "./Corousel2";
// import RegisterPage from "../pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import Sider from "./Sider";
import UpdateTheatre from "./UpdateTheatre";
import DeleteNotify from "./DeleteNotify";
import UpdateNotify from "./UpdateNotify";
import AddShows from "./AddShows";
import UpdateShows from "./UpdatedShows";
import UpdateMovie from "./UpdateMovie";

const Layout = () => {
  let {
    siderVisible,
    setSiderVisible,
    loginPanel,
    setLoginPanel,
    location,
    signupPanel,
    setSignupPanel,
    setLocation,
    moviePanel,
    setMoviePanel,
    addthatrePanel,
    setAddTheatrePanel,
    isModalOpen,
    setIsModalOpen,
    updateNotify,
    setupdateNotify,
    UpdateTheater,
    setUpdateTheater,
    addShowPanel,
    updateShowPanel,
    setUpdateShowPanel,
    updatemoviePanel,
  } = useContext(globalVar);

  return (
    <div>
      <Toaster />
      {UpdateTheater && <UpdateTheatre />}

      {addthatrePanel && <Addtheatre />}
      {isModalOpen && <DeleteNotify />}
      {updateNotify && <UpdateNotify />}
      {location && <SelectLocation />}
      {siderVisible && <Sider />}
      {moviePanel && <Addmovie />}
      {addShowPanel && <AddShows />}
      {updateShowPanel && <UpdateShows />}
      {updatemoviePanel && <UpdateMovie />}
      {loginPanel && <LoginPage />}
      {signupPanel && <SignUp />}

      <Navbar />
      <Outlet />

      {/* <Addmovie/> */}

      {/* {<Addtheatre />} */}

      {/* <Addmovie/> */}

      {/* <UpdateTheatre /> */}
    </div>
  );
};

export default Layout;

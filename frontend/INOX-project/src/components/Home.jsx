import React, { useContext } from "react";
import Corousel1 from "./Corousel1";
import Corousel2 from "./Corousel2";
import QuickBookNav from "../components/QuickBookNav";
import { globalVar } from "../globalContext/GlobalContext";

const Home = () => {
  let {inoxLoginType,
  setInoxLoginType,
} = useContext(globalVar);
  return (
    <div>
      <Corousel1 />
      <QuickBookNav />
      <Corousel2 />
    </div>
  );
};


export default Home;

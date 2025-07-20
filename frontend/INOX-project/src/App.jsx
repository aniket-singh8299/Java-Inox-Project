import React from "react";
import GlobalContext from "./globalContext/GlobalContext";
import { routingVar } from "./routing/InoxRouting";
import { RouterProvider } from "react-router-dom";
import Accordion1 from "./components/Accordion1";
import ShowTimings from "./components/Showtimings";
import UpdateTheatre from "./components/UpdateTheatre";

const App = () => {
  return (
  
  <GlobalContext>
      <RouterProvider router={routingVar} />
      
    </GlobalContext> 
    /* <Accordion1/> */
   /*  <ShowTimings/> */
   
  );
};

export default App;

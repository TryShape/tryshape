import React from "react";
import { App, Landing } from "../components";

const index = (props) => {
  return (
    <main>
      <Landing {...props} /> 
      <App {...props} />
    </main>
  );
};

export default index;
import React from "react";
import { App, Landing } from "../components";

const index = (props) => {
  const { user } = props;
  console.log(user);
  return (
    <main>
      { 
        user.length === 0 ? 
          (<Landing {...props} />) : 
          (<App {...props} />) 
      }
    </main>
  );
};

export default index;
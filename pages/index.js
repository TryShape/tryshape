import React from "react";
import { Landing } from "../components";

const index = (props) => {
  const { user } = props;
  console.log(user);
  return (
    <main>
      <Landing {...props} />
    </main>
  );
};

export default index;
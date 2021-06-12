import React, { useEffect, useState } from "react";

import { harperFetch } from "../../utils/HarperFetch";

import { shapes } from '../../data/shapes';

const App = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setData([]);
    setLoading(true);

    // fetching the shape data
    /*const shapes = await harperFetch({
      operation: "sql",
      sql: "SELECT * FROM tryshape.shapes",
    });*/

    console.log(shapes);

    await setData(shapes);
    setLoading(false);
  }, []);

  return(
    <div>
      Test
    </div>
  )
};

export default App;

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// harperDb fetch call
import { harperFetch } from "../../utils/HarperFetch";

// Dummy Shape Data
import { shapes } from "../../data/shapes";

// loader
import Loader from "react-loader-spinner";

// ShapeListing
import { ShapeList } from '..';

const App = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setData([]);
    setLoading(true);

    // fetching the shape data
    /*const shapes = await harperFetch({
      operation: "sql",
      sql: "SELECT * FROM tryshape.shapes",
    });*/
    console.log(shapes);
    let modifiedShapes = shapes.map((shape, index) => {
      shape.showAdvanced = false;
      return shape;
    });

    console.log(modifiedShapes);

    await setData(modifiedShapes);
    setLoading(false);
  }, []);

  

  return (
    <>
      {loading ? (
        <Loader
          style={{margin: '20% auto auto 42%'}}
          type="Circles"
          color="#eb3d86"
          height={300}
          width={300}
        />
      ) : (
        <ShapeList data={ data } />
      )}
    </>
  );
};

export default App;

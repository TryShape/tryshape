import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// harperDb fetch call
import { harperFetch } from "../../utils/HarperFetch";

// Dummy Shape Data
// import { shapes } from "../../data/shapes";

// loader
import Loader from "react-loader-spinner";

// ShapeListing
import { ShapeList, Header } from '..';

const App = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = props;

  useEffect(async () => {
    setData([]);
    setLoading(true);

    let shapes = [];

    if(user.length === 0) {
      // User is not logged In
      shapes = await harperFetch({
        operation: "sql",
        sql: "SELECT * from tryshape.shapes as s where s.private = false",
      });
    } else {
      // User is logged in. Let's fetch the private shape and pther public shapes.
      shapes = await harperFetch({
        operation: "sql",
        sql: `SELECT * from tryshape.shapes WHERE createdBy = '${user.email}' OR private = false`,
      });
    }

    console.log(shapes);
    let modifiedShapes = shapes.map((shape, index) => {
      shape.showAdvanced = false;
      return shape;
    });

    console.log(modifiedShapes);

    await setData(modifiedShapes);
    setLoading(false);
  }, [user]);

  

  return (
    <>
      <Header {...props} />
      {loading ? (
        <Loader
          style={{margin: '20% auto auto 42%'}}
          type="Circles"
          color="#eb3d86"
          height={300}
          width={300}
        />
      ) : (
        <ShapeList {...props} data={ data } />
      )}
    </>
  );
};

export default App;

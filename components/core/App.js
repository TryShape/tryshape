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
  const [data, setData] = useState([]); // shapes
  const [loading, setLoading] = useState(true); // shapes loading

  const [searchTerm, setSearchTerm] = useState(""); // search
  const [sort, setSort] = useState("recent"); // sort

  const [shapeAction, setShapeAction] = useState({
    'action': '',
    'payload': {}
  });
  
  const { user } = props;

  useEffect(async () => {
    setData([]);
    setLoading(true);
    let shapes = [];

    if(user.length === 0) {
      // User is not logged In. Fetch all the public shapes
      shapes = await harperFetch({
        operation: "sql",
        sql: `SELECT * 
          FROM tryshape.shapes s 
          INNER JOIN tryshape.users u 
          ON s.createdBy=u.email 
          WHERE s.private=false
          ORDER BY s.likes DESC`,
      });
    } else {
      // User is logged in. Let's fetch the private shape and other public shapes.
      shapes = await harperFetch({
        operation: "sql",
        sql: `SELECT *
          FROM tryshape.shapes s
          INNER JOIN tryshape.users u 
          ON s.createdBy=u.email 
          WHERE s.private=false 
          OR createdBy = '${user.email}'
          ORDER BY s.likes DESC`,
      });

      // Fetch the shapes liked by the logged-in user
      const likedShapes = await harperFetch({
        operation: "sql",
        sql: `SELECT *
          FROM tryshape.likes 
          WHERE email = '${user.email}'`,
      });

      // If there are liked shapes, take out the shape_id
      if (likedShapes.length > 0) {
        let likedShapeIds = likedShapes.map((liked, index) => {
          return liked['shape_id'];
        })
        shapes.map((shape, index) => {
         
            if (likedShapeIds.includes(shape['shape_id'])) {
              shape['liked'] = true;
            } else {
              shape['liked'] = false;
            }
            return shape;
        });
      }
    }

    // Add the showAdvanced property
    shapes.map((shape, index) => {
      shape.showAdvanced = false;
      return shape;
    });

    console.log(shapes);
    console.log({shapeAction});
    await setData(shapes);
    console.log(shapes);
    setLoading(false);
  }, [user, shapeAction]);

  return (
    <>
      <Header {...props} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sort={sort}
        setSort={setSort}
        shapeAction={shapeAction} 
        setShapeAction={setShapeAction} />
      {loading ? (
        <Loader
          style={{margin: '20% auto auto 42%'}}
          type="Circles"
          color="#eb3d86"
          height={300}
          width={300}
        />
      ) : (
        <ShapeList {...props} data={ data } searchTerm={searchTerm} sort={sort} />
      )}
    </>
  );
};

export default App;

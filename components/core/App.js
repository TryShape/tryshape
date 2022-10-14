import React, { useEffect, useState } from "react";

// axios
import axios from "axios";

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

    if (user.length === 0) {
      // User is not logged In. Fetch all the public shapes 
      const response = await axios.get("/api/GET/shapes", {
        params: {
          type: 'public'
        }
      });
      shapes = response.data;
    } else {
      // User is logged in. Let's fetch the private shape and other public shapes.
      const response = await axios.get("/api/GET/shapes", {
        params: {
          type: 'public-logged-in',
          email: user.email
        }
      });
      shapes = response.data;

      // Fetch the shapes liked by the logged-in user
      const likedResponse = await axios.get("/api/GET/likes", {
        params: {
          email: user.email
        }
      });
      const likedShapes = likedResponse.data;

      // If there are liked shapes, take out the shape_id
      if (likedShapes.length > 0) {
        let likedShapeIds = likedShapes.map((liked) => {
          return liked['shape_id'];
        })
        shapes.map((shape) => {

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
    if (shapes && shapes.length > 0) {
      shapes.map((shape) => {
        shape.showAdvanced = false;
        return shape;
      });
      setData(shapes);
    } else {
      setData([]);
    }
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
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          type="Circles"
          color="rgba(var(--color-brand-rgb), 0.6)"
          height={200}
          width={200}
        />
      ) : (
        <ShapeList
          {...props}
          data={data}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          sort={sort}
          shapeAction={shapeAction}
          setShapeAction={setShapeAction}
        />
      )}
    </>
  );
};

export default App;

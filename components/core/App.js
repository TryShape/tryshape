import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { harperFetch } from "../../utils/HarperFetch";

import { shapes } from "../../data/shapes";

import toast from "react-hot-toast";

const Shape = dynamic(import("react-clip-path"), { ssr: false });
import Switch from "react-switch";

import {
  ShapeCards,
  ShapeCard,
  ShapeName,
  ShapePallete,
  ShapeDetailsItems,
  ShapeCardSwitch,
  ShapeActions,
  ShapeCardHeader,
  CopyIcon,
  DownloadIcon,
  LikeIcon,
} from "../utils/StyledComponents";

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
    let modifiedShapes = shapes.map((shape, index) => {
      shape.showAdvanced = false;
      return shape;
    });
    console.log(modifiedShapes);

    await setData(modifiedShapes);
    setLoading(false);
  }, []);

  const handleSwicth = (shapeName) => {
    console.log(shapeName);

    let modifiedShapes = data.map((shape, index) => {
      if (shape.name === shapeName) {
        return {
          ...shape,
          showAdvanced: !shape.showAdvanced,
        };
      }
      return shape;
    });
    console.log(modifiedShapes);
    setData(...[modifiedShapes]);
  };

  const getShapeFileName = (name) => {
    return name.split(" ").join("-");
  };

  async function performCopy(event, formula) {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(formula);
      toast.success("Successfully Copied!");
      console.log("The clip-path formula copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ShapePallete>
          <ShapeCards>
            {data.map((shape, index) => (
              <React.Fragment key={index}>
                <ShapeCard>
                  <ShapeCardHeader>
                    <ShapeName>{shape.name}</ShapeName>
                    <ShapeActions>
                      <span title="Like">
                        <LikeIcon size={24} />
                      </span>{" "}
                      <span title="Download">
                        <DownloadIcon
                          size={24}
                          onClick={(event) =>
                            saveAsPng(
                              event,
                              `${getShapeFileName(shape.name)}-id`,
                              getShapeFileName(shape.name)
                            )
                          }
                        />
                      </span>
                    </ShapeActions>
                  </ShapeCardHeader>
                  <Shape
                    width="300px"
                    height="300px"
                    name={shape.name}
                    id={`${getShapeFileName(shape.name)}-id`}
                    backgroundColor="#eb3d86"
                    showShadow={shape.showAdvanced}
                  />

                  <ShapeCardSwitch>
                    <label htmlFor={`${getShapeFileName(shape.name)}-form`}>
                      <span>Show Clip-Path Info</span>{" "}
                      <Switch
                        onChange={() => handleSwicth(shape.name)}
                        checked={shape.showAdvanced}
                        id={`${getShapeFileName(shape.name)}-form`}
                      />
                    </label>
                  </ShapeCardSwitch>

                  {shape.showAdvanced && (
                    <ShapeDetailsItems>
                      <span>
                        <b>Clip-Path:</b>{" "}
                        <code>
                          <b>{shape.formula}</b>
                        </code>
                      </span>{" "}
                      <span title="Copy">
                        <CopyIcon
                          size={24}
                          onClick={(event) => performCopy(event, shape.formula)}
                        />
                      </span>
                    </ShapeDetailsItems>
                  )}
                </ShapeCard>
              </React.Fragment>
            ))}
          </ShapeCards>
        </ShapePallete>
      )}
    </>
  );
};

export default App;

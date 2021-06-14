import React, { useState } from "react";
import dynamic from "next/dynamic";

// Toast
import toast from "react-hot-toast";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

// Switch
import Switch from "react-switch";

// Shape Listing Styled-Componentns
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
  } from './StyledComponents';

const ShapeList = ({ data }) => {

  const [shapes, setShapes] = useState(data);

  const handleSwicth = (shapeName) => {
    console.log(shapeName);

    let modifiedShapes = shapes.map((shape, index) => {
      if (shape.name === shapeName) {
        return {
          ...shape,
          showAdvanced: !shape.showAdvanced,
        };
      }
      return shape;
    });
    console.log(modifiedShapes);
    setShapes(...[modifiedShapes]);
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
    <ShapePallete>
      <ShapeCards>
        {shapes.map((shape, index) => (
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
  );
};

export default ShapeList;

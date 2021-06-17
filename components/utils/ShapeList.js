import React, { useState } from "react";

// Styled Component
import styled from "styled-components";

// dynamic from Next.js
import dynamic from "next/dynamic";

// Toast
import toast from "react-hot-toast";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

// Switch
import Switch from "react-switch";

// icons
import { FiCopy, FiDownload, FiHeart, FiLock } from 'react-icons/fi';
import { BiExport } from "react-icons/bi";

// Export Shape
import { ExportShape } from '..';

// misc unitless
import { getShapeFileName, getShapeId } from '../../utils/misc';

// Shape Listing Styled-Componentns
const ShapeCards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const ShapeCard = styled.div`
  width: 400px;
  min-height: 456px;
  border: 1px solid #ececec;
  border-radius: 4px;
  padding: 5px;
  margin: 5px;
  background-color: #ebebeb;
`;

const ShapeActions = styled.div`
  float: right;
`;

const ShapeName = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Playground = styled.div`
  width: 100%;
`;

const ShapeDetails = styled.ul`
  background-color: #ebebeb;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
`;

const ShapeDetailsItems = styled.li`
  word-wrap: break-word;
`;

const ShapePallete = styled.div`
  margin-top: 5px;
`;

const ShapeCardHeader = styled.div`
  padding: 5px;
  margin: 5px;
`;

const ShapeCardSwitch = styled.div`
  margin: 5px auto auto 9px;
`;

const CopyIcon = styled(FiCopy)`
  cursor: pointer;
  &:hover {
    color: #f71b76;
  }
`;

const ExportIcon = styled(BiExport)`
  cursor: pointer;
  &:hover {
    color: #f71b76;
  }
`;

const LikeIcon = styled(FiHeart)`
  cursor: pointer;
  &:hover {
    color: #f71b6f;
  }
`;

const ShapeList = ({ setOpen, user, data }) => {

  const [shapes, setShapes] = useState(data);
  const [showExportModal, setShowExportModal] = useState(false);
  const [shapeToExport, setShapeToExport] = useState();

  const handleSwicth = (shapeName) => {
    
    let modifiedShapes = shapes.map((shape, index) => {
      if (shape.name === shapeName) {
        return {
          ...shape,
          showAdvanced: !shape.showAdvanced,
        };
      }
      return shape;
    });
    setShapes(...[modifiedShapes]);
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

  const performExport = shape => {
    if (user.length === 0) {
      setOpen(true);
    } else {
      setShapeToExport(shape);
      setShowExportModal(true);
    }
  }

  return (
    <ShapePallete>
      <ShapeCards>
        
        { shapeToExport && <ExportShape 
          show={ showExportModal } 
          setShow={ setShowExportModal }
          shape = { shapeToExport } /> }

        {shapes.map((shape, index) => (
          <React.Fragment key={index}>
            <ShapeCard>
              <ShapeCardHeader>
                <ShapeName>{shape.name}</ShapeName>
                {shape.private && <FiLock />}
                <ShapeActions>
                  <span title="Like">
                    <LikeIcon size={24} />
                  </span>{" "}
                  <span title="Export">
                    <ExportIcon
                      size={24}
                      onClick={() => performExport(shape)}
                    />
                  </span>
                </ShapeActions>
              </ShapeCardHeader>
              <Shape
                width="300px"
                height="300px"
                name={shape.name}
                id={getShapeId(shape.name)}
                backgroundColor= {shape.backgroundColor || "#eb3d86"}
                showShadow={shape.showAdvanced}
              />

              <div>
                <span>Created By {shape.createdBy} at {shape['__createdtime__']}</span>
              </div>

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

import React, { useState } from "react";

// Styled Component
import styled from "styled-components";

// dynamic from Next.js
import dynamic from "next/dynamic";

// harperDb fetch call
import { harperFetch } from "../../utils/HarperFetch";

// Toast
import toast from "react-hot-toast";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

// Switch
import Switch from "react-switch";

// icons
import { FiCopy, FiDownload, FiLock } from 'react-icons/fi';
import { BiExport } from "react-icons/bi";
import { BsFillHeartFill, BsHeart} from "react-icons/bs";

// Export Shape
import { ExportShape } from '..';

// misc unitless
import { getShapeFileName, getShapeId } from '../../utils/misc';

// date-fns
import { formatRelative } from "date-fns";

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

const LikeIcon = styled(BsHeart)`
  cursor: pointer;
  color: red;
  &:hover {
    color: #f71b6f;
  }
`;

const LikeFilledIcon = styled(BsFillHeartFill)`
  cursor: pointer;
  color: red;
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

  /**
   * Copy the clip-path value to clipboard
   */
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

  /**
   * Method to execute when user clicks on the export shape
   */
  const performExport = shape => {
    // Check if user logged-in
    if (user.length === 0) {
      // Show the login modal if user is not authenticated
      setOpen(true);
    } else {
      // Set the shape details to export
      setShapeToExport(shape);
      // Show the export modal
      setShowExportModal(true);
    }
  }

  /**
   * Method to execute when user clicks on the likes
   */
  const performLike = async (event, shapeId) => {
    // Check if user logged-in
    if (user.length === 0) {
      // Show the login modal if user is not authenticated
      setOpen(true);
    } else {
      // Good to go. Initialize likes
      let likes = 0;

      // Check if already an entry for this user's like
      // for the shape present.
      const isPresent = await harperFetch({
        operation: "sql",
        sql: `SELECT * 
            FROM tryshape.likes 
            WHERE shape_id='${shapeId}' AND email='${user.email}'`,
      });
      // Get the latest likes count from db
      const returnValue = await harperFetch({
        operation: "sql",
        sql: `SELECT s.likes 
          FROM tryshape.shapes s 
          WHERE s.shape_id='${shapeId}'`,
      });
          
      if (isPresent.length === 0) {
        // If not present, add for like
        const insertLike = await harperFetch({
          operation: "sql",
          sql: `INSERT into tryshape.likes(shape_id, email) 
              values('${shapeId}', '${user.email}')`,
        });

        if (insertLike) {
          // Update the count by 1
          likes = returnValue[0].likes + 1;
        }
      } else {
        // If present, delete to remove like
        const deleteLike = await harperFetch({
          operation: "sql",
          sql: `DELETE from tryshape.likes 
              WHERE shape_id='${shapeId}' AND email='${user.email}'`,
        });
        if (deleteLike) {
          // update the like count decrease by 1
          likes = returnValue[0].likes - 1;
        }
      }

      // Update the shape data with the updated count
      const updated = await harperFetch({
        operation: "sql",
        sql: `UPDATE tryshape.shapes SET likes = ${likes} WHERE shape_id='${shapeId}'`
      });

      // Update the shape data in the shapes array
      let modifiedShapes = shapes.map((shape, index) => {
        if (shape['shape_id'] === shapeId) {
          return {
            ...shape,
            liked: !shape.liked,
            likes: likes
          };
        }
        return shape;
      });
      setShapes(...[modifiedShapes]);
    }
  };

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
                    {
                      shape.liked ? 
                        (<LikeFilledIcon 
                          size={24} 
                          onClick={(event, shapeId) => performLike(event, shape['shape_id'])}/>) 
                        :
                        (<LikeIcon 
                          size={24} 
                          onClick={(event, shapeId) => performLike(event, shape['shape_id'])}/>)
                    }
                    {shape.likes}
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
                <span>
                  Created By 
                  <img src={shape.photoURL} alt={shape.name1} height='30px' width='30px' />
                  {shape.name1} at {formatRelative(shape['__createdtime__'], new Date())}
                </span>
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

import React, { useState, useEffect } from "react";

// Bootstrap
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";

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
import { ExportShape, CopyShapeSource, NoShapeFound } from '..';

// CreateShape to edit shape
import { CreateShape } from "..";

// misc unitless
import { getShapeFileName, getShapeId } from '../../utils/misc';

// date-fns
import { formatRelative } from "date-fns";

// Shape Listing Styled-Componentns
const ShapeCards = styled.div`
    padding: 5rem 0 2rem 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
    grid-gap: 2rem;   
`;

const ShapeCard = styled.div`
  border-radius: 0.6rem;
  background-color: var(--color-neutral-10);
  overflow: hidden;
  box-shadow: 3px 10px 18px 0 rgb(111 118 138 / 6%);

  &:hover {
    box-shadow: 3px 33px 81px 0 rgb(111 118 138 / 26%);

    .shape-actions {
      opacity: 1;
    }
  }
`;

const ShapeActionsContainer = styled.div`
  padding: 2rem;
  display: flex;
  grid-gap: 1rem;
  justify-content: center;
`;

const ShapeActions = styled.div`
  opacity: 0;
  background: rgba(var(--color-neutral-100-rgb), 0.5);
  transition: all .3s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ShapeName = styled.h4`
  margin: 0 0 0.8rem 0;
  font-weight: var(--fw-bold);
  font-size: var(--fs-rg);
  color: var(--color-neutral-100);
`;

const ShapeNameHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShapeLikes = styled.div`
  display: flex;
  align-items: center;
  height: 1.6rem;

  svg {
    margin-right: 0.3rem;
  }
`;

const ShapeLikesCount = styled.div`
  font-size: var(--fs-sm);
  color: var(--color-neutral-60);
`;

const ShapeCredits = styled.div`
  display: flex;
  align-items: center;
  border-top: solid 1px var(--color-neutral-20);
  padding-top: 1rem;
`;

const ShapeCreditsOwner = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: var(--fs-md);
`;

const ShapeCreditsDate = styled.small`
  margin-top: 0.3rem;
  font-size: var(--fs-sm);
  color: var(--color-neutral-50);
  line-height: 1;
`;

const ShapeCreditsOwnerName = styled.div`
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--color-neutral-60);
  line-height: 1;
`;

const ShapeCreditsThumb = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  margin-right: 0.4rem;
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

const ShapeCardsContainer = styled.div`
  background-color: var(--color-neutral-20);
`;

const ShapeCardBody = styled.div`
  position: relative;
  padding: 1rem 1.6rem;
`;

const ShapeCardHeader = styled.div`
  margin: 0;
  padding: 0 1.8rem 1.6rem 1.8rem;
`;

const ShapeCardSwitch = styled.div`
  display: none;
  margin: 5px auto auto 9px;
`;

const CopyIcon = styled(FiCopy)`
  cursor: pointer;
`;

const ExportIcon = styled(BiExport)`
  cursor: pointer;
`;

const LikeIcon = styled(BsHeart)`
  cursor: pointer;
`;

const LikeFilledIcon = styled(BsFillHeartFill)`
  cursor: pointer;
`;

const ShapeList = (
  { 
    setOpen, 
    user, 
    data, 
    searchTerm, 
    sort 
  }) => {

  const filterShape = (shapes, searchTerm) => {
    if (!searchTerm) {
      return shapes;
    }
    return shapes.filter((shape) => {
      const shapeName = shape.name.toLowerCase();
      return shapeName.includes(searchTerm.toLowerCase());
    })
  }
  // All shapes
  const [shapes, setShapes] = useState(data);
  // filtered shapes as state
  const [filteredShape, setFilteredShape] = useState(shapes);

  // All about export shape states
  const [showExportModal, setShowExportModal] = useState(false);
  const [shapeToExport, setShapeToExport] = useState();

  // All about copy source states
  const [showCopySourceModal, setCopySourceModal] = useState(false);
  const [shapeToSourceCopy, setShapeToSourceCopy] = useState();

  // All about editing private shapes
  const [showEditModal, setShowEditModal] = useState(false);
  const [shapeToEdit, setShapeToEdit] = useState();

  useEffect(() =>{
    const copy = [...shapes];
    if(sort === 'recent') {
      copy.sort((a, b) => b.__createdtime__ - a.__createdtime__);
    } else if(sort === 'popularity') {
      copy.sort((a, b) => b.likes - a.likes);
    } else if(sort === 'oldest') {
      copy.sort((a, b) => a.__createdtime__ - b.__createdtime__);
    }
    setFilteredShape(filterShape(copy, searchTerm));
  }, [searchTerm, shapes, sort]); 

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
   * Method to execute when use clicks on the copy source
   */
  async function performCopySource(shape) {
    setShapeToSourceCopy(shape);
    setCopySourceModal(true);
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
   * Method to execute when user clicks on the edit shape
   */
  const performEdit = shape => {
    // Set the shape details to edit
    setShapeToEdit(shape);
    // Show the export modal
    setShowEditModal(true);
  }

  const closeEditModal = () => {
    setShowEditModal(false);
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
      //setData(...[modifiedShapes]);
    }
  };

  

  return (
    <ShapeCardsContainer>
      <Container>
       <ShapeCards>
        { shapeToExport && <ExportShape 
          show={ showExportModal } 
          setShow={ setShowExportModal }
          shape = { shapeToExport } /> }

        { shapeToSourceCopy && <CopyShapeSource
          show= {showCopySourceModal}
          setShow={ setShapeToSourceCopy }
          shape= { shapeToSourceCopy } />
        }

        { shapeToEdit && <CreateShape
          show= {showEditModal}
          handleClose={ closeEditModal }
          shapeInformation= { shapeToEdit }
          edit={true} />
        }

        {
          filteredShape.length === 0 ? <NoShapeFound /> : filteredShape.map((shape, index) => (
          <React.Fragment key={index}>
            <ShapeCard>
              <ShapeCardBody>
                <ShapeNameHeader>
                  <ShapeName>{shape.name}{shape.private && <FiLock />}</ShapeName>
                  <ShapeLikes><LikeFilledIcon size='16px' color='var(--color-neutral-40)'/><ShapeLikesCount>{shape.likes}</ShapeLikesCount></ShapeLikes>
                </ShapeNameHeader>
                <Shape
                  width="240px"
                  height="240px"
                  name={shape.name}
                  id={getShapeId(shape.name)}
                  formula={shape.formula}
                  backgroundColor= {shape.backgroundColor || "#eb3d86"}
                  showShadow={shape.showAdvanced}
                />
                <ShapeActions className="shape-actions">
                  <ShapeActionsContainer>
                  <span
                    onClick={(event, shapeId) => performLike(event, shape['shape_id'])}>
                    {
                      shape.liked ? 
                        (
                          <Button title="Remove Like" variant="danger" className="btn-icon">
                            <LikeFilledIcon size={24} />
                          </Button>
                        ) 
                        :
                        (
                          <Button title="Add Like" variant="outline-light" className="btn-icon">
                            <LikeIcon size={24} />
                          </Button>
                        )
                    }
                    
                  </span>{" "}
                  <Button title="Export Shape" variant="outline-light" onClick={() => performExport(shape)} className="btn-icon">
                    <ExportIcon
                      size={24} />
                  </Button>
                  <Button title="Copy Source" variant="outline-light" onClick={() => performCopySource(shape)} className="btn-icon">
                    <CopyIcon
                      size={24} />
                  </Button>
                  {shape.private ? 
                    <Button title="Edit Shape" vairant="outline-light" onClick={() => {performEdit(shape); console.log(shape)}} className="btn-icon">
                      Edit
                    </Button> : null
                  }
                  </ShapeActionsContainer>
                </ShapeActions>
              </ShapeCardBody>
              <ShapeCardHeader>
                <ShapeCredits>
                  <ShapeCreditsThumb src={shape.photoURL} alt={shape.name1} />
                  <ShapeCreditsOwner>
                    <ShapeCreditsOwnerName>{shape.name1}</ShapeCreditsOwnerName>
                    <ShapeCreditsDate>at {formatRelative(shape['__createdtime__'], new Date())}</ShapeCreditsDate>
                  </ShapeCreditsOwner>
                </ShapeCredits>
              </ShapeCardHeader>
            </ShapeCard>
          </React.Fragment>
        ))}
      </ShapeCards>
      </Container>
    </ShapeCardsContainer>
  );
};

export default ShapeList;

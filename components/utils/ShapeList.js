import React, { useState, useEffect } from "react";

// axios
import axios from "axios";

// Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// Styled Component
import styled from "styled-components";

// dynamic from Next.js
import dynamic from "next/dynamic";

// Toast
import toast from "react-hot-toast";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

// icons
import {
  FiCopy,
  FiEdit2,
  FiLock,
  FiTrash2,
} from "react-icons/fi";
import { BiExport } from "react-icons/bi";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

// Export Shape
import { ExportShape, CopyShapeSource, NoShapeFound } from "..";

// CreateShape
import { CreateShape } from "..";

// DeleteShape
import { DeleteShape } from "..";

// misc unitless
import { getShapeId } from "../../utils/misc";

// date-fns
import { formatRelative } from "date-fns";

// double tap
import { useDoubleTap } from "use-double-tap";

// Shape Listing Styled-Componentns
const ShapeCards = styled.div`
  padding: 2rem 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 1fr));
  grid-gap: 2rem;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ShapeCard = styled.div`
  position: relative;
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

const ShapeActionsPrimary = styled.div`
  padding: 2rem;
  display: flex;
  grid-gap: 1rem;
  justify-content: center;
`;

const ShapeActionsSecondary = styled.div`
  padding: 2rem;
  display: flex;
  grid-gap: 1rem;
  justify-content: center;

  button {
    flex: 1;
  }
`;

const ShapeActions = styled.div`
  opacity: 0;
  background: rgba(var(--color-neutral-100-rgb), 0.5);
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ShapeName = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 0.3rem;
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
  color: var(--color-neutral-60);
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
  margin-right: 0.7rem;
`;

const ShapeCardsContainer = styled.div`
  background-color: var(--color-neutral-20);
`;

const ShapeCardBody = styled.div`
  position: relative;
  padding: 1rem 1.4rem;
`;

const ShapeCardHeader = styled.div`
  margin: 0;
  padding: 0 1.4rem 1.2rem 1.4rem;
`;

const DoubleTapLike = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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

const ShapeList = ({
  setOpen,
  user,
  data,
  searchTerm,
  setSearchTerm,
  sort,
  shapeAction,
  setShapeAction,
}) => {
  // Double Tab Shape
  const [isDoubleTaped, setIsDoubleTaped] = useState({});

  const bindShapesWithDoubleTab = (shapes) => {
    const modifiedShapes = shapes.map((shape) => {
      const bind = useDoubleTap((event) => {
        setIsDoubleTaped({
          ...isDoubleTaped, 
          [shape.shape_id]: true,
        });
        setTimeout(() => {
          setIsDoubleTaped({
            ...isDoubleTaped, 
            [shape.shape_id]: false,
          });
        }, 2000);
        performLike(event, shape["shape_id"]);
      });
      shape['double-tap-bind'] = bind;
      return shape;
    });
    return modifiedShapes;
  }

  const filterShape = (shapes, searchTerm) => {
    if (!searchTerm) {
      return shapes;
    }
    return shapes.filter((shape) => {
      const shapeName = shape.name.toLowerCase();
      return shapeName.includes(searchTerm.toLowerCase());
    });
  };
  // All shapes
  const [shapes, setShapes] = useState(data);
  // filtered shapes as state
  const [filteredShape, setFilteredShape] = useState(bindShapesWithDoubleTab(shapes));

  // All about export shape states
  const [showExportModal, setShowExportModal] = useState(false);
  const [shapeToExport, setShapeToExport] = useState();

  // All about copy source states
  const [showCopySourceModal, setCopySourceModal] = useState(false);
  const [shapeToSourceCopy, setShapeToSourceCopy] = useState();

  // All about editing private shapes
  const [showEditModal, setShowEditModal] = useState(false);
  const [shapeToEdit, setShapeToEdit] = useState();

  // All about editing private shapes
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shapeToDelete, setShapeToDelete] = useState();

  useEffect(() => {
    const copy = [...shapes];
    if (sort === "recent") {
      copy.sort((a, b) => b.__createdtime__ - a.__createdtime__);
    } else if (sort === "popularity") {
      copy.sort((a, b) => b.likes - a.likes);
    } else if (sort === "oldest") {
      copy.sort((a, b) => a.__createdtime__ - b.__createdtime__);
    }
    setFilteredShape(filterShape(copy, searchTerm));
  }, [searchTerm, shapes, sort]);

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
  const performExport = (shape) => {
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
  };

  /**
   * Method to execute when user clicks on the edit shape
   */
  const performEdit = (shape) => {
    // Set the shape details to edit
    setShapeToEdit(shape);
    // Show the export modal
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  /**
   * Method to execute when user clicks on the delte shape
   */
  const performDelete = (shape) => {
    // Set the shape details to edit
    setShapeToDelete(shape);
    // Show the export modal
    setShowDeleteModal(true);
  };

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
      const likedResponse = await axios.get("/api/GET/likes", {
        params: {
          shapeId: shapeId,
          email: user.email,
        },
      });
      const isPresent = likedResponse.data;
      console.log({ isPresent });
      // Get the latest likes count from db
      const shapeResponse = await axios.get("/api/GET/shape", {
        params: {
          shapeId: shapeId,
        },
      });
      const returnValue = shapeResponse.data;

      if (isPresent.length === 0) {
        // If not present, add for like
        const insertLikeResponse = await axios.post("/api/POST/like", {
          shapeId: shapeId,
          email: user.email,
        });
        const insertLike = insertLikeResponse.data;
        console.log({ insertLike });

        if (insertLike.data.inserted_hashes.length > 0) {
          // Update the count by 1
          likes = returnValue[0].likes + 1;
        }
      } else {
        // If present, get the like id
        const likeId = isPresent[0].like_id;
        // delete to remove like
        const deleteLikeResponse = await axios.post("/api/DELETE/like", {
          likeId: likeId,
        });
        const deleteLike = deleteLikeResponse.data;
        console.log({ deleteLike });

        if (deleteLike.data.deleted_hashes.length > 0) {
          // update the like count decrease by 1
          likes = returnValue[0].likes - 1;
        }
      }

      // Update the shape data with the updated count
      const updateShapeResponse = await axios.post("/api/PUT/shape", {
        shapeId: shapeId,
        likes: likes,
      });
      const updated = updateShapeResponse.data;
      console.log({ updated });

      if (updated.data.update_hashes.length > 0) {
        // Update the shape data in the shapes array
        let modifiedShapes = shapes.map((shape) => {
          if (shape["shape_id"] === shapeId) {
            return {
              ...shape,
              liked: !shape.liked,
              likes: likes,
            };
          }
          return shape;
        });
        setShapes(...[modifiedShapes]);
      } else {
        toast.error("Not able to update the likes at this moment.");
      }
    }
  };

  const canEditOrDelete = (shape) => {
    return user.email === shape.createdBy;
  };

  return (
    <ShapeCardsContainer>
      <Container>
        <ShapeCards>
          {shapeToExport && (
            <ExportShape
              show={showExportModal}
              setShow={setShowExportModal}
              shape={shapeToExport}
            />
          )}

          {shapeToSourceCopy && (
            <CopyShapeSource
              show={showCopySourceModal}
              setShow={setShapeToSourceCopy}
              shape={shapeToSourceCopy}
            />
          )}

          {shapeToEdit && (
            <CreateShape
              show={showEditModal}
              handleClose={closeEditModal}
              shape={shapeToEdit}
              shapeAction={shapeAction}
              setShapeAction={setShapeAction}
              edit={true}
            />
          )}

          {shapeToDelete && (
            <DeleteShape
              show={showDeleteModal}
              setShow={setShowDeleteModal}
              shape={shapeToDelete}
              shapeAction={shapeAction}
              setShapeAction={setShapeAction}
            />
          )}

          {filteredShape.length === 0 ? (
            <NoShapeFound
              shapeAction={shapeAction}
              setShapeAction={setShapeAction}
              user={user}
              setOpen={setOpen}
              setSearchTerm={setSearchTerm}
            />
          ) : (
            filteredShape.map((shape, index) => {
              return (
                <React.Fragment key={index}>
                  <ShapeCard {...shape['double-tap-bind']}>
                    <ShapeCardBody>
                      {isDoubleTaped[shape.shape_id] && (
                        <DoubleTapLike>
                          <div id="pop">
                            <LikeFilledIcon
                              size="76px"
                              color={!shape.liked ? "#F24A58" : "#fff"}
                            />
                          </div>
                        </DoubleTapLike>
                      )}
                      <ShapeNameHeader>
                        <ShapeName>
                          {shape.name}
                          {shape.private && (
                            <FiLock color="var(--color-neutral-50)" />
                          )}
                        </ShapeName>
                        <ShapeLikes>
                          <LikeFilledIcon
                            size="16px"
                            color="var(--color-neutral-40)"
                          />
                          <ShapeLikesCount>{shape.likes}</ShapeLikesCount>
                        </ShapeLikes>
                      </ShapeNameHeader>
                      <Shape
                        width="240px"
                        height="240px"
                        id={getShapeId(shape.name)}
                        formula={shape.formula}
                        backgroundColor={shape.backgroundColor || "#eb3d86"}
                        showShadow={shape.showAdvanced}
                      />
                      <ShapeActions className="shape-actions">
                        <ShapeActionsPrimary>
                          <span
                            onClick={(event) =>
                              performLike(event, shape["shape_id"])
                            }
                          >
                            {shape.liked ? (
                              <Button
                                title="Remove Like"
                                variant="danger"
                                className="btn-icon btn-icon--rounded"
                              >
                                <LikeFilledIcon size={24} />
                              </Button>
                            ) : (
                              <Button
                                title="Add Like"
                                variant="outline-secondary"
                                className="btn-icon btn-icon--rounded"
                              >
                                <LikeIcon size={24} />
                              </Button>
                            )}
                          </span>{" "}
                          <Button
                            title="Export Shape"
                            variant="outline-secondary"
                            onClick={() => performExport(shape)}
                            className="btn-icon btn-icon--rounded"
                          >
                            <ExportIcon size={24} />
                          </Button>
                          <Button
                            title="Copy Source"
                            variant="outline-secondary"
                            onClick={() => performCopySource(shape)}
                            className="btn-icon btn-icon--rounded"
                          >
                            <CopyIcon size={24} />
                          </Button>
                        </ShapeActionsPrimary>
                        <ShapeActionsSecondary>
                          {canEditOrDelete(shape) ? (
                            <Button
                              title="Edit Shape"
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => {
                                performEdit(shape);
                                console.log(shape);
                              }}
                            >
                              <FiEdit2 />
                              Edit
                            </Button>
                          ) : null}
                          {canEditOrDelete(shape) ? (
                            <Button
                              title="Delete Shape"
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => {
                                performDelete(shape);
                                console.log(shape);
                              }}
                            >
                              <FiTrash2 />
                              Delete
                            </Button>
                          ) : null}
                        </ShapeActionsSecondary>
                      </ShapeActions>
                    </ShapeCardBody>
                    <ShapeCardHeader>
                      <ShapeCredits>
                        <ShapeCreditsThumb
                          src={shape.photoURL}
                          alt={shape.name1 === null ? "Unknown User" : shape.name1}
                        />
                        <ShapeCreditsOwner>
                          <ShapeCreditsOwnerName>
                            {shape.name1 === null ? "Unknown User" : shape.name1}
                          </ShapeCreditsOwnerName>
                          <ShapeCreditsDate>
                            at{" "}
                            {formatRelative(
                              shape["__createdtime__"],
                              new Date()
                            )}
                          </ShapeCreditsDate>
                        </ShapeCreditsOwner>
                      </ShapeCredits>
                    </ShapeCardHeader>
                  </ShapeCard>
                </React.Fragment>
              );
            })
          )}
        </ShapeCards>
      </Container>
    </ShapeCardsContainer>
  );
};

export default ShapeList;

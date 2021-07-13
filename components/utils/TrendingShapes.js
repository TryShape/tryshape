import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// icon
import { FiSearch } from "react-icons/fi";

import { BsFillHeartFill, BsHeart } from "react-icons/bs";

// link
import Link from "next/link";

// dynamic from Next.js
import dynamic from "next/dynamic";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

// axios
import axios from "axios";

// loader
import Loader from "react-loader-spinner";

// misc unitless
import { getShapeFileName, getShapeId } from "../../utils/misc";

// date-fns
import { formatRelative } from "date-fns";

// Styled Component
import styled from "styled-components";

// images
import AbstractBg2 from "../../public/images/bg-abstract-2.png";

const SectionTrendingShapes = styled.section`
  padding: 6rem 0;
  background-color: rgba(var(--color-brand-rgb), 0.024);
  background-image: url(${AbstractBg2});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 1400px) {
    background-size: contain;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const ShapeCardList = styled.div`
  padding: 2rem 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
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

const ShapeCardBody = styled.div`
  position: relative;
  padding: 1rem 1.4rem;
`;

const ShapeCardHeader = styled.div`
  margin: 0;
  padding: 0 1.4rem 1.2rem 1.4rem;
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

const LikeFilledIcon = styled(BsFillHeartFill)`
  cursor: pointer;
`;

const ShapeCredits = styled.div`
  display: flex;
  align-items: center;
  border-top: solid 1px var(--color-neutral-20);
  padding-top: 1rem;
`;

const ShapeCreditsThumb = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  margin-right: 0.7rem;
`;

const ShapeCreditsOwner = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: var(--fs-md);
`;

const ShapeCreditsOwnerName = styled.div`
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--color-neutral-60);
  line-height: 1;
`;

const ShapeCreditsDate = styled.small`
  margin-top: 0.3rem;
  font-size: var(--fs-sm);
  color: var(--color-neutral-60);
  line-height: 1;
`;

const TrendingShapes = () => {
  // shapes
  const [shapeData, setShapeData] = useState([]);

  // shapes loading
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await axios.get("/api/GET/shapes", {
      params: {
        type: "private",
      },
    });

    let data = response.data;
    let topFourShapes = data.slice(0, 4);
    setShapeData(topFourShapes);
    setLoading(false);
  }, []);

  return (
    <>
      <SectionTrendingShapes id="trendingShapes">
        <Container>
          <SectionTitle>
            <h2 className="section-title text-center">Trending Shapes</h2>
          </SectionTitle>
          <ShapeCardList>
            {loading
              ? (<Loader
                  style={{transform: 'translate(-50%, -50%)'}}
                  type="Circles"
                  color="rgba(var(--color-brand-rgb), 0.6)"
                  height={200}
                  width={200}
                />)
              : (
                shapeData.map((shape, index) => (
                  <ShapeCard key={index}>
                    <ShapeCardBody>
                      <ShapeNameHeader>
                        <ShapeName>{shape.name}</ShapeName>
                        <ShapeLikes>
                          <LikeFilledIcon
                            size="16px"
                            color="var(--color-neutral-40)"
                          />
                          <ShapeLikesCount>{shape.likes}</ShapeLikesCount>
                        </ShapeLikes>
                      </ShapeNameHeader>
                      <Shape
                        width="200px"
                        height="200px"
                        name={shape.name}
                        id={getShapeId(shape.name)}
                        formula={shape.formula}
                        backgroundColor={shape.backgroundColor || "#eb3d86"}
                        showShadow={shape.showAdvanced}
                      />
                    </ShapeCardBody>
                    <ShapeCardHeader>
                      <ShapeCredits>
                        <ShapeCreditsThumb
                          src={shape.photoURL}
                          alt={shape.name1}
                        />
                        <ShapeCreditsOwner>
                          <ShapeCreditsOwnerName>
                            {shape.name1}
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
                ))
                )}
          </ShapeCardList>

          <div className="d-flex justify-content-center mt-4">
            <Link href="/app">
              <Button variant="primary">
                <FiSearch />
                Browse Now
              </Button>
            </Link>
          </div>
        </Container>
      </SectionTrendingShapes>
    </>
  );
};

export default TrendingShapes;

import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

// Header
import { Header } from '..'

// dynamic from Next.js
import dynamic from "next/dynamic";

// Clip-Path
const Shape = dynamic(import("react-clip-path"), { ssr: false });

// axios
import axios from "axios";

// misc unitless
import { getShapeFileName, getShapeId } from "../../utils/misc";

// date-fns
import { formatRelative } from "date-fns";

// Images
import BannerBg from '../../public/images/bg-banner.png';
import DottedBg from '../../public/images/bg-dotted.png';
import AbstractBg1 from '../../public/images/bg-abstract-1.png';
import AbstractBg2 from '../../public/images/bg-abstract-2.png';
import ImgLogo from '../../public/images/img-logo.svg';
import IconPngJpg from '../../public/images/icon-png-jpg.svg';
import IconSvg from '../../public/images/icon-svg.svg';
import IconCss from '../../public/images/icon-css.svg';

// icon
import { 
  FiMenu, 
  FiLinkedin, 
  FiTwitter, 
  FiShare, 
  FiShare2, 
  FiPenTool, 
  FiSearch, 
  FiMail, 
  FiGithub, 
  FiYoutube } from "react-icons/fi";

import { BsFillHeartFill, BsHeart } from "react-icons/bs";

// link
import Link from "next/link";

// Styled Component
import styled from "styled-components";

// LandingBanner
const LandingBanner = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;   
    background-color: var(--color-brand);
    background: rgb(93,33,210);
    background: linear-gradient(180deg, rgba(93,33,210,1) 0%, rgba(175,33,210,1) 100%);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    &:before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${BannerBg});
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
`;

const BannerHeader = styled(Navbar)`
  padding: 1rem 1.8rem !important;
  background-color: rgba(var(--color-brand-rgb), 0.86);

  .navbar-toggler:hover,
  .navbar-toggler:focus {
    background-color: rgba(var(--color-neutral-10-rgb), 0.2);
  }

  .navbar-toggler.active,
  .navbar-toggler:active {
    background-color: rgba(var(--color-neutral-100-rgb), 0.2);
  }

  .navbar-action--primary {
    padding: 0.48rem 1.4rem;
    border: solid 1px var(--color-primary-accent);
    background-color: var(--color-primary-accent);
    font-size: var(--fs-rg);
    font-weight: var(--fw-bold);
    color: var(--color-neutral-90);

    svg {
      margin: -2px 0.6rem 0 0;
    }

    &:hover,
    &:focus {
      border: solid 1px var(--color-neutral-10);
      background-color: var(--color-neutral-10);
      color: var(--color-brand);
    }

    &:active {
      background-color: rgba(var(--color-neutral-10-rgb), 90%) !important;
      color: var(--color-brand) !important;
    }
  }
`;

const BannerBody = styled.div`
  margin-top: -74px;

  .banner-title {
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    color: var(--color-neutral-10);

    @media (max-width: 767px) {
      font-size: var(--fs-lg);
    }
  }

  .banner-desc {
    margin: 1.2rem 2rem 2.6rem 0;
    font-size: var(--fs-md);
    font-weight: var(--fw-light);
    color: var(--color-neutral-10);

    @media (max-width: 767px) {
      font-size: var(--fs-rg);
    }
  }

  
`;

const BannerBodyActions = styled.div`
  display: flex;
  justify-content: center;
  grid-gap: 1rem;

  .banner-action--primary {
    padding: 0.8rem 1.4rem;
    border: solid 1px var(--color-primary-accent);
    background-color: var(--color-primary-accent);
    font-weight: var(--fw-bold);
    color: var(--color-neutral-90);

    svg {
      margin: -2px 0.6rem 0 0;
    }

    &:hover,
    &:focus {
      border: solid 1px var(--color-neutral-10);
      background-color: var(--color-neutral-10);
      color: var(--color-brand);
    }

    &:active {
      background-color: rgba(var(--color-neutral-10-rgb), 90%) !important;
      color: var(--color-brand) !important;
    }
  }

  .banner-action--secondary {
    padding: 0.8rem 1.4rem;
    border: solid 1px var(--color-primary-accent);
    background-color: transparent;
    color: var(--color-primary-accent);
    font-weight: var(--fw-bold);

    svg {
      margin: -2px 0.6rem 0 0;
    }

    &:hover,
    &:focus {
      border: solid 1px var(--color-neutral-10);
      background-color: transparent;
      color: var(--color-neutral-10);
    }

    &:active {
      border: solid 1px var(--color-neutral-10) !important;
      background-color: rgba(var(--color-neutral-10-rgb), 20%) !important;
      color: var(--color-neutral-10) !important;
    }
  }
`;

const Logo = styled.h1`
   width: 152px;
   height: 32px;
   background: url(${ImgLogo}) left center no-repeat;
   margin: 0;
   line-height: 1;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 2.4rem;
  margin-right: 2.4rem;
  
    a {
      font-size: var(--fs-rg);
      font-weight: var(--fw-semibold);
      color: var(--color-neutral-10) !important;

      &:hover {
        text-decoration: none;
        color: var(--color-primary-accent) !important;
      }
    }
  
    @media (max-width: 767px) {
      border-top: solid 1px rgba(var(--color-neutral-10-rgb), 0.2);
      margin: 0.4rem 0 0.8rem 0;
      padding-top: 1rem;
      flex-direction: column;
      grid-gap: 0.6rem;
    }
  
`;

const ActionBar = styled.div`
  @media (max-width: 768px) {
    display: flex;

    button {
      flex: 1;
    }
  }
`;

const SectionAbout = styled.section`
    padding: 6rem 0;
    background-image: url(${AbstractBg1});
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

const SectionFileTypes = styled.section`
    padding: 6rem 0 8rem 0;
    background-image: url(${DottedBg});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const SectionContact = styled.section`
    padding: 6rem 0;
    background-color: var(--color-neutral-10);
`;

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

const LikeIcon = styled(BsHeart)`
  cursor: pointer;
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

const SectionContactCredits = styled.p`
    margin: 1rem 0;
    color: var(--color-neutral-80);

    a {
      color: var(--color-brand);
      text-decoration: underline;

      &:hover,
      &:focus {
        color: var(--color-brand-secondary);
      }
    }
`;

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    grid-gap: 1.6rem;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: rgba(var(--color-brand-rgb), 0.06);

      svg {
        stroke: var(--color-brand);
      }

      &:hover,
      &:focus {
        background-color: var(--color-brand);

        svg {
          stroke: var(--color-neutral-10);
        }
      }
    }
`;

// Feature Cards
const FeatureCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
    grid-gap: 2.6rem;
    margin: 4rem 0 0 0;

    @media (max-width: 991px) {
      grid-template-columns: repeat(2, minmax(240px, 1fr));
    }

    @media (max-width: 767px) {
      grid-template-columns: repeat(1, minmax(240px, 1fr));
    }
`;

const FeatureCardItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background: rgba(var(--color-brand-rgb), 0.05);
    border-radius: 1rem;
    padding: 3.2rem 2.8rem;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      background-color: rgba(var(--color-neutral-10-rgb), 1);
      box-shadow: 3px 16px 32px 0 rgba(var(--color-brand-rgb), 16%);
    }

    .card-title {
      margin: 2rem 0 1rem 0;
      font-size: var(--fs-md);
      font-weight: var(--fw-bold);
    }

    .card-desc {
      margin: 0;
      font-size: var(--fs-rg);
      text-align: center;
    }

    &:nth-child(2n) {
      background: rgba(var(--color-brand-secondary-rgb), 0.05);
      .icon {
        box-shadow: 3px 16px 32px 0 rgba(var(--color-brand-secondary-rgb), 16%);
      }
    }

    &:nth-child(3n) {
      background: rgba(var(--color-brand-teritiary-rgb), 0.05);
      .icon {
        box-shadow: 3px 16px 32px 0 rgba(var(--color-brand-teritiary-rgb), 16%);
      }
    }
`;

// Feature Icon Cards
const FileSupportCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
    grid-gap: 2.6rem;
    margin: 4rem 0 0 0;

    @media (max-width: 991px) {
      grid-template-columns: repeat(2, minmax(240px, 1fr));
    }

    @media (max-width: 767px) {
      grid-template-columns: repeat(1, minmax(240px, 1fr));
    }
`;

const FileSupportCardItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background: var(--color-neutral-10);
    border-radius: 1rem;
    padding: 3.2rem 2.8rem;
    box-shadow: 3px 33px 81px 0 rgb(180 180 200 / 26%);


    .card-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: rgba(var(--color-brand-rgb), 1);
      width: 8rem;
      height: 8rem;

      img {
        width: 4.2rem;
        height: 4.2rem;
      }
    }

    .card-title {
      margin: 2rem 0 1rem 0;
      font-size: var(--fs-md);
      font-weight: var(--fw-bold);
    }

    .card-desc {
      margin: 0;
      font-size: var(--fs-rg);
      text-align: center;
    }

    // Color Variants
    &:nth-child(2n) .card-icon {
      background: rgba(var(--color-brand-secondary-rgb), 1);
    }

    &:nth-child(3n) .card-icon {
      background: rgba(var(--color-brand-teritiary-rgb), 1);
    }
`;

const Landing = ({ setOpen, user, setUser }) => {
    
  const [data, setData] = useState([]); // shapes
  const [loading, setLoading] = useState(true); // shapes loading

  useEffect(async () => {
    setData([]);
    setLoading(true);
    let shapes = [];

    const response = await axios.get("/api/GET/shapes", {
      params: {
        type: 'private'
      }
    });

    shapes = response.data; 
    
    let topFourShapes = [];

    for (let i = 0; i < 4; i++) {
      let shape = shapes[i];

      topFourShapes.push(
        <ShapeCard>
          <ShapeCardBody>
            <ShapeNameHeader>
              <ShapeName>
                {shape.name}
              </ShapeName>
              <ShapeLikes>
                <LikeFilledIcon
                  size="16px"
                  color="var(--color-neutral-40)"
                />
                <ShapeLikesCount>
                  {shape.likes}
                </ShapeLikesCount>
              </ShapeLikes>
            </ShapeNameHeader>
            <Shape
              width="220px"
              height="220px"
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
      );
    }

    await setData(topFourShapes);
    setLoading(false);
  }, [user]);

    return(
        <div>
            <BannerHeader fixed="top" expand="md">
              <Navbar.Brand><Logo><span className="sr-only">TryShape</span></Logo></Navbar.Brand>
              <Navbar.Toggle>
                  <FiMenu color="var(--color-neutral-10" size="24px"/>
              </Navbar.Toggle>
              <Navbar.Collapse className="justify-content-end">
                <Navigation>
                  <a data-scroll href="#keyfeatures">Key Features</a>
                  <a data-scroll href="#filesupport">File Support</a>
                  <a data-scroll href="#trendingShapes">Trending Shapes</a>
                  <a data-scroll href="#contact">Contact</a>
                </Navigation>
                <ActionBar>
                  <Link href="/app">
                      <Button className="navbar-action--primary">
                          <FiSearch />Browse Now
                      </Button>
                  </Link>
                </ActionBar>
              </Navbar.Collapse>
            </BannerHeader>
            <LandingBanner>
                <BannerBody>
                  <Container>
                    <Row className="justify-content-md-center">
                      <Col lg="8" className="d-flex flex-column justify-content-center">
                        <h2 className="banner-title text-center">Create, Export, Share, and Use any Shapes of your choice.</h2>
                        <p className="banner-desc text-center">
                          TryShape is an opensource platform to create shapes of your choice using a simple, 
                          easy-to-use interface. You can create banners, circles, polygonal shapes, export them as
                          SVG, PNG, and even as CSS.
                        </p>
                        <BannerBodyActions>
                          <Link href="/app" ><Button variant="primary"><FiPenTool/>Try Now</Button></Link>
                          <a href="https://github.com/TryShape" target="_blank" className="btn btn-outline-secondary" rel="noopener noreferrer"><FiGithub />GitHub</a>
                        </BannerBodyActions>
                      </Col>
                    </Row>
                  </Container>
                </BannerBody>
            </LandingBanner>
            <SectionAbout id="keyfeatures">
              <Container>
                <SectionTitle>
                  <h2 className="section-title text-center">Key Features</h2>
                </SectionTitle>
                <p className="p-lead text-center">TryShape is here to take care of your customized shape needs</p>
                <p className="p-desc text-center w-75 m-auto">
                  The modern website and web application designs need shapes of random dimensions, colors, and creativity.
                  It is too much for our brains to remember CSS clip-path rules to define shapes. Let's create, share, export shapes in a minute using TryShape.
                </p>
                <FeatureCards>
                  <FeatureCardItem>
                    <div className="icon">
                      <FiPenTool size='64px' color="var(--color-brand)"/>
                    </div>
                    <h3 className="card-title">Create</h3>
                    <p className="card-desc">
                      Make your creative thoughts a reality with a few clicks. You can create any circular, elliptical, and polygonal shape within a minute time. 
                    </p>
                  </FeatureCardItem>
                  <FeatureCardItem>
                    <div className="icon">
                      <FiShare size='64px' color="var(--color-brand-secondary)"/>
                    </div>
                    <h3 className="card-title">Export</h3>
                    <p className="card-desc">
                      Export the shapes as images and CSS snippets. You can export the shapes 
                      as SVG, PNG, JPEG, and CSS.  
                    </p>
                  </FeatureCardItem>
                  <FeatureCardItem>
                    <div className="icon">
                      <FiShare2 size='64px' color="var(--color-brand-teritiary)"/>
                    </div>
                    <h3 className="card-title">Share</h3>
                    <p className="card-desc">
                      When you create something fabously great, do share it with the awesome developer
                      community. TryShape allows you to do that when you make your ceativity public.  
                    </p>
                  </FeatureCardItem>
                </FeatureCards>
              </Container>
            </SectionAbout>
            <SectionFileTypes id="filesupport">
              <Container>
                  <SectionTitle>
                    <h2 className="section-title text-center">Great Export type Support</h2>
                  </SectionTitle>
                  <p className="p-lead text-center">Hassle free usage for your web design and development!</p>
                  <p className="p-desc text-center w-75 m-auto">
                    TryShape supports exporting shapes as images, CSS snippets, and SVG. You can export them
                    specifying any dimension, color, name of your choice.
                  </p>
                  <FileSupportCards>
                    <FileSupportCardItem>
                      <div className="card-icon">
                        <img src={IconSvg} alt="Icon for SVG File Type" />
                      </div>
                      <h3 className="card-title">SVG</h3>
                      <p className="card-desc">
                        Export and save your shape as the Scalable Vector Graphics(SVG) file. It gives you
                        the power to use the SVG image straight into your application.  
                      </p>
                    </FileSupportCardItem>
                    <FileSupportCardItem>
                      <div className="card-icon">
                        <img src={IconPngJpg} alt="Icon for PNG and JPG File Types"/>
                      </div>
                      <h3 className="card-title">PNG and JPEG</h3>
                      <p className="card-desc">
                        PNG and JPEG types are the most used image types in web applications. Export your shapes as
                        .png and .jpeg image files.
                      </p>
                    </FileSupportCardItem>
                    <FileSupportCardItem>
                      <div className="card-icon">
                        <img src={IconCss} alt="Icon for CSS Snippets"/>
                      </div>
                      <h3 className="card-title">CSS Snippet</h3>
                      <p className="card-desc">
                        Don't want to image the shapes as files? No problem. You can create CSS snippets with
                        your shapes and export that instead.  
                      </p>
                    </FileSupportCardItem>
                  </FileSupportCards>
              </Container>
            </SectionFileTypes>
            <SectionTrendingShapes id="trendingShapes">
              <Container>
                <SectionTitle>
                    <h2 className="section-title text-center">Trending Shapes</h2>
                  </SectionTitle>
                  <ShapeCardList>
                    {loading ? null : 
                      data
                    }
                  </ShapeCardList>

                  <div className="d-flex justify-content-center mt-4">
                    <Link href="/app">
                        <Button variant="primary">
                            <FiSearch />Browse Now
                        </Button>
                    </Link>
                  </div>
              </Container>
            </SectionTrendingShapes>
            <SectionContact id="contact">
              <Container>
                <SocialLinks>
                  <a href="https://github.com/TryShape" target="_blank" rel="noopener noreferrer"><FiGithub /><span className="sr-only">GitHub</span></a>
                  <a href="https://twitter.com/tapasadhikary" target="_blank" rel="noopener noreferrer"><FiTwitter /><span className="sr-only">Twitter</span></a>
                  <a href="https://www.linkedin.com/in/tapasadhikary/" target="_blank" rel="noopener noreferrer"><FiLinkedin /><span className="sr-only">Linkedin</span></a>
                  <a href="https://www.youtube.com/c/TapasAdhikary/featured" rel="noopener noreferrer"><FiYoutube /><span className="sr-only">Youtube</span></a>
                  <a href="mailto:tapas.adhikary@gmail.com" rel="noopener noreferrer"><FiMail /><span className="sr-only">Email</span></a>
                </SocialLinks>
                <SectionContactCredits className="text-center"><small>TryShape is an opensource project developed by <a href="https://tapasadhikary.com/" target="_blank">Tapas Adhikary</a> and friends.</small></SectionContactCredits>
              </Container>
            </SectionContact>
        </div>
    )
};

export default Landing;
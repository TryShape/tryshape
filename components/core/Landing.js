import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Header
import { Header } from '..'

// Images
import BannerBg from '../../public/images/bg-banner.png'

// icon
import { AiOutlineGateway, AiOutlineFileImage, AiFillGithub, AiOutlineInstagram, AiOutlineTwitter, AiOutlineLink } from "react-icons/ai";
import { FiInstagram, FiTwitter, FiLink, FiPenTool, FiSearch, FiMousePointer, FiGithub } from "react-icons/fi";

// Images
// import bannerBackgroundImage from '../../public/vercel.svg';

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
    background-image: url(${BannerBg});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const BannerHeader = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;
  padding: 0.6rem 0.8rem;
  background-color: var(--color-brand);

  .navbar-action--primary {
    padding: 0.48rem 1.4rem;
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
`;

const BannerBody = styled.div`
  .banner-title {
    font-size: var(--fs-xl);
    font-weight: var(--fw-bold);
    color: var(--color-neutral-10);
  }

  .banner-desc {
    margin: 1.2rem 2rem 2.6rem 0;
    font-size: var(--fs-md);
    font-weight: var(--fw-light);
    color: var(--color-neutral-10);
  }
`;

const BannerBodyActions = styled.div`
  display: flex;
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
    display: flex;
    grid-gap: 0.6rem;
    align-items: flex-start;
   font-size: 1.4rem;
   color: var(--color-neutral-10);
   font-weight: var(--fw-semibold);
   margin: 0;
   line-height: 1;
   padding: 0.6rem 0.8rem;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 2.4rem;
  
    a {
      font-size: var(--fs-rg);
      font-weight: var(--fw-semibold);
      color: var(--color-neutral-10) !important;

      &:hover {
        text-decoration: none;
        color: var(--color-primary-accent) !important;
      }
    }
`;

const ActionBar = styled.div`
    
`;

const SectionAbout = styled.section`
    padding: 6rem 0;
`;

const SectionTitle = styled.div`
    display: flex;
    justify-content: center;
`;

const SectionFileTypes = styled.section`
    padding: 6rem 0;
    background-color: var(--color-neutral-20);
`;

const SectionContact = styled.section`
    padding: 6rem 0;
    background-color: var(--color-neutral-10);
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
      border: solid 1px rgba(var(--color-brand-rgb), 0.6);
      background-color: transparent;

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
`;

const FeatureCardItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background: rgba(var(--color-brand-rgb), 0.05);
    border-radius: 1rem;
    padding: 3.2rem 2.8rem;

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
    }

    &:nth-child(3n) {
      background: rgba(var(--color-brand-teritiary-rgb), 0.05);
    }
`;

// Feature Icon Cards
const FeatureIconCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
    grid-gap: 2.6rem;
    margin: 4rem 0 0 0;
`;

const FeatureIconCardItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background: var(--color-neutral-10);
    border-radius: 1rem;
    padding: 3.2rem 2.8rem;
    box-shadow: 3px 33px 81px 0 rgb(111 118 138 / 16%);


    .card-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      background-color: var(--color-brand);
      width: 8rem;
      height: 8rem;

      svg {
        width: 4.6rem;
        height: 4.6rem;
        fill: var(--color-neutral-10);
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
      background: var(--color-brand-secondary);
    }

    &:nth-child(3n) .card-icon {
      background: var(--color-brand-teritiary);
    }
`;

const Landing = ({ setOpen, user, setUser }) => {
    
    return(
        <div>
            <LandingBanner>
                <BannerHeader>
                  <Logo><AiOutlineGateway /><div>TryShape</div></Logo>
                  <Navigation>
                    <a data-scroll href="#keyfeatures">Key Features</a>
                    <a data-scroll href="#filesupport">File Support</a>
                    <a data-scroll href="#contact">Contact</a>
                  </Navigation>
                  <ActionBar>
                    <Link href="/app">
                        <Button className="navbar-action--primary">
                            <FiSearch />Browse Now
                        </Button>
                    </Link>
                  </ActionBar>
                </BannerHeader>
                <BannerBody>
                  <Container>
                    <Row>
                      <Col>
                        <h2 className="banner-title">Create, Export, Share, and Use any Shapes of your choice.</h2>
                        <p className="banner-desc">
                          TryShape is an opensource platform to create shapes of your choice using a simple, 
                          easy-to-use interface. You can create banners, circles, polygonal shapes, export them as
                          SVG, PNG, and even as CSS.
                        </p>
                        <BannerBodyActions>
                          <Link href="/app"><Button className="banner-action--primary"><FiPenTool/>Try Now</Button></Link>
                          <Link href="/app"><Button className="banner-action--secondary"><FiGithub />GitHub</Button></Link>
                        </BannerBodyActions>
                      </Col>
                      <Col>
                        <svg id="ace05a6f-f1ac-4978-a3bb-3e2345b819e7" style={{ width: '80%', height: 'auto' }}  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="767.65456" height="595.99576" viewBox="0 0 767.65456 595.99576"><path d="M682.61225,523.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,682.61225,523.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M707.04188,594.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C712.30971,590.54982,710.33837,593.36006,707.04188,594.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M635.17273,571.99786H405.28351a95.00238,95.00238,0,1,0-94.11078,82,94.76382,94.76382,0,0,0,34-6.27246v92.27246a8,8,0,0,0,8,8h282a8,8,0,0,0,8-8v-160A8,8,0,0,0,635.17273,571.99786Z" transform="translate(-216.17273 -152.0021)" fill="#e6e6e6"/><path d="M652.17271,726.9979h-282a9.01016,9.01016,0,0,1-9-9v-160a9.01016,9.01016,0,0,1,9-9h282a9.01016,9.01016,0,0,1,9,9v160A9.01016,9.01016,0,0,1,652.17271,726.9979Zm-282-176a7.00818,7.00818,0,0,0-7,7v160a7.00818,7.00818,0,0,0,7,7h282a7.00818,7.00818,0,0,0,7-7v-160a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M652.61225,534.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,652.61225,534.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M677.04188,605.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C682.30971,601.54982,680.33837,604.36006,677.04188,605.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><rect x="881.40957" y="159.51212" width="32" height="32" transform="translate(-137.98952 429.73239) rotate(-37.44104)" fill="#6c63ff"/><circle cx="540.54098" cy="180.1523" r="22" fill="#ff6584"/><path d="M751.06926,347.81191a23,23,0,1,1,32.24425,4.2788A23.02588,23.02588,0,0,1,751.06926,347.81191Zm34.93509-26.74957a21,21,0,1,0-3.90673,29.44041A21.0239,21.0239,0,0,0,786.00435,321.06234Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M902.05033,199.66752l-20.67012-26.9953,26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L908.00344,154.806Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="936.19123" y="337.97492" width="32" height="32" transform="translate(-235.19888 499.80362) rotate(-37.44104)" fill="#6c63ff"/><path d="M956.832,378.13032,936.16187,351.135l26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L962.7851,333.26875Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="0.99998" y="572.99579" width="624" height="2" fill="#3f3d56"/><path d="M324.17271,628.9979a96,96,0,1,1,96-96A96.10874,96.10874,0,0,1,324.17271,628.9979Zm0-190a94,94,0,1,0,94,94A94.10645,94.10645,0,0,0,324.17271,438.9979Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><circle cx="316.42142" cy="185.00645" r="53.51916" fill="#6c63ff"/><path d="M540.46971,356.84454l-.05566-2c3.7207-.10351,7.001-.33691,9.46582-2.13769a6.148,6.148,0,0,0,2.38134-4.52832,3.51431,3.51431,0,0,0-1.15283-2.89453c-1.63623-1.38184-4.269-.93457-6.188-.05469l-1.65478.75879,3.17334-23.19043,1.98144.27148-2.69921,19.72656c2.60742-.7666,5.02343-.43652,6.67822.96094a5.471,5.471,0,0,1,1.86035,4.49219,8.13264,8.13264,0,0,1-3.2002,6.07324C547.89256,356.63653,543.77684,356.75177,540.46971,356.84454Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><rect x="342.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><rect x="308.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><path d="M609.17271,551.4979h-126a4.50492,4.50492,0,0,1-4.5-4.5V445.77719A46.33163,46.33163,0,0,1,524.952,399.4979h41.2207a4.50529,4.50529,0,0,1,4.49951,4.4248l43.00049,143.002v.07325A4.50493,4.50493,0,0,1,609.17271,551.4979Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M525.47529,440.45264l14.75882.116a6.50753,6.50753,0,0,1,6.44872,6.55088l-.96658,123.00987a6.50753,6.50753,0,0,1-6.55087,6.44873l-14.75883-.116a6.50753,6.50753,0,0,1-6.44872-6.55088l.96658-123.00987A6.50753,6.50753,0,0,1,525.47529,440.45264Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M510.67271,435.4979a22,22,0,1,1,44,0v49h-44Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M516.78472,311.80158c5.06888-5.21551,12.43274-6.11235,19.36224-5.5448,7.42071.60778,14.452,3.07282,21.73106,4.44394,7.17984,1.35243,14.96391,1.95823,21.82646-1.03737a20.09144,20.09144,0,0,0,11.72323-15.979,29.03592,29.03592,0,0,0-5.257-20.47853c-4.7-6.64121-11.37734-11.50575-18.31814-15.589-14.96175-8.802-31.64438-16.50389-49.15015-17.92771-15.80435-1.28544-32.563,3.08229-43.68061,14.88551-10.42169,11.06441-14.85811,26.506-15.78063,41.37629-1.17743,18.97911,3.2519,37.722,4.85473,56.54079,1.24718,14.64319.78012,32.22265-11.11218,42.73862-10.519,9.30159-26.53626,9.19063-38.93809,4.10945-14.741-6.03956-25.08444-19.59752-32.90776-32.9229-1.99162-3.39231-3.86369-6.85277-5.67931-10.342-.8915-1.71327-3.48138-.19808-2.59041,1.51416,7.32148,14.07023,15.83772,28.12423,28.64444,37.8742,11.19745,8.52481,26.13832,12.63128,39.97878,9.02829a32.25043,32.25043,0,0,0,17.098-10.80463c4.74351-5.91016,7.233-13.18243,8.27145-20.62227,1.11153-7.96315.724-15.98758-.08116-23.95954-.96937-9.59732-2.5146-19.12452-3.573-28.71137-1.80249-16.32711-2.05082-33.2722,4.4005-48.69846a48.551,48.551,0,0,1,12.63135-17.97966A46.21559,46.21559,0,0,1,501.324,243.66126c16.9591-3.51936,34.19917,1.24561,49.55139,8.426a139.42789,139.42789,0,0,1,22.1571,12.43257c6.19746,4.43557,11.96927,10.24516,14.3566,17.65293,2.05742,6.38406,1.88616,13.94139-2.21567,19.508-4.38377,5.94925-11.98089,7.43475-18.94639,7.07658-14.30661-.73566-28.72417-9.05-43.11964-4.30484a20.74419,20.74419,0,0,0-8.444,5.22776c-1.34634,1.38529.77277,3.50888,2.12132,2.12132Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/></svg>
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
                    <svg id="ace05a6f-f1ac-4978-a3bb-3e2345b819e7" style={{ width: '80%', height: 'auto' }}  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="767.65456" height="595.99576" viewBox="0 0 767.65456 595.99576"><path d="M682.61225,523.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,682.61225,523.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M707.04188,594.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C712.30971,590.54982,710.33837,593.36006,707.04188,594.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M635.17273,571.99786H405.28351a95.00238,95.00238,0,1,0-94.11078,82,94.76382,94.76382,0,0,0,34-6.27246v92.27246a8,8,0,0,0,8,8h282a8,8,0,0,0,8-8v-160A8,8,0,0,0,635.17273,571.99786Z" transform="translate(-216.17273 -152.0021)" fill="#e6e6e6"/><path d="M652.17271,726.9979h-282a9.01016,9.01016,0,0,1-9-9v-160a9.01016,9.01016,0,0,1,9-9h282a9.01016,9.01016,0,0,1,9,9v160A9.01016,9.01016,0,0,1,652.17271,726.9979Zm-282-176a7.00818,7.00818,0,0,0-7,7v160a7.00818,7.00818,0,0,0,7,7h282a7.00818,7.00818,0,0,0,7-7v-160a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M652.61225,534.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,652.61225,534.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M677.04188,605.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C682.30971,601.54982,680.33837,604.36006,677.04188,605.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><rect x="881.40957" y="159.51212" width="32" height="32" transform="translate(-137.98952 429.73239) rotate(-37.44104)" fill="#6c63ff"/><circle cx="540.54098" cy="180.1523" r="22" fill="#ff6584"/><path d="M751.06926,347.81191a23,23,0,1,1,32.24425,4.2788A23.02588,23.02588,0,0,1,751.06926,347.81191Zm34.93509-26.74957a21,21,0,1,0-3.90673,29.44041A21.0239,21.0239,0,0,0,786.00435,321.06234Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M902.05033,199.66752l-20.67012-26.9953,26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L908.00344,154.806Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="936.19123" y="337.97492" width="32" height="32" transform="translate(-235.19888 499.80362) rotate(-37.44104)" fill="#6c63ff"/><path d="M956.832,378.13032,936.16187,351.135l26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L962.7851,333.26875Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="0.99998" y="572.99579" width="624" height="2" fill="#3f3d56"/><path d="M324.17271,628.9979a96,96,0,1,1,96-96A96.10874,96.10874,0,0,1,324.17271,628.9979Zm0-190a94,94,0,1,0,94,94A94.10645,94.10645,0,0,0,324.17271,438.9979Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><circle cx="316.42142" cy="185.00645" r="53.51916" fill="#6c63ff"/><path d="M540.46971,356.84454l-.05566-2c3.7207-.10351,7.001-.33691,9.46582-2.13769a6.148,6.148,0,0,0,2.38134-4.52832,3.51431,3.51431,0,0,0-1.15283-2.89453c-1.63623-1.38184-4.269-.93457-6.188-.05469l-1.65478.75879,3.17334-23.19043,1.98144.27148-2.69921,19.72656c2.60742-.7666,5.02343-.43652,6.67822.96094a5.471,5.471,0,0,1,1.86035,4.49219,8.13264,8.13264,0,0,1-3.2002,6.07324C547.89256,356.63653,543.77684,356.75177,540.46971,356.84454Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><rect x="342.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><rect x="308.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><path d="M609.17271,551.4979h-126a4.50492,4.50492,0,0,1-4.5-4.5V445.77719A46.33163,46.33163,0,0,1,524.952,399.4979h41.2207a4.50529,4.50529,0,0,1,4.49951,4.4248l43.00049,143.002v.07325A4.50493,4.50493,0,0,1,609.17271,551.4979Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M525.47529,440.45264l14.75882.116a6.50753,6.50753,0,0,1,6.44872,6.55088l-.96658,123.00987a6.50753,6.50753,0,0,1-6.55087,6.44873l-14.75883-.116a6.50753,6.50753,0,0,1-6.44872-6.55088l.96658-123.00987A6.50753,6.50753,0,0,1,525.47529,440.45264Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M510.67271,435.4979a22,22,0,1,1,44,0v49h-44Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M516.78472,311.80158c5.06888-5.21551,12.43274-6.11235,19.36224-5.5448,7.42071.60778,14.452,3.07282,21.73106,4.44394,7.17984,1.35243,14.96391,1.95823,21.82646-1.03737a20.09144,20.09144,0,0,0,11.72323-15.979,29.03592,29.03592,0,0,0-5.257-20.47853c-4.7-6.64121-11.37734-11.50575-18.31814-15.589-14.96175-8.802-31.64438-16.50389-49.15015-17.92771-15.80435-1.28544-32.563,3.08229-43.68061,14.88551-10.42169,11.06441-14.85811,26.506-15.78063,41.37629-1.17743,18.97911,3.2519,37.722,4.85473,56.54079,1.24718,14.64319.78012,32.22265-11.11218,42.73862-10.519,9.30159-26.53626,9.19063-38.93809,4.10945-14.741-6.03956-25.08444-19.59752-32.90776-32.9229-1.99162-3.39231-3.86369-6.85277-5.67931-10.342-.8915-1.71327-3.48138-.19808-2.59041,1.51416,7.32148,14.07023,15.83772,28.12423,28.64444,37.8742,11.19745,8.52481,26.13832,12.63128,39.97878,9.02829a32.25043,32.25043,0,0,0,17.098-10.80463c4.74351-5.91016,7.233-13.18243,8.27145-20.62227,1.11153-7.96315.724-15.98758-.08116-23.95954-.96937-9.59732-2.5146-19.12452-3.573-28.71137-1.80249-16.32711-2.05082-33.2722,4.4005-48.69846a48.551,48.551,0,0,1,12.63135-17.97966A46.21559,46.21559,0,0,1,501.324,243.66126c16.9591-3.51936,34.19917,1.24561,49.55139,8.426a139.42789,139.42789,0,0,1,22.1571,12.43257c6.19746,4.43557,11.96927,10.24516,14.3566,17.65293,2.05742,6.38406,1.88616,13.94139-2.21567,19.508-4.38377,5.94925-11.98089,7.43475-18.94639,7.07658-14.30661-.73566-28.72417-9.05-43.11964-4.30484a20.74419,20.74419,0,0,0-8.444,5.22776c-1.34634,1.38529.77277,3.50888,2.12132,2.12132Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/></svg>
                    <h3 className="card-title">Create</h3>
                    <p className="card-desc">Fusce luctus aliquet consectetur. Sed tristique, erat id scelerisque placerat, risus eros elementum eros, in bibendum arcu ipsum non mi. Duis nec dignissim quam, et mattis nunc. </p>
                  </FeatureCardItem>
                  <FeatureCardItem>
                    <svg id="ace05a6f-f1ac-4978-a3bb-3e2345b819e7" style={{ width: '80%', height: 'auto' }}  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="767.65456" height="595.99576" viewBox="0 0 767.65456 595.99576"><path d="M682.61225,523.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,682.61225,523.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M707.04188,594.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C712.30971,590.54982,710.33837,593.36006,707.04188,594.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M635.17273,571.99786H405.28351a95.00238,95.00238,0,1,0-94.11078,82,94.76382,94.76382,0,0,0,34-6.27246v92.27246a8,8,0,0,0,8,8h282a8,8,0,0,0,8-8v-160A8,8,0,0,0,635.17273,571.99786Z" transform="translate(-216.17273 -152.0021)" fill="#e6e6e6"/><path d="M652.17271,726.9979h-282a9.01016,9.01016,0,0,1-9-9v-160a9.01016,9.01016,0,0,1,9-9h282a9.01016,9.01016,0,0,1,9,9v160A9.01016,9.01016,0,0,1,652.17271,726.9979Zm-282-176a7.00818,7.00818,0,0,0-7,7v160a7.00818,7.00818,0,0,0,7,7h282a7.00818,7.00818,0,0,0,7-7v-160a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M652.61225,534.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,652.61225,534.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M677.04188,605.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C682.30971,601.54982,680.33837,604.36006,677.04188,605.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><rect x="881.40957" y="159.51212" width="32" height="32" transform="translate(-137.98952 429.73239) rotate(-37.44104)" fill="#6c63ff"/><circle cx="540.54098" cy="180.1523" r="22" fill="#ff6584"/><path d="M751.06926,347.81191a23,23,0,1,1,32.24425,4.2788A23.02588,23.02588,0,0,1,751.06926,347.81191Zm34.93509-26.74957a21,21,0,1,0-3.90673,29.44041A21.0239,21.0239,0,0,0,786.00435,321.06234Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M902.05033,199.66752l-20.67012-26.9953,26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L908.00344,154.806Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="936.19123" y="337.97492" width="32" height="32" transform="translate(-235.19888 499.80362) rotate(-37.44104)" fill="#6c63ff"/><path d="M956.832,378.13032,936.16187,351.135l26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L962.7851,333.26875Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="0.99998" y="572.99579" width="624" height="2" fill="#3f3d56"/><path d="M324.17271,628.9979a96,96,0,1,1,96-96A96.10874,96.10874,0,0,1,324.17271,628.9979Zm0-190a94,94,0,1,0,94,94A94.10645,94.10645,0,0,0,324.17271,438.9979Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><circle cx="316.42142" cy="185.00645" r="53.51916" fill="#6c63ff"/><path d="M540.46971,356.84454l-.05566-2c3.7207-.10351,7.001-.33691,9.46582-2.13769a6.148,6.148,0,0,0,2.38134-4.52832,3.51431,3.51431,0,0,0-1.15283-2.89453c-1.63623-1.38184-4.269-.93457-6.188-.05469l-1.65478.75879,3.17334-23.19043,1.98144.27148-2.69921,19.72656c2.60742-.7666,5.02343-.43652,6.67822.96094a5.471,5.471,0,0,1,1.86035,4.49219,8.13264,8.13264,0,0,1-3.2002,6.07324C547.89256,356.63653,543.77684,356.75177,540.46971,356.84454Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><rect x="342.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><rect x="308.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><path d="M609.17271,551.4979h-126a4.50492,4.50492,0,0,1-4.5-4.5V445.77719A46.33163,46.33163,0,0,1,524.952,399.4979h41.2207a4.50529,4.50529,0,0,1,4.49951,4.4248l43.00049,143.002v.07325A4.50493,4.50493,0,0,1,609.17271,551.4979Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M525.47529,440.45264l14.75882.116a6.50753,6.50753,0,0,1,6.44872,6.55088l-.96658,123.00987a6.50753,6.50753,0,0,1-6.55087,6.44873l-14.75883-.116a6.50753,6.50753,0,0,1-6.44872-6.55088l.96658-123.00987A6.50753,6.50753,0,0,1,525.47529,440.45264Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M510.67271,435.4979a22,22,0,1,1,44,0v49h-44Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M516.78472,311.80158c5.06888-5.21551,12.43274-6.11235,19.36224-5.5448,7.42071.60778,14.452,3.07282,21.73106,4.44394,7.17984,1.35243,14.96391,1.95823,21.82646-1.03737a20.09144,20.09144,0,0,0,11.72323-15.979,29.03592,29.03592,0,0,0-5.257-20.47853c-4.7-6.64121-11.37734-11.50575-18.31814-15.589-14.96175-8.802-31.64438-16.50389-49.15015-17.92771-15.80435-1.28544-32.563,3.08229-43.68061,14.88551-10.42169,11.06441-14.85811,26.506-15.78063,41.37629-1.17743,18.97911,3.2519,37.722,4.85473,56.54079,1.24718,14.64319.78012,32.22265-11.11218,42.73862-10.519,9.30159-26.53626,9.19063-38.93809,4.10945-14.741-6.03956-25.08444-19.59752-32.90776-32.9229-1.99162-3.39231-3.86369-6.85277-5.67931-10.342-.8915-1.71327-3.48138-.19808-2.59041,1.51416,7.32148,14.07023,15.83772,28.12423,28.64444,37.8742,11.19745,8.52481,26.13832,12.63128,39.97878,9.02829a32.25043,32.25043,0,0,0,17.098-10.80463c4.74351-5.91016,7.233-13.18243,8.27145-20.62227,1.11153-7.96315.724-15.98758-.08116-23.95954-.96937-9.59732-2.5146-19.12452-3.573-28.71137-1.80249-16.32711-2.05082-33.2722,4.4005-48.69846a48.551,48.551,0,0,1,12.63135-17.97966A46.21559,46.21559,0,0,1,501.324,243.66126c16.9591-3.51936,34.19917,1.24561,49.55139,8.426a139.42789,139.42789,0,0,1,22.1571,12.43257c6.19746,4.43557,11.96927,10.24516,14.3566,17.65293,2.05742,6.38406,1.88616,13.94139-2.21567,19.508-4.38377,5.94925-11.98089,7.43475-18.94639,7.07658-14.30661-.73566-28.72417-9.05-43.11964-4.30484a20.74419,20.74419,0,0,0-8.444,5.22776c-1.34634,1.38529.77277,3.50888,2.12132,2.12132Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/></svg>
                    <h3 className="card-title">Export</h3>
                    <p className="card-desc">Etiam blandit eget est in eleifend. Curabitur malesuada elementum nulla eu aliquam. In ac tortor dapibus, congue neque a, consectetur tellus.</p>
                  </FeatureCardItem>
                  <FeatureCardItem>
                    <svg id="ace05a6f-f1ac-4978-a3bb-3e2345b819e7" style={{ width: '80%', height: 'auto' }}  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="767.65456" height="595.99576" viewBox="0 0 767.65456 595.99576"><path d="M682.61225,523.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,682.61225,523.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M707.04188,594.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C712.30971,590.54982,710.33837,593.36006,707.04188,594.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M635.17273,571.99786H405.28351a95.00238,95.00238,0,1,0-94.11078,82,94.76382,94.76382,0,0,0,34-6.27246v92.27246a8,8,0,0,0,8,8h282a8,8,0,0,0,8-8v-160A8,8,0,0,0,635.17273,571.99786Z" transform="translate(-216.17273 -152.0021)" fill="#e6e6e6"/><path d="M652.17271,726.9979h-282a9.01016,9.01016,0,0,1-9-9v-160a9.01016,9.01016,0,0,1,9-9h282a9.01016,9.01016,0,0,1,9,9v160A9.01016,9.01016,0,0,1,652.17271,726.9979Zm-282-176a7.00818,7.00818,0,0,0-7,7v160a7.00818,7.00818,0,0,0,7,7h282a7.00818,7.00818,0,0,0,7-7v-160a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M652.61225,534.03207l-1.25114,14.70664a6.50753,6.50753,0,0,1-7.0276,5.92562l-122.57092-10.4275a6.50753,6.50753,0,0,1-5.92562-7.02759l1.25115-14.70664a6.50751,6.50751,0,0,1,7.02759-5.92562l122.57092,10.4275A6.50753,6.50753,0,0,1,652.61225,534.03207Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M677.04188,605.76651l-13.5758,5.7921c-3.29649,1.40644-6.68936.88483-7.56294-1.16272l-29.9841-70.2782c-.87359-2.04755,1.09775-4.85779,4.39424-6.26424l13.5758-5.7921c3.29649-1.40644,6.68936-.88483,7.563,1.16272l29.9841,70.2782C682.30971,601.54982,680.33837,604.36006,677.04188,605.76651Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><rect x="881.40957" y="159.51212" width="32" height="32" transform="translate(-137.98952 429.73239) rotate(-37.44104)" fill="#6c63ff"/><circle cx="540.54098" cy="180.1523" r="22" fill="#ff6584"/><path d="M751.06926,347.81191a23,23,0,1,1,32.24425,4.2788A23.02588,23.02588,0,0,1,751.06926,347.81191Zm34.93509-26.74957a21,21,0,1,0-3.90673,29.44041A21.0239,21.0239,0,0,0,786.00435,321.06234Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><path d="M902.05033,199.66752l-20.67012-26.9953,26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L908.00344,154.806Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="936.19123" y="337.97492" width="32" height="32" transform="translate(-235.19888 499.80362) rotate(-37.44104)" fill="#6c63ff"/><path d="M956.832,378.13032,936.16187,351.135l26.9953-20.67012,20.67012,26.9953Zm-17.86627-26.62323,18.23834,23.81938,23.81938-18.23834L962.7851,333.26875Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><rect x="0.99998" y="572.99579" width="624" height="2" fill="#3f3d56"/><path d="M324.17271,628.9979a96,96,0,1,1,96-96A96.10874,96.10874,0,0,1,324.17271,628.9979Zm0-190a94,94,0,1,0,94,94A94.10645,94.10645,0,0,0,324.17271,438.9979Z" transform="translate(-216.17273 -152.0021)" fill="#3f3d56"/><circle cx="316.42142" cy="185.00645" r="53.51916" fill="#6c63ff"/><path d="M540.46971,356.84454l-.05566-2c3.7207-.10351,7.001-.33691,9.46582-2.13769a6.148,6.148,0,0,0,2.38134-4.52832,3.51431,3.51431,0,0,0-1.15283-2.89453c-1.63623-1.38184-4.269-.93457-6.188-.05469l-1.65478.75879,3.17334-23.19043,1.98144.27148-2.69921,19.72656c2.60742-.7666,5.02343-.43652,6.67822.96094a5.471,5.471,0,0,1,1.86035,4.49219,8.13264,8.13264,0,0,1-3.2002,6.07324C547.89256,356.63653,543.77684,356.75177,540.46971,356.84454Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><rect x="342.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><rect x="308.04698" y="172.76822" width="10.77148" height="2" fill="#2f2e41"/><path d="M609.17271,551.4979h-126a4.50492,4.50492,0,0,1-4.5-4.5V445.77719A46.33163,46.33163,0,0,1,524.952,399.4979h41.2207a4.50529,4.50529,0,0,1,4.49951,4.4248l43.00049,143.002v.07325A4.50493,4.50493,0,0,1,609.17271,551.4979Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M525.47529,440.45264l14.75882.116a6.50753,6.50753,0,0,1,6.44872,6.55088l-.96658,123.00987a6.50753,6.50753,0,0,1-6.55087,6.44873l-14.75883-.116a6.50753,6.50753,0,0,1-6.44872-6.55088l.96658-123.00987A6.50753,6.50753,0,0,1,525.47529,440.45264Z" transform="translate(-216.17273 -152.0021)" fill="#6c63ff"/><path d="M510.67271,435.4979a22,22,0,1,1,44,0v49h-44Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/><path d="M516.78472,311.80158c5.06888-5.21551,12.43274-6.11235,19.36224-5.5448,7.42071.60778,14.452,3.07282,21.73106,4.44394,7.17984,1.35243,14.96391,1.95823,21.82646-1.03737a20.09144,20.09144,0,0,0,11.72323-15.979,29.03592,29.03592,0,0,0-5.257-20.47853c-4.7-6.64121-11.37734-11.50575-18.31814-15.589-14.96175-8.802-31.64438-16.50389-49.15015-17.92771-15.80435-1.28544-32.563,3.08229-43.68061,14.88551-10.42169,11.06441-14.85811,26.506-15.78063,41.37629-1.17743,18.97911,3.2519,37.722,4.85473,56.54079,1.24718,14.64319.78012,32.22265-11.11218,42.73862-10.519,9.30159-26.53626,9.19063-38.93809,4.10945-14.741-6.03956-25.08444-19.59752-32.90776-32.9229-1.99162-3.39231-3.86369-6.85277-5.67931-10.342-.8915-1.71327-3.48138-.19808-2.59041,1.51416,7.32148,14.07023,15.83772,28.12423,28.64444,37.8742,11.19745,8.52481,26.13832,12.63128,39.97878,9.02829a32.25043,32.25043,0,0,0,17.098-10.80463c4.74351-5.91016,7.233-13.18243,8.27145-20.62227,1.11153-7.96315.724-15.98758-.08116-23.95954-.96937-9.59732-2.5146-19.12452-3.573-28.71137-1.80249-16.32711-2.05082-33.2722,4.4005-48.69846a48.551,48.551,0,0,1,12.63135-17.97966A46.21559,46.21559,0,0,1,501.324,243.66126c16.9591-3.51936,34.19917,1.24561,49.55139,8.426a139.42789,139.42789,0,0,1,22.1571,12.43257c6.19746,4.43557,11.96927,10.24516,14.3566,17.65293,2.05742,6.38406,1.88616,13.94139-2.21567,19.508-4.38377,5.94925-11.98089,7.43475-18.94639,7.07658-14.30661-.73566-28.72417-9.05-43.11964-4.30484a20.74419,20.74419,0,0,0-8.444,5.22776c-1.34634,1.38529.77277,3.50888,2.12132,2.12132Z" transform="translate(-216.17273 -152.0021)" fill="#2f2e41"/></svg>
                    <h3 className="card-title">Share</h3>
                    <p className="card-desc">Sed risus nisl, rutrum in ultricies ac, varius sit amet ligula. Etiam dui risus, mattis sed blandit eu, tempor iaculis augue. Praesent in mollis enim. </p>
                  </FeatureCardItem>
                </FeatureCards>
              </Container>
            </SectionAbout>
            <SectionFileTypes id="filesupport">
              <Container>
                  <SectionTitle>
                    <h2 className="section-title text-center">Great File type Support</h2>
                  </SectionTitle>
                  <p className="p-lead text-center">Hassle free usage on your pages easily!</p>
                  <p className="p-desc text-center w-75 m-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id urna luctus nisl fermentum ultrices. Suspendisse pharetra nisi in quam ultrices condimentum. </p>
                  <FeatureIconCards>
                    <FeatureIconCardItem>
                      <div className="card-icon">
                        <AiOutlineFileImage />
                      </div>
                      <h3 className="card-title">Card Title</h3>
                      <p className="card-desc">Fusce luctus aliquet consectetur. Sed tristique, erat id scelerisque placerat, risus eros elementum eros, in bibendum arcu ipsum non mi. Duis nec dignissim quam, et mattis nunc. </p>
                    </FeatureIconCardItem>
                    <FeatureIconCardItem>
                      <div className="card-icon">
                        <AiOutlineFileImage />
                      </div>
                      <h3 className="card-title">Card Title</h3>
                      <p className="card-desc">Fusce luctus aliquet consectetur. Sed tristique, erat id scelerisque placerat, risus eros elementum eros, in bibendum arcu ipsum non mi. Duis nec dignissim quam, et mattis nunc. </p>
                    </FeatureIconCardItem>
                    <FeatureIconCardItem>
                      <div className="card-icon">
                        <AiOutlineFileImage />
                      </div>
                      <h3 className="card-title">Card Title</h3>
                      <p className="card-desc">Fusce luctus aliquet consectetur. Sed tristique, erat id scelerisque placerat, risus eros elementum eros, in bibendum arcu ipsum non mi. Duis nec dignissim quam, et mattis nunc. </p>
                    </FeatureIconCardItem>
                  </FeatureIconCards>
              </Container>
            </SectionFileTypes>
            <SectionContact id="contact">
              <Container>
                <SocialLinks>
                  <a href="#"><FiGithub /></a>
                  <a href="#"><FiInstagram /></a>
                  <a href="#"><FiTwitter /></a>
                  <a href="#"><FiLink /></a>
                </SocialLinks>
                <SectionContactCredits className="text-center"><small>TryShape is a learning project developed by <a href="#">Tapas Adhikary</a></small></SectionContactCredits>
              </Container>
            </SectionContact>
        </div>
    )
};

export default Landing;
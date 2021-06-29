import React, { useState } from "react";

// link from next
import Link from "next/link";

// auth for signin out
import { auth } from "../../utils/firebase";

// toast
import toast from "react-hot-toast";

// icon
import { FiMenu, FiPower, FiX,  FiLogIn, FiSearch, FiPlus, FiTwitter } from "react-icons/fi";
import { BiSortDown } from "react-icons/bi";
import ImgLogo from '../../public/images/img-logo.svg'

// Bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';

// Styled Component
import styled from "styled-components";

// CreateShape Component
import { CreateShape } from "..";

const AppHeader = styled(Navbar)`
    padding: 0.6rem 0.8rem;
    background-color: var(--color-brand);

    .navbar-brand {
      @media (max-width: 767px) {
        width: 36px;
      }
    }

    .navbar-collapse {
      flex-grow: unset !important;
    }

    @media (min-width: 992px) {
      justify-content: space-between !important;
    }
`;

const Logo = styled.h1`
   width: 140px;
   height: 32px;
   background-image: url(${ImgLogo});
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
   padding: 0;
   margin: 2px 0 0 -8px;
   line-height: 1;
   cursor: pointer;

   @media (max-width: 767px) {
    width: 26px;
    margin: -2px 0 0 0;
    background-size: cover;
    background-position: center left;
  }
`;

const NavbarSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 420px;
  width: 64% !important;

  @media (min-width: 1280px) {
    max-width: 560px;
  }

  @media (max-width: 991px) {
    // max-width: 420px;
    flex: 1;
  }

  @media (max-width: 767px) {
    // max-width: 320px;
  }
`;

const NavbarSearchInput = styled(InputGroup)`
    position: relative;
    border-radius: 0.4rem;
    background-color: rgba(var(--color-neutral-100-rgb), 0.3);

    &:focus-within {
      box-shadow: 0 0 0 0.1rem rgba(var(--color-neutral-10-rgb), 40%);
      background-color: rgba(var(--color-neutral-100-rgb), 0.4);
    }
`;

const NavbarSearchInputText = styled(InputGroup.Text)`
    position: absolute;
    top: 3px;
    left: 0;
    background-color: transparent !important;
    border: 0 !important;
`;

const NavbarSearchInputControl = styled(FormControl)`
  border-radius: 0.4rem !important;
  border: 0 !important;
  background-color: transparent !important;
  color: var(--color-neutral-10) !important;
  padding-left: 2.4rem !important;
  font-size: var(--fs-rg) !important;
  ::placeholder {
    color: rgba(var(--color-neutral-10-rgb), 0.6) !important;
  }
`;

const CloseIcon = styled(FiX)`
  margin: 0.37rem;
  cursor: pointer;
`;

const UserThumb = styled.div`
  display: flex;
  grid-gap: 0.4rem;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;

const UserThumbName = styled.div`
  font-size: var(--fs-sm);
  color: var(--color-neutral-10);
  line-height: 1;
  max-width: 64px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 991px) {
    max-width: unset;
    overflow: unset;
    text-overflow: unset;
  }
`;

const LogoutButton = styled(Button)`
  color: var(--color-neutral-10);
`;

const LoginBar = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    justify-content: flex-end;
    border-top: solid 1px rgba(var(--color-neutral-10-rgb), 0.2);
    margin: 0.4rem 0 0 0;
    padding: 0.8rem 0.8rem 0.4rem 0;
    flex-wrap: wrap !important;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    grid-gap: 0.6rem;
    align-items: stretch;
     .login-element {
       
     }
  }
`;

const UserMeta = styled.div`
  display: flex;
  align-self: center;
`;

const LoginSeperator = styled.div`
  width: 1px;
  height: 1.8rem;
  background-color: rgba(var(--color-neutral-10-rgb), 0.4);
  margin: 0 0.2rem 0 0.7rem;
  align-self: center;
`;

const LoginBarBefore = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0.2em;

  @media (max-width: 991px) {
    justify-content: flex-end;
    border-top: solid 1px rgba(var(--color-neutral-10-rgb), 0.2);
    margin: 0.4rem 0 0 0;
    padding: 0.8rem 0.8rem 0.4rem 0;
    flex-wrap: wrap !important;
  }
`;



const Header = ({ 
  setOpen, 
  user, 
  setUser, 
  searchTerm,
  setSearchTerm,
  sort,
  setSort,
  shapeAction,
  setShapeAction
}) => {
  
  const [searchterm, setSearchterm] = useState('');
  // Controls when CreateShape Modal Shows
  const [showCreateShape, setShowCreateShape] = useState(false);

  const closeModal = () => {
    setShowCreateShape(false);
  }

  // sign out function
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser([]);
        toast.success("Signed Out!");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const tweet = () => {
    const link = `https://twitter.com/intent/tweet?text=👋%20Check%20this%20amazing%20app%20https://tryshape.vercel.app/,%20created%20by%20@tapasadhikary%20and%20friends%0A%0A%23DEVCommunity%20%23100DaysOfCode%20%23tryshape`;
    if(typeof window !== 'undefined') {
      window.open(
        link,
        '_blank' // <- This is what makes it open in a new window.
      );
    } 
  }

  return (
    <AppHeader sticky="top" expand="lg">
      <Navbar.Brand>
        <Link href="/">
          <Logo>       
            <div className="sr-only">TryShape</div>
          </Logo>
        </Link>
      </Navbar.Brand>
      <NavbarSearchInputContainer>
        <NavbarSearchInput>
          <NavbarSearchInputText id="basic-addon1"><FiSearch color='white' size='18px' /></NavbarSearchInputText>
          <NavbarSearchInputControl
            placeholder="Search a shape"
            aria-label="Search a shape"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && <CloseIcon title="Clear Search Query" color='#ffffff' size='24px' onClick={() => setSearchTerm('')}/>}
        </NavbarSearchInput>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic"className="border-0">
            <BiSortDown className='mr-0 d-lg-none' size="1.4rem" />
            <span className='d-none d-lg-inline'>
              {`Sort by ${sort}`}
            </span> 
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item 
              href="#" 
              active={sort==='oldest'} 
              onClick={() =>setSort('oldest')}>
              Oldest
            </Dropdown.Item>
            <Dropdown.Item 
              href="#" 
              active={sort==='popularity'} 
              onClick={() =>setSort('popularity')}>
              Popularity
            </Dropdown.Item>
            <Dropdown.Item 
              href="#" 
              active={sort==='recent'} 
              onClick={() =>setSort('recent')}>
              Recent
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </NavbarSearchInputContainer>
      <Navbar.Toggle>
          <FiMenu color="var(--color-neutral-10" size="24px"/>
      </Navbar.Toggle>
      <Navbar.Collapse className="justify-content-end">
        {(user.email || user.displayName) ? (
          <>
            <LoginBar>   
              <Button variant="outline-secondary" size="sm" className="mr-1 login-element" onClick={tweet}>
                <FiTwitter />
                Tweet it
              </Button> 
              <Button variant="primary" size="sm" className="mr-md-3 login-element" onClick={() => setShowCreateShape(true)}>
                <FiPlus />
                Add Shape
              </Button>
              <UserMeta className="login-element">
                <UserThumb>
                  <img
                    src={
                      user.photoURL
                        ? user.photoURL
                        : `https://unavatar.vercel.app/${user.email}`
                    }
                    alt="profile"
                  />
                  <UserThumbName>{user.displayName ? user.displayName : "User"}</UserThumbName>
                </UserThumb>
                <LoginSeperator />
                <LogoutButton onClick={signOut} variant="link" className="btn-icon p-0 ml-2">
                  <FiPower color='var(--color-neutral-10' size="18px"/>
                  <div className="sr-only">Sign Out</div>
                </LogoutButton>
              </UserMeta>
            </LoginBar>
          </>
        ) : (
          <>
            <LoginBarBefore>
              <Button variant="outline-secondary" size="sm" className="mr-1" onClick={tweet}>
                <FiTwitter />
                Tweet it
              </Button>
              <Button variant="outline-secondary" size="sm" onClick={() => setOpen(true)}>
                <FiLogIn />
                Sign In
              </Button>
            </LoginBarBefore>
          </>
        )}
        <CreateShape 
          show={showCreateShape} 
          handleClose={closeModal} 
          edit={false}
          user={user}
          shapeAction={shapeAction} 
          setShapeAction={setShapeAction} 
        />
      </Navbar.Collapse>
    </AppHeader>
  );
};

export default Header;

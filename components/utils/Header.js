import React, { useState } from "react";

// link from next
import Link from "next/link";

// auth for signin out
import { auth } from "../../utils/firebase";

// toast
import toast from "react-hot-toast";

// icon
import { FaShapes } from "react-icons/fa";

// Bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import { FiSearch } from "react-icons/fi";

// Styled Component
import styled from "styled-components";

const AppHeader = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.6rem 0.8rem;
    background-color: var(--color-brand);

    .navbar-action--primary {
      padding: 0.3rem 1rem;
      border: solid 1px var(--color-primary-accent);
      background-color: var(--color-primary-accent);
      font-size: var(--fs-sm);
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

const NavbarSearchInput = styled(InputGroup)`
    width: 60% !important;
    border-radius: 0.4rem;
    background-color: rgba(var(--color-neutral-100-rgb), 0.3);
`;

const NavbarSearchInputText = styled(InputGroup.Text)`
    background-color: transparent !important;
    border: 0 !important;
`;

const NavbarSearchInputControl = styled(FormControl)`
  background-color: transparent !important;
  border: 0 !important;
  color: var(--color-neutral-10) !important;
`;

InputGroup

const Header = ({ setOpen, user, setUser }) => {
  
  const [searchterm, setSearchterm] = useState('');
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

  const handleSearchTerm = event => {
    if (event.key === 'Enter') {
      search();
    } else {
      setSearchterm(event.target.value);
    }
  }

  const search = event => {
    console.log('Performing Search using', searchterm);
  }

  return (
    <AppHeader>
      <Link href="/">
        <a>
          TryShape
          <span>
            <FaShapes />
          </span>
        </a>
      </Link>
      <NavbarSearchInput>
        <NavbarSearchInputText 
          id="basic-addon1">
          <FiSearch color='white' />
        </NavbarSearchInputText>
        <NavbarSearchInputControl
          placeholder="Search a shape"
          aria-label="Search a shape"
          aria-describedby="basic-addon1"
          onChange={handleSearchTerm}
        />
      </NavbarSearchInput>
      {(user.email || user.displayName) ? (
        <>
          <div>
            <img
              src={
                user.photoURL
                  ? user.photoURL
                  : `https://unavatar.vercel.app/${user.email}`
              }
              alt="profile"
            />
            {user.displayName ? user.displayName : "User"}
          </div>

          <Button onClick={signOut}>
            <div>Sign Out</div>
          </Button>
        </>
      ) : (
        <Button onClick={() => setOpen(true)} className="navbar-action--primary">
          <div>Sign In</div>
        </Button>
      )}
    </AppHeader>
  );
};

export default Header;

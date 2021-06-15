import React, { useState } from "react";

// link from next
import Link from "next/link";

// auth for signin out
import { auth } from "../../utils/firebase";

// toast
import toast from "react-hot-toast";

// icon
import { FaShapes } from "react-icons/fa";

// Button
import Button from "react-bootstrap/Button";

const Header = ({ setOpen, user, setUser }) => {
  // console.log(user);
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

  return (
    <div>
      <Link href="/">
        <a>
          TryShape
          <span>
            <FaShapes />
          </span>
        </a>
      </Link>
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
        <Button onClick={() => setOpen(true)}>
          <div>Sign In</div>
        </Button>
      )}
    </div>
  );
};

export default Header;

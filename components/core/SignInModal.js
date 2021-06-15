import React from "react";

// icons
import { FaGithub, FaGoogle } from "react-icons/fa";

// Button
import Button from "react-bootstrap/Button";

// Modal
import Modal from "react-bootstrap/Modal";

// sign In providers
import { githubProvider, googleProvider } from "../../utils/Auth/auth-methods";

// auth
import socialMediaAuth from "../../utils/Auth/auth";

const SignInModal = ({ open, setOpen }) => {
  
  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    await setOpen(false);
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={ open }
      onHide={() => setOpen(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex">
          <Button onClick={() => handleOnClick(googleProvider)}>
            Sign In with Google <FaGoogle />
          </Button>

          <Button onClick={() => handleOnClick(githubProvider)}>
            Sign In with Github
            <FaGithub />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;

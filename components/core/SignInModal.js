import React from "react";

// icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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
      size="md"
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
        <div className="d-flex flex-column align-items-center">
          <Button variant="outline-dark" size="lg" onClick={() => handleOnClick(googleProvider)} className='mt-5 mb-2'>
            <FcGoogle size='24px'/> Sign In with Google
          </Button>

          <Button variant="outline-dark" size="lg" onClick={() => handleOnClick(githubProvider)} className='mt-2 mb-5'>
            <FaGithub size='24px' /> Sign In with Github
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;

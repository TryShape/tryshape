import React from 'react';

import Button from 'react-bootstrap/Button';

// Header
import { Header } from '..'

// icon
import { BsLightning } from "react-icons/bs";

// link
import Link from "next/link";

const Landing = ({ setOpen, user, setUser }) => {
    
    return(
        <div>
            <Header setOpen={setOpen} user={user} setUser={setUser} />
            <div>
                <h1>Landing</h1>
            </div>
            <Link href="/app">
              <a>
                <Button>
                  <div>
                    Try Now!
                    <BsLightning />
                  </div>
                </Button>
              </a>
            </Link>
        </div>
    )
};

export default Landing;
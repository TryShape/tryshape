import React from 'react';

// Header
import { Header } from '..'

const Landing = ({ setOpen, user, setUser }) => {
    
    return(
        <div>
            <Header setOpen={setOpen} user={user} setUser={setUser} />
            <div>
                <h1>Try Shape</h1>
            </div>
        </div>
    )
};

export default Landing;
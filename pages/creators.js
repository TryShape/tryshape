import React, { useState, useEffect} from 'react';

// Styled Component
import styled from "styled-components";

// header
import { Header } from '../components';

// harperDb fetch call
import { harperFetch } from "../utils/HarperFetch";

// content
const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4rem auto auto auto;
`;
const Creators = (props) => {

    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        let creators = await harperFetch({
            operation: "sql",
            sql: `SELECT count(s.shape_id) as total, s.createdBy as email, u.name as name, u.photoURL as photo 
                FROM tryshape.shapes s 
                INNER JOIN tryshape.users u 
                ON s.createdBy=u.email  
                WHERE s.private=false 
                GROUP BY s.createdBy, u.name, u.photoURL 
                ORDER BY total DESC`,
        });
        console.log(creators);
        setCreators(creators);
        setLoading(false);
    }, []);

    return(
        <>
            <Header {...props} simple={true}/>
            {
                loading ? 
                    (<h1>Loading...</h1>) :
                    (<Content>
                        <h1>Creator Page</h1>
                        {creators.map((creator, index) => (
                            <div key={index}>
                                <img src={creator.photo} alt={creator.name} />
                                {creator.name}
                                {creator.total}
                            </div>
                        ))}
                     </Content>)
            }
            
        </>
    )
};

export default Creators
import React from 'react';
import styled from "styled-components"

const StarContainer = styled.span`
    display:flex;
    font-size: 25px;
    &:hover .star {
        color: black;
    }
`;

const Star = styled.p`
    font-size: 2rem;
    cursor: pointer;
    color: gray;
    &:hover ~.star {
        color: gray;
    }
`;

const Stars = ({rating, handleStarClick}) => {

    return (
        <StarContainer>
            {Array.from({ length: 5 }, (_, index) => (
                <Star
                    key={index}
                    className={`star ${rating >= index + 1 ? 'filled' : ''}`}
                    onClick={() => handleStarClick(index + 1)}
                >
                    ★
                </Star>
            ))}
        </StarContainer>
    );
}

export default Stars;

import React from 'react';
import Stars from "./Stars"
import styled from 'styled-components';
import { ConditionalHighlight } from "../MiscStyling";

const SidePanelContainer = styled.section`
    padding: 20px;
    min-width: 200px;
    max-width: 20%;
    width: 15%;
    display: block;
    background-color: var(--gray);
    border-right: 2px solid #C8C8C8;
    resize: horizontal;

    input[type="date"] {
        ${ConditionalHighlight};
    }

    &input[type="checkbox"]:hover {
        background-color: var(--navy);
    }
}
`;

const ClearFilter = styled.p`
    font-style: italic;
    color: gray;
    size: 10px;

    &:hover {
        font-weight: bold;
        cursor: pointer;
        color: red;
    }
`;

const SideBar = ({filterInput, setFilterInput}) => {

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.type==="checkbox" ? event.target.checked : event.target.value;

        setFilterInput(prevFilter=>{
            return {
                ...prevFilter,
                [name]: value,
            }
        });
    }

    function updateRating(rating) {
        setFilterInput(prevFilter=>{
            return {
                ...prevFilter,
                rating: rating,
            }
        });
    }

    const clearFilter = (filterType) => {

        switch (filterType) {
            case "status":
                setFilterInput(prevFilter=>{
                    return {
                        ...prevFilter,
                        complete: true,
                        incomplete: true,
                    }
                });
                break;
            case "dates":
                setFilterInput(prevFilter=>{
                    return {
                        ...prevFilter,
                        startDate: "",
                        endDate: "",
                    }
                });
                break;
            case "rating":
                updateRating(0)
                break;
            default:
                break;
        }
    }

    return (
        <SidePanelContainer className="side-panel">
            <h2>Apply Filters</h2>
            <h3>Trip Status</h3>
            <label>
                <input
                    checked={filterInput.complete}
                    type="checkbox"
                    name="complete"
                    onChange={handleChange}
                />
                Complete
            </label>
            <label>
                <input
                    checked={filterInput.incomplete}
                    type="checkbox"
                    name="incomplete"
                    onChange={handleChange}
                />
                Bucket List
            </label>
            <ClearFilter onClick={()=>clearFilter("status")}>clear status filter</ClearFilter>
            <h3>Dates</h3>
            <label for="startDate">Start Date</label>
            <input
                value={filterInput.startDate}
                type="date"
                name="startDate"
                onChange={handleChange}
            />
            <label for="endDate">End Date</label>
            <input
                value={filterInput.endDate}
                type="date"
                name="endDate"
                onChange={handleChange}
            />
            <ClearFilter onClick={()=>clearFilter("dates")}>clear dates filter</ClearFilter>
            <h3>Minimum Rating</h3>
            <Stars rating={filterInput.rating} handleStarClick={updateRating}/>
            <ClearFilter onClick={()=>clearFilter("rating")}>clear rating filter</ClearFilter>
        </SidePanelContainer>
    );
}

export default SideBar;

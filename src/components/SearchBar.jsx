import styled from "styled-components";
import { ConditionalHighlight } from "../MiscStyling";

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: var(--blue);
    padding: 0;
    width: 100%;

    input {
        border-radius: 20px;
        height: 45px;
        width: 80%;
        font-size: 16px;
        border: 1px solid #ccc;
        padding: 10px 15px;
        ${ConditionalHighlight};
    }
`

const SearchBar = ({searchInput, setSearchInput}) => {
    
    function handleChangeSearch(event) {
        setSearchInput(event.target.value);
    }

    return (
        <SearchContainer>
            <input 
                value={searchInput}
                type="text"
                id="search"
                placeholder="Type location to search..."
                onChange={handleChangeSearch}
            />
        </SearchContainer>
    );
}

export default SearchBar;

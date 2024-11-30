

const SearchBar = ({searchInput, setSearchInput}) => {
    
    function handleChangeSearch(event) {
        setSearchInput(event.target.value);
    }

    return (
        <div id="search-bar">
            <input 
                value={searchInput}
                type="text"
                id="search"
                placeholder="Type location to search..."
                onChange={handleChangeSearch}
            />
        </div>
    );
}

export default SearchBar;

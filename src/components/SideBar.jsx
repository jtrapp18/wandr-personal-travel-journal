import React from 'react';


const SideBar = ({filterInput, setFilterInput}) => {

    function handleChangeFilter(event) {
        const name = event.target.name;
        const value = event.target.checked;

        setFilterInput(prevFilter=>{
            return {
                ...prevFilter,
                [name]: value,
            }
        });
    }

    return (
        <section className="side-panel">
            <h3>Apply Filters</h3>
            <label>
                <input
                    checked={filterInput.complete}
                    type="checkbox"
                    name="complete"
                    onChange={handleChangeFilter}
                />
                Complete
            </label>
            <label>
                <input
                    checked={filterInput.incomplete}
                    type="checkbox"
                    name="incomplete"
                    onChange={handleChangeFilter}
                />
                Bucket List
            </label>
        </section>
    );
}

export default SideBar;

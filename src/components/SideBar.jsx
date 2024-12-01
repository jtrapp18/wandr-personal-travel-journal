import React from 'react';


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

    return (
        <section className="side-panel">
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
            <h3>Dates</h3>
            <label>
                Start Date
                <input
                    checked={filterInput.startDate}
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                />
            </label>
            <label>
                End Date
                <input
                    checked={filterInput.endDate}
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                />
            </label>
        </section>
    );
}

export default SideBar;

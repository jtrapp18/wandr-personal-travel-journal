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

    function updateRating(rating) {
        setFilterInput(prevFilter=>{
            return {
                ...prevFilter,
                ["rating"]: rating,
            }
        });
    }

    const clearFilter = (filterType) => {

        switch (filterType) {
            case "status":
                setFilterInput(prevFilter=>{
                    return {
                        ...prevFilter,
                        ["complete"]: true,
                        ["incomplete"]: true,
                    }
                });
                break;
            case "dates":
                setFilterInput(prevFilter=>{
                    return {
                        ...prevFilter,
                        ["startDate"]: "",
                        ["endDate"]: "",
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
            <p class="clear-filter" onClick={()=>clearFilter("status")}>clear status filter</p>
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
            <p class="clear-filter" onClick={()=>clearFilter("dates")}>clear dates filter</p>
            <h3>Minimum Rating</h3>
            <span class="rating-filter">
                {Array.from({ length: 5 }, (_, index) => (
                    <p
                        key={index}
                        className={`star ${filterInput.rating >= index + 1 ? 'filled' : ''}`}
                        onClick={() => updateRating(index + 1)}
                    >
                        ★
                    </p>
                ))}
            </span>
            <p class="clear-filter" onClick={()=>clearFilter("rating")}>clear rating filter</p>
        </section>
    );
}

export default SideBar;

import React, {useState, useEffect} from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// COmposant désuet


const FilterBTN: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".filter-panel") && !target.closest("button")) {
                closeFilter();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>

                <button onClick={toggleFilter} className={"my-div-circle"}>
                        <FilterAltIcon sx={{height: 50}}/>
                </button>

            {isFilterOpen && (
                <div className="filter-panel">
                    <form>
                        <label>
                            <input type="text"/>
                        </label>
                        <label>
                            <select>
                                <option>tag</option>
                                <option>type</option>
                            </select>
                        </label>
                    </form>
                </div>
            )}
        </>
    );
};

export default FilterBTN;
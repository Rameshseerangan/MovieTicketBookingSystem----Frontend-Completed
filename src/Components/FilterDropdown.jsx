const FilterDropdown = ({ setType }) => {
    return (
      <select className="p-2 bg-gray-800 text-white" onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
    );
  };
  
  export default FilterDropdown;
  
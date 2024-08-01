import { useState } from "react";

const SearchBlog = ({ searchTerm, setSearchTerm }) => {

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="w-full md:w-96 h-10">
        <input
            type="text"
            placeholder="Search blog by name" 
            className="px-3.5 py-2 border rounded-3xl focus:outline-none w-full h-full text-xs md:text-base "
            value={searchTerm}
            onChange={handleSearchChange}
        />
    </div>
  )
}

export default SearchBlog;
const SearchBlog = () => {
  return (
    <div className="w-full md:w-96">
        <input
            type="text"
            placeholder="Search blog by name"
            className="px-3.5 py-2 border rounded-3xl focus:outline-none w-full text-xs md:text-base"
        />
    </div>
  )
}

export default SearchBlog;
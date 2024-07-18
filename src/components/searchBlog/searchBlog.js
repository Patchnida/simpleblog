const SearchBlog = () => {
  return (
    <div className="w-80">
        <input
            type="text"
            placeholder="Search blog by name"
            className="px-3.5 py-2 border rounded-3xl focus:outline-none w-full"
        />
    </div>
  )
}

export default SearchBlog;
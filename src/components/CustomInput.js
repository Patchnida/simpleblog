export default function CustomInput({ ariaLabel }) {
    return (
      <div>
        <input
          type="text"
          placeholder="Title"
          className="px-4 py-2 border-b focus:outline-none w-full placeholder-black"
        />
      </div>
    )
  }

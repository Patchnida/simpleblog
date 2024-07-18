export default function CustomDropdown({ ariaLabel }) {
    return (
      <div>
        <select
          aria-label={ariaLabel}
          className="px-3.5 py-2 border-b focus:outline-none w-full"
        >
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
          <option value="option5">Option 5</option>
        </select>
      </div>
    )
  }
  
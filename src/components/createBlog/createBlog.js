'use client'

import { useState } from "react";

export default function CreateBlog() {
    const [selectedCategory, setSelectedCategory] = useState('');
  
    return (
      <div>
        <input
          type="text"
          placeholder="Title"

          className="px-4 py-2 border-b focus:outline-none w-full placeholder-black text-2xl"
        />
  
        <select
         
          className="px-3.5 py-2 border-b focus:outline-none w-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="option1">General</option>
          <option value="option2">Knowledge</option>
          <option value="option3">News</option>
          <option value="option4">Entertainment</option>
          <option value="option5">Others</option>
        </select>

        <textarea
            type="text"
            placeholder="Description"
            className="px-4 py-2 border-b focus:outline-none w-full h-36 placeholder-black">

        </textarea>
      </div>
    );
  }

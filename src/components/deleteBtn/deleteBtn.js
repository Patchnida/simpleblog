"use client"
import React from "react";

const DeleteBtn = () => {
    const handleDelete = async () => {
        
    }

  return (
    <div>
        <button 
            type="button"
            className="text-sm md:text-base font-medium text-red-500 hover:underline cursor-pointer"
            onClick={handleOpenPopup}
        >
            Delete
        </button>
    </div>
  )
}

export default DeleteBtn;
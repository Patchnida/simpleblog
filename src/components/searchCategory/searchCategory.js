'use client'

import { useState, useEffect, useRef } from "react";

const SearchCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const dropdownRef = useRef(null);

    const categories = [
        { value: "General", label: "General" },
        { value: "Knowledge", label: "Knowledge" },
        { value: "News", label: "News" },
        { value: "Entertainment", label: "Entertainment" },
        { value: "Others", label: "Others" },
    ];

    const handleSelect = (value) => {
        setSelectedCategory(value);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex justify-end" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-zinc-950 text-white font-medium px-5 py-2 border rounded-3xl w-20 md:w-44 flex justify-center items-center hover:shadow hover:bg-zinc-800"
            >
                {selectedCategory ? categories.find((category) => category.value === selectedCategory).label :
                    (
                        <>
                            <p className="md:hidden text-xs">Category</p>
                            <p className="hidden text-base md:inline">Select a category</p>
                        </>
                    )
                }
            </button>

            {isOpen && (
                <ul className="absolute mt-14 bg-white z-10">
                    {categories.map((category) => (
                        <li
                            key={category.value}
                            onClick={() => handleSelect(category.value)}
                            className="px-5 py-2 border border-zinc-200 text-base hover:bg-zinc-200 hover:font-medium cursor-pointer"
                        >
                            {category.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchCategory;

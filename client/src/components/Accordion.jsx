import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Accordion = ({ items }) => {
  const [activeItems, setActiveItems] = useState(
    new Array(items.length).fill(false)
  );

  useEffect(() => {
    setActiveItems((prevActiveItems) => {
      const newActiveItems = [...prevActiveItems];
      newActiveItems[0] = true;
      return newActiveItems;
    });
  }, []);

  const toggleItem = (index) => {
    setActiveItems((prevActiveItems) => {
      const newActiveItems = [...prevActiveItems];
      newActiveItems[index] = !newActiveItems[index];
      return newActiveItems;
    });
  };

  return (
    <div className="w-full mt-6 md:mt-10">
      {items.map((item, index) => (
        <div key={index} className="mb-4 border rounded overflow-hidden">
          <button
            className="flex justify-between items-center w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => toggleItem(index)}
          >
            <span className="text-sm md:text-base font-medium">
              {item.title}
            </span>
            <BsChevronUp
              className={`text-xl ${
                activeItems[index]
                  ? "transform rotate-180"
                  : "transform rotate-0 transition-transform"
              } transition-transform duration-300`}
            />
          </button>
          <div
            className={`transition-all duration-300 ${
              activeItems[index] ? "h-14" : "h-0"
            } overflow-auto scrollbar-none`}
          >
            <p className="px-4 py-2 text-gray-500 text-xs md:text-sm">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;

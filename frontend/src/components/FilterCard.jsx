/* import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const FilterCard = () => {
  const dispatch=useDispatch()
  const [filters, setFilters] = useState({
    Location: null,
    Industry: null,
    Salary: null,
  });

  const changeHandler = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value, // Toggle selection
    }));
  };
useEffect(() => {
  dispatch(setSearchedQuery(filters))
}, [filters]);
  const filterData = [
    {
      filterType: "Location",
      array: [
        "Dhaka",
        "Chittagong",
        "Rajshahi",
        "Khulna",
        "Barishal",
        "Sylhet",
        "Rangpur",
      ],
    },
    {
      filterType: "Industry",
      array: [
        "Frontend Developer",
        "Software Developer",
        "Software Engineer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "Fullstack Developer",
      ],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "41-70k", "71-1lac", "1 to 5lac"],
    },
  ];

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, filterIndex) => (
        <div key={filterIndex}>
          <h2 className="mt-6 font-bold text-xl">{data.filterType}</h2>
          {data.array.map((item, itemIndex) => {
            const inputId = `${data.filterType}-${itemIndex}`;
            return (
              <div key={itemIndex} className="flex items-center">
                <input
                  type="radio"
                  id={inputId}
                  name={`radio-${data.filterType}`} // Group by filterType
                  className="radio radio-xs radio-error"
                  checked={filters[data.filterType] === item}
                  onChange={() => changeHandler(data.filterType, item)}
                />
                <label htmlFor={inputId} className="ml-2 md:text-base text-xs">
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
 */

import React, { useState } from "react";

const FilterCard = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    Location: null,
    Industry: null,
    Salary: null,
  });

  const changeHandler = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: filters[filterType] === value ? null : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters); // Pass filters to parent
  };

  const filterData = [
    {
      filterType: "Location",
      array: [
        "Dhaka",
        "Chittagong",
        "Rajshahi",
        "Khulna",
        "Barishal",
        "Sylhet",
        "Rangpur",
      ],
    },
    {
      filterType: "Industry",
      array: [
        "Software Developer",
        "Software Engineer",
        "Fullstack Developer",
        "Graphic Designer" ,
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
      ],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "41-70k", "71-1lac", "1 to 5lac"],
    },
  ];

  return (
    <div className="w-full bg-white px-5 ">
      <h1 className="font-bold text-2xl hanken">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, filterIndex) => (
        <div key={filterIndex}>
          <h2 className="mt-6 mb-3 font-bold hanken text-2xl">{data.filterType}</h2>
          {data.array.map((item, itemIndex) => {
            const inputId = `${data.filterType}-${itemIndex}`;
            return (
              <div key={itemIndex} className="flex ml-3 items-center">
                <input
                  type="radio"
                  id={inputId}
                  name={`radio-${data.filterType}`}
                  className="radio radio-xs radio-neutral"
                  checked={filters[data.filterType] === item}
                  onChange={() => changeHandler(data.filterType, item)}
                />
                <label htmlFor={inputId} className="ml-2  text-lg">
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;

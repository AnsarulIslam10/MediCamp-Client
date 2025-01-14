import React, { useState } from "react";
import useCamp from "../../hooks/useCamp";
import CampCard from "../../components/Shared/CampCard/CampCard";
import Loading from "../../components/Shared/Loading";
import Container from "../../components/Shared/Container";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";

const AvailableCamps = () => {
  const [viewLayout, setViewLayout] = useState("three");
  const [sortBy, setSortBy] = useState("");
  const [camp, loading, refetch, search, setSearch] = useCamp(sortBy);
  const [searchInput, setSearchInput] = useState(search);
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    setSearch(searchInput);
  };
  const handleSort = (e) => {
    setSortBy(e.target.value);
  };
  const toggleView = () => {
    setViewLayout((prev) => (prev === "three" ? "two" : "three"));
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <Container>
      <div className="my-16">
        <label className="input input-bordered flex items-center gap-2 max-w-lg mx-auto">
          <input
            value={searchInput}
            onChange={handleInputChange}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <button onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>
        <div className="flex items-center gap-2  text-3xl justify-end mb-4">
          <button onClick={toggleView}>
            <TfiLayoutGrid2Alt
              className={`${viewLayout === "two" ? "text-primary" : ""}`}
            />
          </button>
          <button onClick={toggleView}>
            <TfiLayoutGrid3Alt
              className={`${viewLayout === "three" ? "text-primary" : ""}`}
            />
          </button>
          <select
            onChange={handleSort}
            value={sortBy}
            className="select select-bordered max-w-xs"
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value={"most-registered"}>Most Registered</option>
            <option value={"camp-fees"}>Camp Fees</option>
            <option value={"alphabetical"}>A-Z</option>
          </select>
        </div>
        {viewLayout === "three" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {camp.map((item) => (
              <CampCard key={item._id} item={item}></CampCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {camp.map((item) => (
              <CampCard key={item._id} item={item}></CampCard>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AvailableCamps;

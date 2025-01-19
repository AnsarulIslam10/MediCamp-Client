import React, { useState } from "react";
import useCamp from "../../hooks/useCamp";
import CampCard from "../../components/Shared/CampCard/CampCard";
import Container from "../../components/Shared/Container";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";

const AvailableCamps = () => {
  const [viewLayout, setViewLayout] = useState("three");
  const [sortBy, setSortBy] = useState("");
  const [camp, , , search, setSearch, page, setPage, limit] = useCamp(sortBy);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };
  const toggleView = () => {
    setViewLayout((prev) => (prev === "three" ? "two" : "three"));
  };

  return (
    <Container>
      <div className="my-16">
        <label className="input input-bordered flex items-center gap-2 max-w-lg mx-auto mb-2">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <button>
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
            {camp.result?.map((item) => (
              <CampCard key={item._id} item={item}></CampCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {camp.result?.map((item) => (
              <CampCard key={item._id} item={item}></CampCard>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center my-6 space-x-4">
        <button
          className="btn bg-primary border-none px-6 py-2 rounded-lg shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <span className="text-lg font-semibold">Previous</span>
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page {page} of {camp.totalPages}
        </span>
        <button
          className="btn bg-primary border-none px-6 py-2 rounded-lg shadow-md hover:bg-primary-hover disabled:opacity-50"
          onClick={() =>
            setPage((prev) =>
              camp.totalPages ? Math.min(prev + 1, camp.totalPages) : prev
            )
          }
          disabled={page === camp.totalPages}
        >
          <span className="text-lg font-semibold">Next</span>
        </button>
      </div>
    </Container>
  );
};

export default AvailableCamps;

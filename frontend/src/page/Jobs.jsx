import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import FilterCard from "../components/FilterCard";
import JobCard from "../components/JobCard";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [activeFilters, setActiveFilters] = useState({
    Location: null,
    Industry: null,
    Salary: null,
  });

  // Define parseSalary function inside the component
  const parseSalary = (salaryInput) => {
    if (!salaryInput) return 0;

    // Convert to string if it isn't already
    const salaryStr = String(salaryInput).toLowerCase().trim();

    try {
      // Handle "lac" notation (1 lac = 100,000)
      if (salaryStr.includes("lac")) {
        return parseFloat(salaryStr) * 100000;
      }

      // Handle "k" notation (1k = 1,000)
      if (salaryStr.includes("k")) {
        return parseFloat(salaryStr) * 1000;
      }

      // Plain numeric value
      return parseFloat(salaryStr);
    } catch (error) {
      console.error("Error parsing salary:", salaryInput, error);
      return 0;
    }
  };

  useEffect(() => {
    let filtered = [...allJobs];

    // Apply search query filter
    if (searchedQuery) {
      filtered = filtered.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description
            ?.toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          String(job.salary || "")
            .toLowerCase()
            .includes(searchedQuery.toLowerCase())
        );
      });
    }

    // Apply additional filters
    if (activeFilters.Location) {
      filtered = filtered.filter((job) =>
        job.location?.includes(activeFilters.Location)
      );
    }

    if (activeFilters.Industry) {
      filtered = filtered.filter(
        (job) =>
          job.title?.includes(activeFilters.Industry) ||
          job.description?.includes(activeFilters.Industry)
      );
    }

    if (activeFilters.Salary) {
      filtered = filtered.filter((job) => {
        const salaryValue = parseSalary(job.salary);

        switch (activeFilters.Salary) {
          case "0-40k":
            return salaryValue >= 0 && salaryValue <= 40000;
          case "41-70k":
            return salaryValue > 40000 && salaryValue <= 70000;
          case "71-1lac":
            return salaryValue > 70000 && salaryValue <= 100000;
          case "1 to 5lac":
            return salaryValue > 100000 && salaryValue <= 500000;
          default:
            return true;
        }
      });
    }

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery, activeFilters]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <Layout>
      <div className="container px-5 py-12 mx-auto block md:flex">
        <div className="lg:w-1/4 md:w-1/3 w-full">
          <FilterCard onFilterChange={handleFilterChange} />
        </div>
        <div className="lg:w-3/4 md:w-2/3 w-full">
          <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-4 gap-y-8 my-6 ">
            {filterJobs.length > 0 ? (
              filterJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <div className="col-span-3 text-center py-10">
                <p>No jobs found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;

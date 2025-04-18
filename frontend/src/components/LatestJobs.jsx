import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
  const {allJobs}=useSelector(store=>store.job)
  
    return (
      <div className="container mx-auto overflow-x-hidden px-5 pb-12">
        <h1 className="  text-5xl text-center md:text-left font-bold mb-20">
          Latest & top <span>Job openings</span>
        </h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  w-full  gap-4 my-6 ">
          {allJobs.length != 0 ? (
            allJobs
              .slice(0, 6)
              .map((job) => (
                <LatestJobCards
                 
                  key={job._id}
                  job={job}
                />
              ))
          ) : (
            <>no data</>
          )}
        </div>
      </div>
    );
};

export default LatestJobs;
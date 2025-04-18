import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({job}) => {
 const navigate = useNavigate();
    return (
      <div onClick={() => navigate(`/description/${job._id}`)} className='cursor-pointer'>
        <div className="card card-border bg-base-100  border  h-64 px-5  shadow-2xl">
          <div className="card-body">
            <div>
              <h1 className="text-2xl font-bold text-stone-800">{job.company.name}</h1>
              <p className="text-xs font-light text-stone-500">{job.location}</p>
            </div>
            <h2 className="text-lg font-semibold text-stone-700">{job.title}</h2>
            <p className="text-xs text-stone-500 ">{job.description}</p>
            <div className="card-actions justify-start">
              <div className="badge badge-primary badge-sm">{job.position}</div>
              <div className="badge badge-neutral badge-sm"> {job.jobType}</div>
              <div className="badge badge-secondary badge-sm">{job.salary}</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default LatestJobCards;
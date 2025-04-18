import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBuilding,} from "@fortawesome/free-solid-svg-icons";
import '../App.css'
import { useNavigate } from 'react-router-dom';

const JobCard = ({job}) => {
  const navigate = useNavigate();
const daysAgoFunction = (mongodbTime) => {
  const createdAt=new Date(mongodbTime)
  const currentTime = new Date();
  const timeDiffirence = currentTime - createdAt;
  return Math.floor(timeDiffirence / (1000 * 24 * 60 * 60));
};
  return (
    <div className=" mx-auto shadow-2xl w-full bg-stone-50  px-4 py-2 rounded-xl">
      <div className="flex justify-between items-center p-5">
        <p className="text-xs text-amber-800 ">
          {daysAgoFunction(job.createdAt) === 0
            ? "today "
            : daysAgoFunction(job.createdAt)}
          days ago
        </p> 
        
      </div>
      <div className="flex gap-3 items-center">
        <img src={job.company.logo} className="w-10 h-10 rounded-full" />
        <p className='text-xl font-bold text-stone-800 mb-2'>
          {job.company.name}
          <br />
          <span className='text-xs text-stone-500'>{job.location}</span>
        </p>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold hanken mb-1">{job.title}</h2>
        <p className="text-xs text-stone-600 font-light mb-2 ">{job.description}</p>
        <div className="card-actions justify-start">
          <div className="badge badge-primary badge-sm">{job.position}</div>
          <div className="badge badge-neutral badge-sm">{job.jobType}</div>
          <div className="badge badge-secondary badge-sm">{job.salary}</div>
        </div>
        <div className="flex mt-3 gap-1">
          <button
            onClick={() => navigate(`/description/${job._id}`)}
            className="btn btn-secondary btn-sm hover:btn-neutral mb-2 "
          >
            Details
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default JobCard;
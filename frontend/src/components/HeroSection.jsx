import React, { useState } from 'react';
import p1 from '../assets/images/ChatGPT Image Mar 31, 2025, 09_14_34 PM.png'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { errortoast } from '../helper/helper';

const HeroSection = () => {
  const [query ,setQuery] = useState("");
  const navigate =useNavigate()
const dispatch =useDispatch()
const searchJobHandler =()=>{
  if (!query) {
    errortoast("search your dream jobs")
    navigate("/")
  }else{

    dispatch(setSearchedQuery(query));
    navigate("/browser");
  }
}


    return (
      <div className="container mx-auto px-5 overflow-x-hidden py-12 min-h-screen ">
        <div className="badge badge-primary mt-4  flex justify-center">
          <span >Number One Job Hunting Website</span>
        </div>
        <div className="hero-content flex-col lg:flex-row-reverse mb-20">
          <img
            src={p1}
            className="max-w-sm rounded-lg shadow-xl mb-5 "
          />
          <div>
            <h1 className="text-5xl font-bold">
              Search Apply &<br /> <span>Get Your</span> <span>Dream Job</span>
            </h1>
            <p className="py-6 font-light">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex justify-content-center">
              <input
                type="text"
                placeholder="Find Your Jobs"
                className="input"
                onChange={(e)=>setQuery(e.target.value)}
              />
              <button onClick={searchJobHandler} className="btn btn-primary mx-4">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HeroSection;
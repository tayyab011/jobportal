import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/HeroSection';
import CategoryCarousel from '../components/CategoryCarousel';
import LatestJobs from '../components/LatestJobs';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import Companies from '../admin/Companies';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate=useNavigate()
   useGetAllJobs()
   const {user} =useSelector((store)=>store.auth)
   useEffect(()=>{

(()=>{
if (user && user.role === "recruiter") {
 navigate("/admin/companies");
}
})()

   },[])
    return (
        <Layout>
          <HeroSection/>
          <CategoryCarousel/>
          <LatestJobs/>
        </Layout>
    );
};

export default Home;
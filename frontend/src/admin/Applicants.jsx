import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ApplicantTable from './ApplicantTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../redux/applicationSlice';

const Applicants = () => {
    const dispatch =useDispatch()
    const { applicants } = useSelector((store) => store.application);
    const {id}=useParams()
useEffect(()=>{
( async()=>{
  const result = await axios.get(
    `https://jobportal-t3df.onrender.com/api/${id}/getApplicents`,
    {
      withCredentials: true,
    }
  );

    dispatch(setAllApplicants(result.data.job))


})()
},[])

    return (
      <Layout>
        <div className="container mx-auto px-4">
          <h1 className="text-center text-xl font-bold hanken my-6">
            Applications ({applicants?.applications?.length || 0})
          </h1>
          <div className="overflow-x-auto">
            <ApplicantTable />
          </div>
        </div>
      </Layout>
    );
};

export default Applicants;
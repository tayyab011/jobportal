import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import CompanyTable from './CompanyTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompany from '../hooks/useGetAllCompany';
import { useDispatch } from 'react-redux';
import { setsearchCompanyByText } from '../redux/companySlice';

const Companies = () => {
    const navigate =useNavigate()
    useGetAllCompany();
    const [input,setInput]=useState("");
 const dispatch =useDispatch()
    useEffect(()=>{

dispatch(setsearchCompanyByText(input));
    },[input])
    return (
      <Layout>
        <div className="container px-5 py-16 mx-auto">
          <div className="flex justify-between mx-auto mb-12 ">
            <div>
              <label className="input validator  ">
                <input onChange={(e)=> setInput(e.target.value)}  type="email" placeholder="search companies" required />
              </label>
            </div>
            <button
              onClick={() => navigate("/admin/companies/create")}
              className="btn btn-neutral "
            >
              New Company
            </button>
          </div>

          <CompanyTable />
        </div>
      </Layout>
    );
};

export default Companies;
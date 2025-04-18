import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { registercompany } from '../api/ApiRequest';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/companySlice';

const CreateCompanies = () => {
  const dispatch =useDispatch()
    const navigate =useNavigate()
const [companyName, setCompanyName] = useState({ companyName: "" });

const onChangeHandler =(e)=>{
 const {name,value}=e.target
  setCompanyName({ ...companyName, [name]: value });
}
const registerNewCompany = async(e)=>{
    
  e.preventDefault();
 const result = await registercompany(companyName);
  dispatch(setSingleCompany(result.company));
   const companyId= result.company._id
 navigate(`/admin/companies/${companyId}`);
}
    return (
      <Layout>
        <div className="container mx-auto ">
          <div className="my-5">
            <h1 className="font-bold text-2xl">Your Company Name</h1>
            <p>
              Would You Like To Give Your Compny Name?You Can Change This Later.
            </p>
          </div>

          <div>
            <label className="fieldset-label text-base font-bold">
              Company Name:
            </label>
            <input
              onChange={onChangeHandler}
              className="input"
              type="text"
              value={companyName.companyName}
              name="companyName"
              placeholder="JobHunt,Microsoft etc ..."
            />
            <div className="flex gap-4 my-3">
              <button
                className="btn btn-info btn-outline"
                onClick={() => navigate("/admin/companies")}
              >
                Close
              </button>
              <button
                onClick={registerNewCompany}
                className="btn  btn-success btn-outline "
              >
                continue..
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
};

export default CreateCompanies;
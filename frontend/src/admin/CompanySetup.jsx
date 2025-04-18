import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import { updateCompany } from '../api/ApiRequest';
 import { useSelector } from 'react-redux'; 
import useGetCompanyById from '../hooks/useGetCompanyById';
const CompanySetup = () => {
  const [loading,setLoading]=useState(false)
   const { singleCompany } = useSelector((store) => store.company); 
   const {id} =useParams()
   useGetCompanyById(id);
 const navigate=useNavigate()
    const [input, setInput] = useState({
      name: "",
      description: "",
      website: "",
      location: "",
      file: null,
    });

    const changeEventHandler =(e)=>{
  const {name,value}=e.target;
   setInput({...input,[name]:value})
    }
    const changeFileHandler = (e) => {
        const file=e.target.files?.[0]
    setInput({...input,file})
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
         const formData=new FormData();
         formData.append("name", input.name);
         formData.append("description", input.description);
         formData.append("website", input.website);
         formData.append("location", input.location);
         if (input.file) {
            formData.append("file", input.file);
         }
setLoading(true)
     const result=    await updateCompany(id, formData);
         if (result.success) {
            navigate(`/admin/companies`);
         }
         setLoading(false)
  
    };

    useEffect(()=>{
   setInput({
     name: singleCompany.name || null,
     description: singleCompany.description || null,
     website: singleCompany.website || null,
     location: singleCompany.location || null,
     file: singleCompany.file || null,
   });

    },[singleCompany])
    return (
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center ">
            <div className="lg:w-2/6 md:w-1/2  mx-auto">
              <button
                onClick={() => navigate(`/admin/companies`)}
                className="btn bg-stone-600 hover:bg-stone-700 py-3 px-2 border-0 text-white"
              >
                Back to Home Page
              </button>
            </div>
            <form
              onSubmit={onSubmitHandler}
              className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
            >
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Update Your Company
              </h2>
              <div className="relative mb-4">
                <label
                  for="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  value={input.name}
                  onChange={changeEventHandler}
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" ss="leading-7 text-sm text-gray-600">
                  description
                </label>
                <input
                  type="text"
                  value={input.description}
                  name="description"
                  onChange={changeEventHandler}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" ss="leading-7 text-sm text-gray-600">
                  website
                </label>
                <input
                  type="text"
                  value={input.website}
                  name="website"
                  onChange={changeEventHandler}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" ss="leading-7 text-sm text-gray-600">
                  location
                </label>
                <input
                  type="text"
                  value={input.location}
                  name="location"
                  onChange={changeEventHandler}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" ss="leading-7 text-sm text-gray-600">
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={changeFileHandler}
                  className="w-full cursor-pointer bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {
  loading ? (
    <>
      <button className="btn" disabled>
        <span className="loading loading-spinner"></span>
        processing.....
      </button>
    </>
  ) : (
    <>
      {" "}
      <button type="submit" className="btn btn-neutral mt-4">
        Login
      </button>
    </>
  )
}
              
            </form>
          </div>
        </section>
      </Layout>
    );
};

export default CompanySetup;

/*  */
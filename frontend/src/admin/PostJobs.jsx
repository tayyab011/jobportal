import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useSelector } from 'react-redux';
import { postJob } from '../api/ApiRequest';
import { useNavigate } from 'react-router-dom';


const PostJobs = () => {
  const {companies}=useSelector(store=>store.company)
    const [input, setInput] = useState({
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experienceLevel: "",
      position: 0,
      company: "",
    });
    const navigate =useNavigate()
     const changeEventHandler = (e) => {
       const { name, value } = e.target;
       setInput({ ...input, [name]: value });
     };
     /* const selectChangeHandler = (value) => {
      const selectedCompany =companies.find(company=>company.name.toLowerCase() === value)
       
       setInput({ ...input, companyId:selectedCompany._id});
     }; */
     const [loading,setloading]=useState(false);

 const SubmitHandler = async (e) => {
       e.preventDefault();
       setloading(true);
       try {
         const result = await postJob(input);
         if (result?.success) {
           navigate(`/admin/jobs`);
         } else {
           // Handle API error (show message to user)
           console.error("Failed to post job:", result?.message);
         }
       } catch (error) {
         console.error("Error posting job:", error);
       } finally {
         setloading(false);
       }
     };
    

     
    return (
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto flex flex-wrap items-center ">
            <div className="lg:w-2/6 md:w-1/2 order-2 md:order-1  mt-5 md:mt-0  mx-auto ">
              <button
                onClick={() => navigate(`/admin/jobs`)}
                className="btn bg-stone-600 hover:bg-stone-700 py-3 px-2 border-0 text-white"
              >
                Back to Home Page
              </button>
            </div>
            <form
              onSubmit={SubmitHandler}
              className="lg:w-1/2 md:w-1/2 order-1 md:order-2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
            >
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Update Your job
              </h2>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">title</label>
                <input
                  onChange={changeEventHandler}
                  type="text"
                  value={input.title}
                  name="title"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  description
                </label>
                <input
                  type="text"
                  onChange={changeEventHandler}
                  value={input.description}
                  name="description"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  requirements
                </label>
                <input
                  type="text"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  name="requirements"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  salary
                </label>
                <input
                  type="text"
                  value={input.salary}
                  onChange={changeEventHandler}
                  name="salary"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  location
                </label>
                <input
                  type="text"
                  value={input.location}
                  onChange={changeEventHandler}
                  name="location"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  experienceLevel
                </label>
                <input
                  type="text"
                  value={input.experienceLevel}
                  onChange={changeEventHandler}
                  name="experienceLevel"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  jobType
                </label>
                <input
                  type="text"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  name="jobType"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  position
                </label>
                <input
                  type="number"
                  value={input.position}
                  onChange={changeEventHandler}
                  name="position"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              {/* <div className="relative mb-4 items-center">
                <select
                  defaultValue="Pick a color"
                  onChange={selectChangeHandler}
                  className="select mb-4 w-full"
                >
                  <option disabled={true}>Pick a color</option>
                  {companies.map((compny) => (
                    <>
                      <option key={company._id} value={compny.name.toLowerCase}>
                        {compny.name}
                      </option>
                    </>
                  ))}
                </select>
              </div> */}
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Company
                </label>
                <select
                  value={input.company}
                  onChange={(e) =>
                    setInput({ ...input, company: e.target.value })
                  }
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="" disabled>
                    -- Select a Company --
                  </option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              {loading ? (
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
                    Post Job
                  </button>
                </>
              )}

              {companies.length === 0 && (
                <p className="text-xs text-gray-500 mt-3">
                  Please register a company first
                </p>
              )}
            </form>
          </div>
        </section>
      </Layout>
    );
};

export default PostJobs;
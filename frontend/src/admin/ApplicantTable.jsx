import React from 'react';
import { useSelector } from 'react-redux';
import { errortoast, successtoast } from '../helper/helper';
import axios from 'axios';

const ApplicantTable = () => {

    const shortlisting=[ "accepted" , "rejected"]
     const { applicants } = useSelector((store) => store.application);

const statusHandler =async(status,id)=>{
try {
  const result = await axios.post(
    `https://jobportal-t3df.onrender.com/api/status/${id}/UpdateStatus`,
    { status },
    { withCredentials: true }
  );
  if (result.data.success) {
     successtoast(result.data.message)
  }
} catch (error) {
  errortoast(error.response.data.message);
}
}

    return (
      <div className="container mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Resume</th>
              <th>Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.applications?.map((item) => (
              <>
                <tr key={item._id}>
                  <td className='font-bold hanken '>{item.applicant.fullname}</td>
                  <td>{item.applicant.email}</td>
                  <td>{item.applicant.phoneNumber}</td>
                  <td>
                    <a href={item.applicant.profile.resume} target="blank">
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  </td>
                  <td>{item.applicant.createdAt.split("T")[0]}</td>
                  <td className="text-right">
                    {/*   {shortlisting.map((status, index) => (
                      <>
                        <div key={index}>{status}</div>
                      
                      </>
                    ))} */}
                    <details className="dropdown">
                      <summary className="btn m-1">status</summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {shortlisting.map((status, index) => (
                          <>
                            <li key={index}>
                              <a onClick={()=>statusHandler(status, item._id)}>
                                {status}
                              </a>
                            </li>
                          </>
                        ))}
                      </ul>
                    </details>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default ApplicantTable;


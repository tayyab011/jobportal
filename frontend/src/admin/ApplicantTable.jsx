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
      <div className="w-full min-h-screen">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resume
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="font-bold hanken">
                    {item.applicant.fullname}
                  </div>
                  <div className="text-sm text-gray-500 sm:hidden">
                    {item.applicant.email}
                  </div>
                  <div className="text-sm text-gray-500 md:hidden">
                    {item.applicant.phoneNumber}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                  {item.applicant.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                  {item.applicant.phoneNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 break-all"
                  >
                    {item.applicant.profile.resumeOriginalName || "View Resume"}
                  </a>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                  {item.applicant.createdAt.split("T")[0]}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <details className="dropdown dropdown-end">
                    <summary className="btn btn-sm">{item.status}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow">
                      {shortlisting.map((status, index) => (
                        <li key={index}>
                          <a onClick={() => statusHandler(status, item._id)}>
                            {status}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!applicants?.applications?.length && (
          <div className="text-center py-8 text-gray-500">
            No applications found
          </div>
        )}
      </div>
    );
};

export default ApplicantTable;


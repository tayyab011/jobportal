import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const {allAppliedJobs}=useSelector(store=>store.job)
    return (
      <div className="container mx-auto overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Job Role</th>
              <th>Company</th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            {allAppliedJobs.map((item) => (
              <tr key={item._id}>
                <th>{item.createdAt.split("T")[0]}</th>
                <td>{item.job.title}</td>
                <td>{item.job.company.name}</td>
                <td>
                  {item.status === "accepted" ? (
                    <div className="badge badge-success">{item.status}</div>
                  ) :item.status === "pending"?
                  <div className="badge badge-warning">{item.status}</div>
                 : (
                    <div className="badge badge-primary">{item.status}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default AppliedJobTable;
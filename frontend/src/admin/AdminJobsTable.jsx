import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs );

  useEffect(() => {
    if (!allAdminJobs) return;

    if (searchJobByText === "") {
      setFilteredJobs(allAdminJobs);
    } else {
      const filtered = allAdminJobs.filter((job) => {
        const jobTitle = job.title?.toLowerCase() || "";
        const companyName = job.company?.name?.toLowerCase() || "";
        const searchText = searchJobByText.toLowerCase();

        return (
          jobTitle.includes(searchText) || companyName.includes(searchText)
        );
      });
      setFilteredJobs(filtered);
    }
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((item) => (
              <tr key={item._id}>
                <td className="font-bold hanken text-lg">{item.company?.name}</td>
                <td className="font-bold hanken ">{item.title}</td>
                <td>{item.createdAt?.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-dark mr-2"
                    onClick={() =>
                      navigate(`/admin/companies/${item.company._id}`)
                    }
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className=" hover:scale-125  "
                    />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/jobs/${item._id}/applicants`)
                    }
                    className="btn btn-dark"
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className=" hover:scale-125  "
                    />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobsTable;

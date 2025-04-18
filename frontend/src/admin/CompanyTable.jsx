/* import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const CompanyTable = () => {

  const { companies ,searchCompanyByText} = useSelector((store) => store.company);
  const navigate =useNavigate()
 
  const [filterCompany, setFilterCompany] = useState(companies);

  useState(() => {
 const filteredCompany = companies.filter((company)=>{
  if (!setFilterCompany) {
    return true
  }
  return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
 })
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
    return (
      <div>
        <div className="overflow-x-auto">
          <table className="table">
         
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
              {filterCompany.map((item) => (
                <tr key={item._id}>
                  <th>
                    <img className="w-20 h-20" src={item.logo} />
                  </th>
                  <td>{item.name}</td>
                  <td>{item.createdAt.split("T")[0]}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => navigate(`/admin/companies/${item._id}`)}
                    >
                      Update
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

export default CompanyTable; */

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useEffect(() => {
    if (searchCompanyByText === "") {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredCompanies.map((item) => (
              <tr key={item._id}>
                <th>
                  <img className="md:w-12 w-8 h-8  md:h-12" src={item.logo} alt={item.name} />
                </th>
                <td className="font-bold hanken  text-lg text-stone-700">{item.name}</td>
                <td>{item.createdAt.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => navigate(`/admin/companies/${item._id}`)}
                  >
                  <FontAwesomeIcon
                                       icon={faEdit}
                                       className=" hover:scale-125  "
                                     />
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

export default CompanyTable;
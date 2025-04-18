import React, { useEffect } from "react";
import axios from "axios";
import { successtoast } from "../helper/helper";
import { useDispatch } from "react-redux";

import { setCompanies } from "../redux/companySlice";
const base_url = "https://jobportal-t3df.onrender.com/api";
const useGetAllCompany = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      const fetchallCompanys= async () => {
        try {
          const result = await axios.get(`${base_url}/getCompany`, {
            withCredentials: true,
          });
          if (result.data.success) {
         /*    successtoast(result.data.message); */
             dispatch(setCompanies(result.data.companies)); 
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchallCompanys();
    })();
  }, []);
};

export default useGetAllCompany;

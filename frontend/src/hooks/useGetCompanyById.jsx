import React, { useEffect } from "react";
import axios from "axios";
import { successtoast } from "../helper/helper";
import { useDispatch } from "react-redux";

import { setSingleCompany } from "../redux/companySlice";
const base_url = "https://jobportal-t3df.onrender.com/api";
const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      const fetchSingleCompany = async () => {
        try {
          const result = await axios.get(
            `${base_url}/getCompanyId/${companyId}`,
            {
              withCredentials: true,
            }
          );
          if (result.data.success) {
         /*    successtoast(result.data.message); */
            dispatch(setSingleCompany(result.data.company));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleCompany();
    })();
  }, [companyId,dispatch]);
};

export default useGetCompanyById;

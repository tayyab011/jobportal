 import React, { useEffect } from 'react';
import  axios  from 'axios';
import { successtoast } from '../helper/helper';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
const base_url = "http://localhost:8000/api";
const useGetAllJobs = () => {

const dispatch =useDispatch()
let {searchedQuery}=useSelector(store=>store.job);
useEffect(()=>{

  
        const fetchAllJobs =async ()=>{
            try {
                 const result = await axios.get(`${base_url}/getallJob?keyword=${searchedQuery}`,{ withCredentials: true });
                
                 if (result.data.success) {
                    /*  successtoast(result.data.message); */
                     dispatch(setAllJobs(result.data.jobs));
                       
                 }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs()
        
 

  },[])
/*   useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const result = await axios.get(
          `${base_url}/getallJob?keyword=${searchedQuery}`,
          { withCredentials: true }
        );

        if (result.data.success) {
          successtoast(result.data.message);
          dispatch(setAllJobs(result.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]); */
};

export default useGetAllJobs;



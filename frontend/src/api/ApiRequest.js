import axios from "axios";
import { errortoast, successtoast } from "../helper/helper";

const base_url = "https://jobportal-t3df.onrender.com/api";

export const userRegister = async (formData) => {
  try {
    const result = await axios.post(`${base_url}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    /*  return result.data;  */
   if (result.data.success) {
     successtoast(result.data.message);
     return result.data; // Return actual response data
   } else {
     errortoast(result.data.message);
     return { success: false }; // Handle error case
   }
  } catch (error) {
    errortoast(error.response?.data.message);
    /* console.error("Registration error:", error.response?.data || error.message); */
    return { success: false, message: "Registration failed", }; // Return a meaningful error
  }
};


export const userLogin = async (reqbody) => {
  try {
    const result = await axios.post(`${base_url}/login`, reqbody, {
      withCredentials: true, // ✅ Include credentials if backend uses cookies
    });

     if (result.data.success) {
       successtoast(result.data.message);
       return result.data; // Return actual response data
     } else {
       /* errortoast(result.data.message); */
       return { success: false }; // Handle error case
     }
  } catch (error) {
   errortoast(error.response?.data.message);
    return { success: false, message: "Registration failed" }; 
  }
};


 export const userUpdate = async (formData) => {
  try {
    const result = await axios.put(`${base_url}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (result.data.success) {
      successtoast(result.data.message);
      return result.data;
    } else {
      errortoast(result.data.message);
      return { success: false };
    }
  } catch (error) {
  
 errortoast(error.response?.data?.message || "Something went wrong");
  console.error("Registration error:", error.response?.data || error.message);
    return { success: false, message: "Registration failed" }; // Return a meaningful error
  }
}; 

export const userLogout = async () => {
  try {
    const result = await axios.get(`${base_url}/logout`, {
      withCredentials: true, // ✅ Include credentials if backend uses cookies
    });

    if (result.data.success) {
      successtoast(result.data.message);
      return result.data; // Return actual response data
    } else {
      errortoast(result.data.message);
      return { success: false }; // Handle error case
    }
  } catch (error) {
    errortoast("somthing went wrong");
    return { success: false, message: "Registration failed" };
  }
};

/* export const userUpdate = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const result = await axios.put(`${base_url}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (result.data.success) {
      successtoast(result.data.message);
      return result.data;
    } else {
      errortoast(result.data.message);
      return { success: false };
    }
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message); // 🔍 Log full error
    errortoast(error.response?.data?.message || "Update failed");
    return {
      success: false,
      message: error.response?.data?.message || "Update failed",
    };
  }
};
 */


export const registercompany= async(input)=>{
  try {
    const result = await axios.post(`${base_url}/registerCompany`,input,{ withCredentials: true});
    if (result.data.success) {
      successtoast(result.data.message);
      return result.data
    }
  } catch (error) {
    errortoast(error.response?.data.message)
  }
}

export const updateCompany= async(id,file)=>{
  try {
    const result = await axios.put(`${base_url}/updateCompany/${id}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    if (result.data.success) {
      successtoast(result.data.message);
      return result.data
    }
  } catch (error) {
    errortoast(error.response?.data.message)
  }
}


  export const postJob = async (input) => {
  try {
    const result = await axios.post(`${base_url}/registerjob`, input, {
      
      withCredentials: true
    });
    if (result.data.success) {
      successtoast(result.data.message);
      return result.data;
    }
  } catch (error) {
    errortoast(error.response?.data.message);
  }
}; 
 



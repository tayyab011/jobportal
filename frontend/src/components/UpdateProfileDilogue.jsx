import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdate } from '../api/ApiRequest';
import { setUser } from '../redux/authSlice';
import { successtoast } from '../helper/helper';


const UpdateProfileDilogue = ({open,setOpen}) => {
   const dispatch =useDispatch();
    const [loading,setLoding]=useState(false);
    const {user}=useSelector(store=>store.auth);
    const [input, setInput] = useState({
      fullname: user?.fullname,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      bio: user?.profile?.bio,
      skills: user?.profile?.skills?.map(skill=>skill),
      file: user?.profile?.resume,
    });

    const changeEventHandler =(e)=>{
   let {name,value}=e.target
   setInput({...input, [name]:value})
    }
     const fileChangeHandler = (e) => {
        const file = e.target.files?.[0] 
       setInput({ ...input, file});
     };
    const submitHandler = async (e) => {
  e.preventDefault()
   const formData = new FormData();
   formData.append("fullname", input.fullname);
   formData.append("email", input.email);
   formData.append("phoneNumber", input.phoneNumber);
   formData.append("bio", input.bio);
   formData.append("skills", input.skills);
   if (input.file) {
     formData.append("file", input.file);
   }
   setLoding(true);
   const result = await userUpdate(formData);

if (result.success) {
setLoding(true)
  dispatch(setUser(result.user))
setLoding(false);
  setOpen(false)
}

    };


    return (
      <div>
        {open && (
          <div className="fixed  inset-0 bg-stone-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white container px-8 py-5  rounded shadow-lg w-5xl mx-4 overflow-y-auto h-[90vh]">
              <h1 className="text-2xl mt-4 font-bold hanken">Update Profile</h1>
              <form
                onSubmit={submitHandler}
                className="px-5 gap-y-2 mx-auto w-full "
              >
                <label htmlFor="name" className="fieldset-label font-bold">
                  name :
                </label>
                <input
                  onChange={changeEventHandler}
                  value={input.fullname}
                  name="fullname"
                  id="fullname"
                  className="input text-base w-full mx-auto"
                  placeholder="update your name"
                />

                <label htmlFor="email" className="fieldset-label font-bold">
                  email
                </label>
                <input
                  onChange={changeEventHandler}
                  value={input.email}
                  type="email"
                  name="email"
                  id="email"
                  className="input text-base w-full mx-auto"
                  placeholder="update your email"
                />

                <label htmlFor="number" className="fieldset-label font-bold">
                  number
                </label>
                <input
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="input text-base w-full mx-auto"
                  placeholder="update your number"
                />

                <label htmlFor="bio" className="fieldset-label font-bold">
                  bio
                </label>
                <input
                  onChange={changeEventHandler}
                  value={input.bio}
                  type="text"
                  name="bio"
                  id="bio"
                  className="input text-base w-full mx-auto"
                  placeholder="update your bio"
                />

                <label htmlFor="skills" className="fieldset-label font-bold">
                  skills
                </label>
                <input
                  onChange={changeEventHandler}
                  value={input.skills}
                  name="skills"
                  id="skills"
                  className="input text-base w-full mx-auto"
                  placeholder="update your skills "
                />

                <label htmlFor="file" className="fieldset-label font-bold">
                  Resume
                </label>
                <input
                required
                  onChange={fileChangeHandler}
                  type="file"
                  name="file"
                  id="file"
                  accept="application/pdf"
                  className="file-input file-input-neutral file-input-sm"
                  placeholder="update your email"
                />

                {loading ? (
                  <>
                    <button className="btn" disabled>
                      <span className="loading loading-spinner "></span>
                      updating.....
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      type="submit"
                      className="py-1 lg:ml-2 bg-stone-600 hover:bg-stone-800 text-white px-8 rounded-xl  mt-2"
                    >
                      Update
                    </button>
                  </>
                )}
              </form>
              <div className="flex justify-end">
                <button
                  className="btn bg-red-600  hover:bg-red-800 mt-6 ml-auto  text-white "
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default UpdateProfileDilogue;
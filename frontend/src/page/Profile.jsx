import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { faBuilding, faEdit, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppliedJobTable from '../components/AppliedJobTable';
import UpdateProfileDilogue from '../components/UpdateProfileDilogue';
import { useSelector } from 'react-redux';
import useGetAppliedJob from '../hooks/useGetAppliedJob';
const Profile = () => {
     useGetAppliedJob()
    const [open,setOpen]=useState(false)
    const isResume =true;
    const {user} =useSelector(store=>store.auth)
    return (
      <Layout>
        <div className="container w-full mx-auto px-5 md:px-10 py-16">
          <div className="container mx-auto border border-gray rounded-lg p-12">
            <div className="flex items-center gap-5">
              <FontAwesomeIcon icon={faBuilding} className="text-2xl" />
              <div className="w-full">
                <h1 className="text-2xl hanken font-bold">{user.fullname}</h1>
                <p className=" font-light my-4">{user.profile.bio}</p>
              </div>
              <button className="btn  border-none text-2xl cursor-pointer bg-black text-white">
                <FontAwesomeIcon onClick={() => setOpen(true)} icon={faEdit} />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-5 mt-12">
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                </div>
                <div>{user.email}</div>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faPhone} className="text-2xl" />
                </div>
                <div>{user.phoneNumber}</div>
              </div>
            </div>
            <div className=" mt-6">
              <div>
                <h1 className="font-semibold mb-2 text-lg hanken">Skills</h1>
              </div>
              <div>
                {" "}
                {user.profile.skills.length != 0 ? (
                  user.profile.skills.map((item, index) => (
                    <span className="badge badge-neutral badge-md p-3 m-0.5">
                      {user.profile.skills[index]}
                    </span>
                  ))
                ) : (
                  <>n/a</>
                )}
              </div>
            </div>
            <div className=" mt-6">
              <h1 className="font-semibold text-lg mb-2 hanken">Resume</h1>

              {isResume ? (
                <a
                  target="blank"
                  href={user.profile.resume}
                  className="hover:underline decoration-3 text-base "
                >
                  {user.profile.resumeOriginalName}
                </a>
              ) : (
                <>null</>
              )}
            </div>
          </div>
          <div className="container mx-auto mt-6">
            <h1 className="font-semibold hanken my-6  text-xl">Applied Jobs</h1>

            <AppliedJobTable />
          </div>
        </div>
        <UpdateProfileDilogue open={open} setOpen={setOpen} />
      </Layout>
    );
};

export default Profile;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../api/ApiRequest";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    let result = await userLogout();

    if (result.success) {
      dispatch(setUser(null));
      navigate("/");
    }
  };
  return (
    <div className="sticky top-0 z-50 navbar bg-base-100 shadow-md flex-none items-center justify-center ">
      <div className="flex-1">
        <a href="/" className="md:text-2xl font-extrabold  hanken text-xl  bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-stone-400 to-stone-600">
          Job. <span className="font-bold">io</span>
        </a>
      </div>

      <div className="">
        <ul className="flex bg-base-100 rounded-box w-52 gap-2.5">
          {user ? (
            user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:underline decoration-2 cursor-pointer transition duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:underline decoration-2 cursor-pointer transition duration-200"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : user.role === "student" ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:underline decoration-2  cursor-pointer"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:underline decoration-2 cursor-pointer"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browser"
                    className="hover:underline decoration-2 cursor-pointer"
                  >
                    Browser
                  </Link>
                </li>
              </>
            ) : null
          ) : null}
        </ul>
      </div>
      {!user ? (
        <>
          <Link to="/login">
            <button className="btn  md:btn-sm btn-xs btn-primary hover:outline m-2">
              Login
            </button>
          </Link>
          <Link to="/signup">
            {" "}
            <button className="btn md:btn-sm btn-xs btn-primary hover:outline">
              SignUp
            </button>
          </Link>
        </>
      ) : (
        <>
          <div className="flex  items-center ">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.profile.profilePhoto}
                    className="object-top"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <h6 className="text-[22px] my-2 font-extrabold hanken px-2">
                  {user.fullname}
                </h6>
                {/* <h6 className="text-[12px] my-2 "> {user.profile.bio}</h6> */}

                {user.role === "student" ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className=" hover:bg-amber-800  hover:text-white "
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                ) : null}

                <li>
                  <a
                    onClick={logoutHandler}
                    className=" hover:bg-amber-800  hover:text-white cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

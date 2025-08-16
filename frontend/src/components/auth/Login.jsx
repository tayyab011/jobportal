import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../api/ApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";

const Login = () => {
  const [loading, SetLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  /* const [Loading, setLoading] = useState(false); */
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    SetLoading(true);
    const result = await userLogin(input);
    SetLoading(false);
    if (result.success) {
      dispatch(setUser(result.user));
      navigation("/");
    }
  };
  return (
    <Layout>
      <form
        onSubmit={submitHandler}
        className="flex justify-center  items-center "
      >
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-label font-extrabold text-3xl ">
            Login
          </legend>

          <label className="fieldset-label font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="input"
            placeholder="Email"
          />

          <label className="fieldset-label font-bold">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="input"
            placeholder="Password"
          />

          <label className="fieldset-label font-bold">Role</label>

          <span className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              checked={input.role === "student"}
              onChange={changeEventHandler}
              className="radio radio-xs radio-error "
              value="student"
            />
            student
            <input
              type="radio"
              name="role"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
              className="radio radio-xs radio-error ml-4"
              value="recruiter"
            />
            recruiter
          </span>

          <span>
            Dont have an account?
            <Link to="/signup" className="font-bold cursor-pointer ml-1.5">
              signup
            </Link>
          </span>
          {loading ? (
            <>
              <button className="btn" disabled>
                <span className="loading loading-spinner"></span>
                processing.....
              </button>
            </>
          ) : (
            <>
              {" "}
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </>
          )}
        </fieldset>
      </form>
    </Layout>
  );
};

export default Login;

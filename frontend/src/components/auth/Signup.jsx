import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../api/ApiRequest";
import { errortoast } from "../../helper/helper";

const Signup = () => {
  const [loading, setLoading] = useState(false); // ✅ useState for loading
  const navigation = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true); // ✅ start loading
      const result = await userRegister(formData);
      setLoading(false); // ✅ stop loading

      if (result.success) {
        navigation("/login");
      } else {
        errortoast(result.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      errortoast("Failed to signup. Try again.");
    }
  };

  return (
    <Layout>
      <form
        onSubmit={submitHandler}
        className="flex justify-center items-center"
      >
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-label font-extrabold text-3xl text-primary">
            Signup
          </legend>

          <label className="fieldset-label font-bold">Name</label>
          <input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            className="input"
            placeholder="Name"
          />

          <label className="fieldset-label font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="input"
            placeholder="Email"
          />

          <label className="fieldset-label font-bold">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            className="input"
            placeholder="Phone Number"
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
              className="radio radio-xs radio-error"
              value="student"
              checked={input.role === "student"}
              onChange={changeEventHandler}
            />
            student
            <input
              type="radio"
              name="role"
              className="radio radio-xs radio-error ml-4"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
            />
            recruiter
          </span>

          <label className="fieldset-label font-bold">Profile</label>
          <input
            accept="image/*"
            type="file"
            required
            className="file-input file-input-neutral file-input-sm"
            onChange={changeFileHandler}
          />

          <span>
            already have an account?
            <Link to="/login" className="font-bold cursor-pointer ml-1.5">
              Login
            </Link>
          </span>

          {/* ✅ Improved loading button */}
          <button
            type="submit"
            className={`btn mt-4 ${loading ? "btn-disabled" : "btn-neutral"}`}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Processing...
              </>
            ) : (
              "Signup"
            )}
          </button>
        </fieldset>
      </form>
    </Layout>
  );
};

export default Signup;

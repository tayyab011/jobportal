

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/layout/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './page/Home';
import { Toaster } from 'react-hot-toast';
import Jobs from './page/Jobs';
import Browser from './page/Browser';
import Profile from './page/Profile';
import JobDescription from './components/JobDescription';
import Companies from './admin/Companies';
import CreateCompanies from './admin/CreateCompanies';
import CompanySetup from './admin/CompanySetup';
import AdminJobs from './admin/AdminJobs';
import PostJobs from './admin/PostJobs';
import Applicants from './admin/Applicants';
import PrivateRoute from './components/PrivateRoute';





function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          // Custom styles
          success: {
            style: {
              background: "black",
              color: "white",
              font: "bold",
            },
          },
          error: {
            style: {
              background: "orange",
              color: "white",
              font: "bold",
            },
          },
        }}
      />
      <Routes>
        {/*  for jobseeker or student */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route
          path="/browser"
          element={
            <PrivateRoute>
              <Browser />
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/description/:id"
          element={
            <PrivateRoute>
              <JobDescription />
            </PrivateRoute>
          }
        />

        {/*  for admin */}
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/create" element={<CreateCompanies />} />
        <Route path="/admin/companies/:id" element={<CompanySetup />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/jobs/create" element={<PostJobs />} />
        <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
 /*  hover:bg-[#d374bd]  
 npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
 npm install @mui/icons-material
*/
import Footer from "./Footer";
import Navbar from "./Navbar";
import React from 'react';

const Layout = (props) => {
    return (
      <div>
        <Navbar />
        {props.children}

        <Footer/>
      </div>
    );
};

export default Layout;
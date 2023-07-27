
import { HelmetProvider, Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
import StudentContent from "./StudentContent";
import Loader from "../Loader";
import { isAuthenicated } from '../../Auth/localStorage';
import { useNavigate } from "react-router-dom";
const Student = () => {

  
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>TMC - Student</title>
        </Helmet>
        {/* <StudentContent/> */}
        <Loader />
      </HelmetProvider>
    </>
  );
};

export default Student;

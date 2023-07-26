
import { HelmetProvider, Helmet } from "react-helmet-async";
import React from "react";
import StudentContent from "./StudentContent";
import Loader from "../Loader";

const Student = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>TMC - Student</title>
        </Helmet>
        {/* <StudentContent/> */}
        <Loader/>
      </HelmetProvider>
    </>
  );
};

export default Student;

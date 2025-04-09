
import React from "react";
import "./doctorList.scss";
import Container from "@/components/Container";
import Banner from "./Banner";
import DoctorInfo from "./DoctorInfo";

const DoctorList = () => {
  return (
    <div>
      <Banner />
      <div className="bg">
        <Container>
          <DoctorInfo />
        </Container>
      </div>
    </div>
  );
};

export default DoctorList;
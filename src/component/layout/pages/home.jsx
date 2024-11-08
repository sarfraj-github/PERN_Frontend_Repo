import React from "react";
import homeImg from "../../images/home.png";

const Home = () => {
  return (
    <>
      {/* <h1 className="text-center">Wel-Come to Our Site....!!!!</h1> */}
      <div className="container d-flex justify-content-center">
        <img className="img-fluid" src={homeImg} alt="Home page" srcset="" width={680} />
      </div>
    </>
  );
};

export default Home;

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="section-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;

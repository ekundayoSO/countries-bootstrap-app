import AppFooter from "../components/AppFooter";
import BackToTopButton from "../components/BackToTopButton";
import Layout from "../components/Layout";
import { Outlet } from "react-router-dom";


const Root = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout />
      <main className="flex-grow-1">
        <Outlet />
        <BackToTopButton/>
      </main>
      <AppFooter />
    </div>
  );
};

export default Root;

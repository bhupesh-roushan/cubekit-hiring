import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


const AppLayout = () => {
  return (
    <div className="w-screen">
      <div className="grid-background"></div>
      <main className="min-h-screen w-full px-10">
        <Header />
        <Outlet />
      </main>
      <hr/>
      <Footer/>
    </div>
  );
};

export default AppLayout;

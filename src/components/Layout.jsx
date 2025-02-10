import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="flex-1 container mx-auto w-full  px-4  py-8 flex gap-8">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

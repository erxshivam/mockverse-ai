import { useState }
from "react";

import { Outlet }
from "react-router-dom";

import Sidebar
from "../components/sidebar/Sidebar";

import Navbar
from "../components/navbar/Navbar";

function DashboardLayout() {

  const [isOpen,
    setIsOpen] =
    useState(false);

  return (

    <div className="flex bg-gray-50 dark:bg-[#020617] min-h-screen overflow-hidden">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 md:ml-[285px] flex flex-col min-h-screen">

        <div className="sticky top-0 z-40">

          <Navbar
            setIsOpen={setIsOpen}
          />

        </div>

        <main className="flex-1 p-6 overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default DashboardLayout;
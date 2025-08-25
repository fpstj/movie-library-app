
import React, { useContext } from "react";
import { ApplicationContext } from "./context/ApplicationContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userSession } = useContext(ApplicationContext);
  return (
    <div
      className="bg-dark text-light w-100 h-100 d-flex flex-column"
      style={{ minHeight: "100vh", minWidth: "100vw", height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/movies">Movie Library</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {userSession ? (
                <li className="nav-item">
                  <span className="nav-link">{userSession.name}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
      {/* Spacer for fixed navbar height */}
      <div style={{ height: "56px", minHeight: "56px" }} />
      <main
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center w-100 h-100"
        style={{ overflow: "auto" }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;

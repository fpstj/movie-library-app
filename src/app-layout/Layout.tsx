import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div
    className="d-flex flex-column"
    style={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)`,
      background: "#181818",
    }}
  >
    <main
      className="flex-grow-1 overflow-auto d-flex flex-column"
      style={{ margin: 0, padding: 0, height: "100vh" }}
    >
      <Navbar />
      <div className="flex-grow-1 d-flex flex-column">{children}</div>
      <Footer />
    </main>
  </div>
);

export default Layout;

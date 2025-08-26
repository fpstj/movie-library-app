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
      backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
        radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
      `,
      backgroundColor: "#1f1f1fff",
    }}
  >
    <main
      className="flex-grow-1 overflow-auto d-flex flex-column"
      style={{ margin: 0, padding: 0, height: "100vh" }}
    >
      <Navbar />
      <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
        {children}
      </div>
      <Footer />
    </main>
  </div>
);

export default Layout;

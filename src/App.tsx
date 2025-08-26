import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ApplicationRestApi } from "./services/web-api/rest/application-rest-api";
import { ApplicationContext } from "./context/ApplicationContext";
import type {
  UserSession,
  ApplicationContextProps,
} from "./context/ApplicationContext";
import { ApplicationApi } from "./services/web-api/application-api";
import Layout from "./app-layout/Layout";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";

const webApi = new ApplicationApi(new ApplicationRestApi());

// function ProtectedRoute({ children }: { children: React.ReactElement }) {
//   const storedUser = sessionStorage.getItem("userSession");
//   return storedUser ? children : <Navigate to="/login" />;
// }

function App() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("userSession");
      if (storedUser) {
        const parsedUser: UserSession = JSON.parse(storedUser);
        setUserSession(parsedUser);
      }
    } catch (error) {
      console.error("Error parsing user session:", error);
    }
  }, []);

  const applicationContext: ApplicationContextProps = useMemo(
    () => ({
      webApi,
      userSession,
      setUserSession,
    }),
    [userSession]
  );

  return (
    <BrowserRouter>
      <ApplicationContext.Provider value={applicationContext}>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<MainPage />} />
            <Route path="*" element={<Navigate to="/movies" />} />
          </Routes>
        </Layout>
      </ApplicationContext.Provider>
    </BrowserRouter>
  );
}

export default App;

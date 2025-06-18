import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { Children, useEffect, useState } from "react";
import { useAppStore } from "./store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [backendAwake, setBackendAwake] = useState(false);

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/ping");
        if (res.ok) {
          setBackendAwake(true);
        } else {
          throw new Error("Backend not ready");
        }
      } catch (err) {
        console.log("Backend sleeping. Retrying in 3s...");
        setTimeout(pingBackend, 3000); // retry every 3 seconds
      }
    };

    pingBackend();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
        console.log(response);
      } catch (error) {
        setUserInfo(undefined);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (backendAwake) {
      if (!userInfo) {
        getUserData();
      } else {
        setLoading(false);
      }
    }
  }, [backendAwake, userInfo, setUserInfo]);

  if (!backendAwake) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-center px-5">
        <h2 className="text-2xl font-bold">Waking up server...</h2>
        <p className="mt-2 text-gray-600">
          This might take 30–60 seconds. Please wait.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-xl font-medium">
        Loading...
      </div>
    );
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Navigate to="/auth" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./componens/AppLayout";
import Login from "./componens/Login";
import Register from "./componens/Register";
import Layout from "./componens/Layout";
import Dashboard from "./componens/Dashboard";
import Profile from "./componens/Profile";
import { Toaster } from "react-hot-toast";
import MyPosts from "./componens/MyPosts";
import PostDetails from "./componens/PostDetails";
import ProtectedRoute from "./componens/ProtectedRoute";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<Navigate replace to="/dashboard" />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/myposts" element={<MyPosts />} />
                        <Route
                            path="/myposts/:postId"
                            element={<PostDetails />}
                        />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 1500,
                    },
                    error: {
                        duration: 2500,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "gray",
                    },
                }}
            />
        </div>
    );
}

export default App;

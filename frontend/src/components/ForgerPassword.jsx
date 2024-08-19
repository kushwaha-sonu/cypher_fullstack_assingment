import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { API_URL } from "../constants/index.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    updateFailure,
    updateStart,
    updateSuccess,
} from "../store/slices/userSlice";

const ForgotPassword = () => {
    const [eyeClick, setEyeClick] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggingIn = useSelector((state) => state.user.loggingIn);

    const [formData, setFormData] = useState({
        email: "",
        old_password: "",
        new_password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        
    };

    const handleEyeClick = (e) => {
        e.preventDefault();
        setEyeClick(!eyeClick);
    };

    const handleForgetPasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateStart());
            const response = await fetch(`${API_URL}/api/auth/update-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            // console.log(data);
            if (response.ok && data.success) {
                dispatch(updateSuccess(data.user));
                toast.success(data.message);
                navigate("/sign-in");
                setFormData({
                    email: "",
                    new_password: "",
                    old_password: "",
                });
            } else {
                toast.warn(data.message);
                dispatch(updateFailure(data.message));
            }
            // console.log(data);
        } catch (error) {
            console.error("Error updating profile:", error.message);
            dispatch(updateFailure(error.message));
        }
    };
    return (
        <Layout>
            <div className=" bg-slate-200 text-slate-800 rounded-md p-3">
                <h1 className="text-3xl font-semibold text-center p-2">
                    Forget Password
                </h1>
                <form onSubmit={handleForgetPasswordSubmit}>
                    <div className="mt-3">
                        <label htmlFor="email" className="block font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="input-item"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-3 flex flex-col justify-center">
                        <label htmlFor="old_password" className="block font-medium">
                            Old Password
                        </label>
                        <input
                            type="password"
                            id="old_password"
                            name="old_password"
                            placeholder="Enter your old password"
                            className=" text-slate-800 rounded-md flex-1 block p-3 border-none outline-none sm:text-sm"
                            value={formData.old_password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-3">
                        <label htmlFor="new_password" className="block font-medium">
                            New Password
                        </label>
                        <div className="flex px-1 w-full bg-white items-center border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-transparent">
                            <input
                                type={eyeClick ? "text" : "password"}
                                id="new_password"
                                name="new_password"
                                placeholder="Enter your new password"
                                className=" text-slate-800 flex-1 block p-3 border-none outline-none sm:text-sm"
                                value={formData.new_password}
                                onChange={handleChange}
                            />
                            <button
                                className="text-black font-semibold text-2xl px-3"
                                disabled={formData.new_password.trim() === ""}
                            >
                                {eyeClick ? (
                                    <IoEye onClick={handleEyeClick} />
                                ) : (
                                    <IoEyeOff onClick={handleEyeClick} />
                                )}
                            </button>
                        </div>
                     
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="button-primary"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;

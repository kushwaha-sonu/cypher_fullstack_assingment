import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Logo from '../assets/logo.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { API_URL } from "../constants/index.js";
import { toast } from "react-toastify";

const Navbar = () => {
    const user = useSelector((state) => state.user.user);
    // console.log(user);

    const [userClicked, setUserClicked] = useState(false);

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();
            console.log(response);
            if (data.success === true) {
                dispatch(logout());
                toast.success(data.message);
                navigate("/");
                setUserClicked(false);
            }
        } catch (e) {
            console.log(e);
            toast.error("Error Logging Out");
        }
    };
    return (
        <header className="w-full sticky top-0 h-20 shadow-md bg-slate-100 shadow-slate-200">
            <div className="container mx-auto p-2 flex items-center justify-between">
                <div className="flex py-2 items-center justify-center bg-gradient-to-r hover:bg-gradient-to-tl from-pink-700/80 to-sky-600 bg-clip-text text-transparent">
                    <Link to="/" className="flex items-center justify-center" >
                        <img src={Logo} alt="logo" className="size-14 mix-blend-multiply"/>
                        <span className="text-3xl hidden md:block font-bold md:text-4xl">QuickQuiz</span>
                    </Link>
                </div>

                <nav className="h-full items-center justify-center">
                    <ul className="flex items-center justify-center gap-6 h-full">
                        <Link
                            to="/"
                            className={`text-center border rounded-md border-slate-700 ${isActive("/") ? "active-item" : "link"
                                }`}
                        >
                            Home
                        </Link>
                        <div className="flex items-center justify-center  w-full">
                            {user ? (
                                <div
                                    className="cursor-pointer flex items-center justify-center gap-2"
                                    onClick={() => setUserClicked(!userClicked)}
                                >
                                    <div
                                        className={`rounded-lg flex items-center justify-center gap-2 font-bold text-nowrap link`}
                                    >
                                        <div className="w-10 h-10">
                                            <img
                                                className="object-cover rounded-full"
                                                src={user.photoUrl ? user.photoUrl : ""}
                                                alt="user"
                                            />
                                        </div>
                                        <div>
                                            <p>{user.display_name}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className={`text-center flex items-center justify-center text-nowrap border rounded-md gap-2 border-slate-700 link`}
                                    >
                                        <span>
                                            <CiLogout className="size-8 text-slate-800" />
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/sign-in"
                                    className={`text-center border rounded-md border-slate-700 text-nowrap ${isActive("/sign-in") ? "active-item" : "link"
                                        }`}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </ul>
                </nav>
            </div>
            {userClicked && (
                <div className="relative container mx-auto">
                    <div className="absolute bg-white right-1 top-1 w-52 rounded-md gap-1 flex flex-col items-center justify-center">
                        <p className="hover:bg-slate-300 w-full h-full bg-slate-100 p-2 cursor-pointer">{user.full_name}</p>
                        <p className="hover:bg-slate-300 w-full h-full bg-slate-100 p-2 cursor-pointer">{user.email}</p>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

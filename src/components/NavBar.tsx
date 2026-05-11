import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../utils/appStore";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, {
                withCredentials: true,
            });
            dispatch(removeUser());
            navigate("/login");
        }catch (err) {
            console.error("ERROR: ", err);
        };
    };
    
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <Link to="/" className="flex-1">
                <a className="btn btn-ghost text-xl">👨‍💻devTinder</a>
            </Link>
            {user && (    <div className="flex gap-2 mx-6">
                <div className="dropdown dropdown-end ">
                    Welcome, {user.firstName}!
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-4" >
                        <div className="w-10 rounded-full">
                            <img
                            alt="User Avatar"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52" >
                        <li>
                            <Link to="/profile" className="justify-between">
                            Profile
                            <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>)}
        </div>

    );
};

export default NavBar;
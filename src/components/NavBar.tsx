import type { RootState } from "../utils/appStore";
import { useSelector } from "react-redux";

const NavBar = () => {
    const user = useSelector((state: RootState) => state.user);
    
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">👨‍💻devTinder</a>
            </div>
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
                            <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>)}
        </div>

    );
};

export default NavBar;
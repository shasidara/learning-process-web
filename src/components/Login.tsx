import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import BASE_URL from "../utils/constants";
import type { AppDispatch } from "../utils/appStore";

const Login = () => {
    const [ email, setEmail ] = useState<string>("virat@gmail.com");
    const [ password, setPassword ] = useState<string>("Virat@123");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                email, 
                password,
            }, {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
            navigate("/");
        } catch (err) {
            console.error("ERROR: ", err);
        };
    };

    return (
        <div className="card bg-base-200 w-96 shadow-sm mx-auto my-10">
            <div className="card-body">
                <h2 className="card-title flex justify-center text-xl font-bold">Login</h2>
                <label className="floating-label my-2">
                    <p>Email</p>
                    <input 
                        type="text" placeholder="" 
                        className="input input-md" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="floating-label my-2">
                    <p>Password</p>
                    <input 
                        type="password" placeholder="" 
                        className="input input-md" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div className="card-actions justify-center">
                    <button 
                        className="btn btn-primary p-4 px-8 m-2 bg-primary"
                        onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
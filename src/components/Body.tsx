import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import type { AppDispatch, RootState } from "../utils/appStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((store: RootState) => store.user);

    const fetchUser = async () => {
        if(user) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        }catch (err) {
            if(axios.isAxiosError(err) && err.response?.status === 401) {
                navigate("/login");
            } else {
                console.error(err);
            };
        };
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer /> 
        </>
        
    );
};

export default Body;
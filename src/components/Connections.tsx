import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../utils/appStore";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch<AppDispatch>();
    const connections = useSelector((store: RootState) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnection(res?.data?.data));
        } catch(err) {
            console.error("ERROR: ", err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections || connections.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-400 text-lg">No connections yet 😕</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                My Connections 🤝
            </h1>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase">
                    {connections.length} connection{connections.length > 1 ? "s" : ""}
                </li>
                {connections.map((connection) => {
                    const { _id, firstName, lastName, photoURL, about, skills } = connection;
                    return (
                        <li key={_id} className="list-row items-center gap-4 p-4 border-b border-base-200 my-2 bg-base-200 rounded-lg">
                            <div>
                                <img
                                    className="size-14 rounded-full object-cover object-top"
                                    src={photoURL || "https://i.pravatar.cc/300"}
                                    alt={firstName}
                                />
                            </div>

                            <div className="flex-1">
                                <p className="font-semibold text-base">
                                    {firstName} {lastName}
                                </p>
                                <p className="text-xs opacity-60 mt-1">
                                    {about || "No bio available"}
                                </p>
                                {skills && skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-base-300 px-2 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className="btn btn-sm btn-outline rounded-full px-4 bg-primary text-white">
                                Message
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Connections;
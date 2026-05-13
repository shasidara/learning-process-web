import axios from "axios";
import BASE_URL from "../utils/constants";
import type { AppDispatch, RootState } from "../utils/appStore";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const dispatch = useDispatch<AppDispatch>();
    const requests = useSelector((store: RootState) => store.requests);

    const handleRequest = async (status: "accepted" | "rejected", _id: string) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true
            });
            dispatch(removeRequests(_id))
        }catch(err) {
            console.error("ERROR: ", err);
        };
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/recived", {
                withCredentials: true,
            });
            dispatch(addRequests(res?.data?.data));
        } catch(err) {
            console.error("ERROR: ", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests || requests.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-400 text-lg">No pending requests 😕</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Pending Requests 📬
            </h1>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase">
                    {requests.length} pending request{requests.length > 1 ? "s" : ""}
                </li>
                {requests.map((request) => {
                    const { _id, firstName, lastName, photoURL, about, skills } = request.fromUserId;
                    return (
                        <li key={_id} className="list-row items-center gap-4 p-4 border-b border-base-200">
                            
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
                                        {skills.map((skill: string, index: number) => (
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

                            <div className="flex gap-2">
                                <button
                                    className="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-full px-4"
                                    onClick={() => handleRequest("accepted", request._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-full px-4"
                                    onClick={() => handleRequest("rejected", request._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Requests;
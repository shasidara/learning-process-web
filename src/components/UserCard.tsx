import type { User } from "../utils/types";
import type { AppDispatch } from "../utils/appStore";
import { useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

interface UserCardProps {
    user: User;
}

const UserCard = ({ user }: UserCardProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSendRequest = async (status: "ignored" | "interested", _id:string) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {
                withCredentials: true
            });
            dispatch(removeUserFromFeed(_id));
        }catch(err) {
            console.error("ERROR: " , err);
        };
    };

    return (
        <div className="relative w-72 mx-auto rounded-3xl overflow-hidden shadow-2xl bg-base-300 my-6 mb-40">
            <img
                className="w-full h-80 object-cover object-top"
                src={user?.photoURL}
                alt={user?.firstName}
            />

            <div className="bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                
                <h2 className="text-white text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                </h2>

                <p className="text-gray-300 text-sm mt-1">
                    {user?.about || "No bio available"}
                </p>

                {user?.skills && user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {user.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex justify-center gap-4 mt-5 text-base-300">
                    <button className="btn bg-primary p-4"
                        onClick={() => handleSendRequest("ignored", user._id)}>
                        ✕ ignore
                    </button>
                    <button className="btn bg-secondary p-4"
                        onClick={() => handleSendRequest("interested", user._id)}>
                        ♥ interest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
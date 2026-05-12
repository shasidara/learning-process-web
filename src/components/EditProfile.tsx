import { useState } from "react";
import type { User } from "../utils/types";
import UserCard from "./UserCard";
import BASE_URL from "../utils/constants";
import axios from "axios";
import type { AppDispatch } from "../utils/appStore";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

interface EditProfileProps {
    user: User;
}

const EditProfile = ({ user }: EditProfileProps) => {
    const [firstName, setFirstName] = useState<string>(user?.firstName || "");
    const [lastName, setLastName] = useState<string>(user?.lastName || "");
    const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || "");
    const [about, setAbout] = useState<string>(user?.about || "");
    const [skills, setSkills] = useState<string[]>(user?.skills || []);
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const [showToast, setShowToast] = useState<boolean>(false);

    const handleSave = async () => {
        try {
            setError("");
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoURL,
                about,
                skills,
            }, {
                withCredentials: true,
            });
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }catch(err) {
            if (axios.isAxiosError(err)) {
                console.log("Full error data:", err.response?.data?.error);
                setError(err.response?.data?.message || "Failed to save profile.");
            } else {
                setError("Something went wrong.");
            };
        };
    };

    return (
        <>
            <div className="flex items-center justify-center gap-10 my-10 px-10">
                
                <div className="card bg-base-200 w-96 shadow-xl rounded-2xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-xl font-bold mb-2">
                            Edit Profile
                        </h2>
                        <label className="my-2">
                            <p className="text-sm mb-1">First Name</p>
                            <input
                                type="text"
                                className="input input-md w-full"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label className="my-2">
                            <p className="text-sm mb-1">Last Name</p>
                            <input
                                type="text"
                                className="input input-md w-full"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                        <label className="my-2">
                            <p className="text-sm mb-1">Photo URL</p>
                            <input
                                type="text"
                                className="input input-md w-full"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                        </label>
                        <label className="my-2">
                            <p className="text-sm mb-1">About</p>
                            <textarea
                                className="textarea textarea-md w-full"
                                rows={3}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </label>
                        <label className="my-2">
                            <p className="text-sm mb-1">Skills (comma separated)</p>
                            <input
                                type="text"
                                className="input input-md w-full"
                                value={skills.join(", ")}
                                onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()))}
                            />
                        </label>
                        <div className="card-actions justify-center mt-4">
                            {error && <p className="text-red-500">{error}</p>}
                            <button className="btn bg-green-500 hover:bg-green-600 text-white px-10 rounded-full" onClick={handleSave}>
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-400 mb-2">Preview</p>
                    <UserCard user={{ ...user, firstName, lastName, photoURL, about, skills }} />
                </div>

            </div>

            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )};
        </>
    );
};

export default EditProfile;
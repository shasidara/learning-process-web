import type { User } from "../utils/types";

interface UserCardProps {
    user: User;
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className="relative w-80 mx-auto my-10 rounded-3xl overflow-hidden shadow-2xl bg-base-300">
            {/* Photo */}
            <img
                className="w-full h-64 object-cover"
                src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                alt={user?.firstName}
            />

            {/* Info overlay at bottom of image */}
            <div className="bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                
                {/* Name */}
                <h2 className="text-white text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                </h2>

                {/* About */}
                <p className="text-gray-300 text-sm mt-1">
                    {user?.about || "No bio available"}
                </p>

                {/* Skills */}
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

                {/* Buttons */}
                <div className="flex justify-center gap-6 mt-5">
                    <button className="btn btn-circle btn-lg bg-red-500 hover:bg-red-600 border-none text-white text-2xl shadow-lg">
                        ✕
                    </button>
                    <button className="btn btn-circle btn-lg bg-green-500 hover:bg-green-600 border-none text-white text-2xl shadow-lg">
                        ♥
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
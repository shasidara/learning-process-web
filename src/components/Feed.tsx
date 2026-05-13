import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../utils/appStore";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
    const feed = useSelector((store: RootState) => store.feed);
    const dispatch = useDispatch<AppDispatch>();

    const getFeed = async () => {
        try {
            if(feed) return;
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data?.data));
        } catch(err) {
            console.error("ERROR: ", err);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if(feed === null) return null;

    if(feed.length <= 0) return <h1 className="text-2xl font-bold mb-6 text-center">No new users found!</h1>

    return (
        <div>
            {feed && <UserCard user={feed[0]} />}
        </div>
    );
};

export default Feed;
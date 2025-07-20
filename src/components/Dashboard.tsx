import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [topArtists, setTopArtists] = useState();
    const token = localStorage.getItem("jwt");

    const getTopArtists = async () => {
        const response = await axios.get("http://localhost:9090/api/me/top/artists", {
            withCredentials: true,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
        }
        })
        setTopArtists(response.data.items);
    }

    useEffect(() => {
        getTopArtists();
    }, []);

    useEffect(() => {
    console.log("Response:", topArtists);
    }, [topArtists]);

    return(
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#32a88d] to-black">
            <h1 className="text-4xl font-bold text-white">Hello Tailwind + Vite + TS!</h1>
        </div>
    )
}

export default Dashboard;
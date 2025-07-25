import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import axios from "axios";
import type { Artist } from "../interfaces";

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<Artist[]>();
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
    }, [])

    return (
            <div className="flex flex-col w-screen h-fit items-center">
                <p className="text-[2rem]">Top artists</p>
                <div className="flex justify-items-center w-[80%] h-auto p-6 mt-2 bg-transparent border border-[#9d9e9d] rounded grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-1 gap-y-4">
                {
                    topArtists && topArtists.map(artist => {
                    return (
                        <ArtistCard
                        key={artist.name}
                        genres={artist.genres}
                        id={artist.id}
                        images={artist.images}
                        name={artist.name}
                        followers={artist.followers}
                        />
                    )
                    })
                }
                </div>
            </div>
        )

}

export default TopArtists;
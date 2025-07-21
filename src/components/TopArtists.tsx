import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import axios from "axios";

interface ArtistImages {
    height: number,
    url: string,
    width: number
}

interface ArtistInfo {
    genres: string[],
    id: string,
    images: ArtistImages[],
    name: string
}

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<ArtistInfo[]>();
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

    useEffect(() => {
        console.log("Response:", topArtists);
    }, [topArtists]);

    return(
        <div className="flex flex-col w-screen h-fit items-center">
            <p className="text-[2rem]">Top artists</p>
            <div className="w-[85%] h-auto p-4 mt-2 bg-transparent border border-[#9d9e9d] rounded grid grid-cols-4 gap-x-1 gap-y-4">
                {
                    topArtists && topArtists.map(artist => {
                        return(
                            <ArtistCard key={artist.name} genres={artist.genres} id={artist.id} images={artist.images} name={artist.name}/>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default TopArtists;
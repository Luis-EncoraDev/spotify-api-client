import { type Album } from "../interfaces";
import DiscographyCard from "./DiscographyCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface DiscographyProps {
    artistId: string
}

const Discography: React.FC<DiscographyProps> = ({ artistId }) => {
    const [albums, setAlbums] = useState<Album[]>();
    const token = localStorage.getItem("jwt");

    const getArtistAlbums = async() => {
        const response =  await axios.get(`http://localhost:9090/api/artists/${artistId}/albums`, {
            withCredentials: true,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });
        const data = response.data;
        setAlbums(data.items);
        console.log("Artist's albums:", data);
    }

    useEffect(() => {
        getArtistAlbums();
    }, [])

    return(
        <div className="flex flex-col items-center gap-6">
            <p className="font-bold text-[2rem]">Discography</p>
            <div className="gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
                {
                    albums?.map((album, index) => {
                        return(
                            <DiscographyCard key={index} id={album.id} name={album.name} release_year={album.releaseYear} images={album.images}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Discography;
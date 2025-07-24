import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import type { Artist, Track } from "../interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PopularTracksTable from "./PopularTracksTable";
import Discography from "./Discography";

const ArtistAbout = () => {
    const { id }  = useParams();
    const [artist, setArtist] = useState<Artist>();
    const [popularTracks, setPopularTracks] = useState<Track[]>();
    const [trackPlaying, setTrackPlaying] = useState<string | undefined>();
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    
    const getArtist = async () => {
        const response = await axios.get(`http://localhost:9090/api/artists/${id}`, {
            withCredentials: true,
            headers: {  
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = response.data;
        setArtist(data);
        console.log("Artist data:", data);
    }

    const getPopularSongs = async () => {
        const response = await axios.get(`http://localhost:9090/api/artists/${id}/top-tracks`, {
            withCredentials: true,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            } 
        });

        const data = response.data;
        setPopularTracks(data.tracks);
        console.log("Popular tracks:", data);
    }

    useEffect(() => {
        getArtist();
        getPopularSongs();
    }, [])

    useEffect(() => {
    if (popularTracks && popularTracks.length > 0) {
        setTrackPlaying(popularTracks[0].id);
    }
    }, [popularTracks])

    return(
        <div className="flex flex-col h-full p-12 gap-[4rem]">
            <div className="flex w-auto h-full justify-around items-start">
                <div className="flex flex-col gap-4">
                    <Button 
                        onClick={() => navigate("/")}
                        variant="outlined"
                        sx={{
                            width: "8rem",
                            height: "3rem"
                        }}
                        >
                        Go back
                    </Button>
                    <div className="flex flex-col mt-6 gap-4 items-center">
                        <p className="font-bold text-[4rem] max-w-[32rem]">{artist?.name}</p>
                        <img src={artist?.images[0].url} className="w-[400px] h-[400px] rounded-[200px]"/>
                        <p className="text-[1.5rem]"><span className="font-bold">Followers:</span> {artist?.followers.total.toLocaleString()}</p>
                        { (artist?.genres && artist.genres.length > 0) &&
                            <p className="text-[1.5rem]"><span className="font-bold">Genres:</span> {artist.genres.map((genre, index) => {
                                    if (index === artist.genres.lastIndexOf(artist.genres[artist.genres.length - 1])) return genre;
                                    return genre + ", ";
                                })}</p>
                            }
                    </div>
                </div>
                <div className="bg-transparent self-start mt-[350px]">
                    <iframe
                    style={{ borderRadius: '12px', width: "auto"}}
                    src={`https://open.spotify.com/embed/track/${trackPlaying}?utm_source=generator`}
                    width="100%"
                    height="160"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="font-bold text-[2rem] text-center">Popular tracks</p>
                    <PopularTracksTable popularTracks={popularTracks ? popularTracks : []} setTrackPlaying={setTrackPlaying}/>
                </div>
            </div>
            { artist && <Discography artistId={artist.id}/> }
        </div>
    )
}

export default ArtistAbout;
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
        <div className="flex flex-col h-full pt-12 pb-42 px-12 gap-[4rem]">
            <div className="w-auto h-full grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid sm:grid-cols-1 md:justify-items-center sm:justify-items-center gap-y-32">
                <div className="flex flex-col gap-4">
                    <Button 
                        onClick={() => navigate("/")}
                        variant="outlined"
                        sx={{
                            width: "8rem",
                            height: "3rem",
                            top: "25px",
                            left: "200px",
                            position: "absolute"
                        }}
                        >
                        Go back
                    </Button>
                    <div className="flex flex-col mt-6 gap-4 items-center">
                        <p className="font-bold text-[4rem] text-center max-w-[32rem]">{artist?.name}</p>
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
                <div className="flex flex-col gap-4 xl:w-[70%] lg:w-[50%] md:w-[70%] sm:w-[90%]">
                    <p className="font-bold text-[2rem] text-center">Popular tracks</p>
                    <PopularTracksTable popularTracks={popularTracks ? popularTracks : []} setTrackPlaying={setTrackPlaying}/>
                </div>
            </div>
            { artist && <Discography artistId={artist.id}/> }
            <div className="flex bg-transparent bottom-0 w-[80%] fixed self-center">
                    <iframe
                    style={{ borderRadius: '12px', width: "100%" }}
                    src={`https://open.spotify.com/embed/track/${trackPlaying}?utm_source=generator`}
                    width="100%%"
                    height="120"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    />
            </div>
        </div>
    )
}

export default ArtistAbout;
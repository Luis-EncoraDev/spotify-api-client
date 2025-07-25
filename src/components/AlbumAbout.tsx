import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import type { Track, Album } from "../interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AlbumTracksTable from "./AlbumTracksTable";

const AlbumAbout = () => {
    const { id }  = useParams();
    const [album, setAlbum] = useState<Album>();
    const [albumTracks, setAlbumTracks] = useState<Track[]>();
    const [trackPlaying, setTrackPlaying] = useState<string | undefined>();
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    
    const getAlbum = async () => {
        const response = await axios.get(`http://localhost:9090/api/albums/${id}`, {
            withCredentials: true,
            headers: {  
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = response.data;
        setAlbum(data);
        console.log("Artist data:", data);
    }

    const getAlbumTracks = async () => {
        const response = await axios.get(`http://localhost:9090/api/albums/${id}/tracks`, {
            withCredentials: true,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            } 
        });

        const data = response.data;
        setAlbumTracks(data.items);
        console.log("Album tracks:", data);
    }

    const formatMilliseconds = (ms: number):string => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');

        return `${paddedMinutes}:${paddedSeconds}`;
    }

    const getTotalAlbumDuration = (): string => {
        let totalDurationMS = 0;
        albumTracks?.map(track => {
            totalDurationMS += track.duration_ms;
        })
        return formatMilliseconds(totalDurationMS);
    }

    useEffect(() => {
        getAlbum();
        getAlbumTracks();
    }, [])

    useEffect(() => {
        if (albumTracks && albumTracks.length > 0) {
            setTrackPlaying(albumTracks[0].id);
        }
    }, [albumTracks])

    return(
        <div className="flex flex-col h-full pt-12 pb-12 sm:pb-42 gap-[4rem]">
            <div className="w-auto h-full grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid sm:grid-cols-1 md:justify-items-center sm:justify-items-center gap-y-32">
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
                        <p className="font-bold text-[4rem] text-center max-w-[32rem]">{album?.name}</p>
                        <img src={album?.images[0].url} className="w-[400px] h-[400px] rounded-[200px]"/>
                        <p className="text-[2rem]"><span className="font-bold">Release year:</span> {album?.releaseYear}</p>
                        <p className="text-[2rem]"><span className="font-bold">Total tracks</span> {album?.total_tracks}</p>
                        <p className="text-[2rem]"><span className="font-bold">Duration:</span> {getTotalAlbumDuration()}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="font-bold text-[2rem] text-center">Album tracks</p>
                    <AlbumTracksTable albumTracks={albumTracks ? albumTracks : []} setTrackPlaying={setTrackPlaying} />
                </div>
            </div>
                <div className="flex bg-transparent bottom-0 w-[80%] fixed self-center">
                    <iframe
                    style={{ borderRadius: '12px', width: "100%",   }}
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

export default AlbumAbout;
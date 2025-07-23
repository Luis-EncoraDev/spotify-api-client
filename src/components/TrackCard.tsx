import { Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { type Track } from "../interfaces";

const TrackCard: React.FC<Track> = ({ album, duration_ms, id, name, preview_url, is_playable, artists }) => {
    return(
            <div className="bg-transparent">
                <iframe
                style={{ borderRadius: '12px', width: "auto"}}
                src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                />
            </div>
    )
}

export default TrackCard;
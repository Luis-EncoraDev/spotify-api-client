import { Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { type Playlist } from "../interfaces";

const PlaylistCard: React.FC<Playlist> = ({ description, id, images, name, owner, tracks }) => {
    return(
        <Link to="/">
            <Card sx={{ width: "300px", height: "120px", backgroundColor: "transparent"}} className="flex hover:border hover:border-[#80d6c3] rounded">
                <CardMedia 
                    component="img"
                    src={images[0].url}
                    sx={{
                        height: "auto",
                        width: "100px"
                    }}
                />
                <div className="flex flex-col">
                    <p className="font-semibold mx-5 mt-1 text-md text-[#80d6c3]">{name}</p>
                    <p className="mx-5 mt-1 text-sm">{owner.display_name}</p>
                    <p className="mx-5 mt-1">{tracks.total}</p>
                </div>
            </Card>
        </Link>
    )
}

export default PlaylistCard;
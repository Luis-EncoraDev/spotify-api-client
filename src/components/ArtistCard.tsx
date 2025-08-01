import { Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { type Artist } from "../interfaces";

const PopularArtistCard: React.FC<Artist> = ({genres, id, images, name}) => {
    return(
        <Link to={`/artist/${id}`}>
            <Card sx={{ backgroundColor: "transparent"}} className="flex xl:w-[300px] lg:w-[250px] md:w-[250px] sm:w-[250px] h-[120px] hover:border hover:border-[#80d6c3] rounded">
                <CardMedia 
                    component="img"
                    src={images[0] ? images[0].url : "./userImage.png"}
                    sx={{
                        height: "auto",
                        width: "100px"
                    }}
                />
                <div className="flex flex-col gap-1">
                    <p className="font-bold mx-5 mt-2 text-[#80d6c3]">{name}</p>
                    <p className="mx-5">
                        {genres.map((genre, index) => {
                            if (genres.lastIndexOf(genres[genres.length - 1]) === index) return genre;
                            return genre + ", "
                            })}
                    </p>
                </div>
            </Card>
        </Link>
    )
}

export default PopularArtistCard;
import { Card, CardMedia } from "@mui/material";
import { type AlbumArtist } from "../interfaces";

const DiscographyCard: React.FC<AlbumArtist> = ({ id, name, release_year, images }) => {

    return(
        <Card sx={{ width: "250px", height: "80px", backgroundColor: "transparent"}} className="flex rounded">
            <CardMedia 
                component="img"
                src={images[0].url}
                sx={{
                    height: "auto",
                    width: "80px"
                }}
            />
            <div className="flex flex-col gap-1">
                <p className="font-bold text-[14px] mx-5 mt-2 text-[#80d6c3]">{name}</p>
                <p className="mx-5">{release_year}</p>
            </div>
        </Card>
    )
}

export default DiscographyCard;
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import TopArtists from "./TopArtists";
import SearchResults from "./SearchResults";
import { type SearchResponse, type Album, type Artist, type Track, type Playlist } from '../interfaces';

const Dashboard = () => {
    const [albums, setAlbums] = useState<Album[]>();
    const [artists, setArtists] = useState<Artist[]>();
    const [tracks, setTracks] = useState<Track[]>();
    const [playlists, setPlaylists] = useState<Playlist[]>();
    const token = localStorage.getItem("jwt");
    
    const getSearchItem = async (searchText: string, typesQueryString: string) => {
            if (searchText != "") {
                const response = await axios.get(`http://localhost:9090/api/search?q=${searchText}&type=${typesQueryString}`, {
                    withCredentials: true,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
            })

            const data: SearchResponse = response.data;

            console.log("Response:", response);
            setAlbums(data.albums.items);
            setArtists(data.artists.items);
            setTracks(data.tracks.items);
            setPlaylists(data.playlists.items);
        } else {
            setAlbums([]);
            setArtists([]);
            setTracks([]);
            setPlaylists([]);
        }
    }

    return(
        <div className="flex flex-col h-[100%] justify-start h-full items-center p-12 bg-gradient-to-r from-black to-[#1a5f4b] gap-12">
            <SearchBar getSearchItem={getSearchItem}/>
            <TopArtists />
            <SearchResults albums={albums} artists={artists} tracks={tracks} playlists={playlists}/>
        </div>
    )
}

export default Dashboard;
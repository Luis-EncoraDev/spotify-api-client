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
                try {
                        const response = await axios.get(`http://localhost:9090/api/search?q=${searchText}&type=${typesQueryString}`, {
                        withCredentials: true,
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }})

                        const data: SearchResponse = response.data;
                        if (data.albums) setAlbums(data.albums.items);
                        if (data.artists) setArtists(data.artists.items);
                        if (data.tracks) setTracks(data.tracks.items);
                        if (data.playlists) setPlaylists(data.playlists.items);
                } catch (error) {
                    console.error("An error occurred when fething item:", error);
                }
                
        } else {
            setAlbums([]);
            setArtists([]);
            setTracks([]);
            setPlaylists([]);
        }
    }

    return(
        <div className="flex flex-col justify-start h-full items-center p-12 gap-12">
            <SearchBar getSearchItem={getSearchItem}/>
            <TopArtists />
            <SearchResults albums={albums ? albums : undefined} artists={artists ? artists : undefined} tracks={tracks ? tracks : undefined} playlists={playlists ? playlists : undefined}/>
        </div>
    )
}

export default Dashboard;
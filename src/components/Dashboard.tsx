import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import TopArtists from "./TopArtists";
import SearchResults from "./SearchResults";
import { type SearchResponse, type Album, type Artist, type Track, type Playlist } from '../interfaces';

const Dashboard = () => {
    const [albums, setAlbums] = useState<Album[]>();
    const [artists, setArtists] = useState<Artist[]>();
    const [tracks, setTracks] = useState<Track[]>();
    const [playlists, setPlaylists] = useState<Playlist[]>();
    const [searchText, setSearchText] = useState<string>("");
    const token = localStorage.getItem("jwt");

    useEffect(() => {
        const savedAlbums = localStorage.getItem("searchResults_albums");
        const savedArtists = localStorage.getItem("searchResults_artists");
        const savedTracks = localStorage.getItem("searchResults_tracks");
        const savedPlaylists = localStorage.getItem("searchResults_playlists");
        const savedSearchText = localStorage.getItem("lastSearchText");

        if (savedAlbums) setAlbums(JSON.parse(savedAlbums));
        if (savedArtists) setArtists(JSON.parse(savedArtists));
        if (savedTracks) setTracks(JSON.parse(savedTracks));
        if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists));
        if (savedSearchText) setSearchText(savedSearchText);

    }, []); 

    const getSearchItem = async (searchTextParam: string, typesQueryString: string) => {
        setSearchText(searchTextParam); 
        if (searchTextParam !== "") {
            try {
                const encodedSearchText = searchTextParam.replaceAll(" ", "%20");
                const response = await axios.get(`http://localhost:9090/api/search?q=${encodedSearchText}&type=${typesQueryString}`, {
                    withCredentials: true,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data: SearchResponse = response.data;

                if (data.albums) {
                    setAlbums(data.albums.items);
                    localStorage.setItem("searchResults_albums", JSON.stringify(data.albums.items));
                } else {
                    setAlbums([]);
                    localStorage.removeItem("searchResults_albums");
                }
                if (data.artists) {
                    setArtists(data.artists.items);
                    localStorage.setItem("searchResults_artists", JSON.stringify(data.artists.items));
                } else {
                    setArtists([]);
                    localStorage.removeItem("searchResults_artists");
                }
                if (data.tracks) {
                    setTracks(data.tracks.items);
                    localStorage.setItem("searchResults_tracks", JSON.stringify(data.tracks.items));
                } else {
                    setTracks([]);
                    localStorage.removeItem("searchResults_tracks");
                }
                if (data.playlists) {
                    setPlaylists(data.playlists.items);
                    localStorage.setItem("searchResults_playlists", JSON.stringify(data.playlists.items));
                } else {
                    setPlaylists([]);
                    localStorage.removeItem("searchResults_playlists");
                }
                localStorage.setItem("lastSearchText", searchTextParam); 

            } catch (error) {
                console.error("An error occurred when fetching item:", error);
            }
        } else {
            setAlbums(undefined);
            setArtists(undefined);
            setTracks(undefined);
            setPlaylists(undefined);
            setSearchText("");
            localStorage.removeItem("searchResults_albums");
            localStorage.removeItem("searchResults_artists");
            localStorage.removeItem("searchResults_tracks");
            localStorage.removeItem("searchResults_playlists");
            localStorage.removeItem("lastSearchText");
        }
    };

    // const logout = async () => {
    //     await axios.post("http://localhost:9090/logout");
    // }

    // const handleLogout = () => {
    //     localStorage.removeItem("jwt"); // Clear the JWT token
    //     // The form submission below will handle the backend logout
    // };

    return (
        <div className="flex flex-col justify-start h-full items-center pt-12 pb-42 gap-12">
            {/* <div className="flex w-full justify-around">
                <SearchBar getSearchItem={getSearchItem} initialSearchText={searchText} />
                <form action="http://localhost:9090/logout" method="post" onSubmit={handleLogout}>
                    <Button type="submit">Log out</Button>
                </form>
            </div> */}
            <SearchBar getSearchItem={getSearchItem} initialSearchText={searchText} />
            <TopArtists />
            <SearchResults
                albums={albums}
                artists={artists}
                tracks={tracks}
                playlists={playlists}
            />
        </div>
    );
};

export default Dashboard;
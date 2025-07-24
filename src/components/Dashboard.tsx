import axios from "axios";
import { useState, useEffect } from "react"; // Import useEffect
import SearchBar from "./SearchBar";
import TopArtists from "./TopArtists";
import SearchResults from "./SearchResults";
import { type SearchResponse, type Album, type Artist, type Track, type Playlist } from '../interfaces';

const Dashboard = () => {
    const [albums, setAlbums] = useState<Album[]>();
    const [artists, setArtists] = useState<Artist[]>();
    const [tracks, setTracks] = useState<Track[]>();
    const [playlists, setPlaylists] = useState<Playlist[]>();
    const [searchText, setSearchText] = useState<string>(""); // State to hold the search text
    const token = localStorage.getItem("jwt");

    // Load search results from localStorage on initial mount
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

    }, []); // Empty dependency array means this runs once on mount

    const getSearchItem = async (searchTextParam: string, typesQueryString: string) => {
        setSearchText(searchTextParam); // Update the search text state
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

                // Update state and localStorage
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
                localStorage.setItem("lastSearchText", searchTextParam); // Save the search text

            } catch (error) {
                console.error("An error occurred when fetching item:", error);
                // Optionally clear results and localStorage on error
                setAlbums([]);
                setArtists([]);
                setTracks([]);
                setPlaylists([]);
                localStorage.removeItem("searchResults_albums");
                localStorage.removeItem("searchResults_artists");
                localStorage.removeItem("searchResults_tracks");
                localStorage.removeItem("searchResults_playlists");
                localStorage.removeItem("lastSearchText");
            }
        } else {
            // Clear state and localStorage if search text is empty
            setAlbums([]);
            setArtists([]);
            setTracks([]);
            setPlaylists([]);
            setSearchText(""); // Clear search text
            localStorage.removeItem("searchResults_albums");
            localStorage.removeItem("searchResults_artists");
            localStorage.removeItem("searchResults_tracks");
            localStorage.removeItem("searchResults_playlists");
            localStorage.removeItem("lastSearchText");
        }
    };

    return (
        <div className="flex flex-col justify-start h-full items-center p-12 gap-12">
            <SearchBar getSearchItem={getSearchItem} initialSearchText={searchText} /> {/* Pass initialSearchText */}
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
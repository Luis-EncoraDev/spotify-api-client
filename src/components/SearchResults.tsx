import type { Album, Artist, Playlist, Track } from "../interfaces";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import PlaylistCard from "./PlaylistCard";

 interface SearchResultsProps {
    albums?: Album[],
    artists?: Artist[],
    tracks?: Track[],
    playlists?: Playlist[]
}

const SearchResults: React.FC<SearchResultsProps> = ({ albums, artists, tracks, playlists }) => {

    return(
        <div className="flex h-full flex-col items-center">
            <p className="font-bold text-[2.5rem]">Search results</p>
            <div>
                { tracks &&
                    <>
                        <p className="font-bold text-[1.5rem] text-center mt-12">Tracks</p>
                        <div className="flex mt-2 justify-items-center grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                            {
                                tracks.map(track => {
                                    if (track != null)
                                    return(
                                            <div className="flex bg-transparent">
                                                <iframe
                                                style={{ borderRadius: '12px', width: "100%" }}
                                                src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                                                width="100%%"
                                                height="160"
                                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                                loading="lazy"
                                                />
                                            </div>
                                        )
                                })
                            }
                        </div>
                    </>
                }
            </div>
            <div>
                { artists &&
                    <>
                        <p className="font-bold text-[1.5rem] text-center mt-12">Artists</p>
                        <div className="flex mt-2 justify-items-center grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                            {
                                artists.map(artist => {
                                    if (artist != null)
                                    return(
                                        <ArtistCard
                                            key={artist.id}
                                            genres={artist.genres}
                                            id={artist.id}
                                            images={artist.images}
                                            name={artist.name}
                                            followers={artist.followers}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                }
            </div>
            <div>
                { albums &&
                    <>
                        <p className="font-bold text-[1.5rem] text-center mt-12]">Albums</p>
                        <div className="flex mt-2 justify-items-center grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                            {
                                albums.map(album => {
                                    if (album != null)
                                    return(
                                        <AlbumCard
                                            key={album.id}
                                            id={album.id}
                                            images={album.images}
                                            name={album.name}
                                            releaseYear={album.releaseYear}
                                            release_date={album.release_date}
                                            total_tracks={album.total_tracks}
                                            artists={album.artists}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                }
            </div>
            <div>
                { playlists &&
                    <>
                        <p className="font-bold text-[1.5rem] text-center mt-12">Playlists</p>
                        <div className="flex mt-2 justify-items-center grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                            {
                                playlists.map(playlist => {
                                    if (playlist != null)
                                    return(
                                        <PlaylistCard 
                                            key={playlist.id}
                                            description={playlist.description ? playlist.description : ""}
                                            id={playlist.id}
                                            images={playlist.images}
                                            name={playlist.name}
                                            owner={playlist.owner}
                                            tracks={playlist.tracks}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                }   
            </div>
        </div>

    )
}

export default SearchResults;
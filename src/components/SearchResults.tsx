import type { Album, Artist, Playlist, Track } from "../interfaces";
import TrackCard from "./TrackCard";
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
        <div className="flex h-auto flex-col items-center">
            <p className="text-[2rem]">Search results</p>
            <div className="flex mt-2 grid grid-cols-3 gap-5">
                {
                    tracks?.map(track => {
                        return(
                            <TrackCard 
                                key={track.id}
                                album={track.album} 
                                duration_ms={track.duration_ms} 
                                id={track.id}
                                name={track.name} 
                                preview_url={track.preview_url} 
                                is_playable={track.is_playable}
                                artists={track.artists}
                            />
                        )
                    })
                }
                {
                    albums?.map(album => {
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
                {
                    artists?.map(artist => {
                        return(
                            <ArtistCard
                                key={artist.id}
                                genres={artist.genres}
                                id={artist.id}
                                images={artist.images}
                                name={artist.name}
                            />
                        )
                    })
                }
                {
                    playlists?.map(playlist => {
                        return(
                            <PlaylistCard 
                                key={playlist.id}
                                description={playlist.description}
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
        </div>

    )
}

export default SearchResults;
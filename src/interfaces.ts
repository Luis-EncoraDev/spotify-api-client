export interface Image {
    height: number,
    url: string,
    width: number
}

export interface Artist {
    genres: string[],
    id: string,
    images: Image[],
    name: string
}

export interface AlbumArtist {
    id: string,
    name: string
}

export interface SearchArtistResponse {
    items: Artist[]
}

export interface Album {
    id: string,
    images: Image[],
    name: string,
    releaseYear: number,
    release_date: number,
    total_tracks: number
    artists: AlbumArtist[]
}

export interface SearchAlbumResponse {
    items: Album[]
}

export interface TrackArtist {
    id: string,
    name: string
}

export interface Track {
    album: Album,
    duration_ms: number,
    id: string,
    name: string,
    preview_url: string | null,
    is_playable?: boolean,
    artists: TrackArtist[]
}

export interface SearchTrackResponse {
    items: Track[]
}

export interface PlaylistOwner {
    display_name: string
}

export interface PlaylistTrack {
    total: number
}

export interface Playlist {
    description: string,
    id: string,
    images: Image[],
    name: string,
    owner: PlaylistOwner,
    tracks: PlaylistTrack
}

export interface SearchPlaylistResponse {
    items: Playlist[]
}

export interface SearchResponse {
    artists: SearchArtistResponse,
    albums: SearchAlbumResponse,
    tracks: SearchTrackResponse,
    playlists: SearchPlaylistResponse
}
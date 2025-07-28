import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import type { Artist, Album, Track, SearchResponse } from '../interfaces';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('HTTP requests to Spring Boot', () => {
  const mockToken = 'mock-jwt-token';
  const mockId = '123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAlbum', () => {
    const getAlbum = async (id: string, token: string) => {
      const response = await axios.get(`http://localhost:9090/api/albums/${id}`, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return response.data;
    };

    it('should fetch album by id with correct headers and credentials', async () => {
      const mockAlbum: Album = {
        id: '123',
        name: 'Test Album',
        releaseYear: 2023,
        release_date: 1672531200000,
        total_tracks: 10,
        images: [
          { height: 640, url: 'https://example.com/album.jpg', width: 640 }
        ],
        artists: [
          { id: '456', name: 'Test Artist', release_year: 2023, images: [] }
        ]
      };

      const mockResponse = { data: mockAlbum };
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      const result = await getAlbum(mockId, mockToken);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:9090/api/albums/${mockId}`,
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${mockToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      expect(result).toEqual(mockAlbum);
    });
  });

  describe('getAlbumTracks', () => {
    const getAlbumTracks = async (id: string, token: string) => {
      const response = await axios.get(`http://localhost:9090/api/albums/${id}/tracks`, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return response.data;
    };

    it('should fetch album tracks with correct headers and credentials', async () => {
      const mockTracks: Track[] = [
        {
          id: '789',
          name: 'Test Track',
          duration_ms: 240000,
          preview_url: 'https://example.com/preview.mp3',
          is_playable: true,
          album: {
            id: '123',
            name: 'Test Album',
            releaseYear: 2023,
            release_date: 1672531200000,
            total_tracks: 10,
            images: [],
            artists: []
          },
          artists: [
            { id: '456', name: 'Test Artist' }
          ]
        }
      ];

      const mockResponse = { data: { tracks: mockTracks } };
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      const result = await getAlbumTracks(mockId, mockToken);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:9090/api/albums/${mockId}/tracks`,
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${mockToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      expect(result).toEqual({ tracks: mockTracks });
    });
  });

  describe('getArtist', () => {
    const getArtist = async (id: string, token: string, setArtist: (artist: Artist) => void) => {
      const response = await axios.get(`http://localhost:9090/api/artists/${id}`, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      setArtist(data);
      return data;
    };

    it('should fetch artist and call setArtist with the data', async () => {
      const mockArtist: Artist = {
        id: '456',
        name: 'Test Artist',
        genres: ['Rock', 'Pop'],
        images: [
          { height: 640, url: 'https://example.com/artist.jpg', width: 640 }
        ],
        followers: { total: 1000000 }
      };

      const mockResponse = { data: mockArtist };
      const mockSetArtist = vi.fn();
      
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      const result = await getArtist(mockId, mockToken, mockSetArtist);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:9090/api/artists/${mockId}`,
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${mockToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      expect(mockSetArtist).toHaveBeenCalledWith(mockArtist);
      expect(result).toEqual(mockArtist);
    });
  });

  describe('getPopularSongs', () => {
    const getPopularSongs = async (id: string, token: string, setPopularTracks: (tracks: Track[]) => void) => {
      const response = await axios.get(`http://localhost:9090/api/artists/${id}/top-tracks`, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      setPopularTracks(data.tracks);
      return data;
    };

    it('should fetch popular tracks and call setPopularTracks with tracks data', async () => {
      const mockTracks: Track[] = [
        {
          id: '789',
          name: 'Popular Track',
          duration_ms: 210000,
          preview_url: 'https://example.com/popular.mp3',
          is_playable: true,
          album: {
            id: '123',
            name: 'Popular Album',
            releaseYear: 2023,
            release_date: 1672531200000,
            total_tracks: 12,
            images: [],
            artists: []
          },
          artists: [
            { id: '456', name: 'Test Artist' }
          ]
        }
      ];

      const mockResponse = { data: { tracks: mockTracks } };
      const mockSetPopularTracks = vi.fn();
      
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      const result = await getPopularSongs(mockId, mockToken, mockSetPopularTracks);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:9090/api/artists/${mockId}/top-tracks`,
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${mockToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      expect(mockSetPopularTracks).toHaveBeenCalledWith(mockTracks);
      expect(result).toEqual({ tracks: mockTracks });
    });
  });

  describe('searchAPI', () => {
    const searchAPI = async (searchText: string, token: string) => {
      const typesQueryString = "artist%2Calbum%2Ctrack%2Cplaylist";
      const response = await axios.get(`http://localhost:9090/api/search?q=${searchText}&type=${typesQueryString}`, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return response.data;
    };

    it('should perform search with correct query parameters and headers', async () => {
      const searchText = "test query";
      const mockSearchResponse: SearchResponse = {
        artists: {
          items: [{
            id: '456',
            name: 'Test Artist',
            genres: ['Rock'],
            images: [],
            followers: { total: 50000 }
          }]
        },
        albums: {
          items: [{
            id: '123',
            name: 'Test Album',
            releaseYear: 2023,
            release_date: 1672531200000,
            total_tracks: 10,
            images: [],
            artists: []
          }]
        },
        tracks: {
          items: [{
            id: '789',
            name: 'Test Track',
            duration_ms: 180000,
            preview_url: null,
            album: {
              id: '123',
              name: 'Test Album',
              releaseYear: 2023,
              release_date: 1672531200000,
              total_tracks: 10,
              images: [],
              artists: []
            },
            artists: []
          }]
        },
        playlists: {
          items: [{
            id: '999',
            name: 'Test Playlist',
            description: 'A test playlist',
            images: [],
            owner: { display_name: 'Test User' },
            tracks: { total: 25 }
          }]
        }
      };

      const mockResponse = { data: mockSearchResponse };
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      const result = await searchAPI(searchText, mockToken);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:9090/api/search?q=${searchText}&type=artist%2Calbum%2Ctrack%2Cplaylist`,
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${mockToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      expect(result).toEqual(mockSearchResponse);
    });

    it('should handle empty search text', async () => {
      const searchText = "";
      const mockResponse = { data: { artists: { items: [] }, albums: { items: [] }, tracks: { items: [] }, playlists: { items: [] } } };
      
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      const result = await searchAPI(searchText, mockToken);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:9090/api/search?q=&type=artist%2Calbum%2Ctrack%2Cplaylist`,
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getArtistAlbums', () => {
    const getArtistAlbums = async (artistId: string, token: string) => {
      const response = await axios.get(`http://localhost:9090/api/artists/${artistId}/albums`, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      return response.data;
    };
  });

  describe('getTopArtists', () => {
    const getTopArtists = async (token: string) => {
      const response = await axios.get("http://localhost:9090/api/me/top/artists", {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      return response.data;
    };

    it('should fetch user top artists with correct endpoint and headers', async () => {
      const mockTopArtists: Artist[] = [
        {
          id: '111',
          name: 'Top Artist 1',
          genres: ['Pop', 'Rock'],
          images: [
            { height: 640, url: 'https://example.com/top1.jpg', width: 640 }
          ],
          followers: { total: 5000000 }
        },
        {
          id: '222',
          name: 'Top Artist 2',
          genres: ['Hip Hop'],
          images: [
            { height: 640, url: 'https://example.com/top2.jpg', width: 640 }
          ],
          followers: { total: 3000000 }
        }
      ];

      const mockResponse = { data: { artists: mockTopArtists } };
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

      const result = await getTopArtists(mockToken);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:9090/api/me/top/artists",
        {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${mockToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      expect(result).toEqual({ artists: mockTopArtists });
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    it('should handle network errors properly', async () => {
      const getAlbum = async (id: string, token: string) => {
        const response = await axios.get(`http://localhost:9090/api/albums/${id}`, {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        return response.data;
      };

      const networkError = new Error('Network Error');
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(networkError);

      await expect(getAlbum(mockId, mockToken)).rejects.toThrow('Network Error');
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should handle 401 unauthorized errors', async () => {
      const getArtist = async (id: string, token: string) => {
        const response = await axios.get(`http://localhost:9090/api/artists/${id}`, {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        return response.data;
      };

      const unauthorizedError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };
      (mockedAxios.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(unauthorizedError);

      await expect(getArtist(mockId, 'invalid-token')).rejects.toEqual(unauthorizedError);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
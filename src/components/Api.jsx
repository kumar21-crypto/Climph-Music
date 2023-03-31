import axios from "axios"

const BASE_URL = "https://www.jiosaavn.com/api.php?";
const API_STRING = "&_format=json&_marker=0&api_version=4&ctx=web6dot0";
const SEARCH_API_STRING = "&_format=json&_marker=0&api_version=4&ctx=web6dot0&q=";
const BASE_DETAIL_URL = "https://climph-music-api.vercel.app/albums?link=";
const BASE_ARTIST_DETAIL_URL = "https://climph-music-api.vercel.app/artists?id=";
const BASE_PLAYLIST_DETAIL_URL = "https://climph-music-api.vercel.app/playlists?id=";
const BASE_SEARCH_ALL_URL = "https://climph-music-api.vercel.app/search/all?query=";
const BASE_SONG_DETAIL_URL = "https://climph-music-api.vercel.app/songs?link=";
const BASE_ALBUM_ID = "&cc=in&albumid=";
const BASE_PLAYLIST_ID = "&cc=in&listid=";
const CORS_URL = "https://cors-anywhere.herokuapp.com/";

export const endpoints = {
    'homeData': '__call=webapi.getLaunchData',
    'topSearches': '__call=content.getTopSearches',
    'fromToken': '__call=webapi.get',
    'featuredRadio': '__call=webradio.createFeaturedStation',
    'artistRadio': '__call=webradio.createArtistStation',
    'entityRadio': '__call=webradio.createEntityStation',
    'radioSongs': '__call=webradio.getSong',
    'songDetails': '__call=song.getDetails',
    'playlistDetails': '__call=playlist.getDetails',
    'albumDetails': '__call=content.getAlbumDetails',
    'getResults': '__call=search.getResults',
    'albumResults': '__call=search.getAlbumResults',
    'artistResults': '__call=search.getArtistResults',
    'playlistResults': '__call=search.getPlaylistResults'
}



export const fetchDataFromApi = async (endpoint) => {

    endpoint = endpoints['homeData'];
    const { data } = await axios.get(`${CORS_URL}${BASE_URL}${endpoint}${API_STRING}`,{
      headers:{
         "Access-Control-Allow-Headers":"*",
      }
    });

    return data;
}

export const fetchAlbumData = async (id) => {
   const { data } = await axios.get(`${CORS_URL}${BASE_URL}${endpoints['albumDetails']}${BASE_ALBUM_ID}${id}${API_STRING}`,{
      headers:{
         "Access-Control-Allow-Headers":"*",
      }
   });
    return data;
}

export const fetchPlaylistData = async (id) => {
   const { data } = await axios.get(`${CORS_URL}${BASE_URL}${endpoints['playlistDetails']}${BASE_PLAYLIST_ID}${id}${API_STRING}`,{
      headers:{
         "Access-Control-Allow-Headers":"*",
      }
   });
    return data;
}



export const fetchDetailDataFromApi = async (link) => {

    const {data} = await axios.get(`${BASE_DETAIL_URL}${link}`);
    return data;
 }

 export const fetchArtistDetailById = async (id) => {

    const {data} = await axios.get(`${BASE_ARTIST_DETAIL_URL}${id}`);
    return data;
 }

 export const fetchPlaylistByID = async (id) => {
    const {data} = await axios.get(`${BASE_PLAYLIST_DETAIL_URL}${id}`);
    return data;
 }

 export const searchByQuery = async (query) => {
    const {data} = await axios.get(`${BASE_SEARCH_ALL_URL}${query}`);
    return data;
 }

 export const fetchSongDetailDataByLink = async (link) => {
   const {data} = await axios.get(`${BASE_SONG_DETAIL_URL}${link}`);
   return data;
 }

 export const searchByQuerySaavn = async (query) => {
   const {data} = await axios.get(`${CORS_URL}${BASE_URL}${endpoints['getResults']}${SEARCH_API_STRING}${query}`);
   return data;
}
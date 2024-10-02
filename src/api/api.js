import axios from 'axios';

//Fetch all users
export const fetchArtists = async() =>{
    const response = await axios.get('http://localhost:3001/artists');
    return response.data;
}
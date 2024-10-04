import axios from 'axios';
import bcrypt from "bcryptjs";

//Fetch all artists
export const fetchArtists = async() =>{
    const response = await axios.get('http://localhost:3001/artists');
    return response.data;
}


// Function to register a new user
export const registerUser = async (fullname, username, email, password) => {
  try {
    const response = await fetch("http://localhost:3001/users");
    const users = await response.json();

    // Checking for duplicate username or email
    const isDuplicate = users.some(
      (user) => user.username === username || user.email === email
    );
    if (isDuplicate) {
      throw new Error("Username or Email already exists");
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // new user object
    const newUser = {
      id: users.length + 1,
      fullname,
      username,
      email,
      password: hashedPassword,
    };

    // request to json-server
    const postResponse = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to register");
    }

    return await postResponse.json();
  } catch (error) {
    throw error; 
  }
};
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from "../components/drawer";
import Box from '@mui/material/Box';
import ProfileBar from '../components/profileBar';
import ProfileData from '../components/profileData';
import jwt_decode from 'jwt-decode';
import axios from'axios';
// import { useToken } from '../auth/TokenContext';
import ErrorPage from './404';
export default function Home(){
    const [token, setToken] = useState('');
    console.log(token);
// Function to extract user ID from the JWT token
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.id; // Assuming "id" is the key used in the token payload
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// Get the user ID from the token
const agentId = getUserIdFromToken(token);
const [agent, setAgent] = useState(null);
console.log('userId : ' + agentId);
useEffect(() => {
  const fetchAgentData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/agents/${agentId}`);
      setAgent(response.data);
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  if (agentId) {
    fetchAgentData();
  }
}, [agentId]);


// if (!agent) {
//   return <div>Loading...</div>;
// }

console.log(agent)
  const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Set the token in your component state
          setToken(storedToken);
        }
        // } else {
        //   // If no token is found, navigate to the login page
        //   navigate('/');
        // }
      }, [navigate]);
    return(
        
        <div>
      {token ? (
        // Render content for logged-in users
        <Box sx={{ display: 'flex' }}>
        <Drawer/>
        <Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 3,
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add the boxShadow property
  }}
>
<ProfileBar agent={agent} />
  <ProfileData agent={agent} />
</Box>

      </Box>
      ) : (
        // Render content for users not logged in
        <ErrorPage/>
      )}
    </div>
    )
}
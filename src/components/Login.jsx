import React from "react";
import styled from "styled-components";
import {Fab} from "@mui/material";
import  NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

var colors = {
  zero: "#00FF83",
  one: "#00DC63 ",
  two: "#00CC68",
  three: "#00FF83",
  four: "#00FF83",
  five: "#00DC63",
  six: "#00CC68",
  seven: "#00CC68",
  eight: "#00CC68",
};

var gradient = `linear-gradient(to bottom right,${colors.zero},${colors.one},${colors.two},${colors.three},${colors.four})`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    background-color: black;
    color: #00ff83;
    font-size: 1.2rem;
    font-weight: 600;

    cursor: pointer;
  }
`;

function Login() {
    
  const handleLogin = () => {
    const clientID = "c90192e1a6014763894af3a3893a9d02";
    const redirectURL = "http://localhost:3000/";
    const apiURL = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
    ];
    window.location.href = `${apiURL}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope.join(" ")}
    &response_type=token&show_daialog=true`;
  };

  return (
    <Container style={{ backgroundImage: `${gradient}` }}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify-logo"
      ></img>
      <Fab
        variant="extended"
        size="large"
        onClick={handleLogin}
        aria-label="Login"
      >
        Connect to Spotify
        <NavigateNextRoundedIcon />
      </Fab>
    </Container>
  );
}

export default Login;

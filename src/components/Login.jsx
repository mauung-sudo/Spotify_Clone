import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img{
      height:20vh;
  }
  button{
      padding: 1rem 5rem;
      border-radius: 5rem;
      border: none;
      background-color:black;
      color: #49f585;
      font-size: 1.4rem;
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
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify-logo"
      ></img>
      <button onClick={handleLogin}>Connect to Spotify</button>
    </Container>
  );
}

export default Login;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import Navbar from "./Navbar";
import { reducerCases } from "../utils/Constants";
import Lyrics from "./Lyrics";
// import colorThief from "color-thief-jimp";

export default function Spotify() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  //bodyRef for changing background color on scroll
  const bodyRef = useRef();

  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [footerBackground, setFooterBackground] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 8
      ? setNavBackground(true)
      : setNavBackground(false);

    bodyRef.current.scrollTop >= 274
      ? setHeaderBackground(true)
      : setHeaderBackground(false);

    bodyRef.current.scrollTop >= 12
      ? setFooterBackground(true)
      : setFooterBackground(false);
  };


  //get User name, id
  //To setuser info in navbar
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      // console.log({userInfo});
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserData();
  }, [dispatch, token]);

  return (
    <Container>
      <div className="spotify__Body">

        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />

          <div className="bodyContents">
            <Lyrics footerBackground={footerBackground}></Lyrics>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: #006600;

  .spotify__Body {
    width: 100%;
    height: 100%;
  }
  .bodyContents{
    display: flex;
    height: 100vh;
    /* overflow:auto; */
    /* background-color: red; */
    flex-direction: column;
  }

  .body {
    width: 100%;
    height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

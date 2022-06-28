import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ColorThief from "@codemotion/color-thief";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

import Lyrics from "./Lyrics";
import CurrentTrack from "./CurrentTrack";
import Navbar from "./Navbar";


var dominantColor;
var colorPalette;
var bgColor = "rgb(0,100,50)";

var colors = {
  zero: "#00DC63",
  one: "#00DC63 ",
  two: "#00FF83",
  three: "#00FF83",
  four: "#00FF83",
  five: "#00FF83",
  six: "#00CC68",
  seven: "#00CC68",
  eight: "#00CC68",
};

export default function Spotify() {
  const [{ token, currentlyPlaying , userInfo}, dispatch] = useStateProvider();

  //bodyRef for changing background color on scroll
  const bodyRef = useRef();

  const [navBackground, setNavBackground] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 8
      ? setNavBackground(true)
      : setNavBackground(false);

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

      const albumImage = document.getElementsByTagName("img")[1];
      var colorThief = new ColorThief();
      dominantColor = colorThief.getColor(albumImage);
      colorPalette = colorThief.getPalette(albumImage);

      bgColor = `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`;

      let count = 0;
      Object.keys(colors).forEach((key) => {
        colors[key] = `rgb(${colorPalette[count][0]},${colorPalette[count][1]},${colorPalette[count][2]})`;
        count++;
      });

      
      console.log(colors);
      var gradient = `linear-gradient(180deg,${colors.zero},${colors.one},${colors.two},${colors.three},${colors.four},${colors.five},${colors.six},${colors.seven},${colors.eight})`;
    };
    getUserData();
    
  }, [dispatch, token]);
  
  return (
    <Container>
      <div className="spotify__Body">
        <div
          className="body"
          ref={bodyRef}
          onScroll={bodyScrolled}
          style={{
            backgroundColor: `${bgColor}`,
            backgroundImage:`linear-gradient(180deg,${bgColor},${colors.zero})`
          }}
        >
          <Navbar navBackground={navBackground} />

          <div className="bodyContents">
            <Lyrics></Lyrics>

            <CurrentTrack></CurrentTrack>
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


  .image {
    transition: 0.5s ease-out;
    width: 50%;
    height: 50%;
    position: relative;
  }

  .spotify__Body {
    width: 100%;
    height: 100%;
    position: static;
    transition: 1s ease-in-out;
  }
  .bodyContents {
    display: flex;
    height: 100vh;
    justify-items: center;
    flex-direction: column;
    z-index: 2;
  }

  .body {
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1;

    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

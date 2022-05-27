import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();

  //bodyRef for changing background color on scroll
  const bodyRef = useRef();

  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = () => {

    bodyRef.current.scrollTop >= 8
      ? setNavBackground(true)
      : setNavBackground(false);

    bodyRef.current.scrollTop >= 274
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  //bodyRef


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

        <Sidebar />

        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>

          <Navbar navBackground={navBackground} />

          <div className="bodyContents">
            <Body headerBackground={headerBackground} />
          </div>

        </div>
      </div>
      <div className="spotify__Footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify__Body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }
  .body {
    width: 100%;
    height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

import React,{useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{token}, dispatch]= useStateProvider();

  useEffect(() => {
      const getUserData = async () => {
        const {data} = await axios.get(
          "https://api.spotify.com/v1/me/",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          });
          const userInfo = {
            userId : data.id,
            userName : data.display_name
          }
          // console.log({userInfo});
          dispatch({type:reducerCases.SET_USER,userInfo});
        };
        getUserData();
      
  }, [dispatch,token]);
  

  return (
    <Container>
      <div className="spotify__Body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="bodyContents">
            <Body />
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
    grid-template-columns: 15vw 18vw;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }
  .body {
    width: 100%;
    height: 100%;
    overflow: auto;

  }
`;

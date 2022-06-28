import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import CurrentTrack from "./CurrentTrack";

// import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Lyrics({footerBackground}) {
  const [{currentTrackLyrics } ] =
    useStateProvider();

  return (
    <Container>
      {currentTrackLyrics ?? (
        <div className="skeleton">
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: auto;
  padding-bottom: 12vh;
  color: white;
  font-size: larger;
  font-weight: bolder;
  text-shadow: 1px 0px 3px #000;
  outline-color: black;
  line-height: 2.5rem;

  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;


  //for lineeeeee break!!
  white-space: pre;

  .skeleton {
    justify-content: center;
    width: 50vw;
  }
`;

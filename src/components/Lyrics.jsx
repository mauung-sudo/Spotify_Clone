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
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </div>
      )}
      <CurrentTrack footerBackground={footerBackground}></CurrentTrack>
    </Container>
  );
}

const Container = styled.div`
  margin: 5vh 5vw;
  margin-bottom: 100vh;

  align-items: center;
  color: white;
  font-size: medium;
  font-weight: bold;
  line-height: 2rem;

  //for lineeeeee break!!
  white-space: pre;

  .skeleton {
    align-items: center;
    width: 50vw;
  }
`;

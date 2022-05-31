import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
//for web scraping
import { parse } from "node-html-parser";
import { decode } from "html-entities";

import { getLyrics, getSong } from "genius-lyrics-api";
import searchSong from "genius-lyrics-api/lib/searchSong";

//@MUI
import { Fab } from "@mui/material";
import LyricsIcon from "@mui/icons-material/Lyrics";

export default function CurrentTrack({ footerBackground }) {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  const getCurrentTrack = async (translationVer) => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("RESPONSE: ", response.data);

    if (response.data !== "") {
      const { item } = response.data;

      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
        duration: item.duration_ms,
      };

      console.log(
        "SPOTIFY API: ",
        currentlyPlaying.name,
        "\n",
        currentlyPlaying.artists,
        "\n",
        currentlyPlaying.image
      );

      const options = {
        apiKey:
          "MUaskDqAG9J6x5KtpfxaYygWkBbZDdh-j5_UhrghB7ApIdhgbyXMN4Sh3XNKztub",
        title: currentlyPlaying.name,
        artist: currentlyPlaying.artists,
        optimizeQuery: true,
      };
      var currentTrackLyrics;
      //look for (Romanized) (Japanses Ver) (English Translation)
      searchSong(options).then((searchResult) => {
        console.log("SEARCH RES: ", searchResult);

        switch (translationVer) {
          case searchResult.search("(English Translation)"): {
            //look for Eng ver
            //TO-DO: call getSong
          }
          case searchResult.search("(Romanized)"): {
            //look for Romanized ver
            //TO-DO: call getSong
          }

          default:
            getSong(options).then((song) => {
              if (song) {
                console.log(`
                  SONGGG: 
                  
                  title: ${song.title}
                  url: ${song.url}
                  `);

                currentTrackLyrics = song.lyrics;
                console.log("LYRICS: ", song);

                dispatch({
                  type: reducerCases.SET_LYRICS,
                  currentTrackLyrics,
                });
              } else {
                //display error message in the place of currentTrackLyrics
                currentTrackLyrics = "Can't find lyrics :'(";
                dispatch({
                  type: reducerCases.SET_LYRICS,
                  currentTrackLyrics,
                });

                console.log("CAN'T GET SONG");
              }

              //check if the song has japanese letters
              // var regex =
              //   /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
              // var input = song.title;

              // if (regex.test(input)) {
              //   input = input.replace(regex, "");
              //   console.log(input);
              //   console.log(input.split(" ")[4].replace("(", "").replace(")", ""));
              //   console.log("Japanese characters found");
              // } else {
              //   console.log("No Japanese characters");
              // }
            });
        }
      });

      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else {
      console.log("NO SONG IS PLAYING ON SPOTIFY AT THE MOMENT");
    }
  };

  // }, [token, dispatch]);

  useEffect(() => {
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <Container footerBackground={footerBackground}>
      {currentlyPlaying ? (
        <div className="track">
          <div className="track_image">
            <img src={currentlyPlaying.image} alt="track-album-cover" />
          </div>

          <div className="track_info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      ) : (
        <div>NO SONG IS PLAYING ON SPOTIFY AT THE MOMENT . . </div>
      )}

      <Fab
        color="secondary"
        size="medium"
        aria-label="get lyrics"
        onClick={() => {
          console.log("Callback from FAB: ");
          getCurrentTrack();
        }}
      >
        <LyricsIcon></LyricsIcon>
      </Fab>
      <Fab
        color="secondary"
        size="medium"
        aria-label="get lyrics"
        onClick={() => {
          console.log("Callback from FAB: ");
          getCurrentTrack();
        }}
      >
        ROM
      </Fab>
      <Fab
        color="secondary"
        size="medium"
        aria-label="get english translation"
        onClick={() => {
          console.log("Callback from FAB: ");
          getCurrentTrack();
        }}
      >
        ENG
      </Fab>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  bottom: 10vh;
  position: sticky;

  background-color: black;
  border: #b3b3b3 solid 1px;
  height: 10vh;
  /* width: 40vh; */
  padding: 2rem 1.5rem;
  margin: 0.2rem 1rem;
  border-radius: 0.7rem;
  flex-direction: row;
  transition: 0.3s ease-out;
  background-color: ${({ footerBackground }) =>
    footerBackground ? "black" : "none"};

  /* background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0 1rem; */

  button {
    border-radius: 5rem;
    margin-left: 2rem;
    border: none;
    background-color: #181818;
    color: white;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    .track_image {
      img {
        margin: auto;
        max-width: 8vh;
        border-radius: 0.5rem;
      }
    }
    .track_info {
      display: flex;

      flex-direction: column;
      gap: 0.3rem;
      font-size: medium;
      h4 {
        color: white;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;

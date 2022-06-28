import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import TransitionSnackbar from "./TransitionSnackbar";

import { getLyrics, getSong } from "genius-lyrics-api";
import searchSong from "genius-lyrics-api/lib/searchSong";

//@MUI
import {
  Icon,
  SpeedDial,
  SpeedDialAction,
  Typography,
  CircularProgress,
} from "@mui/material";
import LyricsIcon from "@mui/icons-material/Lyrics";
import TranslateIcon from "@mui/icons-material/Translate";

function SpeedDialActionIcon(props) {
  return (
    <Icon>
      <Typography>{props.innerText}</Typography>
    </Icon>
  );
}

export default function CurrentTrack({ footerBackground }) {
  const [{ token, currentlyPlaying, speedDialActions }, dispatch] =
    useStateProvider();

  const [selectedLanguage, setLanguage] = useState();
  const [snackbarState, openSnackbar] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const getCurrentTrack = async (translationVer) => {
    setLoading(true);

    console.log("Get current track:", translationVer);

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
        album: item.album.name,
        duration: item.duration_ms,
      };

      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });

      console.log(
        "SPOTIFY API: ",
        currentlyPlaying.name,
        "\n",
        currentlyPlaying.artists,
        "\n"
        );
        
      const regexList = {
        feat: /(feat.*)/i,
        with: /(with*)/i,
      };

      var featuring_removed_title = currentlyPlaying.name
      .replace(regexList.feat, "")
      .slice(0, -1);
      
        console.log("FT removed: ",featuring_removed_title);

      var currentTrackLyrics;

      const options = {
        apiKey:
          "MUaskDqAG9J6x5KtpfxaYygWkBbZDdh-j5_UhrghB7ApIdhgbyXMN4Sh3XNKztub",
        title: currentlyPlaying.name,
        artist: currentlyPlaying.artists,
        optimizeQuery: true,
      };

      //GET SONG LYRICS
      const getSongLyrics = () => {
        getSong(options).then((song) => {
          if (song) {
            console.log(`SONGGG: URL: ${song.url}`);
            console.log("LYRICS: ", song.title);

            currentTrackLyrics = song.lyrics;
          } else {
            //display error message in the place of currentTrackLyrics
            currentTrackLyrics = "Can't find lyrics :'(";
            console.log("CAN'T GET SONG");
          }

          dispatch({
            type: reducerCases.SET_LYRICS,
            currentTrackLyrics,
          });
        });
      };

      if (translationVer === "default") {
        searchSong(options).then((searchResult) => {
          console.log("SEARCH RES: ", searchResult);
          var count1 = -1;
          for (const key of searchResult) {
            count1++;
            console.log(count1);
            console.log(key.title.search(options.title));

            if (
              key.title.search(
               featuring_removed_title
              ) === 0
            ) {
              getLyrics(key.url).then((lyrics) => {
                currentTrackLyrics = lyrics;
                dispatch({
                  type: reducerCases.SET_LYRICS,
                  currentTrackLyrics,
                });
              });
              break;
            }
          }
          if (count1 === searchResult.length - 1) {
            getSongLyrics();
          }
        });
      }

      //look for (Romanized) (Japanses Ver) (English Translation)
      if (translationVer !== "default" && translationVer !== undefined) {
        searchSong(options).then((searchResult) => {
          console.log("SEARCH RES: ", searchResult);

          /*If lyrics can't be found,
        modify songName query in options 
        such as (feat. ) (remix) (with artistName1,artistName2) (Language Versions)
        which are at the end of songName query and can result in inaccurate searchResults*/
          if (searchResult === null) {
            options.title = featuring_removed_title;
            console.log(options.title);
          }

          var count = -1;
          for (const key of searchResult) {
            count++;
            console.log(count);

            if (key.title.search(translationVer) === -1) {
              console.log(key.title.search(translationVer), " ", key.title);
              continue;
            } else {
              console.log(key.title.search(translationVer));
              console.log("Translation Ver: ", key.title);

              getLyrics(key.url).then((lyrics) => {
                currentTrackLyrics = lyrics;
                dispatch({
                  type: reducerCases.SET_LYRICS,
                  currentTrackLyrics,
                });
              });
              console.log(key.url);
              break;
            }
          }

          //If u Can't find translation
          // even at the last iteration of searchResult
          if (count === searchResult.length - 1) {
            dispatch({
              type: reducerCases.SELECTED_LANGUAGE,
              translationVer,
            });

            openSnackbar(true);
            console.log(translationVer, " is not found");
          }
        });
      } else if (translationVer === undefined) {
        getSongLyrics();
      }
    } else {
      console.log("NO SONG IS PLAYING ON SPOTIFY AT THE MOMENT");
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("USE EFFECT:", selectedLanguage);
    getCurrentTrack(selectedLanguage);
  }, [token, dispatch]);

  const [open, setOpen] = React.useState(false);
  const speedDialClick = () => setOpen(true);
  const speedDialClose = () => {
    setOpen(false);
    getCurrentTrack(selectedLanguage);

    console.log("speed dial closed");
  };

  var language;
  var count = 0;

  const actionButtonClose = (event) => {
    language = event.target.innerHTML.toString();

    switch (language) {
      case "EN":
        setLanguage("(English Translation)");
        break;
      case "RO":
        setLanguage("(Romanized)");
        break;
      case "JP":
        setLanguage("(Japanese Translations)");
        break;
      case "DE":
        setLanguage("default");
        break;
    }
    console.log(count, "from event: ", selectedLanguage);

    getCurrentTrack(selectedLanguage);
    speedDialClose();

    count++;
    console.log("count:", count);
  };

  return (
    <Container footerBackground={footerBackground}>
      {currentlyPlaying ? (
        <div className="track">
          <img
            src={currentlyPlaying.image}
            alt="track-album-cover"
            crossOrigin="anonymous"
          />

          <div className="track_info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
            <h6>{currentlyPlaying.album}</h6>
          </div>

          <TransitionSnackbar
            snackbarState={snackbarState}
            openSnackbar={openSnackbar}
            selectedLanguage={selectedLanguage}
          />
        </div>
      ) : (
        <div>NO SONG IS PLAYING ON SPOTIFY AT THE MOMENT . . . </div>
      )}

      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: 12, right: 16 }}
        icon={
          <>
            {loading ? (
              <CircularProgress
                size={68}
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  color: "#ffffff",
                }}
              />
            ) : (
              <></>
            )}
            <LyricsIcon />
          </>
        }
        onClose={speedDialClose}
        onOpen={speedDialClick}
        open={open}
      >
        {speedDialActions.map((speedDialAction) => (
          <SpeedDialAction
            key={speedDialAction.name}
            icon={<SpeedDialActionIcon innerText={speedDialAction.innerText} />}
            tooltipTitle={speedDialAction.name}
            tooltipOpen
            onClick={actionButtonClose}
          />
        ))}
      </SpeedDial>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  bottom: 10vh;

  background-color: rgba(0, 0, 0, 0.95);
  color: white;
  font-weight: 600;
  box-shadow: 1px 0px 5px #202023;
  height: 10vh;
  padding: 2rem 1.5rem;
  margin: 2rem 1rem;
  border-radius: 0.7rem;
  flex-direction: row;
  transition: 0.3s ease-out;

  button {
    border-radius: 5rem;
    margin-left: 0rem;
    border: none;
    background-color: white;
    color: #181818;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #181818;
      color: white;
    }
  }
  .track {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 1rem;
    img {
      margin: auto;
      max-width: 9vh;
      border-radius: 0.4rem;
    }
    .track_info {
      display: flex;

      flex-direction: column;
      gap: 0.1rem;
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

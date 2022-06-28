import React from "react";
import styled from "styled-components";
import axios from "axios";
//Icons
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function PlayerControls() {

  const [{ token, playerState }, dispatch] = useStateProvider();

  //Convert from MilliSeconds to Minutes
  const milliSeconds_to_minutes = (ms) => {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };


  const getPlaybackDevices = async() =>  {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

      if(response){
        console.log("player: ",response);

      }
  }

//   const changeTrack = async (type) => {
//     await axios.post(`https://api.spotify.com/v1/me/player/${type}`,
//     {},
//      {
//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/json",
//       },
//     });

//     const response = await axios.get(
//       "https://api.spotify.com/v1/me/player/currently-playing",
//       {
//         headers: {
//           Authorization: "Bearer " + token,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.data !== "") {
//       const { item } = response.data;
//       const currentlyPlaying = {
//         id: item.id,
//         name: item.name,
//         artists: item.artists.map((artist) => artist.name),
//         image: item.album.images[2].url,
//       };
//       dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
//       console.log(currentlyPlaying);
//     } else {
//       dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
//     }

//     // console.log(currentlyPlaying);
//   };

  return (
    // <Container>
    //   <div className="shuffle">
    //     <BsShuffle />
    //   </div>
    //   <div className="previous">
    //     <CgPlayTrackPrev onClick={() => getPlaybackDevices()} />
    //   </div>
    //   <div className="state">
    //     {playerState ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
    //   </div>
    //   <div className="next" >
    //     <CgPlayTrackNext onClick={() => changeTrack("next")}/>
    //   </div>
    //   <div className="repeat">
    //     <FiRepeat />
    //   </div>
    // </Container>
    <Container>
      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-out;
    &:hover {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
  .state {
    svg {
      color: white;
      &:hover {
        color: #b3b3b3;
      }
    }
  }
`;

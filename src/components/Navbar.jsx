import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";

const Container = styled.div``;
const Navbar = () => {
  const [{ userInfo }] = useStateProvider();
  
  return (
    <Container>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs, or podcast"></input>
      </div>
      <div className="avatar">
        <CgProfile />
        <span>{userInfo?.userName}</span>
      </div>
    </Container>
  );
};

export default Navbar;

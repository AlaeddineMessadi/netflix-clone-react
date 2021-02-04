import React from "react";
import { Banner } from "../Banner";
import { NavBar } from "../Nav";
import { Row } from "../Row";
import { requests } from "../services/request";
import "./style.scss";

export const HomeScreen = () => {
  return (
    <div className="home_screen">
      <NavBar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
    </div>
  );
};

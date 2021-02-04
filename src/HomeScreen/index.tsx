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
      <Row title="TOP RATED" fetchUrl={requests.fetchTopRated} />
      <Row title="TRENDING" fetchUrl={requests.fetchTrending} />
      <Row title="ACTION MOVIES" fetchUrl={requests.fetchActionMovies} />
      <Row title="COMEDY MOVIES" fetchUrl={requests.fetchComedyMovies} />
      <Row title="HORROR MOVIES" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="ROMANCE MOVIES" fetchUrl={requests.fetchRomanceMovies} />
    </div>
  );
};

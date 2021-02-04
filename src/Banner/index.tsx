import React, { useEffect, useState } from "react";
import "./style.scss";
import { Axios, image_base_url, requests } from "../services/request";
import { keyType } from "../utils/types";

export const Banner = () => {
  const [movie, setMovie] = useState<keyType>();

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(requests.fetchNetflixOriginals);

      const movieIndex = Math.floor(
        Math.random() * response.data.results.length - 1
      );
      const selectedMovie = response.data.results[movieIndex];
      setMovie(selectedMovie);

      return response;
    }

    fetchData();
  }, []);

  // console.log(movie);
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(n - 1) + "..." : str;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("${image_base_url}${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

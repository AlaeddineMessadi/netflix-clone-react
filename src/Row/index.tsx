import React, { useEffect, useState } from "react";
import { Axios, image_base_url } from "../services/request";
import { keyType } from "../utils/types";
import "./style.scss";

interface IProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}
export const Row: React.FC<IProps> = ({
  title,
  fetchUrl,
  isLargeRow = false,
}: IProps) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(fetchUrl);

      setMovies(response.data.results);
      return response;
    }

    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie: keyType) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                src={`${image_base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                alt={`${movie.name} poster`}
              />
            )
        )}
      </div>
    </div>
  );
};

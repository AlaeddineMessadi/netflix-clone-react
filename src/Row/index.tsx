import React, { useEffect, useState } from "react";
import { Axios } from "../services/request";
import "./style.scss";

interface IProps {
  title: string;
  fetchUrl: string;
}
export const Row: React.FC<IProps> = ({ title, fetchUrl }: IProps) => {
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
    </div>
  );
};

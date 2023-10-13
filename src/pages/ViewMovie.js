import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container } from "react-bootstrap";

const ViewMovie = () => {
  const getParam = useParams();
  const getId = getParam.id;
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    getSingleMovieInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error occured");
    }
  };

  return (
    <>
      <MovieNavbar />
      <Container>
        <h1 className="text-info">{movieData.name}</h1>
        <br />
        Info:{movieData.info}
        <br /> <br />
        Description:{movieData.desc}
        <br />
        <br />
        Image: <br />
        <img
          src={movieData.image}
          alt="Movie images"
          style={{ height: "200px" }}
        />
        <br />
        <br />
        Rating:{movieData.rating}
        <br />
        <Link to="/">
          <Button className="bg-dark">Go Back</Button>
        </Link>
      </Container>
    </>
  );
};
export default ViewMovie;

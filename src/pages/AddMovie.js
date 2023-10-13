import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form } from "react-bootstrap";

const AddMovie = () => {
  const history = useHistory();

  const movie_name_reference = useRef();
  const rating_reference = useRef();
  const description_reference = useRef();
  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: rating_reference.current.value,
      description: description_reference.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      //   console.log();
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown Error! Try again");
      }
    }
  };
  return (
    <>
      <MovieNavbar />

      <br />
      <Container>
        <form onSubmit={addMovieHandler}>
          {/* <input
            type="text"
            placeholder="Movie Name"
            ref={movie_name_reference}
          /> */}
          <Form.Group className="mb-3">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of the movie"
              ref={movie_name_reference}
            />
          </Form.Group>
          {/* <br />
          <br />
          Rating:
          <br />
          <input type="text" placeholder="Rating" ref={rating_reference} /> */}
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rating for the movie"
              ref={rating_reference}
            />
          </Form.Group>
          {/* <br />
          <br />
          Description:
          <br />
          <textarea ref={description_reference}></textarea>
          <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} ref={description_reference} />
          </Form.Group>
          <Button variant="dark" type="submit">
            AddMovie
          </Button>
        </form>
      </Container>
    </>
  );
};
export default AddMovie;

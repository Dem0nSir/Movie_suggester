import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import { Container, Form, Row, Spinner } from "react-bootstrap";
import SingleMovie from "../components/SingleMovie";

/**
 * Fetches movie data from an API and displays it on the screen.
 * @returns {JSX.Element} The rendered component.
 */
const Index = () => {
  const [movies, setMovies] = useState([]);

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchMovieText, setSearchMovietext] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstRun) {
      //   //searchinf code
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          fetchMovies();
        } else {
          setSearchErrorText("Please enter atleast 3 charaster for searching.");
        }
      }, 500);

      //clean up function
      return () => {
        // console.log("cleanup");
        clearTimeout(fetchTimer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMovieText]);

  /**
   * Fetches movies from the API.
   */
  const fetchMovies = async () => {
    setLoading(true);
    setSearchErrorText("");
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorText("Cannot get movie info!");
      setLoading(false);
      setFirstRun(false);
    }
  };

  return (
    <div className="App">
      <MovieNavbar />
      {/* <button onClick={fetchMovies}>Get all Movies</button> */}

      <div>
        <div className="text-center mt-2 ">
          <Container>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={searchMovieText}
                placeholder="Type Movie Title for searching"
                onChange={(e) => setSearchMovietext(e.target.value)}
              />
            </Form.Group>
          </Container>
        </div>
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
      <br />

      <br />
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              padding: "10px",
              color: "white",
              margin: "10px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
          >
            {loading ? (
              <>
                <Container className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Container>
              </>
            ) : (
              <></>
            )}
            {!loading && movies.length < 1 ? (
              <>No movies found!</>
            ) : (
              <>
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el} />
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;

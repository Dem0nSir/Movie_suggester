import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieNavbar = () => {
  return (
    <>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand href="#home" className="text-white">
            <Link to="/" className="text-white">
              Movie Suggester
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end gap-3">
            <Navbar.Text>
              <Link to="/add" className="text-white">
                Add Movie
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              {localStorage.getItem("accessToken") ? (
                <>
                  <Link to="/profile" className="text-white">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MovieNavbar;

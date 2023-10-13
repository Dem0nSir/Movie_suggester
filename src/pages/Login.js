import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form, Modal } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const [modalShown, setModalShown] = useState(false);
  const [modalText, setModalText] = useState("");

  const history = useHistory();
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);
      if (response.data.status === "success") {
        setModalText("Loged in successfully,redirecting....");

        setModalShown(true);
      }
      setTimeout(() => {
        history.replace("/");
      }, 2000);
    } catch (error) {
      //   console.log();
      if (error.response) {
        // alert(error.response.data.errors[0].message);
        setModalText(error.response.data.errors[0].message);
        setModalShown(true);
      } else {
        setModalText("Unknown error occured! Try again");
        setModalShown(true);
      }
    }
  };

  return (
    <>
      <MovieNavbar />

      <Container className="mt-3">
        <h3>Login Screen</h3>
        <form onSubmit={loginHandler}>
          {/* Email:
          <br />
          <input type="text" ref={email} />
          <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              ref={email}
              placeholder="Enter email"
              autoComplete="false"
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>
          {/* Password:
          <br />
          <input type="password" ref={password} />
          <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={password} autoComplete="false" />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>
          <Button variant="dark" type="submit">
            Login
          </Button>
        </form>
      </Container>
      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;

import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [modalShown, setModalShown] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown Error! Try again");
      }
    }
  };

  const onLogout = () => {
    // localStorage.removeItem("accessToken");
    // history.push("/");
    setModalShown(true);
  };

  return (
    <>
      <MovieNavbar />

      <Container className="mt-2">
        Name: {userData.name}
        <br />
        Email: {userData.email}
        <br />
        Country: {userData.country}
        <br />
        {/* <button onClick={onLogout}>Logout</button> */}
        <Button variant="danger" type="button" onClick={onLogout}>
          Logout
        </Button>
      </Container>
      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Cancle
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.push("/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;

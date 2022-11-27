import "./App.css";
import { Col, Row, Form, Button, Table, Modal, Card } from "react-bootstrap";
import Axios from "axios";
import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";

function App() {
  // Get data
  const [data, setData] = useState([]);

  // Add data
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState();
  const [price, setPrice] = useState();

  // Edit data
  const [nameEd, setNameEd] = useState(name);
  const [descEd, setDescEd] = useState();
  const [imgEd, setImgEd] = useState();
  const [priceEd, setPriceEd] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  // Axios Get
  const getData = () => {
    Axios({
      method: "get",
      url: "http://localhost:7777/product",
    })
      .then(function (response) {
        setData(response.data.data);
      })
      .catch((x) => {
        console.log(x);
      });
  };

  // Axios Post
  const addData = () => {
    Axios({
      method: "post",
      url: "http://localhost:7777/product",
      data: {
        name: name,
        description: desc,
        image: img,
        price: price,
      },
    }).then(function (response) {
      setName();
      setDesc();
      setImg();
      setPrice();
      getData();
    });
  };

  const handleEdit = () => {
    Axios({
      method: "put",
      url: `http://localhost:7777/product/${show}`,
      data: {
        name: nameEd,
        description: descEd,
        image: imgEd,
        price: parseInt(priceEd),
      },
    }).then(function (response) {
      handleClose();
      setNameEd();
      setDescEd();
      setImgEd();
      setPriceEd();
      getData();
    });
  };

  // delete data
  const deleteData = (id) => {
    if (window.confirm(`id: ${id} Delete?`)) {
      Axios({
        method: "post",
        url: `http://localhost:7777/product/delete/${id}`,
      }).then(function (response) {
        getData();
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Row className="justify-content-center mb-5">
        <Col xs={8}>
          <h1
            className="text-center"
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              fontSize: "30px",
            }}
          >
            Form
          </h1>
          <Card style={{ padding: "20px", fontSize: "16px" }}>
            <Form onSubmit={addData}>
              <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Description"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter URL Image"
                  onChange={(e) => setImg(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price (IDR)"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Button className="submit-btn" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          {data.map((value, i) => {
            return (
              <Card key={i} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={value.image} alt={value.name} />
                <Card.Body>
                  <Card.Title>{value.name}</Card.Title>
                  <Card.Text> {value.description}</Card.Text>
                  <Card.Text>
                    <CurrencyFormat
                      value={value.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleShow(
                        value.id,
                        value.name,
                        value.description,
                        value.image,
                        value.price
                      )
                    }
                  >
                    {" "}
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={() => deleteData(value.id)}>
                    Delete
                  </Button>{" "}
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setNameEd(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescEd(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setImgEd(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPriceEd(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* end modal */}
    </div>
  );
}

export default App;

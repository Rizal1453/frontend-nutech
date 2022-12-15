import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { TablePagination } from "react-pagination-table";
import { useQuery } from "react-query";
import { API } from "../components/config/api";
import { Gbutton } from "../components/Gbutton";
import { LoginContext } from "../components/LoginContext";
import Navbar from "../components/navbar";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import Ronaldo from "../components/assets/profil.jpg";

function Landing() {
  const [state, dispatch] = useContext(LoginContext);
  const [showDelete, setShowDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [save, setSave] = useState();
  const [search, setSearch] = useState("");
  const [showLogined, setShowLogined] = useState(false);
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const closelogined = () => setShowLogined(false);
  const closeDelete = () => setShowDelete(false);
  const logined = state.isLogin;

  const getProduct = async () => {
    try {
      const response = await API.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
 

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  const totalPosts = data?.length;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = save.id;
    try {
      await API.delete(`/delete/${id}`);
      setShowDelete(false);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navbar />

      <Container>
        <div className="d-flex justify-content-between pt-4">
          <Gbutton
            text="Add Product"
            style={{ height: "35px" }}
            size="me-5"
            onClick={() => {
               setShowForm(true);
            }}
          />
          <Form.Group className="mb-3 w-75 " controlId="formBasicEmail">
            <Form.Control
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search product"
              style={{ height: "35px" }}
            />
          </Form.Group>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {search === "" ? (
              <>
                {currentPosts?.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <img src={Ronaldo} alt="" />
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td
                      // className=" d-flex justify-content-center"
                      // style={{ height: "80px" }}
                      >
                        <Gbutton
                          text="Update"
                          size="me-1"
                          style={{ width: "100px", height: "40px" }}
                          onClick={() => {
                            setShowUpdate(true);
                            setSave(item);
                          }}
                        />
                        <Gbutton
                          text="Delete"
                          style={{ width: "100px", height: "40px" }}
                          onClick={() => {
                           
                           setShowDelete(true);
                            setSave(item);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </>
            ) : (
            <> 
                {data
                  ?.filter((i) => {
                    return search.toLowerCase() === ""
                      ? i
                      : i.name.toLowerCase().includes(search);
                  })
                  .map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <img src={Ronaldo} alt="" />
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td
                      // className=" d-flex justify-content-center"
                      // style={{ height: "80px" }}
                      >
                        <Gbutton
                          text="Update"
                          size="me-1"
                          style={{ width: "100px", height: "40px" }}
                          onClick={() => {
                           
                            setShowUpdate(true);
                            setSave(item);
                          }}
                        />
                        <Gbutton
                          text="Delete"
                          style={{ width: "100px", height: "40px" }}
                          onClick={() => {
                  
                               setShowDelete(true);
                            setSave(item);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </>
                        )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center mt-3">
          <ul className="text-dark d-flex gap-3 pagination">
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              prev
            </button>

            {pageNumbers?.map((number) => (
              <li key={number}>
                <button
                  className={`page-link ${
                    currentPage === number ? " shadow border border-3" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <button
              onClick={() => {
                setCurrentPage((prev) =>
                  prev < pageNumbers.length ? prev + 1 : prev
                );
                console.log(currentPage);
                console.log(pageNumbers.length);
              }}
            >
              next
            </button>
          </ul>
        </div>

        <AddProduct
          show={showForm}
          handleShow={() => setShowForm(true)}
          handleClose={() => setShowForm(false)}
          getProduct={getProduct}
        />
        <UpdateProduct
          save={save}
          show={showUpdate}
          setShowUpdate={setShowUpdate}
          handleClose={() => setShowUpdate(false)}
          getProduct={getProduct}
        />

        <Modal show={showDelete} onHide={closeDelete}>
          <div className=" d-flex justify-content-center">
            <h2>Are You sure For Delete?</h2>
          </div>
          <Modal.Footer className="d-flex justify-content-center">
            <Gbutton text="Delete " size="px-5" onClick={handleDelete} />
          </Modal.Footer>
        </Modal>
        <Modal show={showLogined} onHide={closelogined}>
          <Modal.Body className="d-flex justify-content-center">
            <h2> OOps anda belum login</h2>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Landing;

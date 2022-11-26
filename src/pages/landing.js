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

  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
 

  

  const closelogined = () => setShowLogined(false);
  const closeDelete = () => setShowDelete(false);
  const logined = state.isLogin;

  const getProduct = async () => {
    try {
      const response = await API.get(`/products`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //  let { data: product, refetch: yukRefetch } = useQuery(
  //    "productCache",
  //    async () => {
  //      const response = await API.get("/products");
  //      return response.data.data;
  //    }
  //  );
  // const Header = ["Name", "Age", "Size", "Phone", "Gender"];
  const indexOfLastPost = currentPage * postsPerPage; // 1 * 3 = 3
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 3 -3 = 0
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
              !logined ? setShowLogined(true) : setShowForm(true);
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
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Search Title"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="form-select"
          value={filterCompleted}
          onChange={(e) => {
            setFilterCompleted(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option defaultValue=""></option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <Table className="border border-2 mt-3 " bordered hover responsive>
          <thead style={{ backgroundColor: "#E5E5E5" }}>
            <tr>
              <th>No</th>
              <th>Foto Barang</th>
              <th>Nama Barang</th>
              <th>Harga Jual</th>
              <th>Harga Beli</th>
              <th>Stok</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="shadow bg-light p-0" style={{ height: "50px" }}>
            {currentPosts
              ?.filter((i) => {
                return search.toLowerCase() === ""
                  ? i
                  : i.name.toLowerCase().includes(search);
              })

              .map((item, index, i) => (
                <tr>
                  <td className="d-flex justify-content-center h-100 ">
                    {index + 1}
                  </td>
                  <td className="p-0">
                    <div>
                      <img
                        style={{ width: "70px", height: "70px" }}
                        className="ms-5 my-1"
                        src={item.image}
                        alt=""
                        width="100%"
                      />
                    </div>
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>{item.sale}</p>
                  </td>
                  <td>
                    <p>{item.buy}</p>
                  </td>
                  <td>{item.qty}</td>
                  <td
                    className=" d-flex justify-content-center"
                    style={{ height: "80px" }}
                  >
                    <Gbutton
                      text="Update"
                      size="me-1"
                      style={{ width: "100px", height: "40px" }}
                      onClick={() => {
                        !logined ? setShowLogined(true) : setShowUpdate(true);
                        setSave(item);
                      }}
                    />
                    <Gbutton
                      text="Delete"
                      style={{ width: "100px", height: "40px" }}
                      onClick={() => {
                        !logined ? setShowLogined(true) : setShowDelete(true);
                        setSave(item);
                      }}
                    />
                  </td>
                </tr>
              ))}
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
              <li
              // key={number}
              // className={`page-link ${
              //   currentPage === number ? " shadow border border-3" : ""
              // }`}
              >
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
        {/*    <TablePagination
          // title="TablePagination"
          // subTitle="Sub Title"
          headers={Header}
          data={data && data}
          columns="name.age.size.phone.gender"
          perPageItemCount={10}
          totalCount={data?.length}
          arrayOption={[["size", "all", " "]]}
                    /> */}
      </Container>
    </div>
  );
}

export default Landing;

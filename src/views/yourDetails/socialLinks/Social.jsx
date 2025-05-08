import { Container, Button, Table, Row, Form, Col, Dropdown, Modal } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"; 
import Swal from "sweetalert2";
import _ from "lodash"; // ✅ Import lodash for debounce

function Social() {
    const [socials, setSocials] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [scannerImage, setScannerImage] = useState(null); // 🔹 Scanner Image State
    const [showScannerModal, setShowScannerModal] = useState(false); // 🔹 Modal Visibility
    const navigate = useNavigate();

    // ✅ Debounced function (Waits 500ms before calling API)
    const fetchSocials = _.debounce(async (searchTerm) => {
        try {
            const res = await axios.get(`http://localhost:3002/listSocials?search=${searchTerm}`);
            setSocials(res.data);
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, 500);

    // ✅ Fetch data on searchInput change
    useEffect(() => {
        fetchSocials(searchInput);
    }, [searchInput, refresh]);

    function handleSearch(e) {
        setSearchInput(e.target.value);
    }

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "This will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3002/deleteSocial/${id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Social media entry deleted.", "success");
                        setRefresh((prev) => !prev);
                    })
                    .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
            }
        });
    }

    function toggleStatus(id, currentStatus) {
        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
        axios.put(`http://localhost:3002/updateSocialStatus/${id}`, { status: newStatus })
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`Status changed to ${newStatus}`);
                    setRefresh((prev) => !prev);
                } else {
                    toast.error("Failed to change status");
                }
            })
            .catch(() => toast.error("Failed to change status"));
    }

    return (
        <Container>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* 🔹 Search & Add Social Button */}
            <Row className="mb-2 align-items-center">
                <Col md={8}>
                    <Form.Group controlId="searchInput">
                        <Form.Control
                            type="text"
                            placeholder="Search Social Media"
                            value={searchInput}
                            onChange={handleSearch}
                            style={{ width: '100%', padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                    </Form.Group>
                </Col>
                <Col md={4} className="text-end">
                    <Button 
                        style={{
                            backgroundColor: "#007bff",
                            border: "none",
                            padding: "8px 15px",
                            borderRadius: "5px"
                        }}
                        onClick={() => navigate("/add-social")}
                    >
                        ➕ Add Social
                    </Button>
                </Col>
            </Row>

            {/* 🔹 Socials Table */}
            <Row>
                <Table bordered hover className="mt-2 text-center">
                    <thead>
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Link / Scanner</th>
                            <th>Status</th>
                            <th>Added On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {socials.length > 0 ? (
                            socials.map((social, i) => (
                                <tr key={social._id}>
                                    <td>{i + 1}</td>
                                    <td>{social.name}</td>
                                    <td>
                                        {social.link ? (
                                            <a href={social.link} target="_blank" rel="noopener noreferrer">
                                                🔗 Open Link
                                            </a>
                                        ) : (
                                            <Button 
                                                variant="light" 
                                                size="sm"
                                                onClick={() => {
                                                    setScannerImage(social.scanner);
                                                    setShowScannerModal(true);
                                                }}
                                            >
                                                🖼️ View Scanner
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button 
                                            style={{
                                                backgroundColor: social.status === "Active" ? "#28a745" : "#dc3545",
                                                color: "white",
                                                border: "none",
                                                padding: "5px 10px",
                                                borderRadius: "5px"
                                            }}
                                            onClick={() => toggleStatus(social._id, social.status)}
                                        >
                                            {social.status}
                                        </Button>
                                    </td>
                                    <td>{new Date(social.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <Button 
                                            style={{ backgroundColor: "#17a2b8", border: "none", padding: "5px 8px", margin: "0 5px" }}
                                            onClick={() => navigate(`/view-social/${social._id}`)}
                                        >
                                            <FaEye />
                                        </Button>
                                        <Button 
                                            style={{ backgroundColor: "#ffc107", border: "none", padding: "5px 8px", margin: "0 5px" }}
                                            onClick={() => navigate(`/edit-social/${social._id}`)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button 
                                            style={{ backgroundColor: "#dc3545", border: "none", padding: "5px 8px", margin: "0 5px", color: "white" }}
                                            onClick={() => handleDelete(social._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No Socials Found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>

            {/* 🔹 Scanner Modal */}
            <Modal show={showScannerModal} onHide={() => setShowScannerModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>QR Scanner</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {scannerImage && <img src={scannerImage} alt="QR Scanner" style={{ width: "100%", maxWidth: "300px" }} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowScannerModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Social;

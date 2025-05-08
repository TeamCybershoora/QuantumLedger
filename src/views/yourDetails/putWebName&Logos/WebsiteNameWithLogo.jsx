import { Container, Button, Table, Row, Form, Col, Modal } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function WebsiteNameWithLogo() {
    const [websites, setWebsites] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [logoImage, setLogoImage] = useState(null);
    const [showLogoModal, setShowLogoModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newWebsite, setNewWebsite] = useState({ name: "", logo: null });
    const [editWebsite, setEditWebsite] = useState({ id: "", name: "", logo: null, status: "" });

    useEffect(() => {
        axios.get('http://localhost:3002/listWebsites', { params: { search: searchInput } })
            .then((res) => setWebsites(res.data.data))
            .catch(() => toast.error("Something went wrong"));
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
                axios.delete(`http://localhost:3002/deleteWebsite/${id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Website entry deleted.", "success");
                        setRefresh(prev => !prev);
                    })
                    .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
            }
        });
    }

    function toggleStatus(id) {
        const activeWebsite = websites.find(site => site.status === "Active");

        if (activeWebsite && activeWebsite._id !== id) {
            toast.error("Only one website can be active at a time. Deactivate the existing one first.");
            return;
        }

        axios.put(`http://localhost:3002/updateWebsiteStatus`, { id })
            .then(() => {
                setRefresh((prev) => !prev);
                toast.success("Status updated successfully");
            })
            .catch(() => toast.error("Failed to update status"));
    }    

    function handleAddWebsite() {
        const activeWebsite = websites.find(site => site.status === "Active");
        if (activeWebsite) {
            toast.error("Only one website can be active at a time. Deactivate the existing one first.");
            return;
        }

        if (!newWebsite.name || !newWebsite.logo) {
            toast.error("Please provide both website name and logo.");
            return;
        }

        const formData = new FormData();
        formData.append("name", newWebsite.name);
        formData.append("logo", newWebsite.logo);

        axios.post("http://localhost:3002/addWebsite", formData)
            .then(() => {
                toast.success("Website added successfully!");
                setShowAddModal(false);
                setRefresh(prev => !prev);
                setNewWebsite({ name: "", logo: null });
            })
            .catch(() => toast.error("Failed to add website."));
    }

    function handleEditWebsite() {
        if (!editWebsite.name) {
            toast.error("Website name cannot be empty.");
            return;
        }

        const formData = new FormData();
        formData.append("name", editWebsite.name);
        if (editWebsite.logo) {
            formData.append("logo", editWebsite.logo);
        }

        axios.put(`http://localhost:3002/editWebsite/${editWebsite.id}`, formData)
            .then(() => {
                toast.success("Website updated successfully!");
                setShowEditModal(false);
                setRefresh(prev => !prev);
            })
            .catch(() => toast.error("Failed to update website."));
    }

    return (
        <Container>
            <ToastContainer position="top-right" autoClose={3000} />

            <Row className="mb-2 align-items-center">
                <Col md={8}>
                    <Form.Control
                        type="text"
                        placeholder="Search Websites"
                        value={searchInput}
                        onChange={handleSearch}
                    />
                </Col>
                <Col md={4} className="text-end">
                    <Button onClick={() => setShowAddModal(true)}>➕ Add Website</Button>
                </Col>
            </Row>

            <Row>
                <Table bordered hover className="mt-2 text-center">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Website Name</th>
                            <th>Logo</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {websites.length > 0 ? (
                            websites.map((website, i) => (
                                <tr key={website._id}>
                                    <td>{i + 1}</td>
                                    <td>{website.name}</td>
                                    <td>
                                        <Button variant="light" size="sm"
                                            onClick={() => {
                                                setLogoImage(website.logo);
                                                setShowLogoModal(true);
                                            }}>
                                            <FaEye /> View
                                        </Button>
                                    </td>
                                    <td>
                                        <Button 
                                            style={{ backgroundColor: website.status === "Active" ? "green" : "red", color: "white" }}
                                            onClick={() => toggleStatus(website._id)}
                                        >
                                            {website.status}
                                        </Button>
                                    </td>
                                    <td>
                                        <Button style={{ backgroundColor: "#ffc107", border: "none", margin: "0 5px" }} 
                                            onClick={() => {
                                                setEditWebsite({ id: website._id, name: website.name, status: website.status });
                                                setShowEditModal(true);
                                            }}>
                                            <FaEdit />
                                        </Button>
                                        <Button style={{ backgroundColor: "#dc3545", border: "none", margin: "0 5px", color: "white" }}
                                            onClick={() => handleDelete(website._id)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No Websites Found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>

            {/* Add Website Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Website</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Website Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Website Logo</Form.Label>
                        <Form.Control type="file" onChange={(e) => setNewWebsite({ ...newWebsite, logo: e.target.files[0] })} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddWebsite}>Add</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Website Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Website</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Website Name</Form.Label>
                        <Form.Control type="text" value={editWebsite.name} onChange={(e) => setEditWebsite({ ...editWebsite, name: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Website Logo</Form.Label>
                        <Form.Control type="file" onChange={(e) => setEditWebsite({ ...editWebsite, logo: e.target.files[0] })} />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEditWebsite}>Update</Button>
                </Modal.Footer>
            </Modal>
            {/* View Logo Modal */}
            <Modal show={showLogoModal} onHide={() => setShowLogoModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Website Logo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {logoImage ? (
                        <img src={logoImage} alt="Website Logo" style={{ width: "100%", maxHeight: "300px" }} />
                    ) : (
                        <p>No Logo Available</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default WebsiteNameWithLogo;

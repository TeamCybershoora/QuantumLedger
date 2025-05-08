import { Container, Button, Table, Row, Form, Col, Modal } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa"; // ⬅️ FaEdit added
import Swal from "sweetalert2";

function BgImages() {
    const [images, setImages] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [newImageName, setNewImageName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3002/listBgImages", { params: { search: searchInput } })
            .then(res => setImages(res.data.data))
            .catch(() => toast.error("Failed to load images"));
    }, [searchInput, refresh]);

    function handleSearch(e) {
        setSearchInput(e.target.value);
    }

    function handleImageUpload(e) {
        setNewImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    function openModalForNew() {
        setShowModal(true);
        setNewImage(null);
        setNewImageName("");
        setImagePreview(null);
        setIsEditMode(false);
        setEditId(null);
    }

    function openModalForEdit(img) {
        setShowModal(true);
        setNewImage(null);
        setImagePreview(img.imageUrl);
        setNewImageName(img.name);
        setIsEditMode(true);
        setEditId(img._id);
    }

    function uploadBgImage() {
        if (!newImageName.trim()) {
            toast.error("Please enter an image name!");
            return;
        }

        const formData = new FormData();
        if (newImage) formData.append("image", newImage);
        formData.append("name", newImageName);

        const url = isEditMode
            ? `http://localhost:3002/updateBgImage/${editId}`
            : "http://localhost:3002/addBgImage";

        axios.post(url, formData)
            .then(() => {
                toast.success(isEditMode ? "Image updated!" : "Image uploaded!");
                setShowModal(false);
                setRefresh(prev => !prev);
                setNewImage(null);
                setNewImageName("");
                setImagePreview(null);
                setIsEditMode(false);
                setEditId(null);
            })
            .catch(() => toast.error(isEditMode ? "Failed to update image" : "Failed to upload image"));
    }

    function deleteBgImage(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "This will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3002/deleteBgImage/${id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Image deleted.", "success");
                        setRefresh(prev => !prev);
                    })
                    .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
            }
        });
    }

    function toggleImageStatus(id) {
        axios.put("http://localhost:3002/updateBgImageStatus", { id })
            .then(() => {
                setRefresh(prev => !prev);
                toast.success("Status updated!");
            })
            .catch(() => toast.error("Failed to update status"));
    }

    return (
        <Container>
            <ToastContainer position="top-right" autoClose={3000} />

            <Row className="mb-2 align-items-center">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Search Images"
                        value={searchInput}
                        onChange={handleSearch}
                    />
                </Col>
                <Col md={6} className="text-end">
                    <Button onClick={openModalForNew}>➕ Upload Image</Button>
                </Col>
            </Row>

            <Table bordered hover className="mt-2 text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Image Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {images.length > 0 ? images.map((img, i) => (
                        <tr key={img._id}>
                            <td>{i + 1}</td>
                            <td>{img.name || "N/A"}</td>
                            <td>
                                <img src={img.imageUrl} alt="Bg" style={{ width: "100px", height: "50px" }} />
                            </td>
                            <td>
                                <Button
                                    style={{ backgroundColor: img.status === "Active" ? "green" : "red", color: "white" }}
                                    onClick={() => toggleImageStatus(img._id)}
                                >
                                    {img.status}
                                </Button>
                            </td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => openModalForEdit(img)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" onClick={() => deleteBgImage(img._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" className="text-center">No Images Found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? "Edit Image" : "Upload Image"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Image Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newImageName}
                            onChange={(e) => setNewImageName(e.target.value)}
                            placeholder="Enter image name"
                        />
                    </Form.Group>
                    <Form.Control type="file" onChange={handleImageUpload} />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100%", marginTop: "10px" }} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={uploadBgImage}>{isEditMode ? "Update" : "Upload"}</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default BgImages;

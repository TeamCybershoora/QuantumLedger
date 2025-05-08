import { Container, Button, Table, Row, Form, Col } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaEye } from "react-icons/fa"; // ✅ Icons for Edit & View
import Swal from "sweetalert2";  // ✅ Install via: npm install sweetalert2

function Features() {
    const [features, setFeatures] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const featuresPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            url: 'http://localhost:3002/listFeatures',
            method: 'get',
            params: {
                search: searchInput,
                page: currentPage,
                limit: featuresPerPage,
            },
        })
        .then((res) => {
            setFeatures(res.data.data);
            setTotalPages(res.data.totalPages);
        })
        .catch(() => {
            toast.error("Something went wrong"); // ✅ Toast on error
        });
    }, [searchInput, refresh, currentPage]);

    function handleSearch(e) {
        setSearchInput(e.target.value);
    }

    function toggleStatus(id) {
        axios.put(`http://localhost:3002/updateFeatureStatus`, { id })
            .then(() => {
                setRefresh((prev) => !prev);
                toast.success("Status updated successfully");
            })
            .catch(() => toast.error("Failed to update status"));
    }    

function handleDelete(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:3002/deleteFeature/${id}`)
                .then(() => {
                    Swal.fire("Deleted!", "Feature has been deleted.", "success");
                    setTimeout(() => {
                        window.location.reload();  // ✅ Reload page to fetch updated data
                    }, 1000);
                })
                .catch(() => Swal.fire("Error!", "Failed to delete feature.", "error"));
        }
    });
}

    
    return (
        <Container>
            {/* 🔹 Toast Messages */}
            <ToastContainer position="top-right" autoClose={3000} />

            {/* 🔹 Top Section (Search + Add Feature) */}
            <Row className="mb-2 align-items-center">
                <Col md={8}>
                    <Form.Group controlId="searchInput">
                        <Form.Control
                            type="text"
                            placeholder="Search Features"
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
                            transition: "all 0.3s ease",
                            borderRadius: "5px"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
                        onClick={() => navigate("/add-feature")}
                    >
                        ➕ Add Feature
                    </Button>
                </Col>
            </Row>

            {/* 🔹 Features Table */}
            <Row>
                <Table bordered hover className="mt-2" style={{ textAlign: "center" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                            <th>S.No.</th>
                            <th>Feature Name</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.length > 0 ? (
                            features.map((feature, i) => (
                                <tr key={feature._id}>
                                    <td style={{ width: "30px" }}>{(currentPage - 1) * featuresPerPage + i + 1}</td>
                                    <td style={{ width: "190px" }}>{feature.name}</td>
                                    <td style={{ 
                                        whiteSpace: "nowrap", 
                                        overflow: "hidden", 
                                        textOverflow: "ellipsis", 
                                        maxWidth: "150px" 
                                    }}>
                                        {feature.description}
                                    </td>
                                    <td style={{ width: "100px" }}>{feature.type}</td>
                                    {/* ✅ Status as Button (Toggle) */}
                                    <td style={{ width: "110px" }}>
                                        <Button
                                            style={{
                                                border: "none",
                                                padding: "5px 10px",
                                                fontSize: "14px",
                                                width: "80px",
                                                backgroundColor: feature.status === "Active" ? "#28a745" : "#dc3545",
                                                color: "white",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => toggleStatus(feature._id)}
                                        >
                                            {feature.status}
                                        </Button>
                                    </td>
                                    {/* ✅ Action Buttons (Edit & View) */}
                                    <td style={{ width: "150px" }}>
                                        <Button 
                                            style={{
                                                backgroundColor: "#17a2b8",
                                                border: "none",
                                                padding: "5px 8px",
                                                margin: "0 5px",
                                                fontSize: "14px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                transition: "0.3s"
                                            }}
                                            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                                            onMouseLeave={(e) => e.target.style.opacity = "1"}
                                            onClick={() => navigate(`/view-feature/${feature._id}`)}
                                        >
                                            <FaEye />
                                        </Button>
                                        <Button 
                                            style={{
                                                backgroundColor: "#ffc107",
                                                border: "none",
                                                padding: "5px 8px",
                                                margin: "0 5px",
                                                fontSize: "14px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                transition: "0.3s"
                                            }}
                                            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                                            onMouseLeave={(e) => e.target.style.opacity = "1"}
                                            onClick={() => navigate(`/edit-feature/${feature._id}`)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button 
                                            style={{
                                                backgroundColor: "#dc3545",  // Red color for delete
                                                border: "none",
                                                padding: "5px 8px",
                                                margin: "0 5px",
                                                fontSize: "14px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                                color: "white"
                                            }}
                                            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                                            onMouseLeave={(e) => e.target.style.opacity = "1"}
                                            onClick={() => handleDelete(feature._id)}
                                        >
                                            🗑️
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No Features Found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>

            {/* 🔹 Pagination */}
            <div className="d-flex justify-content-between mt-3">
                <Button
                    style={{
                        backgroundColor: "#6c757d",
                        border: "none",
                        padding: "8px 15px",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    style={{
                        backgroundColor: "#6c757d",
                        border: "none",
                        padding: "8px 15px",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </Container>
    );
}

export default Features;

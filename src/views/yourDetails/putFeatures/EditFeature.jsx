import { Container, Button, Form, Row, Col, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const iconsList = ["🔥", "🚀", "💡", "🌟", "🎯", "🛠", "📌", "💻", "📱", "📊",
    "⚙️", "🔗", "🔒", "🌍", "💬", "📢", "✅", "❌", "📎", "⚡",
    "🎨", "🔍", "🔑", "🗂", "📝", "🧩", "📆", "🛡", "📡", "⚖️"];

function EditFeature() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [featureData, setFeatureData] = useState({
        name: "",
        description: "",
        status: "Active",
        type: "image",
        image: null,
        icon: "",
    });

    // ✅ Fetch Feature Data from Backend
    useEffect(() => {
        axios.get(`http://localhost:3002/feature/${id}`)
            .then((res) => setFeatureData(res.data))
            .catch(() => toast.error("❌ Failed to fetch feature!"));
    }, [id]);

    // ✅ Handle Change Events
    function handleChange(e) {
        setFeatureData({ ...featureData, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {
        setFeatureData({ ...featureData, image: e.target.files[0] });
    }

    function handleIconSelect(icon) {
        setFeatureData({ ...featureData, icon });
    }

    // ✅ Handle Form Submission
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", featureData.name);
        formData.append("description", featureData.description);
        formData.append("status", featureData.status);
        formData.append("type", featureData.type);

        if (featureData.type === "image" && featureData.image instanceof File) {
            formData.append("image", featureData.image);
        } else if (featureData.type === "icon") {
            formData.append("icon", featureData.icon);
        }

        axios.put(`http://localhost:3002/update/feature/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
            toast.success("✅ Feature updated successfully!");
            navigate("/features")
        })
        .catch(() => toast.error("❌ Failed to update feature!"));
    }

    return (
        <Container fluid className="px-2">
            <ToastContainer position="top-right" autoClose={3000} />
            <Row className="justify-content-start">
                <Col md={12}>
                    <h3 className="mb-4">Edit Feature</h3>
                    <Form onSubmit={handleSubmit}>

                        {/* ✅ Feature Name */}
                        <Form.Group controlId="featureName">
                            <Form.Label>Feature Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter feature name" 
                                name="name" 
                                value={featureData.name} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        {/* ✅ Feature Description */}
                        <Form.Group controlId="featureDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Enter feature description" 
                                name="description" 
                                value={featureData.description} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        {/* ✅ Feature Type (Image / Icon) */}
                        <Form.Group className="mt-3">
                            <Form.Label>Feature Type</Form.Label>
                            <div className="d-flex gap-2">
                                <Button 
                                    variant={featureData.type === "image" ? "primary" : "outline-primary"} 
                                    onClick={() => setFeatureData({ ...featureData, type: "image", icon: "" })}
                                >
                                    With Image 📷
                                </Button>
                                <Button 
                                    variant={featureData.type === "icon" ? "primary" : "outline-primary"} 
                                    onClick={() => setFeatureData({ ...featureData, type: "icon", image: null })}
                                >
                                    With Icon 🎨
                                </Button>
                            </div>
                        </Form.Group>

                        {/* ✅ Image Upload Section */}
                        {featureData.type === "image" && (
                            <Form.Group controlId="featureImage" className="mt-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                                {featureData.image && (
                                   <Image 
                                   src={
                                       featureData.image instanceof File 
                                       ? URL.createObjectURL(featureData.image) // ✅ Show selected image preview
                                       : `${featureData.image}` // ✅ Show existing image
                                   } 
                                   className="mt-2" 
                                   height="100" 
                                   alt="Uploaded Preview" 
                               />
                               
                                
                                )}
                            </Form.Group>
                        )}

                        {/* ✅ Icon Selection Section */}
                        {featureData.type === "icon" && (
                            <Form.Group controlId="featureIcon" className="mt-3">
                                <Form.Label>Select Icon</Form.Label>
                                <div className="d-flex flex-wrap gap-2">
                                    {iconsList.map((icon, index) => (
                                        <Button 
                                            key={index} 
                                            variant={featureData.icon === icon ? "primary" : "outline-secondary"} 
                                            className="p-2" 
                                            onClick={() => handleIconSelect(icon)}
                                        >
                                            {icon}
                                        </Button>
                                    ))}
                                </div>

                                {/* ✅ Selected Icon Display */}
                                <div className="mt-3">
                                    <strong>Selected Icon: </strong> 
                                    <span style={{ fontSize: "24px" }}>{featureData.icon || "❌ None Selected"}</span>
                                </div>
                            </Form.Group>
                        )}

                        {/* ✅ Buttons */}
                        <div className="d-flex justify-content-between mt-4">
                            <Button type="submit" variant="primary">Update Feature</Button>
                            <Button variant="secondary" onClick={() => navigate("/features")}>Cancel</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditFeature;

import { Container, Button, Form, Row, Col, Image, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔹 50+ Icons List
const iconsList = [
    "🔥", "🚀", "💡", "🌟", "🎯", "🛠", "📌", "💻", "📱", "📊",
    "⚙️", "🔗", "🔒", "🌍", "💬", "📢", "✅", "❌", "📎", "⚡",
    "🎨", "🔍", "🔑", "🗂", "📝", "🧩", "📆", "🛡", "📡", "⚖️",
    "🎵", "🎬", "🎲", "🎮", "🏆", "🎖", "📜", "🛍", "📌", "🗃",
    "🖥", "📡", "🌎", "🔔", "💬", "🛠", "🎤", "🗳", "📚", "🔮"
];

function AddFeature() {
    const [featureData, setFeatureData] = useState({
        name: "",
        description: "",
        status: "Active",
        type: "image", // 🔹 "image" or "icon"
        image: null,
        icon: "",
    });

    const navigate = useNavigate();

    // 🔹 Input Change Handler
    function handleChange(e) {
        setFeatureData({ ...featureData, [e.target.name]: e.target.value });
    }

    // 🔹 File Upload Handler
    function handleFileChange(e) {
        const file = e.target.files[0];
        setFeatureData({ ...featureData, image: file });
    }

    // 🔹 Icon Selection Handler
    function handleIconSelect(icon) {
        setFeatureData({ ...featureData, icon });
    }

    // 🔹 Form Submit Handler
    function handleSubmit(e) {
        e.preventDefault();

        if (!featureData.name || !featureData.description) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", featureData.name);
        formData.append("description", featureData.description);
        formData.append("status", featureData.status);
        formData.append("type", featureData.type);

        if (featureData.type === "image" && featureData.image) {
            formData.append("image", featureData.image);
        } else if (featureData.type === "icon") {
            formData.append("icon", featureData.icon);
        }
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], ":", pair[1]);
        // }
        axios.post("http://localhost:3002/addFeature", formData)
            .then(() => {
                toast.success("Feature added successfully!");
                setTimeout(() => navigate("/features"), 2000);
            })
            .catch(() => {
                toast.error("Failed to add feature!");
            });
    }

    return (
        <Container fluid className="px-2">
            {/* 🔹 Toast Messages */}
            <ToastContainer position="top-right" autoClose={3000} />

            <Row className="justify-content-start"> 
                <Col md={12}>
                    <h3 className="mb-4">Add New Feature</h3>
                    <Form onSubmit={handleSubmit}>
                        
                        {/* 🔹 Feature Name */}
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

                        {/* 🔹 Description */}
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

                        {/* 🔹 Select Feature Type */}
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

                        {/* 🔹 Show Image Upload Field if "With Image" is selected */}
                        {featureData.type === "image" && (
                            <Form.Group controlId="featureImage" className="mt-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                                {featureData.image && (
                                    <Image
                                        src={URL.createObjectURL(featureData.image)}
                                        className="mt-2"
                                        height="100"
                                        alt="Uploaded Preview"
                                    />
                                )}
                            </Form.Group>
                        )}

                        {/* 🔹 Show Icon Picker if "With Icon" is selected */}
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
                            </Form.Group>
                        )}

                        {/* 🔹 Status Toggle Button */}
                        <Form.Group className="mt-3">
                            <Form.Label>Status</Form.Label>
                            <div className="d-flex gap-2">
                                <Button
                                    variant={featureData.status === "Active" ? "success" : "outline-success"}
                                    onClick={() => setFeatureData({ ...featureData, status: "Active" })}
                                >
                                    ✅ Active
                                </Button>
                                <Button
                                    variant={featureData.status === "Inactive" ? "danger" : "outline-danger"}
                                    onClick={() => setFeatureData({ ...featureData, status: "Inactive" })}
                                >
                                    ❌ Inactive
                                </Button>
                            </div>
                        </Form.Group>

                        {/* 🔹 Buttons */}
                        <div className="d-flex justify-content-between mt-4">
                            <Button type="submit" variant="primary">Add Feature</Button>
                            <Button variant="secondary" onClick={() => navigate("/features")}>Cancel</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddFeature;

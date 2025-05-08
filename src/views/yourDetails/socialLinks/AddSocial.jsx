import { Container, Button, Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Only Communication Platforms in Dropdown
const socialPlatforms = [
    // ✅ Messaging & Collaboration (Mostly used in companies)
    "Slack", "Microsoft Teams", "Skype", "Google Chat", "Discord", "Zoom",  
    "WhatsApp", "Telegram", "Signal", "Viber", "WeChat",

    // ✅ Social Media & Community Platforms (With Group Features)
    "Facebook", "Instagram", "Twitter (X)", "Reddit", "Mastodon", "Clubhouse"
];

function AddSocial() {
    const [socialData, setSocialData] = useState({
        name: socialPlatforms[0], // ✅ Default: First platform
        link: "",
        scanner: null,
        status: "Active",
    });

    const navigate = useNavigate();

    // 🔹 Input Change Handler
    function handleChange(e) {
        setSocialData({ ...socialData, [e.target.name]: e.target.value });
    }

    // 🔹 File Upload Handler (For QR Code)
    function handleFileChange(e) {
        const file = e.target.files[0];
        setSocialData({ ...socialData, scanner: file });
    }

    // 🔹 Form Submit Handler
    function handleSubmit(e) {
        e.preventDefault();

        if (!socialData.link && !socialData.scanner) {
            toast.error("At least one (Link or QR Code) is required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", socialData.name);
        formData.append("status", socialData.status);

        if (socialData.link) {
            formData.append("link", socialData.link);
        }
        if (socialData.scanner) {
            formData.append("scanner", socialData.scanner);
        }

        axios.post("http://localhost:3002/addSocial", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(() => {
            toast.success("Social media added successfully!");
            setTimeout(() => navigate("/socialLinks"), 2000);
        })
        .catch((err) => {
            console.error("Upload Error:", err.response?.data || err);
            toast.error("Failed to add social media!");
        });
    }

    return (
        <Container fluid className="px-2">
            <ToastContainer position="top-right" autoClose={3000} />

            <Row className="justify-content-start">
                <Col md={12}>
                    <h3 className="mb-4">Add Social Media</h3>
                    <Form onSubmit={handleSubmit}>
                        
                        {/* 🔹 Select Social Media Platform */}
                        <Form.Group controlId="socialName">
                            <Form.Label>Social Media Platform</Form.Label>
                            <Form.Select
                                name="name"
                                value={socialData.name}
                                onChange={handleChange}
                            >
                                {socialPlatforms.map((platform) => (
                                    <option key={platform} value={platform}>
                                        {platform}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* 🔹 Input for Link */}
                        <Form.Group controlId="socialLink" className="mt-3">
                            <Form.Label>Social Media Link (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter link (https://example.com)"
                                name="link"
                                value={socialData.link}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* 🔹 Upload QR Code */}
                        <Form.Group controlId="socialQR" className="mt-3">
                            <Form.Label>Upload QR Code (Optional)</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                            {socialData.scanner && (
                                <Image
                                    src={URL.createObjectURL(socialData.scanner)}
                                    className="mt-2"
                                    height="100"
                                    alt="QR Preview"
                                />
                            )}
                        </Form.Group>

                        {/* 🔹 Status Toggle Button */}
                        <Form.Group className="mt-3">
                            <Form.Label>Status</Form.Label>
                            <div className="d-flex gap-2">
                                <Button
                                    variant={socialData.status === "Active" ? "success" : "outline-success"}
                                    onClick={() => setSocialData({ ...socialData, status: "Active" })}
                                >
                                    ✅ Active
                                </Button>
                                <Button
                                    variant={socialData.status === "Inactive" ? "danger" : "outline-danger"}
                                    onClick={() => setSocialData({ ...socialData, status: "Inactive" })}
                                >
                                    ❌ Inactive
                                </Button>
                            </div>
                        </Form.Group>

                        {/* 🔹 Buttons */}
                        <div className="d-flex justify-content-between mt-4">
                            <Button type="submit" variant="primary">Add Social</Button>
                            <Button variant="secondary" onClick={() => navigate("/socialLinks")}>Cancel</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddSocial;

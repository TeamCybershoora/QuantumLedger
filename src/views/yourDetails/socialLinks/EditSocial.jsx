import { Container, Button, Form, Row, Col, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Allowed Social Platforms
const socialPlatforms = ["WhatsApp", "Telegram", "Discord", "Slack", "Signal"];

function EditSocial() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [socialData, setSocialData] = useState({
        name: "",
        link: "",
        scanner: null,
        status: "Active",
    });

    // ✅ Fetch Existing Social Media Data
    useEffect(() => {
        axios.get(`http://localhost:3002/social/${id}`)
            .then((res) => setSocialData(res.data))
            .catch(() => toast.error("❌ Failed to fetch social media details!"));
    }, [id]);

    // ✅ Handle Input Changes
    function handleChange(e) {
        setSocialData({ ...socialData, [e.target.name]: e.target.value });
    }

    // ✅ Handle File Upload
    function handleFileChange(e) {
        setSocialData({ ...socialData, scanner: e.target.files[0] });
    }

    // ✅ Handle Form Submission
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
        if (socialData.scanner instanceof File) {
            formData.append("scanner", socialData.scanner);
        }

        axios.put(`http://localhost:3002/update/social/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
            toast.success("✅ Social media updated successfully!");
             navigate("/socialLinks")
        })
        .catch(() => toast.error("❌ Failed to update social media!"));
    }

    return (
        <Container fluid className="px-2">
            <ToastContainer position="top-right" autoClose={3000} />
            <Row className="justify-content-start">
                <Col md={12}>
                    <h3 className="mb-4">Edit Social Media</h3>
                    <Form onSubmit={handleSubmit}>
                        
                        {/* 🔹 Select Social Media Platform */}
                        <Form.Group controlId="socialName">
                            <Form.Label>Social Media Platform</Form.Label>
                            <Form.Select name="name" value={socialData.name} onChange={handleChange}>
                                {socialPlatforms.map((platform) => (
                                    <option key={platform} value={platform}>{platform}</option>
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
                                value={socialData.link || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* 🔹 Upload QR Code */}
                        <Form.Group controlId="socialQR" className="mt-3">
                            <Form.Label>Upload QR Code (Optional)</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                            {socialData.scanner && (
                                <Image
                                    src={
                                        socialData.scanner instanceof File
                                            ? URL.createObjectURL(socialData.scanner) // Show new upload preview
                                            : socialData.scanner // Show existing QR image from backend
                                    }
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
                            <Button type="submit" variant="primary">Update Social</Button>
                            <Button variant="secondary" onClick={() => navigate("/socialLinks")}>Cancel</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditSocial;

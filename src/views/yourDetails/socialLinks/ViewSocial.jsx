import { Container, Row, Col, Image, Card, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewSocial() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [socialData, setSocialData] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch Social Media Data from Backend
    useEffect(() => {
        axios.get(`http://localhost:3002/social/${id}`)
            .then((res) => {
                setSocialData(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("❌ Failed to fetch social media details!");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container fluid className="px-3 py-4 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading social media details...</p>
            </Container>
        );
    }

    if (!socialData) {
        return (
            <Container fluid className="px-3 py-4 text-center">
                <h5 className="text-danger">❌ Social Media Entry Not Found!</h5>
                <Button variant="secondary" className="mt-3" onClick={() => navigate("/socialLinks")}>
                    ⬅️ Back to Social Links
                </Button>
            </Container>
        );
    }

    return (
        <Container fluid className="px-3 py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <Row>
                <Col md={12}>
                    <Card className="shadow-sm p-4 w-100">
                        <h3 className="mb-4 text-primary">Social Media Details</h3>

                        <Card.Body>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <h5 className="fw-bold">Name:</h5>
                                    <p className="text-muted">{socialData.name}</p>
                                </Col>
                                <Col md={6}>
                                    <h5 className="fw-bold">Status:</h5>
                                    <p className={`badge ${socialData.status === "Active" ? "bg-success" : "bg-danger"}`}>
                                        {socialData.status}
                                    </p>
                                </Col>
                            </Row>

                            {/* ✅ Show Link if Exists */}
                            {socialData.link && (
                                <div className="mt-3">
                                    <h5 className="fw-bold">Social Media Link:</h5>
                                    <a href={socialData.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                        {socialData.link}
                                    </a>
                                </div>
                            )}

                            {/* ✅ Show QR Code if Exists */}
                            {socialData.scanner && (
                                <div className="mt-3">
                                    <h5 className="fw-bold">QR Code:</h5>
                                    <Image 
                                        src={socialData.scanner} 
                                        className="rounded shadow-sm mt-2" 
                                        height="140" 
                                        alt="QR Code"
                                    />
                                </div>
                            )}
                        </Card.Body>
                    </Card>

                    {/* ✅ Back Button */}
                    <div className="mt-4">
                        <Button variant="secondary" size="lg" className="w-100" onClick={() => navigate("/socialLinks")}>
                            ⬅️ Back to Social Links
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ViewSocial;

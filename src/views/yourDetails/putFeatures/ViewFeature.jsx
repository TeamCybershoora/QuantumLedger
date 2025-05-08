import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewFeature() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [featureData, setFeatureData] = useState({
        name: "",
        description: "",
        status: "",
        type: "",
        image: "",
        icon: "",
    });

    // ✅ Fetch Feature Data from Backend
    useEffect(() => {
        axios.get(`http://localhost:3002/feature/${id}`)
            .then((res) => setFeatureData(res.data))
            .catch(() => toast.error("❌ Failed to fetch feature!"));
    }, [id]);

    return (
        <Container fluid className="px-3 py-4">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <Row>
                <Col md={12}>
                    <Card className="shadow-sm p-4 w-100">
                        <h3 className="mb-4 text-primary">Feature Details</h3>

                        <Card.Body>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <h5 className="fw-bold">Name:</h5>
                                    <p className="text-muted">{featureData.name}</p>
                                </Col>
                                <Col md={6}>
                                    <h5 className="fw-bold">Status:</h5>
                                    <p className={`badge ${featureData.status === "Active" ? "bg-success" : "bg-danger"}`}>
                                        {featureData.status}
                                    </p>
                                </Col>
                            </Row>

                            <h5 className="fw-bold">Description:</h5>
                            <p className="text-muted">{featureData.description}</p>

                            <h5 className="fw-bold">Type:</h5>
                            <p className="text-muted">{featureData.type === "image" ? "Image" : "Icon"}</p>

                            {featureData.type === "image" && featureData.image && (
                                <div className="mt-3">
                                    <h5 className="fw-bold">Feature Image:</h5>
                                    <Image 
                                        src={`${featureData.image}`} 
                                        className="rounded shadow-sm mt-2" 
                                        height="140" 
                                        alt="Feature Image" 
                                    />
                                </div>
                            )}

                            {featureData.type === "icon" && featureData.icon && (
                                <div className="mt-3">
                                    <h5 className="fw-bold">Feature Icon:</h5>
                                    <span className="fs-1">{featureData.icon}</span>
                                </div>
                            )}
                        </Card.Body>
                    </Card>

                    {/* ✅ Back Button */}
                    <div className="mt-4">
                        <Button variant="secondary" size="lg" className="w-100" onClick={() => navigate("/features")}>
                        ⬅️ Back to Features
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ViewFeature;

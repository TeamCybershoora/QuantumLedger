import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert, Card } from "react-bootstrap";

const Contact = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get("http://localhost:3002/inquiries");
        setInquiries(res.data);
      } catch (err) {
        setError("Failed to load inquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold">📥 User Inquiries</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && inquiries.length === 0 && (
        <Alert variant="info">No inquiries found.</Alert>
      )}

      {!loading && !error && inquiries.length > 0 && (
        <Card className="shadow border-0">
          <Table responsive striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>S.No.</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq, idx) => (
                <tr key={inq._id}>
                  <td style={{width:"5%"}}>{idx + 1}</td>
                  <td style={{width:"10%"}}>{inq.name}</td>
                  <td style={{width:"20%"}}>{inq.email}</td>
                  <td style={{width:"30%"}}>{inq.message}</td>
                  <td style={{width:"20%"}}>{new Date(inq.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
  );
};

export default Contact;

import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const Helper = () => {
  const [helpers, setHelpers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // For Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchHelpers();
  }, [refresh]);

  const fetchHelpers = async () => {
    try {
      const res = await axios.get("http://localhost:3002/getHelpers");
      setHelpers(res.data);
    } catch (err) {
      console.error("Error fetching helpers:", err);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3002/deleteHelper/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Record has been deleted.", "success");
            setRefresh((prev) => !prev);
          })
          .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
      }
    });
  };

  const handleEdit = (helper) => {
    setSelectedHelper(helper);
    setLink(helper.data || "");
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3002/updateHelper/${selectedHelper._id}`, {
        data: link,
      });
      setShowModal(false);
      Swal.fire("Updated!", "Link has been updated.", "success");
      setRefresh((prev) => !prev);
    } catch (err) {
      Swal.fire("Error!", "Failed to update.", "error");
    }
  };

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">Helper Social Links</h3>

      <Table bordered hover responsive>
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr className="text-center">
            <th>S.No.</th>
            <th>Name</th>
            <th>Data</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {helpers.length > 0 ? (
            helpers.map((helper, index) => (
              <tr key={helper._id}>
                <td className="text-center text-xl font-bold">{index + 1}</td>
                <td style={{ textTransform: "capitalize" }}>{helper.name}</td>
                <td>
                  {helper.data ? (
                    helper.name.toLowerCase() === "email" ? (
                      helper.data
                    ) : (
                      <a href={helper.data} target="_blank" rel="noreferrer">
                        {helper.data}
                      </a>
                    )
                  ) : (
                    <span style={{ color: "gray", fontStyle: "italic" }}>
                      No data found
                    </span>
                  )}
                </td>
                <td className="text-center text-xl font-bold"> 
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "5px",
                      backgroundColor:
                        helper.status === "Active" ? "#28a745" : "#dc3545",
                      color: "#fff",
                    }}
                  >
                    {helper.status}
                  </span>
                </td>
                <td className="text-center text-xl font-bold">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(helper)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(helper._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No Helpers Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Link for {selectedHelper?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formLink">
            <Form.Label>Enter Link</Form.Label>
            <Form.Control
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={`Enter ${selectedHelper?.name} link`}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Helper;

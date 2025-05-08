import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';

const AdminProfile = () => {
  const [fieldStatus, setFieldStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3002/fields')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFieldStatus(res.data);
        }
      })
      .catch((err) => console.error('Error fetching fields', err))
      .finally(() => setLoading(false));
  }, []);

  const handleModalToggle = () => setShowModal(!showModal);

  const handleAddField = () => {
    if (!selectedField) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a field!' });
      return;
    }

    axios.post('http://localhost:3002/add-field', { fieldName: selectedField })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Field Added!',
          text: `The field "${selectedField}" has been added.`,
        });
        setFieldStatus([...fieldStatus, { fieldName: selectedField, status: 'inactive' }]);
        setSelectedField('');
        setShowModal(false);
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to add field!' });
      });
  };

  const toggleFieldStatus = (fieldName) => {
    axios.patch(`http://localhost:3002/toggle-field-status/${fieldName}`)
      .then((res) => {
        const updated = res.data.updatedField;
        setFieldStatus(fieldStatus.map(field =>
          field.fieldName === fieldName ? updated : field
        ));
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Could not toggle status' });
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Manage User Profile Fields</h2>

      <Button variant="success" onClick={handleModalToggle} className="d-block mx-auto mb-4">
        Add Document
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="fieldSelect">
            <Form.Label>Select a field</Form.Label>
            <Form.Select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="">Select a field</option>
              <option value="tenthDocument">Tenth Document</option>
              <option value="twelfthDocument">Twelfth Document</option>
              <option value="graduationDocument">Graduation Document</option>
              <option value="previousYearResults">Previous Year Results</option>
              <option value="resume">Resume</option>
              <option value="certificates">Certificates</option>
              <option value="experience">Experience</option>
              <option value="skills">Skills</option>
              <option value="preferredJobLocation">Preferred Job Location</option>
              <option value="expectedSalary">Expected Salary</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddField}>Add Field</Button>
          <Button variant="secondary" onClick={handleModalToggle}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* List of Fields */}
      <ListGroup>
        {fieldStatus.length === 0 ? (
            <div className="text-center text-muted">No Data Found</div>
        ) : (
            fieldStatus.map((field) => (
            <ListGroup.Item key={field.fieldName} className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                <strong>{field.fieldName}</strong>
                <span className={`badge mt-1 ${field.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                    {field.status}
                </span>
                </div>
                <Button
                variant={field.status === 'active' ? 'success' : 'danger'}
                onClick={() => toggleFieldStatus(field.fieldName)}
                >
                {field.status === 'active' ? 'Disable' : 'Enable'}
                </Button>
            </ListGroup.Item>
            ))
        )}
        </ListGroup>
    </div>
  );
};

export default AdminProfile;

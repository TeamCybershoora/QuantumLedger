/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { Container, Row, Col, Button, Card, Image, Modal, Form } from 'react-bootstrap';
import { FaUserTie, FaPlus, FaUsers } from 'react-icons/fa';
import chef from '../../assets/chef.jpeg';
import members from '../../assets/members.jpeg';

const initialChefs = [
  { id: 1, name: 'Chef Gordon', mobile: '9876543210', address: 'New York', img: chef },
  { id: 2, name: 'Chef Jamie', mobile: '9123456780', address: 'London', img: chef },
  { id: 3, name: 'Chef Sanjeev', mobile: '9988776655', address: 'Mumbai', img: chef },
  { id: 4, name: 'Chef Nigella', mobile: '9876512345', address: 'Sydney', img: chef },
  { id: 5, name: 'Chef Thomas', mobile: '9112233445', address: 'Paris', img: chef },
  { id: 6, name: 'Chef Heston', mobile: '9234567890', address: 'Tokyo', img: chef },
  { id: 7, name: 'Chef Wolfgang', mobile: '9876543210', address: 'Berlin', img: chef },
  { id: 8, name: 'Chef Rachael', mobile: '9123456780', address: 'Toronto', img: chef },
  { id: 9, name: 'Chef Bobby', mobile: '9988776655', address: 'Dubai', img: chef },
  { id: 10, name: 'Chef Ina', mobile: '9876512345', address: 'Los Angeles', img: chef },
];

const initialStaffMembers = [
  { id: 1, name: 'John Doe', mobile: '9876543210', address: 'USA', img: members },
  { id: 2, name: 'Jane Smith', mobile: '9123456780', address: 'UK', img: members },
  { id: 3, name: 'Alex Brown', mobile: '9988776655', address: 'Canada', img: members },
  { id: 4, name: 'Emma Wilson', mobile: '9876512345', address: 'Australia', img: members },
  { id: 5, name: 'Liam Johnson', mobile: '9112233445', address: 'Germany', img: members },
  { id: 6, name: 'Sophia Davis', mobile: '9234567890', address: 'France', img: members },
  { id: 7, name: 'Mason Garcia', mobile: '9876543210', address: 'Italy', img: members },
  { id: 8, name: 'Olivia Martinez', mobile: '9123456780', address: 'Spain', img: members },
  { id: 9, name: 'Noah Rodriguez', mobile: '9988776655', address: 'Mexico', img: members },
  { id: 10, name: 'Ava Hernandez', mobile: '9876512345', address: 'Brazil', img: members },
  { id: 11, name: 'Isabella Lopez', mobile: '9112233445', address: 'Argentina', img: members },
  { id: 12, name: 'Lucas Gonzalez', mobile: '9234567890', address: 'Chile', img: members },
  { id: 13, name: 'Mia Perez', mobile: '9876543210', address: 'Colombia', img: members },
  { id: 14, name: 'Ethan Wilson', mobile: '9123456780', address: 'Peru', img: members },
  { id: 15, name: 'Charlotte Anderson', mobile: '9988776655', address: 'Venezuela', img: members },
  { id: 16, name: 'James Thomas', mobile: '9876512345', address: 'Ecuador', img: members },
];

function StaffList() {
  const [activeTab, setActiveTab] = useState('chef');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [chefs, setChefs] = useState(initialChefs);
  const [staffMembers, setStaffMembers] = useState(initialStaffMembers);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 15;
    const rotateY = (x - rect.width / 2) / 15;

    if (hoveredCard === id) {
      setTiltStyle({
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      });
    }
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
    setHoveredCard(null);
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    const newItem = {
      id: activeTab === 'chef' ? chefs.length + 1 : staffMembers.length + 1,
      name: newName,
      mobile: newMobile,
      address: newAddress,
      img: activeTab === 'chef' ? chef : members,
    };

    if (activeTab === 'chef') {
      setChefs([...chefs, newItem]);
    } else {
      setStaffMembers([...staffMembers, newItem]);
    }

    setShowModal(false);
    setNewName('');
    setNewMobile('');
    setNewAddress('');
  };

  const renderCards = (list, isMember = false) => (
    <Row className="g-4">
      {list.map((item) => (
        <Col key={item.id} xs={12} sm={6} md={isMember ? 4 : 6} lg={isMember ? 3 : 4}>
          <Card
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseMove={(e) => handleMouseMove(e, item.id)}
            onMouseLeave={handleMouseLeave}
            style={{
              borderRadius: '15px',
              overflow: 'hidden',
              height: isMember ? '230px' : '250px',
              backgroundColor: hoveredCard === item.id ? '#f8f9fa' : '#ffffff',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              ...((hoveredCard === item.id) ? tiltStyle : {}),
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.2rem' }}>
              <Image
                src={item.img}
                roundedCircle
                style={{
                  width: isMember ? '85px' : '100px',
                  height: isMember ? '85px' : '100px',
                  objectFit: 'cover',
                  border: '3px solid #007bff',
                }}
              />
            </div>
            <Card.Body style={{ textAlign: 'center', padding: '1rem' }}>
              <Card.Title
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '0.5rem',
                }}
              >
                {item.name}
              </Card.Title>
              <Card.Text
                style={{
                  fontSize: '0.95rem',
                  color: '#555',
                  marginBottom: '0.25rem',
                }}
              >
                📞 {item.mobile}
              </Card.Text>
              <Card.Text
                style={{
                  fontSize: '0.9rem',
                  color: '#777',
                }}
              >
                📍 {item.address}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Container fluid style={{ backgroundColor: '#F4F6F8', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ display: 'flex', marginBottom: '2rem', justifyContent: 'center', gap: '1rem' }}>
        <Button
          variant={activeTab === 'chef' ? 'primary' : 'outline-primary'}
          onClick={() => handleTabClick('chef')}
          style={{ borderRadius: '30px', minWidth: '120px' }}
        >
          <FaUserTie style={{ marginRight: '8px' }} />
          Chefs
        </Button>
        <Button
          variant={activeTab === 'member' ? 'primary' : 'outline-primary'}
          onClick={() => handleTabClick('member')}
          style={{ borderRadius: '30px', minWidth: '120px' }}
        >
          <FaUsers style={{ marginRight: '8px' }} />
          Members
        </Button>
      </div>

      <Row className="align-items-center mb-4">
        <Col xs={6} style={{ fontSize: '1.2rem', fontWeight: '600', color: '#444' }}>
          {activeTab === 'chef' ? (
            <>
              <FaUserTie style={{ marginRight: '8px', color: '#007bff' }} />
              Total Chefs: {chefs.length}
            </>
          ) : (
            <>
              <FaUsers style={{ marginRight: '8px', color: '#007bff' }} />
              Total Members: {staffMembers.length}
            </>
          )}
        </Col>
        <Col xs={6} style={{ textAlign: 'right' }}>
          <Button
            variant="success"
            style={{ borderRadius: '30px', fontWeight: '500' }}
            onClick={handleAdd}
          >
            <FaPlus style={{ marginRight: '6px' }} />
            {activeTab === 'chef' ? 'Add Chef' : 'Add Member'}
          </Button>
        </Col>
      </Row>

      {activeTab === 'chef' ? renderCards(chefs) : renderCards(staffMembers, true)}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{activeTab === 'chef' ? 'Add Chef' : 'Add Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile"
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default StaffList;

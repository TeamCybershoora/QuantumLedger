import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Modal } from 'react-bootstrap';
import { FaCcPaypal, FaGooglePay, FaPhone } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Payment = () => {
  const MySwal = withReactContent(Swal);
  const [method, setMethod] = useState('card');
  const [showScanner, setShowScanner] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { name: 'Italian Red Sauce Pasta', price: 1387.44, cutlery: 'Without Cutlery', details: 'Extra cheese and spicy level 2' },
    { name: 'Mharaja Burger Meal', price: 387.44, cutlery: 'With Cutlery', details: 'Includes fries and coke' },
    { name: 'Chicken Biryani', price: 2200.14, cutlery: 'With Cutlery', details: 'Served with raita and salad' },
  ];

  const showSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: 'Thank you for your order.',
      confirmButtonColor: '#28a745'
    });
  };

  const handlePay = () => {
    if (method === 'card' || method === 'paypal') {
      showSuccess();
    } else {
      setShowScanner(true);
      setTimeout(() => {
        setShowScanner(false);
        showSuccess();
      }, 3000);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-between">
        <Card style={{ width: '49%', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <Col md={12}>
            <h4>Payment Methods</h4>

            {/* Card Method */}
            <Card className={method === 'card' ? 'border-success' : ''} style={{ marginBottom: '15px' }}>
              <Card.Body>
                <Form.Check
                  type="radio"
                  label="Credit or Debit Card"
                  name="payment"
                  checked={method === 'card'}
                  onChange={() => setMethod('card')}
                />
                {method === 'card' && (
                  <div className="mt-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control type="text" value="Jacob Fernandes" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control type="text" value="**** **** **** 2433" readOnly />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Expire Date (MM/YY)</Form.Label>
                          <Form.Control type="text" value="08/32" readOnly />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>CVC/CVV</Form.Label>
                          <Form.Control type="text" value="***" readOnly />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Check type="checkbox" label="Save this card" defaultChecked />
                    <div className="mt-3">
                      <Button variant="secondary" className="me-2">Cancel</Button>
                      <Button variant="success" onClick={handlePay}>Pay</Button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* PayPal Method */}
            <Card className="mb-2">
              <Card.Body>
                <Form.Check
                  type="radio"
                  label={<span><FaCcPaypal className="me-2" /> PayPal</span>}
                  name="payment"
                  checked={method === 'paypal'}
                  onChange={() => setMethod('paypal')}
                />
                {method === 'paypal' && (
                  <div className="mt-3">
                    <Form.Group className="mb-3">
                      <Form.Label>PayPal Email</Form.Label>
                      <Form.Control type="email" value="user@example.com" readOnly />
                    </Form.Group>
                    <Button variant="success" onClick={handlePay}>Pay with PayPal</Button>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Google Pay */}
            <Card className="mb-2">
              <Card.Body>
                <Form.Check
                  type="radio"
                  label={<span><FaGooglePay className="me-2" /> Google Pay</span>}
                  name="payment"
                  checked={method === 'gpay'}
                  onChange={() => setMethod('gpay')}
                />
              </Card.Body>
            </Card>

            {/* PhonePe */}
            <Card className="mb-2">
              <Card.Body>
                <Form.Check
                  type="radio"
                  label={<span><FaPhone className="me-2" /> PhonePe</span>}
                  name="payment"
                  checked={method === 'phonepe'}
                  onChange={() => setMethod('phonepe')}
                />
              </Card.Body>
            </Card>
          </Col>
        </Card>

        <Card style={{ width: '49%', padding: '20px', borderRadius: '16px', backgroundColor: '#f9f9f9' }}>
          <Col md={12}>
            <h5 className="mb-3">Order Summary</h5>
            <ListGroup>
              {items.map((item, idx) => (
                <ListGroup.Item
                  action
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small>{item.cutlery}</small>
                    </div>
                    <div>{item.price.toFixed(2)}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="mt-3">
              <p><strong>Shipping & Handling:</strong> 20.44</p>
              <p><strong>Before Tax:</strong> 387.44</p>
              <p><strong>Tax Collected (20%):</strong> 112.44</p>
              <h5 className="mt-3">Order Total: 3,024.77</h5>
              <Button variant="success" className="w-100" onClick={handlePay}>Place Order</Button>
            </div>
          </Col>
        </Card>
      </Row>

      {/* Scanner Modal */}
      <Modal show={showScanner} centered>
        <Modal.Body className="text-center">
          <p>Scanning QR Code...</p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PayNow"
            alt="Scanning"
            style={{ width: '200px' }}
          />
        </Modal.Body>
      </Modal>

      {/* Item Detail Modal */}
      <Modal show={!!selectedItem} onHide={() => setSelectedItem(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Requirement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <h5>{selectedItem.name}</h5>
              <p>{selectedItem.details}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Payment;

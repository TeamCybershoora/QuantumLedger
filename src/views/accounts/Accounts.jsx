// Accounts.jsx
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { BsWallet2, BsBank, BsSafe2, BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineApartment } from 'react-icons/md';

const assetSummary = [
  { title: 'TOTAL ASSET VALUE', amount: '₹1,32,450', icon: <BsWallet2 size={24} /> },
  { title: 'LIQUID ASSETS', amount: '₹80,982', icon: <BsBank size={24} />, change: '+4.15%' },
  { title: 'PHYSICAL ASSET', amount: '₹51,468', icon: <BsSafe2 size={24} /> }
];

const activeAccounts = [
  { name: 'Free Cash', amount: '₹1,12,150', color: '#00cc99' },
  { name: 'Free Cash', amount: '₹1,12,150', color: '#3f51b5' },
  { name: 'Free Cash', amount: '₹1,12,150', color: '#ff6600' },
  { name: 'Stock Fund', amount: '₹1,12,150', color: '#3399ff' }
];

const inactiveAccounts = [
  { name: 'MONTHLY RENT', amount: '₹1,12,150', icon: <MdOutlineApartment />, status: 'Activated' },
  { name: 'Free Cash', amount: '₹1,12,150', status: 'Activated' },
  { name: 'Free Cash', amount: '₹1,12,150', status: 'Activated' }
];

const Accounts = () => {
  return (
    <Container className="mt-4">
      <h4>Account</h4>

      <Row className="my-4">
        {assetSummary.map((item, index) => (
          <Col md={4} key={index}>
            <Card className="p-3 mb-3 d-flex align-items-center text-center">
              <div>{item.icon}</div>
              <div className="fw-bold mt-2" style={{ fontSize: '14px' }}>{item.title}</div>
              <div className="fw-bold fs-5">{item.amount}</div>
              {item.change && (
                <span style={{ color: 'green', fontSize: '12px' }}>{item.change}</span>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <h5>List Account</h5>
      <p className="text-muted">All account setup manually</p>

      <h6 className="text-uppercase text-muted mt-4">Active List</h6>
      <Row className="mb-4">
        {activeAccounts.map((item, idx) => (
            <Col md={4} key={idx} className="mb-3">
            <Card className="p-3 h-100">
                <Row>
                <Col style={{}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <div
                    style={{
                    width: 30,
                    height: 30,
                    backgroundColor: item.color,
                    marginBottom: "-3rem",
                    borderRadius: 6 // 👈 Rounded corners here
                    }}
                />
                </div>
                </Col>
                <Col>
                <div className="mb-2">
                <div className="fw-bold">{item.name}</div>
                <div className="fw-bold fs-5">{item.amount}</div>
                </div>
                
                </Col>
                <Col style={{width:"10px", paddingLeft:"30%"}}><BsThreeDotsVertical /></Col>
                <hr />
                <div className="text-muted mt-2">This is money for this need</div>
                </Row>
            </Card>
            </Col>
        ))}
      </Row>


      <h6 className="text-uppercase text-muted mt-4">Inactive List</h6>
      <Row>
        {inactiveAccounts.map((item, idx) => (
          <Col md={4} key={idx} className="mb-3">
            <Card className="p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center" style={{ width: 30, height: 30 }}>
                  {item.icon || ''}
                </div>
                <Badge bg="light" text="primary" style={{ fontSize: '10px' }}>{item.status}</Badge>
              </div>
              <div className="fw-bold text-muted">{item.name}</div>
              <div className="fw-bold fs-5">{item.amount}</div>
              <hr />
              <div className="text-muted mt-2">This is money for this need</div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Accounts;

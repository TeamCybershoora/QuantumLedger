import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button, Tab, Nav } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaDownload, FaPrint, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Sample data for purchases
const purchaseData = [
  { id: '#PUR009', name: 'Amit Kumar', billNo: 9, mobile: '9876543210', amount: '₹1,250/-', mode: 'Cash', date: new Date('2025-01-09') },
  { id: '#PUR008', name: 'Amit Kumar', billNo: 8, mobile: '9876543210', amount: '₹980/-', mode: 'Online', date: new Date('2025-01-08') },
  { id: '#PUR007', name: 'Amit Kumar', billNo: 7, mobile: '9876543210', amount: '₹760/-', mode: 'UPI', date: new Date('2025-01-07') },
  { id: '#PUR006', name: 'Amit Kumar', billNo: 6, mobile: '9876543210', amount: '₹1,100/-', mode: 'Cash', date: new Date('2025-01-06') },
  { id: '#PUR005', name: 'Amit Kumar', billNo: 5, mobile: '9876543210', amount: '₹890/-', mode: 'Card', date: new Date('2025-01-05') },
];

function Purchases() {
  const [key, setKey] = useState('bill');
  const [startDate, setStartDate] = useState(new Date('2025-01-01'));
  const [endDate, setEndDate] = useState(new Date('2025-01-10'));
  const [search, setSearch] = useState('');

  const exportRow = (item) => {
    const doc = new jsPDF();
    doc.text(`ID: ${item.id}`, 10, 10);
    doc.text(`Vendor: ${item.name}`, 10, 20);
    doc.text(`Bill No: ${item.billNo}`, 10, 30);
    doc.text(`Mobile: ${item.mobile}`, 10, 40);
    doc.text(`Amount: ${item.amount}`, 10, 50);
    doc.text(`Payment Mode: ${item.mode}`, 10, 60);
    doc.save(`${item.id}.pdf`);
  };

  const exportAll = () => {
    html2canvas(document.querySelector("#purchase-table")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, 'PNG', 5, 5);
      pdf.save("Purchase_Report.pdf");
    });
  };

  const filteredPurchases = purchaseData.filter(item => {
    const matchesDate = item.date >= startDate && item.date <= endDate;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <Container fluid className="p-4">
      <h2 className="mb-3 fw-bold">Purchases</h2>

      <Row className="mb-3 text-center">
      <Col md={6}>
        <div className="border p-3 rounded shadow-sm d-flex align-items-center justify-content-between">
            <div>
            <h6 className="mb-0">Monthly Purchase</h6>
            <h4>₹4,500</h4>
            </div>
            <FaShoppingCart size={30} className="text-primary" />
        </div>
        </Col>

        <Col md={6}>
        <div className="border p-3 rounded shadow-sm d-flex align-items-center justify-content-between">
            <div>
            <h6 className="mb-0">Annual Purchase</h6>
            <h4>₹58,000</h4>
            </div>
            <FaChartLine size={30} className="text-success" />
        </div>
        </Col>
      </Row>

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs">
          <Nav.Item><Nav.Link eventKey="bill">Month Purchaces</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="payment">Payment Recived</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="bill">
            <Row className="mt-3 align-items-center">
              <Col md={4}>
                <Form.Control type="text" placeholder="Search vendor or purchase ID..." value={search} onChange={e => setSearch(e.target.value)} />
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center">
                  <FaCalendarAlt className="me-2" />
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setStartDate(start);
                      setEndDate(end || start);
                    }}
                    isClearable
                    className="form-control me-3"
                    placeholderText="Select date range"
                  />
                </div>
              </Col>
              <Col md={4} className="text-end">
                <Button variant="primary" onClick={exportAll}><FaDownload className="me-2" />Export</Button>
              </Col>
            </Row>

            <div id="purchase-table" className="mt-4">
              <Table responsive bordered hover>
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Vendor Name</th>
                    <th>Bill No.</th>
                    <th>Mobile No.</th>
                    <th>Total Amount</th>
                    <th>Payment Mode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchases.length === 0 ? (
                    <tr><td colSpan="7" className="text-center text-muted">No data found</td></tr>
                  ) : (
                    filteredPurchases.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.billNo}</td>
                        <td>{item.mobile}</td>
                        <td>{item.amount}</td>
                        <td className="text-primary">{item.mode}</td>
                        <td>
                          <Button size="sm" variant="light" onClick={() => exportRow(item)}>
                            <FaPrint />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="payment">
            <div className="text-center mt-4 text-muted">No Payment Done</div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default Purchases;

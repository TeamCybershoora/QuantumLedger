import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button, Tab, Nav } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt, FaDownload, FaPrint } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Sample data with a date field added
const salesData = [
  { id: '#RSV009', name: 'Nishant Mogha', billNo: 9, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-09') },
  { id: '#RSV008', name: 'Nishant Mogha', billNo: 8, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-08') },
  { id: '#RSV007', name: 'Nishant Mogha', billNo: 7, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-07') },
  { id: '#RSV006', name: 'Nishant Mogha', billNo: 6, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-06') },
  { id: '#RSV005', name: 'Nishant Mogha', billNo: 5, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-05') },
  { id: '#RSV004', name: 'Nishant Mogha', billNo: 4, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-04') },
  { id: '#RSV003', name: 'Nishant Mogha', billNo: 3, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-03') },
  { id: '#RSV002', name: 'Nishant Mogha', billNo: 2, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-02') },
  { id: '#RSV001', name: 'Nishant Mogha', billNo: 1, mobile: '9870691784', amount: '₹560/-', mode: 'Online', date: new Date('2025-01-01') },
];

function Sales() {
  const [key, setKey] = useState('bill');
  const [startDate, setStartDate] = useState(new Date('2025-01-01'));
  const [endDate, setEndDate] = useState(new Date('2025-01-10'));
  const [search, setSearch] = useState('');

  const exportRow = (item) => {
    const doc = new jsPDF();
    doc.text(`ID: ${item.id}`, 10, 10);
    doc.text(`Customer: ${item.name}`, 10, 20);
    doc.text(`Bill No: ${item.billNo}`, 10, 30);
    doc.text(`Mobile: ${item.mobile}`, 10, 40);
    doc.text(`Amount: ${item.amount}`, 10, 50);
    doc.text(`Payment Mode: ${item.mode}`, 10, 60);
    doc.save(`${item.id}.pdf`);
  };

  const exportAll = () => {
    html2canvas(document.querySelector("#sales-table")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, 'PNG', 5, 5);
      pdf.save("Sales_Report.pdf");
    });
  };

  // Filter logic
  const filteredSales = salesData.filter(item => {
    const matchesDate = item.date >= startDate && item.date <= endDate;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <Container fluid className="p-4">
      <h2 className="mb-3 fw-bold">Sales</h2>

      <Row className="mb-3 text-center">
        <Col md={6}>
          <div className="border p-3 rounded shadow-sm">
            <h6 className="mb-0">Revenue this month</h6>
            <h4>₹10,398 <span className="text-success">+ ₹498</span></h4>
          </div>
        </Col>
        <Col md={6}>
          <div className="border p-3 rounded shadow-sm">
            <h6 className="mb-0">Profit this month</h6>
            <h4>₹3,982 <span className="text-success">+ ₹198</span></h4>
          </div>
        </Col>
      </Row>

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs">
          <Nav.Item><Nav.Link eventKey="bill">Bill</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="payment">Payment Received</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="bill">
            <Row className="mt-3 align-items-center">
              <Col md={4}>
                <Form.Control type="text" placeholder="Search name or reservation ID..." value={search} onChange={e => setSearch(e.target.value)} />
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

            <div id="sales-table" className="mt-4">
              <Table responsive bordered hover>
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Bill No.</th>
                    <th>Customer Mobile no.</th>
                    <th>Total Amount</th>
                    <th>Payment Mode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.length === 0 ? (
                    <tr><td colSpan="7" className="text-center text-muted">No data found</td></tr>
                  ) : (
                    filteredSales.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.billNo}</td>
                        <td>{item.mobile}</td>
                        <td>{item.amount}</td>
                        <td className="text-success">{item.mode}</td>
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
            <div className="text-center mt-4 text-muted">No Payment Received</div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default Sales;

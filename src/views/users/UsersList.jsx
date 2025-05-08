import { Container, Button, Table, Row, Form, Col } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        axios({
            url: 'http://localhost:3002/listUsers',
            method: 'get',
            params: {
                search: searchInput,
                page: currentPage,
                limit: usersPerPage,
            },
        })
        .then((res) => {
            setUsers(res.data.data);
            setTotalPages(res.data.totalPages);
        })
        .catch(() => {
            alert('Something went wrong');
        });
    }, [searchInput, refresh, currentPage]);

    function handleSearch(e) {
        setSearchInput(e.target.value);
    }

    return (
        <Container>
            <Row className="mb-3 align-items-center">
                <Col md={12}>
                    <Form.Group controlId="searchInput">
                        <Form.Control
                            type="text"
                            placeholder="Search By Email"
                            onChange={handleSearch}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Table bordered hover className="mt-2">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>

            <div className="d-flex justify-content-between mt-3">
                <Button
                    variant="secondary"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="secondary"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </Container>
    );
}

export default UserList;

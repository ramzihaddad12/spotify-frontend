import React from 'react';
import styles from './styles.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Fragment} from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function UserList({users}) {
    console.log(users);
    return (
        <Container>
            <Row>
                {users.map((user) => (
                    <Col md={4} key={user._id}>
                        <Link to={`/profile/${user._id}`}>
                            <div className="card my-3">
                                <div className="card-body">
                                    <h5 className="card-title"><b>{user.name}</b></h5>
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default UserList;


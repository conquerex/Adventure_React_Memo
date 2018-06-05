import React, { Component } from 'react';

class Memo extends Component {
    render() {
        return (
            <div className="container memo">
                <div className="card">
                    <div className="info">
                        <a className="username">Writer</a> wrote a log, 1 second ago
                        <div className="option-button">
                            <a className="dropdown-button" id="dropdown-button-id" data-activates="dropdown-id">
                                <i className="material-icons icon-button">more_vert</i>
                            </a>
                            <ul className="dropdown-content" id="dropdown-id">
                                <li><a>Edit</a></li>
                                <li><a>Remove</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-content">
                        Contents
                    </div>
                    <div className="footer">
                        <i className="material-icons log-footer-icon star icon-button">Star</i>
                        <span className="star-count">0</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Memo;
import React, { Component } from 'react';
import TimeAgo from react-timeago;

class Memo extends Component {
    render() {
        const {data, ownership} = this.props; // ES6 의 비구조화 할당

        return (
            <div className="container memo">
                <div className="card">
                    <div className="info">
                        <a className="username">{data.writer}</a> wrote a log, <TimeAgo data={data.date.created}/>
                        <div className="option-button">
                            <a className="dropdown-button" 
                                id={`dropdown-button-${data._id}`}
                                data-activates={`dropdown-${data._id}`}>
                                <i className="material-icons icon-button">more_vert</i>
                            </a>
                            <ul className="dropdown-content" id={`dropdown-${data._id}`}>
                                <li><a>Edit</a></li>
                                <li><a>Remove</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-content">
                        {data.contents}
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

Memo.propTypes = {
    data : React.PropTypes.object,
    ownership : React.PropTypes.bool
}

Memo.defaultProps = {
    data : {
        _id : 'id1234567890',
        writer : 'Writer',
        contents : 'Contents',
        is_edited : false,
        date : {
            edited : new Date(),
            created : new Date()
        },
        starred: []
    },
    ownership : true
}

export default Memo;
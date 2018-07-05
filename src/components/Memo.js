import React, { Component } from 'react';

class Memo extends Component {

    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    render() {
        const {data, ownership} = this.props; // ES6 의 비구조화 할당

        const dropDownMenu = (
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
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <a className="username">{this.props.data.writer}</a> wrote a log,
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">Star</i>
                    <span className="star-count">0</span>
                </div>
            </div>
        );

        return (
            <div className="container memo">
                { memoView }
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
    ownership : true // ownership prop : 해당 메모가 자신의 메모인지 아닌지 여부를 확인하는 값
}

export default Memo;
import React, { Component } from 'react';
import { Write } from 'components';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const write = ( <Write/> );
        return (
            <div>
                { this.props.isLoggedIn ? write : undefined }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    }
}

export default connect(mapStateToProps)(Home);
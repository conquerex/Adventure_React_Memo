import React, { Component } from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoPostRequest } from 'actions/memo';

class Home extends Component {

    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    /* POST MEMO */
    handlePost(contents) {
        console.log("----- this.props.postStatus :", this.props.postStatus);
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    // TO BE IMPLEMENTED
                    Materialize.toast('Success!', 2000);
                } else {
                    /**
                     * ERROR CODES
                     * 1: NOT LOGGED IN
                     * 2: EMPTY CONTENTS
                     */
                    let $toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #ffb4ba">You are not logged in!!</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(() => {
                                location.reload(false);
                            }, 2000);
                        case 2:
                            $toastContent = $('<span style="color: #ffb4ba">Please write something!!</span>');
                            Materialize.toast($toastContent, 2000);
                        default:
                            $toastContent = $('<span style="color: #ffb4ba">Something broke!!</span>');    
                            Materialize.toast($toastContent, 2000);
                    }
                }
            }
        )
    }

    render() {
        const write = ( 
            <Write onPost={this.handlePost}/>
        );
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
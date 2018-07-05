import React, { Component } from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoPostRequest } from 'actions/memo';

class Home extends Component {

    componentDidMount() {
        this.props.memoListRequest(true).then(
            () => {console.log(this.props.memoData);}
        )
    }
    

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
            <Write 
                onPost={this.props.handlePost}
            />
        );

        var mockData = [
            {
                "_id" : "578b958ec1da760909c263f4",
                "writer" : "Barley",
                "contents" : "Blah blah~~~~",
                "__v" : 0,
                "is_edited" : false,
                "date" : {
                    "edited": "2018-06-17T14:26:22.428Z",
                    "created": "2018-06-17T14:26:22.428Z"
                },
                "starred" : []
            },
            {
                "_id": "578b957ec1da760909c263f3",
                "writer": "Barley",
                "contents": "Data",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2018-06-17T14:26:06.999Z",
                    "created": "2018-06-17T14:26:06.999Z"
                },
                "starred": []
            },
            {
                "_id": "578b957cc1da760909c263f2",
                "writer": "Barley",
                "contents": "Mock",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2018-06-17T14:26:04.195Z",
                    "created": "2018-06-17T14:26:04.195Z"
                },
                "starred": []
            },
            {
                "_id": "578b9579c1da760909c263f1",
                "writer": "Barley",
                "contents": "Some",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2018-06-17T14:26:01.062Z",
                    "created": "2018-06-17T14:26:01.062Z"
                },
                "starred": []
            },
            {
                "_id": "578b9576c1da760909c263f0",
                "writer": "Barley",
                "contents": "Create",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2018-06-17T14:25:58.619Z",
                    "created": "2018-06-17T14:25:58.619Z"
                },
                "starred": []
            },
            {
                "_id": "578b8c82c1da760909c263ef",
                "writer": "Barley",
                "contents": "blablablal",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2018-06-17T13:47:46.611Z",
                    "created": "2018-06-17T13:47:46.611Z"
                },
                "starred": []
            }
        ]

        console.log("----- mockData :", mockData._id);

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList data={this.props.memoData} currentUser={this.props.currentUser} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },
        // componentDidMount에서 사용 
        memoListRequest: (isInitial, listType, is, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, {Component} from 'react';

class Header extends Component {
    render() {
        
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <a className="brand-logo center">MEMOPAD</a>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            <li>
                                <a><i className="material-icons">vpn_key</i></a>
                            </li>
                            <li>
                                <a><i className="material-icons">lock_open</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,   // Login 상태인지 확인
    onLogout: React.PropTypes.func      // 함수형 props, 로그아웃
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.log("Logout function not defined!!")}
};

export default Header;
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        
        const loginButton = (
            <li>
                <a>
                    <i className="material-icons">vpn_key</i>
                </a>
            </li>
        );

        const logoutButton = (
            <li>
                <a>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <Link to="/" className="brand-logo center">MEMOPAD</Link>

                        <ul>
                            <li><a><i className="material-icons">search</i></a></li>
                        </ul>

                        <div className="right">
                            <ul>
                                { this.props.isLoggedIn ? logoutButton : loginButton }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
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
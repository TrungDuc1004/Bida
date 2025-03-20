import React, { useContext } from 'react';
import { AuthContext } from '../../components/contexts/AuthContext';
import { ToastContext } from '../../components/contexts/ToastContext';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartIcon from '../CartIcon';
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/Navbar.css'

function Navbar() {
    //
    const navigate = useNavigate();
    //
    const { showToast } = useContext(ToastContext)
    //
    const { loggedIn, logout, username, role } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        showToast({ title: "Đăng xuất thành công!", type: "success" });
        navigate("/");
    }

    return (
        <nav className="row nav">
            <div className='col col-4'>
                <Link to='/' className='name-shop'>
                    <FontAwesomeIcon className='faBowlingBall' icon={faBowlingBall} />
                    DUCKPHUC
                </Link>
            </div>

            <div className='col col-4 nav-header-between'>
                <NavLink to='/' className='nav-header-between_home' activeClassName='active'>Trang chủ</NavLink>
                <NavLink to='/table' className='nav-header-between_table' activeClassName='active'>Bàn bida</NavLink>
                <NavLink to='/menu' className='nav-header-between_shop' activeClassName='active'>Đồ ăn vặt</NavLink>
            </div>

            <div className='col col-4 nav-header-right'>
                {/* hidden responsive */}
                <input id='checkbox_navbar' type='checkbox'></input>
                <label htmlFor='checkbox_navbar' className='overlay_navbar'></label>

                <Link to='/cart' className='nav-header-right_cart'>
                    {/* <FontAwesomeIcon className='faCartShopping' icon={faCartShopping} /> */}
                    <CartIcon />
                </Link>

                {loggedIn ? (
                    // Nếu đã đăng nhập
                    <ul className='nav-user'>
                        <div className='nav-user-straightline'>
                            <img src="data:image/png;base64,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" alt="User Profile" />
                            <p>{username || "Người dùng"}</p>
                        </div>

                        <li className='nav-user-infor'>
                            {role === 'admin' ? (
                                <>
                                    <div className='nav-user-together'>
                                        <Link className='nav-user-link' to='/manager/admin'>Quản lý hệ thống</Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='nav-user-together'>
                                        <Link className='nav-user-link' to='/profile'>Hồ sơ</Link>
                                    </div>
                                    <div className='nav-user-together'>
                                        <Link className='nav-user-link' to='/order'>Đơn hàng</Link>
                                    </div>
                                </>
                            )}

                            <div className='nav-user-together' onClick={handleLogout}>
                                <Link className='nav-user-link'>Thoát</Link>
                            </div>
                        </li>
                    </ul>
                ) : (
                    // Nếu chưa đăng nhập
                    <Link to='/login' className='nav-header-right_sign'>
                        <FontAwesomeIcon className='faUser' icon={faUser} />
                        <p>Đăng nhập</p>
                    </Link>
                )}

                {/* hidden responsive */}
                <label htmlFor='checkbox_navbar'>
                    <FontAwesomeIcon className='faList' icon={faList} />
                </label>
                <label htmlFor='checkbox_navbar' className='nav-tab-hidden'>
                    <div className='nav-user-together'>
                        <Link className='nav-user-link' to='/'>Trang chủ</Link>
                    </div>
                    <div className='nav-user-together'>
                        <Link className='nav-user-link' to='/table'>Bàn bida</Link>
                    </div>
                    <div className='nav-user-together'>
                        <Link className='nav-user-link' to='/menu'>Đồ ăn vặt</Link>
                    </div>
                    <div className='nav-user-together'>
                        <Link className='nav-user-link' to='/cart'>Giỏ hàng</Link>
                    </div>
                    {username ? (
                        <div>
                            {role === 'admin' ? (
                                <>
                                    <div className='nav-user-together'>
                                        <Link className='nav-user-link' to='/manager/admin'>Quản lý hệ thống</Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='nav-user-together'>
                                        <Link className='nav-user-link' to='/profile'>Hồ sơ</Link>
                                    </div>
                                    <div className='nav-user-together'>
                                        <Link className='nav-user-link' to='/order'>Đơn hàng</Link>
                                    </div>
                                </>
                            )}

                            <div className='nav-user-together' onClick={handleLogout}>
                                <Link className='nav-user-link'>Thoát</Link>
                            </div>
                        </div>
                    ) : ('')}
                </label>
            </div>
        </nav>
    )
}

export default Navbar;
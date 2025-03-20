import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../components/contexts/CartContext';

function CartIcon() {
    const { cartCount } = useContext(CartContext); // Lấy số lượng sản phẩm trong giỏ hàng

    return (
        <Link to='/cart' className='nav-header-right_cart' style={{ position: 'relative' }}>
            <FontAwesomeIcon className='faCartShopping' icon={faCartShopping} />
            {cartCount > 0 && ( // Chỉ hiển thị khi có sản phẩm trong giỏ
                <span
                    style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-10px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                    }}
                >
                    {cartCount}
                </span>
            )}
        </Link>
    );
}

export default CartIcon;

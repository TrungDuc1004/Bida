import React, { useContext } from "react"
import { useState, useEffect } from "react";
import { CartContext } from "./contexts/CartContext";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Bestsellerproduct() {
    const { handleAddToCart } = useContext(CartContext);
    //
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products/best-seller')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.error('Error data', error)
            })
    }, [])

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 500, marginTop: '50px', color: '#0a1d37' }}>Sản phẩm bán chạy</h1>

            <div className="product-list">
                <div className='row'>
                    {products.map((product) => (
                        <div className='col col-3 product-list-wrap' key={product._id}>
                            <div>
                                <Link to={`/product/${product.slug}`}>
                                    <img className='card-top-img' src={product.image} alt='' />
                                </Link>
                            </div>

                            <div className='card-body'>
                                <div className="card">
                                    <Link className="remove-text-decoration" to={`/product/${product.slug}`}>
                                        <h5 className='card-body_title'>{product.name}</h5>
                                    </Link>
                                </div>

                                <div className="card card-body_price">
                                    <p className="line-through text-gray"><span className="font-size_small">đ</span>
                                        {product.oldPrice}</p>
                                    <p className="newPrice-red"><span className="font-size_small">đ</span>
                                        {product.newPrice}</p>
                                </div>

                                <div className="card card-body_storage text-gray">
                                    <p>Kho: 343</p>
                                    <p>Da Ban: 169</p>
                                </div>

                                <div className="card card-body_place-evaluate">
                                    <p>{product.location}</p>
                                    <div className="card-body_place-evaluate-color">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>

                                <div className="card-body_primary">
                                    <button className='card-body_primary-button' onClick={() => { handleAddToCart(product._id) }}>
                                        <FontAwesomeIcon className='card-body_primary-cartplus' icon={faCartPlus} />
                                        <p className="card-body_primary-size-p">Thêm vào giỏ</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >
            </div>
        </div>
    )
}
export default Bestsellerproduct
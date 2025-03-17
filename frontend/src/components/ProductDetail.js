import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from "./contexts/CartContext";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import '../css/ProductDetail.css';
import api from '../api/Axios';

function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [activeTab, setActiveTab] = useState("description");
    
    const { handleAddToCart } = useContext(CartContext);

    useEffect(() => {
        api.get(`/products/${slug}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Product not found');
                setLoading(false);
            });
    }, [slug]);

    const handleSubmitReview = () => {
        console.log("Review submitted:", { name, rating, review });
        setName("");
        setRating(0);
        setReview("");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="row">
                <div className="col col-12 img-extra">Sản phẩm</div>
            </div>

            <div className='row detail_cotainer'>
                <div className='col col-12 detail_page'>
                    <Link className='remove-text-decoration color-text-home' to='/menu'>Cửa hàng</Link> / {product.name}
                </div>

                <div className='col col-6 detail_response'>
                    <img className='detail_img' src={product.image} alt={product.name} />
                </div>

                <div className='col col-6 detail_price'>
                    <div>
                        <h2>{product.name}</h2>
                    </div>

                    <div className='detail_price-0'>
                        <div className='detail_price-1'>
                            <p className='line-through text-gray'>
                                <span className="font-size_small">đ</span>
                                {product.oldPrice}</p>
                            <p className='newPrice-red'>
                                <span className="font-size_small">đ</span>
                                {product.newPrice}</p>
                        </div>

                        <div className='detail_price-2 text-gray'>
                            <p>Kho: 343</p>
                            <p>Da ban: 169</p>
                        </div>
                    </div>

                    <div className='detail_description'>
                        <p>{product.description}</p>
                    </div>

                    <div className='detail_button'>
                        <button className='detail_button-font-cart' onClick={() => { handleAddToCart(product._id) }}>
                            <FontAwesomeIcon className='card-body_primary-cartplus' icon={faCartPlus} />
                            <p>Thêm vào giỏ hàng</p>
                        </button>
                        <button className='detail_button-pay'>
                            <p>Mua ngay</p>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Tabs for Description and Reviews */}
            <div className='tabs-container'>
                <div className='tabs'>
                    <button className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>Miêu tả</button>
                    <button className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>Đánh giá</button>
                </div>
            </div>
            
            {activeTab === "description" && (
                <div className='tab-content description-tab'>
                    <p>{product.description}</p>
                </div>
            )}
            
            {activeTab === "reviews" && (
                <div className='tab-content review-tab'>
                    <h3>Để lại trải nghiệm của bạn</h3>
                    <input 
                        type='text' 
                        placeholder='Nhập tên của bạn' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                                key={star} 
                                onClick={() => setRating(star)}
                                style={{ cursor: 'pointer', color: rating >= star ? 'orange' : 'gray' }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea 
                        placeholder='Nhận xét của bạn...' 
                        value={review} 
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <button onClick={handleSubmitReview}>Gửi</button>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;

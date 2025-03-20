import React, { useState, useEffect, useContext, useCallback } from "react";
import { CartContext } from "./contexts/CartContext";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMagnifyingGlass, faStar, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';
import '../css/ProductList.css';
import api from "../api/Axios";

function ProductList() {
    const [products, setProducts] = useState([]);
    //
    const [categories] = useState(["Đồ ăn", "Đồ uống"]);
    //
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [sortOrder, setSortOrder] = useState("");
    //
    const [query, setQuery] = useState('');
    //
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 8;
    ///
    const { handleAddToCart } = useContext(CartContext);

    const fetchProducts = useCallback(() => {
        const params = {
            category: selectedCategory !== "Tất cả" ? selectedCategory : undefined,
            sort: sortOrder || undefined,
            q: query || undefined,
            page,
            limit,
        };

        api.get('/products/menu', { params })
            .then((response) => {
                const { data, totalPages } = response.data;
                setProducts(data);
                setTotalPages(totalPages);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setProducts([]);
            });
    }, [selectedCategory, sortOrder, query, page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setPage(1); // Reset về trang đầu
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        setPage(1); // Reset về trang đầu
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
    };

    const debouncedSearch = useCallback(
        debounce((value) => {
            setQuery(value);
            setPage(1);
        }, 500),
        []
    );

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col col-12 img-extra">Đồ ăn vặt</div>
            </div>

            <div className="product-list">
                <div className="row filter-search">
                    <div className="col col-3 media-filter-prd">
                        <select className="filter-category" value={selectedCategory} onChange={handleCategoryChange}>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-3 media-filter-prd">
                        <select className="filter-sortby" value={sortOrder} onChange={handleSortChange}>
                            <option value="">Sắp xếp</option>
                            <option value="asc">Tăng dần</option>
                            <option value="desc">Giảm dần</option>
                        </select>
                    </div>
                    <div className="col col-6 media-filter-prd search-common">
                        <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                        <input
                            className="search-product"
                            onChange={handleInputChange}
                            placeholder="Tìm kiếm..."
                        />
                    </div>
                </div>

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

                {/* <div className="btn-common-pagination">
                    <button className="btn btn-backward-prd" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>

                    <span style={{ padding: '10px' }}>Trang {page}/{totalPages}</span>

                    <button className="btn btn-nextward-prd" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div> */}
            </div>
        </div >
    );
}

export default ProductList;

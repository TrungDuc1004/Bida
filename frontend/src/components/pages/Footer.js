import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import '../../css/Footer.css'

function Footer() {
    return (
        <footer>
            <div className='row footer'>
                <ul className="col col-3">
                    <p>DUCKPHUC
                        <br />
                        <li>Cung cấp trải nghiệm đặt bàn bida dễ dàng, nhanh chóng với giao diện trực quan, giúp khách hàng tìm kiếm và đặt bàn chỉ trong vài thao tác.</li>
                    </p>
                </ul>

                <ul className="col col-3">
                    <p>Danh Mục Hàng Đầu
                        <br />
                        <li>
                            <Link className='footer-link' to='/table'>Đặt Bàn</Link>
                        </li>
                        <li>
                            <Link className='footer-link' to='/menu'>Đồ Ăn</Link>
                        </li>
                        <li>
                            <Link className='footer-link' to='/menu'>Thức Uống</Link>
                        </li>
                    </p>

                </ul>

                <ul className="col col-3">
                    <p>Liên kết hữu ích
                        <br />
                        <li>
                            <Link className='footer-link' to='/'>Trang Chủ</Link>
                        </li>
                        <li>
                            <Link className='footer-link' to='/cart'>Giỏ Hàng</Link>
                        </li>
                        <li>
                            <Link className='footer-link' to='/login'>Đăng Nhập</Link>
                        </li>
                    </p>
                </ul>

                <ul className="col col-3">
                    <p>Thông Tin Liên Hệ
                        <br />
                        <li>
                            <FontAwesomeIcon style={{ paddingRight: '5px' }} icon={faLocationDot} />
                            183 Tô Hiệu, Đà Nẵng
                        </li>
                        <li>
                            <FontAwesomeIcon style={{ paddingRight: '5px' }} icon={faPhone} />
                            +84945124982
                        </li>
                        <li>
                            <FontAwesomeIcon style={{ paddingRight: '5px' }} icon={faEnvelope} />
                            quangphuc251003@gmail.com
                        </li>
                    </p>
                </ul>

                <ul>
                    <li>Copyright © DUCKPHUC</li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer;
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import "../css/Home.css";
import "../css/Menu.css";

function Home() {
  return (
    <div>
      <div className="row home">
        <div className="row col-12 img-background">
          <div className="col col-6 introduce-home">
            <span>Làm cho quá trình đặt bàn của bạn trở nên dễ dàng hơn</span>
            <p>
              Website cung cấp thông tin chi tiết về bàn bida, tình trạng bàn cùng danh sách đồ ăn, thức uống có sẵn.
              Hệ thống tìm kiếm và bộ lọc giúp khách hàng dễ dàng chọn bàn theo
              loại bàn, giá thuê hoặc khu vực trong CLB, đồng thời lựa chọn món
              ăn và đồ uống phù hợp.
            </p>

            <Link to="/table">
              <button>Đặt bàn ngay</button>
            </Link>
          </div>
          <div className="col col-6 home_image">
            <img src="img/ballbida.png"></img>
          </div>
        </div>
      </div>

      <div className="row commit-sign">
        <div className="col col-3 sign commit-sign_green">
          <FontAwesomeIcon className="commit-sign_green-award" icon={faAward} />
          <p>
            Trang thiết bị hiện đại <br />
            Đảm bảo trải nghiệm tốt nhất
          </p>
        </div>

        <div className="col col-3 sign commit-sign_orange">
          <FontAwesomeIcon
            className="commit-sign_orange-swap"
            icon={faRightLeft}
          />
          <p>
            Hỗ trợ thay đổi <br />
            hoặc hủy đặt bàn dễ dàng
          </p>
        </div>

        <div className="col col-3 sign commit-sign_blue">
          <FontAwesomeIcon
            className="commit-sign_blue-headset"
            icon={faHeadset}
          />
          <p>
            Tư vấn viên tận tình
            <br />
            Nhiều kinh nghiệm
          </p>
        </div>

        <div className="col col-3 sign commit-sign_yellow">
          <FontAwesomeIcon
            className="commit-sign_yellow-truck"
            icon={faUtensils}
          />
          <p>
            Đồ ăn, thức uống đa dạng
            <br />
            Phục vụ ngay tại bàn
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

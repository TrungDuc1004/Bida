
function DeleteModal({ ModalOpen, handleCloseModal, handleDelete }) {
    if (!ModalOpen) return null; // Modal không hiển thị nếu không mở

    return (
        <div id="delete-course-modal" className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Xóa sản phẩm?</h5>
                        <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Bạn chắc chắn muốn xóa sản phẩm này?</p>
                    </div>
                    <div className="modal-footer">
                        <button id="btn-delete-course" className="btn btn-danger" type="button" onClick={handleDelete}>Xóa</button>
                        <button className="btn btn-secondary" type="button" onClick={handleCloseModal}>Hủy</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default DeleteModal;
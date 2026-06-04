import './pagination.scss';

function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pag-container">
            <ul className="pag">
                <li className={`pag-item arrow prev ${currentPage === 1 ? 'disabled': ''}`}>
                    <a href="" onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) onPageChange(currentPage - 1);
                    }}>
                        <svg width="7.6" height="11.8" viewBox="0 0 7.6 11.8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.48657 0.183396C7.31171 -0.0303263 6.9967 -0.0618274 6.78298 0.113036L0.182975 5.51304C0.0669069 5.608 -0.000406265 5.75005 -0.000406265 5.90002C-0.000406265 6.04998 0.0669069 6.19203 0.182975 6.28699L6.78298 11.687C6.9967 11.8619 7.31171 11.8304 7.48657 11.6166C7.66144 11.4029 7.62994 11.0879 7.41621 10.913L1.28919 5.90002L7.41621 0.886994C7.62994 0.71213 7.66144 0.397119 7.48657 0.183396Z" />
                        </svg>
                    </a>
                </li>
                <li className={`pag-item ${currentPage === 1 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onPageChange(1);
                    }}>1</a>
                </li>
                <li className={`pag-item ${currentPage === 2 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onPageChange(2);
                    }}>2</a>
                </li>
                <li className={`pag-item ${currentPage === 3 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onPageChange(3);
                    }}>3</a>
                </li>
                <li className={`pag-item ${currentPage === 4 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onPageChange(4);
                    }}>4</a>
                </li>
                <li className="pag-item dots"><span>...</span></li>
                <li className={`pag-item ${currentPage === 9 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        onPageChange(9);
                    }}>9</a>
                </li>
                <li className={`pag-item arrow next ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) onPageChange(currentPage + 1);
                    }}>
                        <svg width="7.6" height="11.8" viewBox="0 0 7.6 11.8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.113036 0.183396C0.2879 -0.0303263 0.602912 -0.0618274 0.816634 0.113036L7.41663 5.51304C7.5327 5.608 7.60002 5.75005 7.60002 5.90002C7.60002 6.04998 7.5327 6.19203 7.41663 6.28699L0.816634 11.687C0.602911 11.8619 0.2879 11.8304 0.113036 11.6166C-0.0618274 11.4029 -0.0303262 11.0879 0.183396 10.913L6.31042 5.90002L0.183396 0.886994C-0.0303263 0.71213 -0.0618274 0.397119 0.113036 0.183396Z" />
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;
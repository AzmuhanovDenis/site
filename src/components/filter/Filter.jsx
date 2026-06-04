import './filter.scss';

const Filter = (props) => {
    return (
        <>
            <div className="filter-content">
                <div className="filter-group">
                    <div className="filter-group-header">
                        <span>{props.filter_title}</span>
                        <span className="toggle-icon"></span>
                    </div>
                    <div className="filter-group-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;
import React from 'react';
import './Pagination.scss';

class Pagination extends React.Component {
    
    render() {
        return (
            <div className="paginationContainer">
                <h3>{`Page ${this.props.page + 1} of ${this.props.length}`}</h3>
                <div className="pagination">
                    <button onClick={this.props.prevPage}><i className="fas prev fa-angle-double-left"></i>Prev</button>
                    <button onClick={this.props.nextPage}>Next<i className="fas next fa-angle-double-right"></i></button>
                </div>
            </div>
        )
    }
}

export default Pagination;
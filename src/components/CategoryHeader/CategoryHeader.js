import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CategoryHeader.scss';

export default class CategoryHeader extends Component {
    render() {
        return (
            <div className="mainGrid">
                <Link onClick={this.props.updatePhotos} to="/category/architecture" className="category">
                    <div className="heading"><h2>Architecture</h2></div>
                    <div className="photoGrid">
                        <div className="slide image">
                            <img alt="" src="https://images.unsplash.com/photo-1486744328743-c1151100a95b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80" />
                        </div>
                        <div className="mainImage image">
                            <img alt="" src="https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80" />
                        </div>
                        <div className="slide image">
                            <img alt="" src="https://images.unsplash.com/photo-1506146829809-ecf5010c774f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80" />
                        </div>
                    </div>
                </Link>

                <Link onClick={this.props.updatePhotos} to="/category/animals" className="category">
                    <div className="heading"><h2>Animals</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1572363420552-058bd41af8c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                    </div>
                </Link>
                
                <Link onClick={this.props.updatePhotos} to="/category/food" className="category">
                    <div className="heading"><h2>Food</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1547&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                    </div>
                </Link>
                
                
                <Link onClick={this.props.updatePhotos} to="/category/scenic" className="category">
                    <div className="heading"><h2>Scenic</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                    </div>
                </Link>
                
                <Link onClick={this.props.updatePhotos} to="/category/portrait" className="category">
                    <div className="heading"><h2>Portrait</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                    </div>
                </Link>
                
                
                <Link onClick={this.props.updatePhotos} to="/category/art" className="category">
                    <div className="heading"><h2>Art</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1482160549825-59d1b23cb208?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                    </div>
                </Link>
                
                
                <Link onClick={this.props.updatePhotos} to="/category/fashion" className="category">
                    <div className="heading"><h2>Fashion</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                    </div>
                </Link>
                
                
                <Link onClick={this.props.updatePhotos} to="/category/aerial" className="category">
                    <div className="heading"><h2>Aerial</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                        <div className="image">
                            <img alt="" src="https://images.unsplash.com/photo-1522764725576-4cbbbf12c16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=60" />
                        </div>
                    </div>
                </Link>
                
                
                <Link onClick={this.props.updatePhotos} to="/category/activity" className="category">
                    <div className="heading"><h2>Activity</h2></div>
                    <div className="photoGrid">
                        <div className="image">
                            <img alt="" src="" />
                        </div>
                        <div className="image">
                            <img alt="" src="" />
                        </div>
                        <div className="image">
                            <img alt="" src="" />
                        </div>
                    </div>
                </Link>
                
            </div>
        )
    }
}

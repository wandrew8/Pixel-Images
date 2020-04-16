import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/icons/android-chrome-512x512.png'
import './SmallHeader.scss';

const Modal = ({ handleClose, show, history }) => {
    const [query, setQuery] = useState('')  
    const showHideClassName = show ? 'searchbar' : 'searchbar hideSearchBar';
    const historyObj = history();
  
      function submitForm(e) {
        e.preventDefault();
        console.log(query)
        console.log(historyObj)
        if(query) historyObj.push('/search/' + query);
      }
        return (
        <div className={showHideClassName}>
          <div onClick={handleClose} className="closeBar"><i className="far fa-times-circle"></i></div>
          <form id="searchForm">
              <input required onChange={e => setQuery(e.target.value)} name="query" id="searchTags" />
              <button id="submitSearch" onClick={submitForm}>
                <i className="fas fa-search"></i> Search
              </button>
          </form>
        </div>
      );
  }; 

class SmallHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: 0,
            showNav: false,
        }
        this.showNav = this.showNav.bind(this)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }
      
    listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop
        
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        
        const scrolled = winScroll / height
        this.setState({
            scrollPosition: scrolled,
        })
    }

    showNav() {
        console.log(this.state.showNav)
        this.setState({ showNav: !this.state.showNav })
    }

    showModal = () => {
        this.setState({ show: true });
    }
      
    hideModal = () => {
    this.setState({ show: false });
    }
    
    handleQuery(e) {
        e.preventDefault();
        console.log(this.state.query)
        
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    

    render () {
        const styledHeader = {
            height: this.state.scrollPosition > 0.05 ? '60px' : '100px',
            opacity: this.state.scrollPosition > 0.05 ? '0.8' : '1',

        }

        function MenuBar(props) {    
            return (
                <div className={props.scrollPosition > 0.05 ? "menuShort" : "menu"}>
                    <ul>
                        <li onClick={props.showModal} className="searchButton"><i className="fas fa-search"></i>Search</li>
                        <Link to="/signup"><li className="formButton"><i className="fas fa-user"></i>Join</li></Link>
                        <Link to="/login"><li className="formButton"><i className="fas fa-sign-in-alt"></i>Login</li></Link>
                    </ul>
                </div>
            )
        }

        return(
            <div>
                <header style={styledHeader}>
                    <Link to="/"><img className="logo" src={logo} alt="" /><h1>Pixel Images</h1></Link>
                    <div className="mobileHeader">
                        <i onClick={this.showNav} className="fas fa-chevron-down"></i>
                    </div>
                </header>
                <Modal history={useHistory} show={this.state.show} handleInputChange={this.handleInputChange.bind(this)} handleQuery={this.handleQuery} handleClose={this.hideModal} /> 
                {this.state.showNav ? <MenuBar showModal={this.showModal} scrollPosition={this.state.scrollPosition} /> : null}
            </div>
            
        )
    }
}

export default SmallHeader;

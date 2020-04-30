import React, { Component, useState } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import SmallHeader from '../SmallHeader/SmallHeader';
import logo from '../../assets/images/icons/android-chrome-512x512.png'
import './HomeHeader.scss';

class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            scrollPosition: 0,
            query: '',
            initialScroll: false,
            width: window.innerWidth,
        };
    }

    listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrolled = winScroll / height
      this.setState({
        scrollPosition: scrolled, initialScroll: true
      })
    }
    
    showModal = () => {
        this.setState({ show: true });
    }
    
    hideModal = () => {
      this.setState({ show: false });
    }

    componentDidMount() {
      window.addEventListener('scroll', this.listenToScroll)
      window.addEventListener('resize', this.listenResize);
    }
      
      componentWillUnmount() {
      window.removeEventListener('scroll', this.listenToScroll)
      window.removeEventListener('resize', this.listenResize);
  
    }

    handleQuery(e) {
      e.preventDefault();
      console.log(this.state.query)
      
    }

    listenResize = () => {
        this.setState({width: window.innerWidth})
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        if (this.state.width > 800) {

          return (
            <div>
                <header className="header">
                    <Link to="/"><img className="logo" src={logo} alt="" /><h1>Pixel Images</h1></Link>
                    <div className="tools">
                        <div onClick={this.showModal} className="searchButton"><i className="fas fa-search"></i>Search</div>
                        <Link to="/" className="searchButton"><i className="fas fa-home"></i>Home</Link>
                        <div className="formButton"><button><Link to="/signup"><i className="fas fa-user"></i>Join</Link></button></div>
                        <div className="formButton"><button><Link to="/login"><i className="fas fa-sign-in-alt"></i>Login</Link></button></div>

                    </div>
                </header>
                <Modal history={useHistory} show={this.state.show} handleInputChange={this.handleInputChange.bind(this)} handleQuery={this.handleQuery} handleClose={this.hideModal} />
            </div>
          )
        } else {
          return (
            <SmallHeader />
          )
        }
    }
}

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

export default HomeHeader;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/icons/android-chrome-512x512.png'
import './SmallHeader.scss';



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
    

    

    render () {
        const styledHeader = {
            height: this.state.scrollPosition > 0.05 ? '60px' : '100px',
            opacity: this.state.scrollPosition > 0.05 ? '0.8' : '1',

        }

        function MenuBar(props) {    
            return (
                <div className={props.scrollPosition > 0.05 ? "menuShort" : "menu"}>
                    <ul>
                        <li className="searchButton"><i className="fas fa-search"></i>Search</li>
                        <li className="formButton"><Link to="/signup"><i className="fas fa-user"></i>Join</Link></li>
                        <li className="formButton"><Link to="/login"><i className="fas fa-sign-in-alt"></i>Login</Link></li>
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
                    {this.state.showNav ? <MenuBar scrollPosition={this.state.scrollPosition} /> : null}
            </div>
            
        )
    }
}

export default SmallHeader;
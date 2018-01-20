import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Profile from './Profile.jsx';
import About from './About.jsx';
import Posts from './Posts.jsx';
{/*import Login from './Login.jsx';
import Gallery from './Gallery.jsx';
import Posts from './Posts.jsx';*/}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app_name: "MonetPay"
        };
    }
   render() {
      return (
        <Router>
             <div>
                 <nav class="navbar navbar-toggleable-md navbar-light bg-faded sticky-top">
                    <a class="navbar-brand"><Link to="/posts" style={{ textDecoration: 'none' }}>{this.state.app_name}</Link></a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul class="navbar-nav navbar-right ml-auto">
                            <li>
                                <a class="nav-item nav-link"><Link to="/about" style={{ textDecoration: 'none' }}>About</Link></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link">Gallery</a>
                            </li>
                            <li>
                                <a class="active nav-item nav-link" style={{ textDecoration: 'none' }}><Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link></a>
                            </li>
                            <li>
                                <a class="nav-item nav-link" >Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                 <Switch>
                  <Route exact path='/about' component={About} />
                  <Route exact path='/posts' component={Posts} />
                  <Route exact path='/profile' component={Profile} />
               </Switch>
             </div>
         </Router>
      );
   }
}

export default App;
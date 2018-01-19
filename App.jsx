import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <NavBar />
            <ProfileBox />
         </div>
      );
   }
}

class NavBar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-toggleable-md navbar-light bg-faded sticky-top">
                <a class="navbar-brand" href="#">MonetPay |</a>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul class="navbar-nav navbar-right ml-auto">
                        <li>
                            <a class="nav-item nav-link" href="#">Gallery</a>
                        </li>
                        <li>
                          <a class="active nav-item nav-link" href="#">Profile</a>
                        </li>
                        <li>
                          <a class="nav-item nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

class ProfileBox extends React.Component {
    render() {
        var profilePicture = {
            width:'200px',
            height:'200px',
            background: 'url(propic.jpg) 50% 50% no-repeat',
            display:'block',
            borderRadius:'50%',
            backgroundSize:'cover',
            margin:'20px'
        }
        var profileContainer = {
            margin:'50px'
        }
        return (
            
                <div class="container-fluid" style={profileContainer}>
                    <div class="d-flex flex-row justify-content-center">
                        <div class="float-left" style={profilePicture}></div>
                        <div class="float-right align-self-center">
                            <h1>Anon</h1>
                        </div>
                    </div>
                    <hr class="my-4"></hr>
                </div>
           
            

        )
    }
}
export default App;
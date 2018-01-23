import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Profile extends Component {
   render() {
       return (
           <div>
               <ProfileBox />
               <ProfileGallery />
           </div>
       );
   }
}

class ProfileBox extends Component {
    render() {
        var profilePicture = {
            width:'200px',
            height:'200px',
            background: 'url(/App/propic.jpg) 50% 50% no-repeat',
            display:'block',
            borderRadius:'50%',
            backgroundSize:'cover',
            margin:'20px'
        }
        var profileContainer = {
            margin:'50px'
        }
        
        var userName = "Anon Ymous"
        var numRequests = 5
        var numFollowers = 10
        return (
            
                <div class="container-fluid" style={profileContainer}>
                    <div class="d-flex flex-row justify-content-center">
                        <div class="float-left" style={profilePicture}></div>
                        <div class="float-right align-self-center">
                            <h1>{userName}</h1>
                            <p>#digital #fanart</p>
                            <p>Requests Completed: {numRequests}</p>
                            <p>Followers: {numFollowers}</p>
                        </div>
                    </div>
                    <hr class="my-4"></hr>
                </div>
           
            

        )
    }
}

class ProfileGallery extends Component {
    render() {
        var galleryPictureContainer = {
            width:'30%',
            height:'auto',
            overflow:'hidden',
            margin:'20px',
            background: 'url(/App/propic.jpg) 50% 50% no-repeat',
            backgroundSize: 'cover'
        }
        var galleryPicture = {
            maxHeight:"100%",
            maxWidth:"33%"
        }
        var galleryContainer = {
            maxHeight: '600px',
            height: '600px'
        }
        return (
            <div>
                <h2 class="text-center">Gallery</h2>
                <div class="d-flex flex-wrap" style={galleryContainer}>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                        <div class="card" style={galleryPictureContainer}></div>
                </div>
            </div>
        )
    }
}
export default Profile;
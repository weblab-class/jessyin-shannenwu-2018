import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Posts extends Component {
   render() {
       return (
           <div>
               <Sidebar />
               <PostRequest />
           </div>
       );
   }
}

class Sidebar extends Component {
    render() {
        return(
            <nav id="sidebar">
                {/*<!--Sidebar Header-->

				<!--Sidebar Links-->*/}
				<ul class="list-unstyled components">
                    <input type="text" placeholder="Search.." id="search-box"></input>
		
					<li><a href="#">Tags</a></li>
				</ul>

			</nav>
        );
    }
}

class PostRequest extends Component {
    render(){
        return (
            <div id="posts">
				<input type="button" id="myBtn" value="Request Something!" />

				<div id="myModal" class="modal">
                    {/*<!-- Modal content -->*/}
                    <div class="modal-content">
				        <span class="close">&times;</span>
				    	   <div id="post-maker" class="flex-container">
		                      <div class="post-maker-textbox">
		                          <form action="/action_page.php">
                                    <input title="Request something!" placeholder="Request Something!" class="post-text-display" />
                                    <input type="image" src="post_button.png" alt="Submit" width="48" height="48" />
						          </form>
		                      </div>
				          </div>
				    </div>
				</div>
			</div>
        );
    }
    
}
export default Posts;
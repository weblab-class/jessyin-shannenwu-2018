function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {
        '_id': profileId
    }, function (profileUser) {
        renderUserData(profileUser);

        get('/api/posts', {}, function (postsArr) {
            for (let i = 0; i < postsArr.length; i++) {
                if (profileUser._id == postsArr[i].creator_id) {
                    renderUserPosts(postsArr[i]);
                }
            }
        });

        get('/api/inked', {}, function (inkedArr) {
            for (let i = 0; i < inkedArr.length; i++) {
                if (profileUser._id == inkedArr[i].creator_id) {
                    renderUserGallery(inkedArr[i]);
                }
            }
        });
    });

    get('/api/whoami', {}, function (user) {
        renderNavbar(user);

        const socket=io();

        socket.on('updateProPic', function (msg) {
            const profileImage = document.getElementById('profile-picture');
            profileImage.style = 'background:url(https://s3.amazonaws.com/inkspire/' + msg.image_url + ') 50% 50% no-repeat; background-size:cover;';
        });
    });


}

function renderUserGallery(inkedJSON) {
    const postContainer = document.getElementById('user-inks');
    const cardDiv = document.createElement('div');
    cardDiv.className = "card photo-container";
    cardDiv.setAttribute("style", 'padding:0px');
    const cardImg = document.createElement('img');
    cardImg.className = 'card-img';
    const url = "https://s3.amazonaws.com/inkspire/" + inkedJSON.image_url;
    cardImg.setAttribute('src', url);
    cardDiv.appendChild(cardImg);

    const overlayText = document.createElement('div');
    const overlayPostContent = document.createElement('h1');
    const overlayPostAuthor = document.createElement('small');
    const overlayPostArtist = document.createElement('small');

    const postAuthorIcon = document.createElement('i');
    postAuthorIcon.className = 'fa fa-lightbulb-o';
    overlayPostAuthor.appendChild(postAuthorIcon);

    const postArtistIcon = document.createElement('i');
    postArtistIcon.className = 'fa fa-paint-brush';
    overlayPostArtist.appendChild(postArtistIcon);

    overlayPostArtist.innerHTML += ("  " + inkedJSON.creator_name);

    get('/api/posts', {}, function (postsArr) {
        for (let i = 0; i < postsArr.length; i++) {
            if (inkedJSON.post_id == postsArr[i]._id) {
                overlayPostContent.innerHTML = postsArr[i].content;
                overlayPostAuthor.innerHTML += ("  " + postsArr[i].creator_name);
            }
        }
    });

    overlayText.appendChild(overlayPostContent);
    overlayText.appendChild(overlayPostAuthor);
    overlayText.appendChild(overlayPostArtist);
    //overlayText.setAttribute('style', "display: table-cell; vertical-align: middle;");
    overlayText.className = 'text overlay d-flex align-items-center justify-content-center';

    cardDiv.appendChild(overlayText);
    postContainer.appendChild(cardDiv);
}

function renderUserPosts(postJSON) {

    const postContainer = document.getElementById('user-ideas');

    const card = document.createElement('div');
    card.setAttribute('id', postJSON._id);
    card.className = 'card photo-container';
    postContainer.appendChild(card);    

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    const deleteButton= document.createElement('a');
    deleteButton.className="trash-link";
    deleteButton.setAttribute('data-toggle',"modal");
    deleteButton.href="#delete";
    deleteButton.onclick=function(){
        document.getElementById('deletepost');
    }
    cardBody.appendChild(deleteButton);


    const trashIcon=document.createElement('i');
    trashIcon.className="far fa-trash-alt pull-right";
    trashIcon.setAttribute('aria-hidden','true');
    deleteButton.appendChild(trashIcon);

    const contentSpan = document.createElement('p');
    contentSpan.className = 'post-content card-text';
    contentSpan.innerText = postJSON.content;
    cardBody.appendChild(contentSpan);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    card.appendChild(cardFooter);

    const creatorSpan = document.createElement('a');
    creatorSpan.className = 'post-creator card-title';
    creatorSpan.innerText = postJSON.creator_name;
    creatorSpan.setAttribute('href', '/u/profile?' + postJSON.creator_id)
    cardFooter.appendChild(creatorSpan);

    return card;
}

function renderUserData(user) {
const nameContainer = document.getElementById('name-container');
    const nameHeader = document.createElement('h1');
    nameHeader.innerHTML = user.name;
    nameContainer.appendChild(nameHeader);

    // rendering profile image
    const profileImage = document.getElementById('profile-picture');
    profileImage.className = 'photo-container';
    const overlay = document.createElement('div');
    overlay.setAttribute('style', 'background-color:transparent');

    get('/api/whoami', {}, function (browsingUser) {
        if (window.location.search.substring(1) == browsingUser._id) {
            const uploadLink = document.createElement('a');
            uploadLink.className = 'card-link';
            uploadLink.setAttribute('data-toggle', "modal");
            uploadLink.href = "#upload";

            const overlayIcon = document.createElement('i');
            overlayIcon.className = 'fa fa-upload';
            overlayIcon.setAttribute('style', 'font-size: 3em; color: white;');
            uploadLink.appendChild(overlayIcon);
            overlay.appendChild(uploadLink);
        }
    });
    overlay.className = 'text overlay d-flex flex-column align-items-center justify-content-center';
    profileImage.style = 'background:url(https://s3.amazonaws.com/inkspire/' + user.profile_picture + ') 50% 50% no-repeat; background-size:cover;';
    //profileImage.style = 'background:url(/static/css/propic.jpg) 50% 50% no-repeat; background-size:cover;';
    profileImage.appendChild(overlay);

}


main();

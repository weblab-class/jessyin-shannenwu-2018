function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {
        '_id': profileId
    }, function (profileUser) {
        renderUserData(profileUser);

        get('/api/posts', {}, function (postsArr) {
            for (let i = postsArr.length - 1; i >= 0; i--) {
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

        const socket = io();

        socket.on('updateProPic', function (msg) {
            console.log('updating profile picture');
            const profileImage = document.getElementById('profile-picture');
            profileImage.setAttribute('style', 'background:url(\'https://s3.amazonaws.com/inkspire/' + encodeURIComponent(msg.image_url) + '\') 50% 50% no-repeat; background-size: cover;')
        });

        socket.on('deletePost', function (msg) {
            const deletedpost = document.getElementById(msg.post_id);
            deletedpost.setAttribute('style', 'display:none');
        });

        socket.on('deleteInk', function (msg) {
            const deletedink = document.getElementById(msg.inked_id);
            deletedink.setAttribute('style', 'display:none');
        });
    });


}

function renderUserGallery(inkedJSON) {
    const postContainer = document.getElementById('user-inks');
    const cardDiv = document.createElement('div');
    cardDiv.className = "col-4 card photo-container";
    cardDiv.setAttribute("style", 'padding:0px');
    cardDiv.setAttribute('style', 'background:url(\'https://s3.amazonaws.com/inkspire/' + encodeURIComponent(inkedJSON.image_url) + '\') 50% 50% no-repeat; background-size:cover;');
    //const cardImg = document.createElement('img');
    //cardImg.className = 'card-img';
    //const url = "https://s3.amazonaws.com/inkspire/" + inkedJSON.image_url;
    //cardImg.setAttribute('src', url);
    //cardDiv.appendChild(cardImg);

    const overlayText = document.createElement('div');


    //THIS IS THE EXPAND ICON TO ZOOM IMAGES
    const expandButton = document.createElement('a');
    expandButton.setAttribute('href', '#')
    expandButton.setAttribute('name', encodeURIComponent(inkedJSON.image_url));
    expandButton.className = "hover-bottom-right";


    expandButton.setAttribute('onclick', 'zoomImage(this)');

    overlayText.prepend(expandButton);

    const expandIcon = document.createElement('i');

    expandIcon.className = "fas fa-expand-arrows-alt hover-bottom-right";
    expandIcon.setAttribute('id', "expand-icon");

    expandIcon.setAttribute('aria-hidden', 'true');
    expandButton.prepend(expandIcon);
    //-----

    //UNCOMMENT TO TURN ON USER TEST
    //get('/api/whoami', {}, function (browsingUser) {
    //    if (postJSON.creator_id == browsingUser._id) {
    const deleteButton = document.createElement('a');
    deleteButton.className = "trash-link";
    deleteButton.setAttribute('data-toggle', "modal");
    deleteButton.href = "#delete";
    deleteButton.onclick = function () {
        document.getElementById('deletepost').setAttribute('name', inkedJSON._id);
        document.getElementById('deletepost').setAttribute('onclick', 'deleteInk(this.name)');
    }
    overlayText.prepend(deleteButton);

    const trashIcon = document.createElement('i');

    trashIcon.className = "far fa-trash-alt hoverright";
    trashIcon.setAttribute('id', "trash-icon");

    trashIcon.setAttribute('aria-hidden', 'true');
    deleteButton.prepend(trashIcon);
    //    }
    //});

    const overlayPostContent = document.createElement('p');
    const overlayPostAuthor = document.createElement('small');
    const overlayPostArtist = document.createElement('small');

    const postAuthorIcon = document.createElement('i');
    postAuthorIcon.className = "far fa-lightbulb";
    overlayPostAuthor.appendChild(postAuthorIcon);
    overlayPostAuthor.className = "post-creator";

    const postArtistIcon = document.createElement('i');
    postArtistIcon.className = 'fa fa-paint-brush';
    overlayPostArtist.appendChild(postArtistIcon);
    overlayPostArtist.className = "post-creator";
    overlayPostArtist.innerHTML += ("  " + inkedJSON.creator_name);

    const artistLink = document.createElement('a');
    artistLink.setAttribute('href', '/u/profile?' + inkedJSON.creator_id);
    artistLink.appendChild(overlayPostArtist);

    get('/api/posts', {}, function (postsArr) {
        for (let i = 0; i < postsArr.length; i++) {
            if (inkedJSON.post_id == postsArr[i]._id) {
                overlayPostContent.innerHTML = postsArr[i].content;
                expandButton.setAttribute('id', postsArr[i].content);
                overlayPostAuthor.innerHTML += ("  " + postsArr[i].creator_name);
                overlayPostContent.setAttribute("style", "color:#464a4c;")
                const contentLink = document.createElement('a');
                contentLink.className = "shadow";
                contentLink.setAttribute('href', '/p/idea?' + postsArr[i]._id);
                contentLink.appendChild(overlayPostContent);

                const authorLink = document.createElement('a');
                authorLink.setAttribute('href', '/u/profile?' + postsArr[i].creator_id);
                authorLink.appendChild(overlayPostAuthor);
                overlayText.prepend(contentLink);
                overlayText.appendChild(authorLink);
                const timeStamp = document.createElement('p');
                timeStamp.className = 'time-stamp';
                var date = new Date(postsArr[i].date);
                timeStamp.innerText = date.toLocaleDateString();
                timeStamp.setAttribute('style', 'font-size:0.75em');
                overlayText.append(timeStamp);
            }
        }
    });



    overlayText.appendChild(artistLink);
    //overlayText.setAttribute('style', "display: table-cell; vertical-align: middle;");
    overlayText.className = 'text overlay align-items-center justify-content-center';
    cardDiv.appendChild(overlayText);
    cardDiv.setAttribute('id', inkedJSON._id);
    postContainer.appendChild(cardDiv);
}

function renderUserPosts(postJSON) {
    const postContainer = document.getElementById('user-ideas');

    const card = document.createElement('div');
    card.setAttribute('id', postJSON._id);
    card.className = 'card box';
    postContainer.appendChild(card);

    const cardHeader = document.createElement('div');
    cardHeader.className = "card-header";
    card.appendChild(cardHeader);
    card.setAttribute('style', 'margin-bottom:1rem;')


    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    //UNCOMMENT TO TURN ON USER TEST
    //get('/api/whoami', {}, function (browsingUser) {
    //    if (postJSON.creator_id == browsingUser._id) {
    const deleteButton = document.createElement('a');
    deleteButton.className = "trash-link";
    deleteButton.setAttribute('data-toggle', "modal");
    deleteButton.href = "#delete";
    deleteButton.onclick = function () {
        document.getElementById('deletepost').setAttribute('name', postJSON._id);
        document.getElementById('deletepost').setAttribute('onclick', 'deletePost(this.name)');
    }
    cardHeader.prepend(deleteButton);

    const trashIcon = document.createElement('i');
    trashIcon.className = "far fa-trash-alt pull-right";
    trashIcon.setAttribute('aria-hidden', 'true');

    deleteButton.prepend(trashIcon);


    const contentLink = document.createElement('a');
    contentLink.setAttribute('href', '/p/idea?' + postJSON._id);
    const contentSpan = document.createElement('p');
    contentSpan.className = 'post-content card-text';
    contentSpan.innerText = postJSON.content;
    contentLink.appendChild(contentSpan);
    cardBody.appendChild(contentLink);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    card.appendChild(cardFooter);

    const timeStamp = document.createElement('p');
    timeStamp.className = 'time-stamp';
    var date = new Date(postJSON.date);
    timeStamp.innerText = date.toLocaleDateString();
    cardFooter.appendChild(timeStamp);

    const creatorSpan = document.createElement('a');
    creatorSpan.className = 'post-creator card-title';
    creatorSpan.innerText = postJSON.creator_name;
    creatorSpan.setAttribute('href', '/u/profile?' + postJSON.creator_id);
    creatorSpan.setAttribute('style', "color:#AADDDD")
    cardHeader.appendChild(creatorSpan);


    return card;
}

function renderUserData(user) {
    // rendering name
    
    const nameContainer = document.getElementById('name-container');
    const nameHeader = document.createElement('h1');
    nameHeader.innerHTML = user.name;
    // nameHeader.className = 'page-description text-center';
    nameContainer.appendChild(nameHeader);

    // rendering profile image
    const profileImage = document.getElementById('profile-picture');
    // profileImage.className = 'photo-container';
    const overlay = document.createElement('div');
    overlay.setAttribute('style', 'background-color:transparent; width:200px;height:200px');

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
    overlay.className = 'text overlay align-items-center justify-content-center';
    console.log(user.profile_picture);
    profileImage.setAttribute('style', 'background:url(\'https://s3.amazonaws.com/inkspire/' + encodeURIComponent(user.profile_picture) + '\') 50% 50% no-repeat; background-size:cover;');
    //profileImage.style = 'background:url(/static/css/propic.jpg) 50% 50% no-repeat; background-size:cover;';
    profileImage.appendChild(overlay);

}

function deletePost(postId) {
    get('/api/post/' + postId + '/remove', {}, function (post) {
        console.log('deleting post' + post._id);
    });
}

function deleteInk(inkId) {
    get('/api/ink/' + inkId + '/remove', {}, function (post) {
        console.log('deleting post' + inkId);
    });
}

function zoomImage(ink) {
    console.log(ink);
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = 'https://s3.amazonaws.com/inkspire/' + ink.getAttribute('name');
    captionText.innerHTML = ink.getAttribute('id');
}


main();

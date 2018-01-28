function main() {
    const ideaId = window.location.search.substring(1);
    get('/api/posts', {}, function (ideaPosts) {
        for (let p = 0; p < ideaPosts.length; p++) {
            if (ideaPosts[p]._id == ideaId) {
                renderPostData(ideaPosts[p]);
                get('/api/inked', {}, function (inkedArr) {
                    for (let i = 0; i < inkedArr.length; i++) {
                        if (ideaPosts[p]._id == inkedArr[i].post_id) {
                            renderUserGallery(inkedArr[i]);
                        }
                    }
                });
            }
        }
    });

    get('/api/whoami', {}, function (user) {
        renderNavbar(user);
    });


}

function renderPostData(post) {
    // rendering name
    const postContainer = document.getElementById('post-container');
    const postSpan = document.createElement('span');
    /*const ideaIcon = document.createElement('i');
ideaIcon.className = 'fa fa-lightbulb-o';*/
    const postHeader = document.createElement('h1');
    postHeader.setAttribute('class', 'page-description text-center');
    postHeader.innerText = "\"" + post.content + "\"";
    //postSpan.appendChild(ideaIcon);
    postSpan.appendChild(postHeader);
    postContainer.appendChild(postSpan);
}

function renderUserGallery(inkedJSON) {
    console.log(inkedJSON);
    const postContainer = document.getElementById('post-inks');
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

    const artistLink = document.createElement('a');
    artistLink.setAttribute('href', '/u/profile?' + inkedJSON.creator_id);
    artistLink.appendChild(overlayPostArtist);

    get('/api/posts', {}, function (postsArr) {
        for (let i = 0; i < postsArr.length; i++) {
            if (inkedJSON.post_id == postsArr[i]._id) {
                overlayPostContent.innerHTML = postsArr[i].content;
                overlayPostAuthor.innerHTML += ("  " + postsArr[i].creator_name);

                const contentLink = document.createElement('a');
                contentLink.setAttribute('href', '/p/idea?' + postsArr[i]._id);
                contentLink.appendChild(overlayPostContent);

                const authorLink = document.createElement('a');
                authorLink.setAttribute('href', '/u/profile?' + postsArr[i].creator_id);
                authorLink.appendChild(overlayPostAuthor);
                overlayText.prepend(contentLink);
                overlayText.appendChild(authorLink);
            }
        }
    });

    overlayText.appendChild(artistLink);

    //overlayText.setAttribute('style', "display: table-cell; vertical-align: middle;");
    overlayText.className = 'text overlay d-flex flex-column align-items-center justify-content-center';

    cardDiv.appendChild(overlayText);
    postContainer.appendChild(cardDiv);
}


main();

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
    const postHeader = document.createElement('h1');
    postHeader.setAttribute('class', 'idea-description text-center');
    postHeader.innerText = "\"" + post.content + "\"";
    postContainer.appendChild(postHeader);
}

function renderUserGallery(inkedJSON) {
    const postContainer = document.getElementById('post-inks');
    const cardDiv = document.createElement('div');
    cardDiv.className = "col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 card photo-container";
    cardDiv.setAttribute("style", 'padding:0px');
    cardDiv.setAttribute('style', 'background:url(\'https://s3.amazonaws.com/inkspire/' + encodeURIComponent(inkedJSON.image_url) + '\') 50% 50% no-repeat; background-size:cover;');

    const overlayText = document.createElement('div');
    //THIS IS THE EXPAND ICON TO ZOOM IMAGES
    const expandButton = document.createElement('a');
    expandButton.setAttribute('href', '#');
    expandButton.setAttribute('name', encodeURIComponent(inkedJSON.image_url));
    expandButton.className = "hover-bottom-right";

    expandButton.setAttribute('onclick', 'zoomImage(this)');

    overlayText.prepend(expandButton);

    const expandIcon = document.createElement('i');

    expandIcon.className = "fas fa-expand-arrows-alt hover-bottom-right";
    expandIcon.setAttribute('id', "expand-icon");

    expandIcon.setAttribute('aria-hidden', 'true');
    expandButton.prepend(expandIcon);
    //-----    overlayText.setAttribute('onclick', 'zoomImage(this)');
    const overlayContent=document.createElement('div');
    const overlayPostContent = document.createElement('p');
    const overlayPostAuthor = document.createElement('p');
    const overlayPostArtist = document.createElement('p');

    const postAuthorIcon = document.createElement('i');
    postAuthorIcon.className = 'far fa-lightbulb';
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
                overlayContent.prepend(contentLink);
                overlayContent.appendChild(authorLink);

                const timeStamp = document.createElement('p');
                timeStamp.className = 'time-stamp';
                var date = new Date(postsArr[i].date);
                timeStamp.innerText = date.toLocaleDateString();
                timeStamp.setAttribute('style', 'font-size:0.75em');
                overlayContent.append(timeStamp);
            }
        }
    });

    overlayContent.appendChild(artistLink);
    overlayContent.className = 'overlay-content';
    overlayText.appendChild(overlayContent);
    overlayText.className='text overlay align-middle justify-content-center';
    cardDiv.appendChild(overlayText);
    postContainer.appendChild(cardDiv);
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

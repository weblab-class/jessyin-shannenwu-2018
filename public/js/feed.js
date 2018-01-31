function postDOMObject(postJSON, user) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-sm';

    // creates entire card, adds it to the column
    const card = document.createElement('div');
    card.setAttribute('id', postJSON._id);
    //card.setAttribute('onclick', 'likePost(this.id)');
    card.className = 'card box';
    colDiv.appendChild(card);

    //creates div to append inked button first
    const inkedDiv = document.createElement('div');
    inkedDiv.className = 'inked-body';
    //creates link to the button
    const inkedButton = document.createElement('a');
    inkedButton.className = 'card-link pull-right';
    inkedButton.setAttribute('data-toggle', "modal");
    inkedButton.href = "#upload";
    inkedButton.innerText = 'ink it! ';
    inkedButton.onclick = function () {
        document.getElementById('addphoto').setAttribute('name', postJSON._id);
    };
    //gets icon from fontawesome
    const inkedIcon = document.createElement('i');
    inkedIcon.className = 'fa fa-paint-brush';
    // inkedIcon.setAttribute('style', "font-size:1em");
    inkedIcon.setAttribute('aria-hidden', 'true');
    inkedButton.appendChild(inkedIcon);
    inkedDiv.appendChild(inkedButton);
    //append ink button
    card.appendChild(inkedDiv);

    //cardBody contains actual text post
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);


    const contentLink = document.createElement('a');
    contentLink.setAttribute('href', '/p/idea?' + postJSON._id);
    const contentSpan = document.createElement('p');
    contentSpan.className = 'post-content card-text';
    contentSpan.innerText = postJSON.content;
    contentSpan.setAttribute('style', 'padding-bottom:0.25em');
    contentLink.appendChild(contentSpan);
    cardBody.appendChild(contentLink);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    card.appendChild(cardFooter);

    const creatorSpan = document.createElement('a');
    creatorSpan.className = 'post-creator-box card-title pull-left';
    creatorSpan.innerText = postJSON.creator_name;
    creatorSpan.setAttribute('style', 'color:#AADDDD')
    creatorSpan.setAttribute('href', '/u/profile?' + postJSON.creator_id);
    inkedDiv.appendChild(creatorSpan);
    card.setAttribute('style', 'margin-bottom:1rem');

    const timeStamp = document.createElement('p');
    timeStamp.className = 'time-stamp';
    var date = new Date(postJSON.date);
    timeStamp.innerText = date.toLocaleDateString();

    //like button
    const likeButton = document.createElement('a');
    likeButton.href = '#boop';
    likeButton.className = 'hover-bottom-left like-button';
    likeButton.setAttribute('value', postJSON._id);
    likeButton.setAttribute('onclick', 'likePost(this)');
    const likeText = document.createElement('span');
    likeText.innerText = ' ' + postJSON.likes;
    likeText.setAttribute('name', postJSON._id);
    likeButton.appendChild(likeText);
    //gets icon from fontawesome
    const likedIcon = document.createElement('i');
    //CHECK IF USER HAS LIKED THIS BEFORE
    const likedIconDiv = document.createElement('span');
    likedIcon.className = 'fa fa-heart';

    likedIcon.setAttribute('aria-hidden', 'true');
    likedIconDiv.setAttribute('id', postJSON._id + 'filledheart');
    likedIconDiv.setAttribute('style', 'display:none');
    likedIconDiv.appendChild(likedIcon);
    const likeIcon = document.createElement('i');
    const likeIconDiv = document.createElement('span');

    //CHECK IF USER HAS LIKED THIS BEFORE
    likeIcon.className = 'fa fa-heart-o';

    likeIcon.setAttribute('aria-hidden', 'true');
    likeIconDiv.setAttribute('id', postJSON._id + 'emptyheart');
    likeIconDiv.appendChild(likeIcon);
    likeButton.prepend(likeIconDiv);
    likeButton.prepend(likedIconDiv);

    cardFooter.appendChild(likeButton);
    cardFooter.appendChild(timeStamp);


    return card;
}

function submitPostHandler() {
    const newPostInput = document.getElementById('post-content-input');

    const data = {
        content: newPostInput.value,
    };
    if (newPostInput.value !== "") {
        post('/api/posts', data);
        newPostInput.value = "";
    } else {
        alert("please enter an idea!");
    }

}

function newPostDOMObject() {
    const newPostDiv = document.createElement('div');
    newPostDiv.className = 'input-group my-3';

    // input for creating a new Post
    const newPostContent = document.createElement('input');

    newPostContent.setAttribute('type', 'text');
    newPostContent.setAttribute('placeholder', '');
    newPostContent.className = 'form-control';
    newPostContent.setAttribute('id', 'post-content-input');
    newPostContent.setAttribute('maxlength', 90);
    newPostContent.name = 'idea';


    newPostDiv.appendChild(newPostContent);


    const newPostButtonDiv = document.createElement('div');
    newPostButtonDiv.className = 'input-group-append';
    newPostDiv.appendChild(newPostButtonDiv);

    const newPostSubmit = document.createElement('button');
    newPostSubmit.innerHTML = 'submit';
    newPostSubmit.className = 'btn btn-outline-primary submit';
    // here: handler for when we submit the post
    newPostSubmit.addEventListener('click', submitPostHandler);
    newPostButtonDiv.appendChild(newPostSubmit);

    return newPostDiv;
}

function predicateBy(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

// Makes API requests and calls helper functions
function renderPosts(user) {
    if (user._id !== undefined) {
        document.getElementById('new-post').appendChild(newPostDOMObject());
    }

    const postsDiv = document.getElementById('posts');
    get('/api/posts', {}, function (postsArr) {
        if (window.location.search.substring(1) == 'likes') {
            postsArr.sort(predicateBy('likes'));
        } else if (window.location.search.substring(1) == 'author') {
            postsArr.sort(predicateBy('creator_id'));
        } else {
            postsArr.sort(predicateBy('date'));
        }
        for (let i = 0; i < postsArr.length; i++) {
            const currentPost = postsArr[i];
            postsDiv.prepend(postDOMObject(currentPost, user));
        }

        get('/api/likes', {}, function (userlike) {
            for (let i = 0; i < userlike.length; i++) {
                if (userlike[i].user_id == user._id) {
                    const id = userlike[i].post_id + 'emptyheart';
                    const idfull = userlike[i].post_id + 'filledheart';
                    //
                    var waitForEl = function (selector, callback) {
                        if (jQuery(selector).length >= postsArr.length * 3 + 1) {
                            callback();
                        } else {
                            console.log('not time yet!')
                            setTimeout(function () {
                                waitForEl(selector, callback);
                            }, 100);
                        }
                    };

                    waitForEl('i', function () {
                        console.log(id);
                        const heart = document.getElementById(id);
                        heart.setAttribute('style', 'display:none');
                        const heartFull = document.getElementById(idfull);
                        heartFull.setAttribute('style', 'display:inline');
                    });
                }
            }
        });
    });
}

function likePost(post) {
    console.log($(post).attr('value'));
    postId = $(post).attr('value');
    get('/api/post/' + postId + '/like', {}, function (post) {});
}

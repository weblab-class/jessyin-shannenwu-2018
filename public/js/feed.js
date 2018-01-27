function postDOMObject(postJSON, user) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-sm';

    const card = document.createElement('div');
    card.setAttribute('id', postJSON._id);
    card.className = 'card';
    colDiv.appendChild(card);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    const contentLink = document.createElement('a');
    contentLink.setAttribute('href', '/p/idea?' + postJSON._id);
    const contentSpan = document.createElement('p');
    contentSpan.className = 'post-content card-text';
    contentSpan.innerText = postJSON.content;
    contentLink.appendChild(contentSpan);
    cardBody.appendChild(contentLink);

    const inkedButton = document.createElement('a');
    inkedButton.className = 'card-link';
    inkedButton.setAttribute('data-toggle', "modal");
    inkedButton.href = "#upload";
    inkedButton.innerHTML = 'inked';
    inkedButton.onclick = function () {
        document.getElementById('addphoto').setAttribute('name', postJSON._id);
    };

    cardBody.appendChild(inkedButton);

    const inkedIcon = document.createElement('i');
    inkedIcon.className = 'fa fa-paint-brush';
    inkedIcon.setAttribute('aria-hidden', 'true')
    inkedButton.appendChild(inkedIcon)


    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    card.appendChild(cardFooter);

    const creatorSpan = document.createElement('a');
    creatorSpan.className = 'post-creator card-title';
    creatorSpan.innerHTML = postJSON.creator_name;
    creatorSpan.setAttribute('href', '/u/profile?' + postJSON.creator_id)
    cardFooter.appendChild(creatorSpan);

    return card;
}

function submitPostHandler() {
    const newPostInput = document.getElementById('post-content-input');

    const data = {
        content: newPostInput.value,
    };

    post('/api/posts', data);

    newPostInput.value = '';
}

function newPostDOMObject() {
    const newPostDiv = document.createElement('div');
    newPostDiv.className = 'input-group my-3';

    // input for creating a new Post
    const newPostContent = document.createElement('input');
    newPostContent.setAttribute('type', 'text');
    newPostContent.setAttribute('placeholder', 'new idea!');
    newPostContent.className = 'form-control';
    newPostContent.setAttribute('id', 'post-content-input');
    newPostContent.setAttribute('maxlength', 140);
    newPostDiv.appendChild(newPostContent);

    const newPostButtonDiv = document.createElement('div');
    newPostButtonDiv.className = 'input-group-append';
    newPostDiv.appendChild(newPostButtonDiv);

    const newPostSubmit = document.createElement('button');
    newPostSubmit.innerHTML = 'submit';
    newPostSubmit.className = 'btn btn-outline-primary';
    // here: handler for when we submit the post
    newPostSubmit.addEventListener('click', submitPostHandler);
    newPostButtonDiv.appendChild(newPostSubmit);

    return newPostDiv;
}


// Makes API requests and calls helper functions
function renderPosts(user) {
    if (user._id !== undefined) {
        document.getElementById('new-post').appendChild(newPostDOMObject());
    }

    const postsDiv = document.getElementById('posts');
    get('/api/posts', {}, function (postsArr) {
        for (let i = 0; i < postsArr.length; i++) {
            const currentPost = postsArr[i];
            postsDiv.prepend(postDOMObject(currentPost, user));
        }
    });
}

function postDOMObject(postJSON, user) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-sm';

    // creates entire card, adds it to the column
    const card = document.createElement('div');
    card.setAttribute('id', postJSON._id);
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
    inkedButton.innerText = 'inked ';
    inkedButton.onclick = function () {
        document.getElementById('addphoto').setAttribute('name', postJSON._id);
    };
    //gets icon from fontawesome
    const inkedIcon = document.createElement('i');
    inkedIcon.className = 'fa fa-paint-brush';
    inkedIcon.setAttribute('aria-hidden', 'true')
    inkedButton.appendChild(inkedIcon)
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
    contentLink.appendChild(contentSpan);
    cardBody.appendChild(contentLink);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    card.appendChild(cardFooter);

    const creatorSpan = document.createElement('a');
    creatorSpan.className = 'post-creator card-title pull-left';
    creatorSpan.innerText = postJSON.creator_name;
    creatorSpan.setAttribute('style', 'color:#AADDDD')
    creatorSpan.setAttribute('href', '/u/profile?' + postJSON.creator_id);
    inkedDiv.appendChild(creatorSpan);
    card.setAttribute('style', 'margin-bottom:1rem');

    const timeStamp = document.createElement('p');
    timeStamp.className = 'time-stamp';
    var date = new Date(postJSON.date);
    timeStamp.innerText = date.toLocaleDateString();
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
    newPostContent.setAttribute('placeholder', 'new idea!');
    newPostContent.className = 'form-control';
    newPostContent.setAttribute('id', 'post-content-input');
    newPostContent.setAttribute('maxlength', 140);

    const line = document.createElement('span');
    line.className = 'focus-border';
    newPostDiv.appendChild(newPostContent);
    newPostDiv.appendChild(line);

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
        // postsArr.sort(predicateBy('creator_name'));
        for (let i = 0; i < postsArr.length; i++) {
            const currentPost = postsArr[i];
            postsDiv.prepend(postDOMObject(currentPost, user));
        }
    });
}

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
    });


}

function renderUserGallery(inkedJSON) {
    const postContainer = document.getElementById('user-inks');
    const cardDiv = document.createElement('div');
    cardDiv.className = "card";
    cardDiv.setAttribute("style", 'padding:0px');
    const cardImg = document.createElement('img');
    cardImg.className = 'card-img';
    const url = "https://s3.amazonaws.com/inkspire/" + inkedJSON.image_url;
    cardImg.setAttribute('src', url);
    cardDiv.appendChild(cardImg);
    postContainer.appendChild(cardDiv);
}

function renderUserPosts(postJSON) {

    const postContainer = document.getElementById('user-ideas');

    const card = document.createElement('div');
    card.setAttribute('id', postJSON._id);
    card.className = 'card';
    postContainer.appendChild(card);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    const contentSpan = document.createElement('p');
    contentSpan.className = 'post-content card-text';
    contentSpan.innerHTML = postJSON.content;
    cardBody.appendChild(contentSpan);

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

function renderUserData(user) {
    // rendering name
    const nameContainer = document.getElementById('name-container');
    const nameHeader = document.createElement('h1');
    nameHeader.innerHTML = user.name;
    nameContainer.appendChild(nameHeader);

    // rendering profile image
    const profileImage = document.getElementById('profile-picture');
    profileImage.style = 'background:url(/static/css/propic.jpg) 50% 50% no-repeat; background-size:cover;';


}


main();

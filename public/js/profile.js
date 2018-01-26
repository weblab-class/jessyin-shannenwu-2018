function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {
        '_id': profileId
    }, function (profileUser) {
        renderUserData(profileUser);
        get('/api/posts', {
            'creator_id': profileId
        }, function (postsArr) {
            for (let i = 0; i < postsArr.length; i++) {
                if (profileUser._id == postsArr[i].creator_id) {
                    renderUserPosts(postsArr[i]);
                }
            }
        });
        console.log('here');
        get('/api/inked', {
            'creator_id': profileId
        }, function (inkedArr) {
            console.log('hi')
            for (let i = 0; i < inkedArr.length; i++) {
                if (profileUser._id == inkedArr[i].creator_id) {
                    console.log(inkedArr[i].image_url);
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

}

function renderUserPosts(postJSON) {

    const postContainer = document.getElementById('gallery-container');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-sm';
    postContainer.appendChild(colDiv);

    const card = document.createElement('div');
    card.setAttribute('id', postJSON._id);
    card.className = 'card';
    colDiv.appendChild(card);

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

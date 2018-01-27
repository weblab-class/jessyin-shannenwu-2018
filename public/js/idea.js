function main() {
    const ideaId = window.location.search.substring(1);
    get('/api/post', {
        '_id': ideaId
    }, function (ideaPost) {
        renderPostData(ideaPost);
        get('/api/inked', {}, function (inkedArr) {
            for (let i = 0; i < inkedArr.length; i++) {
                if (ideaPost._id == inkedArr[i].post_id) {
                    renderUserGallery(inkedArr[i]);
                }
            }
        });
    });

    get('/api/whoami', {}, function (user) {
        renderNavbar(user);
    });


}

function renderPostData(post) {
    // rendering name
    const nameContainer = document.getElementById('post-container');
    const nameHeader = document.createElement('h1');
    nameHeader.innerHTML = post.content;
    nameContainer.appendChild(nameHeader);

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


main();

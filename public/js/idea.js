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
    postHeader.innerHTML = post.content;
    //postSpan.appendChild(ideaIcon);
    postSpan.appendChild(postHeader);
    postContainer.appendChild(postSpan);
}

function renderUserGallery(inkedJSON) {
    console.log(inkedJSON);
    const postContainer = document.getElementById('post-inks');
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

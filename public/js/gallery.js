function main() {

    get('/api/inked', {}, function (inkedArr) {
        for (let i = 0; i < inkedArr.length; i++) {
            renderGallery(inkedArr[i]);
        }
    });

    get('/api/whoami', {}, function (user) {
        renderNavbar(user);
    });
}


function renderGallery(inkedJSON) {

    const postContainer = document.getElementById('photo-holder');
    const cardDiv = document.createElement('div');
    cardDiv.className = "card photo-container";
    cardDiv.setAttribute("style", 'padding:0px');
    const cardImg = document.createElement('img');
    cardImg.className = 'card-img';
    const url = "https://s3.amazonaws.com/inkspire/" + inkedJSON.image_url;
    cardImg.setAttribute('src', url);
    cardDiv.appendChild(cardImg);

    const cardOverlay = document.createElement('div');
    cardOverlay.className = "overlay";
    var postcontent;

    console.log(postcontent);
    const overlayText = document.createElement('div');

    get('/api/posts', {}, function (postsArr) {
        for (let i = 0; i < postsArr.length; i++) {
            if (inkedJSON.post_id == postsArr[i]._id) {
                overlayText.innerHTML = postsArr[i].content;
            }
        }
    });

    overlayText.setAttribute('style', "display: table-cell; vertical-align: middle;");
    overlayText.className = 'text';
    cardOverlay.appendChild(overlayText);

    cardDiv.appendChild(cardOverlay);
    postContainer.appendChild(cardDiv);
}

main();

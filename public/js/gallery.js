function main() {

    get('/api/inked', {}, function (inkedArr) {

        for (let i = 0; i < inkedArr.length; i++) {
            console.log(inkedArr[i]);
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

    const overlayText = document.createElement('div');
    overlayText.innerHTML = "post description";
    overlayText.class = 'text';
    cardOverlay.appendChild(overlayText);

    cardDiv.appendChild(cardOverlay);
    postContainer.appendChild(cardDiv);
}

main();

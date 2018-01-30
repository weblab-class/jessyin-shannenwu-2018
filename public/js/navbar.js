function newNavbarItem(text, url) {
    const listItem = document.createElement('li');

    listItem.className = "nav-item active js-scroll-trigger shadow navbar-fixed-top";
    const itemLink = document.createElement('a');
    itemLink.className = 'nav-link pull-right';
    itemLink.setAttribute('id', text);
    itemLink.innerText = text;
    itemLink.href = url;
    itemLink.setAttribute("style", "color:white;font-size:large");
    listItem.appendChild(itemLink);

    return listItem;
}


function renderNavbar(user) {
    const navbarDiv = document.getElementById('navbar');
    const navbarDivStyles = document.createElement('nav');

    navbarDivStyles.setAttribute('id', 'mainNav');
    navbarDivStyles.setAttribute('class', "navbar fixed-top navbar-toggleable-md navbar-light navbar-expand-lg ");
    navbarDiv.appendChild(navbarDivStyles);
    // do the brand stuff 
    const navbarBrand = document.createElement('a');
    navbarBrand.setAttribute('class', 'navbar-brand js-scroll-trigger shadow');
    navbarBrand.href = "#page-top";
    navbarDivStyles.appendChild(navbarBrand);
    // do the toggler
    const navbarToggler = document.createElement('button');
    navbarToggler.setAttribute('class', "navbar-toggler navbar-toggler-right button");
    navbarToggler.setAttribute('type', "button");
    navbarToggler.setAttribute('data-toggle', "collapse");
    navbarToggler.setAttribute('data-target', "#navbarNavAltMarkup");
    navbarToggler.setAttribute('aria-controls', "navbarNavAltMarkup");
    navbarToggler.setAttribute('aria-expanded', "false");
    navbarToggler.setAttribute('aria-label', "Toggle navigation");
    // toggler button
    const toggleButton = document.createElement("span");
    toggleButton.setAttribute('class', "navbar-toggler-icon");
    navbarToggler.appendChild(toggleButton);
    navbarDivStyles.appendChild(navbarToggler);

    // next div after button
    const navbarLinksDiv = document.createElement('div');
    navbarLinksDiv.setAttribute('class', 'collapse navbar-collapse');
    navbarLinksDiv.setAttribute('id', 'navbarNavAltMarkup');
    navbarDivStyles.appendChild(navbarLinksDiv);

    // ul block
    const navbarLinksList = document.createElement('ul');
    navbarLinksList.className = 'navbar-nav navbar-right ml-auto'
    navbarLinksDiv.appendChild(navbarLinksList);
    const logo = document.createElement('img');
    logo.setAttribute('src', "/static/logov6.png");
    logo.setAttribute('style', 'width: auto; height:30px');
    navbarBrand.appendChild(logo);
    if (user._id) {
        navbarBrand.href = '/posts';
    } else {
        navbarBrand.href = '/about';
    }
    navLogoText = document.createElement('span');

    navLogoText.innerHTML = '   inkspire';
    navLogoText.setAttribute('style', 'font-family: \'Sacramento\', cursive;font-size:2em;');

    navLogoText.className = 'shadow';

    navbarBrand.appendChild(navLogoText);

    if (user._id) {
        navbarLinksList.appendChild(newNavbarItem('ideas', '/posts'));
        navbarLinksList.appendChild(newNavbarItem('gallery', '/gallery'));
        navbarLinksList.appendChild(newNavbarItem('profile', '/u/profile?' + user._id));
        navbarLinksList.appendChild(newNavbarItem('logout', '/logout'));
    } else {
        navbarLinksList.appendChild(newNavbarItem('gallery', '/gallery'));
        navbarLinksList.appendChild(newNavbarItem('login', 'auth/google'));
    }

    navbarLinksList.appendChild(newNavbarItem('about', '/about'));


    switch (navbarDiv.className) {
        case "ideas":
            document.getElementById("ideas").setAttribute("style", "color:white; border-bottom: #AADDDD solid 4px; padding-bottom:0; font-size:large");
            break;
        case "about":
            document.getElementById("about").setAttribute("style", "color:white; border-bottom: #AADDDD solid 4px; padding-bottom:0;font-size:large");
            //            document.getElementById('mainNav').setAttribute('style', "background-color:transparent");

            break;
        case "gallery":
            document.getElementById("gallery").setAttribute("style", "color:white; border-bottom: #AADDDD solid 4px; padding-bottom:0;font-size:large");
            break;
            // case "profile":
            //     document.getElementById("profile").setAttribute("style", "color:white; border-bottom: #AADDDD solid 4px; padding-bottom:0;");
            //     break;
    }
    get('/api/whoami', {}, function (browsingUser) {


        if (window.location.search.substring(1) == browsingUser._id) {
            document.getElementById("profile").setAttribute("style", "color:white; border-bottom: #AADDDD solid 4px; padding-bottom:0;font-size:large");
        }
    })
}

$(window).scroll(function () {
    const navbarDiv = document.getElementById('navbar');
    if ($(document).scrollTop() > 50) {
        $('nav').addClass('navbar-shrink');
        if (navbarDiv.className == 'about') {
            $('nav').attr('style', 'background-color:#93d2d2b3;');
        }
    } else {
        $('nav').removeClass('navbar-shrink');
        if (navbarDiv.className == 'about') {
            $('nav').attr('style', 'background-color:transparent;');
        }

    }
});

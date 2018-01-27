function newNavbarItem(text, url) {
    const listItem = document.createElement('li');
    const itemLink = document.createElement('a');
    itemLink.className = 'nav-item nav-link';
    itemLink.setAttribute('id', text);
    itemLink.innerHTML = text;
    itemLink.href = url;
    listItem.appendChild(itemLink);

    return listItem;
}


function renderNavbar(user) {
    const navbarDiv = document.getElementById('navbar');
    const navbarDivStyles = document.createElement('nav');
    navbarDivStyles.setAttribute('class', "navbar fixed-top navbar-toggleable-md navbar-light bg-faded");
    navbarDiv.appendChild(navbarDivStyles);
    
    const navbarToggler = document.createElement('button');
    const toggleButton=document.createElement("span");
    toggleButton.setAttribute('class',"navbar-toggler-icon");
    navbarToggler.setAttribute('class', "navbar-toggler");
    navbarToggler.setAttribute('type',"button");
    navbarToggler.setAttribute('data-toggle',"collapse");
    navbarToggler.setAttribute('data-target',"#navbarNavAltMarkup" );
    navbarToggler.setAttribute('aria-controls',"navbarNavAltMarkup");
    navbarToggler.setAttribute('aria-expanded',"false");
    navbarToggler.setAttribute('aria-label',"Toggle navigation");
    navbarToggler.appendChild(toggleButton);
    
    const navbarBrand = document.createElement('a');
    navbarBrand.setAttribute('class', 'navbar-brand');

    navbarDivStyles.appendChild(navbarBrand);

    const navbarLinksDiv = document.createElement('div');
    navbarLinksDiv.setAttribute('class', 'collapse navbar-collapse');
    navbarLinksDiv.setAttribute('id', 'navbarNavAltMarkup');
    navbarDivStyles.appendChild(navbarLinksDiv);

    const navbarLinksList = document.createElement('ul');
    navbarLinksList.className = 'navbar-nav navbar-right ml-auto'
    navbarLinksDiv.appendChild(navbarLinksList);

    if (user._id) {
        navbarBrand.href = '/posts';
    } else {
        navbarBrand.href = '/about'
    }
    navbarBrand.innerHTML = "inkspire"

    if (user._id) {
        navbarLinksList.appendChild(newNavbarItem('ideas', '/posts'));
        navbarLinksList.appendChild(newNavbarItem('gallery', '/gallery'));
        navbarLinksList.appendChild(newNavbarItem('profile', '/u/profile?' + user._id));
        navbarLinksList.appendChild(newNavbarItem('logout', '/logout'));
    } else {
        navbarLinksList.appendChild(newNavbarItem('login', 'auth/google'));
    }


    navbarLinksList.appendChild(newNavbarItem('about', '/about'));
    if (navbarDiv.className == "ideas") {
        document.getElementById("ideas").setAttribute("style", "border-bottom: #AADDDD solid 4px; padding-bottom:0;");
    }
    if (navbarDiv.className == "about") {
        document.getElementById("about").setAttribute("style", "border-bottom: #AADDDD solid 4px; padding-bottom:0;");
    }
    if (navbarDiv.className == "gallery") {
        document.getElementById("gallery").setAttribute("style", "border-bottom: #AADDDD solid 4px; padding-bottom:0;");
    }
    if (navbarDiv.className == "profile") {
        document.getElementById("profile").setAttribute("style", "border-bottom: #AADDDD solid 4px; padding-bottom:0;");
    }
}
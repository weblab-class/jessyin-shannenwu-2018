function newNavbarItem(text, url) {
    const listItem = document.createElement('li');
    const itemLink = document.createElement('a');
    itemLink.setAttribute('id', text);
    itemLink.className = 'nav-item nav-link';
    itemLink.innerHTML = text;
    itemLink.href = url;
    listItem.appendChild(itemLink);

    return listItem;
}

/*
<nav class="navbar navbar-toggleable-md navbar-light bg-faded sticky-top">
            <a class="navbar-brand" style="padding-left: 1em;" href="posts">inkspire</a>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul class="navbar-nav navbar-right ml-auto">
                    <li>
                        <a class="nav-item nav-link" href="about">About</a>
                    </li>
                    <li>
                        <a class="nav-item nav-link" href="#">Gallery</a>
                    </li>
                    <li>
                        <a class="active nav-item nav-link" href="u/profile">Profile</a>
                    </li>
                    <li>
                        <a class="nav-item nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
        */

function renderNavbar(user) {
    const navbarDiv = document.getElementById('navbar');
    const navbarDivStyles = document.createElement('nav');
    navbarDivStyles.setAttribute('class', "navbar navbar-toggleable-md navbar-light bg-faded sticky-top");
    navbarDiv.appendChild(navbarDivStyles);

    const navbarBrand = document.createElement('a');
    navbarBrand.setAttribute('class', 'navbar-brand');
    if (user._id) {
        navbarBrand.href = '/posts';
    } else {
        navbarBrand.href = '/about'
    }
    navbarBrand.innerHTML = "inkspire"
    navbarDivStyles.appendChild(navbarBrand);

    const navbarLinksDiv = document.createElement('div');
    navbarLinksDiv.setAttribute('class', 'collapse navbar-collapse');
    navbarLinksDiv.setAttribute('id', 'navbarNavAltMarkup');
    navbarDivStyles.appendChild(navbarLinksDiv);

    const navbarLinksList = document.createElement('ul');
    navbarLinksList.className = 'navbar-nav navbar-right ml-auto'
    navbarLinksDiv.appendChild(navbarLinksList);

    navbarLinksList.appendChild(newNavbarItem('Gallery', '/gallery'));

    if (user._id) {
        navbarLinksList.appendChild(newNavbarItem('Profile', '/u/profile?' + user._id));
        navbarLinksList.appendChild(newNavbarItem('Logout', '/logout'));
    } else {
        navbarLinksList.appendChild(newNavbarItem('Login', 'auth/google'));
    }

    navbarLinksList.appendChild(newNavbarItem('About', '/about'));
}

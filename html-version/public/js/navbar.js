function newNavbarItem(text, url) {
  const itemLink = document.createElement('a');
  itemLink.className = 'nav-item nav-link';
  itemLink.innerHTML = text;
  itemLink.href = url;

  return itemLink
}

function renderNavbar(user) {
  const navbarDiv = document.getElementById('nav-item-container');

  navbarDiv.appendChild(newNavbarItem('Home', 'index.html'));
  navbarDiv.appendChild(newNavbarItem('Profile', 'profile.html?'+user._id));
}
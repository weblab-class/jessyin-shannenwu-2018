function main() {
  get('/api/whoami', {}, function(user){
      renderNavbar(user); 
      renderPosts(user);
  }
)};

main();
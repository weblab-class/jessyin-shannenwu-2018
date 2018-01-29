function main() {
    get('/api/whoami', {}, function (user) {
        renderNavbar(user);
        renderPosts(user);

        const socket = io();

        socket.on('post', function (msg) {
            const postsDiv = document.getElementById('posts');
            
            postsDiv.prepend(postDOMObject(msg, user));
        });
    })
};

main();

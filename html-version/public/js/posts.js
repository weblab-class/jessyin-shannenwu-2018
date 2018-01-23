function main() {
    get('/api/whoami', {}, function (user) {
        renderNavbar(user);
        renderPosts(user);

        const socket = io();

        socket.on('post', function (msg) {
            console.log('im trying to add stuff');
            const postsDiv = document.getElementById('posts');
            postsDiv.prepend(postDOMObject(msg, user));
        });
    })
};

main();

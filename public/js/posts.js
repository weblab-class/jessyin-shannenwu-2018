function main() {
    get('/api/whoami', {}, function (user) {
        renderNavbar(user);
        renderPosts(user);

        const socket = io();

        socket.on('post', function (msg) {
            const postsDiv = document.getElementById('posts');
            postsDiv.prepend(postDOMObject(msg, user));
        });

        socket.on('updateLike', function (msg) {
            const postsDiv = document.getElementsByName(msg.post_id)[0];
            postsDiv.innerText = ' ' + msg.likes;

        });
    });

};

main();

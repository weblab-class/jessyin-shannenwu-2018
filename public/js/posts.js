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
            const sid = msg.post_id + "filledheart";
            const oid = msg.post_id + 'emptyheart';

            if (document.getElementById(sid).style.display == 'none') {
                document.getElementById(sid).style.display = 'inline';
                document.getElementById(oid).style.display = 'none';
            } else {
                document.getElementById(sid).style.display = 'none';
                document.getElementById(oid).style.display = 'inline';
            }


        });
    });

};

main();

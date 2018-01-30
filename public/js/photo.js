var albumBucketName = 'inkspire';
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:57915198-9208-4e4c-a945-d8925c284e69';


//update the configurations for AWS to use our credentials
AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

//create an S3 instance that we can use to access the databaseph
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: albumBucketName
    }
});

function photoExists(img_url) {
    get('/api/inked', {}, function (inkedArr) {
        for (let i = 0; i < inkedArr.length; i++) {
            if (inkedArr[i].image_url == img_url) {
                console.log('photo exists');
                return true;
            }
        }
        console.log('photo doesnt exist');
        return false;
    });
}

//adds a photo to our S3 database
function addPhoto(postid) {
    //get the file out of the upload widget	
    var files = document.getElementById('photoupload').files;
    if (!files.length) {
        return alert('Please choose a file to upload first.');
    }
    var file = files[0];
    var photoKey = files[0].name;
    get('/api/inked', {}, function (inkedArr) {
        data = {
            image_url: photoKey,
            post_id: postid
        }
        post('/api/inked', data);

        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function (err, data) {
            if (err) {
                return alert('There was an error uploading your photo: ', err.message);
            }
            console.log('Successfully uploaded photo.');
        });
    });
}

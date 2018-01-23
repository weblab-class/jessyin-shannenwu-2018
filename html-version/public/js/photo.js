var albumBucketName = 'inkspire';
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:20c8e41f-fd64-4051-8c70-05939a1e4831';


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
  params: {Bucket: albumBucketName}
});

//get all the data from the bucket and call addAllPhotos to display it
function viewAlbum() {
  s3.listObjects({}, function(err, data) {
    if (err) {
      return alert('There was an error viewing your album: ' + err.message);
    }
    // `this` references the AWS.Response instance that represents the response
    var href = this.request.httpRequest.endpoint.href;
    console.log(href)
    var bucketUrl = "https://s3.amazonaws.com/" + albumBucketName + '/';
    addAllPhotos(bucketUrl, data)
  });
}

//adds a photo to our S3 database
function addPhoto() {
  //get the file out of the upload widget	
  var files = document.getElementById('photoupload').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
  var photoKey = files[0].name;
  //TODO: upload the file to s3

  s3.upload({
    Key: photoKey,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }
    console.log('Successfully uploaded photo.');
    viewAlbum();
  });
}
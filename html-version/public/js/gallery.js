function refreshGrid(){
  var grid = document.querySelector('.grid');

  var msnry = new Masonry( grid, {
    itemSelector: '.grid__item',
    columnWidth: '.grid__sizer',
    gutter: 15,
    percentPosition: true
  });

  imagesLoaded( grid ).on( 'progress', function() {
    // layout Masonry after each image loads
    msnry.layout();
  });

}

//adds all the photos located in the bucket
function addAllPhotos(bucketUrl, data){
  document.getElementById("photogrid").innerHTML = "";
  for (i = 0; i < data.Contents.length; i++){
    photoUrl = bucketUrl + encodeURIComponent(data.Contents[i].Key);
    var item = document.createElement("a");
    item.classList.add("grid__item");
    if (i === 0){
      item.classList.add("grid__sizer")
    }
    item.innerHTML = "<div class='item__overlay'></div><img src='" + photoUrl + "' />";
    document.getElementById("photogrid").appendChild(item);
  }
  refreshGrid();  
}

function main() {
  get('/api/whoami', {}, function(user){
  renderNavbar(user); 
      
  });
}

main();
/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];

function initiateApp(){
    if (localStorage.length > 0){
        var storedPicOrder = [];
        var i = 0;
        
        while (localStorage.getItem("imageArray_" + i.toString())){
            storedPicOrder.push(localStorage.getItem("imageArray_" + i.toString()));
            i++;
        }
        
        if (storedPicOrder.length > 0){
            makeGallery(storedPicOrder);
        }else{
            makeGallery(pictures);
        }
    }else{
        makeGallery(pictures);
    }
	addModalCloseHandler();
    $('#gallery').sortable();
	$('#gallery').on("sortupdate", reOrderArray);
}

function makeGallery(imageArray){
	var galleryContainer = $('#gallery');
    
    // clear what html is there already
    galleryContainer.html(' '); 
    
    //create a loop to go through the imageArray
    for (var i in imageArray){
        // make the url for the background-image value
        var imageUrl = "url('./" + imageArray[i] + "')"; 
        
        // get the filename for the figcaption
        var sliceIndex = imageArray[i].lastIndexOf('/');
        var fileName = imageArray[i].slice(++sliceIndex);
        var figCapText = fileName;
        
        // create my html with jQuery methods
        var figCapTag = $('<figcaption>').text(figCapText);
        
        var figureOptions = {
            'class': 'imageGallery col-xs-12 col-sm-6 col-md-4',
            css: {
                'background-image': imageUrl   
            },
            on: {
                click: displayImage
            }
        };
        var figureTag = $('<figure>', figureOptions);
        
        figureTag.append(figCapTag);
        galleryContainer.append(figureTag);
    }
}

function addModalCloseHandler(){
	//add a click handler to the img element in the image modal.  When the element is clicked, close the modal
    $('.modal-body>img').click(hideImage);
	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp	
}

function displayImage(){
    //grab the direct url of the image by getting rid of the other pieces you don't need
    var arrUrlImg = this.style.backgroundImage.split('"');
    var imgPath = arrUrlImg[1]; // this is only the path without the url("") bits
    
	//grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
		// pexels-photo-132037
	var firstIndex = imgPath.lastIndexOf('/'); // index *before* the one needed to get rid of './images/'
    var lastIndex = imgPath.lastIndexOf('.'); // index to get rid of '.jpg'
    var imgName = imgPath.slice(++firstIndex,lastIndex); // gets only the name
    
	//change the modal-title text to the name you found above
    $('.modal-title').text(imgName);
	//change the src of the image in the modal to the url of the image that was clicked on
    $('.modal-body>img').attr('src', imgPath);

	//show the modal with JS.  Check for more info here: 
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
    $("#galleryModal").modal('show')
}

function hideImage(){
    $("#galleryModal").modal('hide')
}

function reOrderArray(){
    var results = [];
    $('figcaption').each(function(){
        results.push('./images/' + $(this).text());
    });
    storePicOrder(results);
}

function storePicOrder(newPicOrder){
    for (var i=0; i < newPicOrder.length; i++){
        var getItemIndex = "imageArray_" + i.toString();
        if (localStorage.getItem(getItemIndex)){
            localStorage.removeItem(getItemIndex);
        }
        localStorage.setItem(getItemIndex, newPicOrder[i]);
    }
}

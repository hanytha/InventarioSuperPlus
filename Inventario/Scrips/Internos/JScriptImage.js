function SaveImage() {
    var image = document.getElementById("myCanvas").toDataURL("image/png");
    image = image.replace('data:image/png;base64,', '');
    $.ajax({
        type: 'POST',
        url: '/Image/UploadImage',
        data: '{ "imageData" : "' + image + '" }',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (msg) {
            alert('Image saved successfully !');
        }
    });
}
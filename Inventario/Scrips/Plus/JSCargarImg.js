Cargar();
Cargar2();
Cargar3();
jsCargar();
function Cargar() {
    var folder = "./assets/images/Ayuda/ZArqueologicas";
    $.ajax({
        url: folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(jpe?g|jpg|png|gif)$/)) {
                    $("#fotos1").append("<img src='" + folder + val + "'><br>");
                }
            });
        }
    });
}
function Cargar2() {
    var dir = "~/assets/images/Ayuda/ZArqueologicas";
    var fileextension = ".jpg";
    $.ajax({
        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: dir,
        success: function (data) {
            //List all .png file names in the page
            $(data).find("a:contains(" + fileextension + ")").each(function () {
                var filename = this.href.replace(window.location.Host, "").replace("http://", "");
                $("#fotos2").append("<img src='" + dir + filename + "'>");
            });
        }
    });

}
function Cargar3() {
    var findImages = function () {
        var parentDir = "~/assets/images/Ayuda/ZArqueologicas";

        var fileCrowler = function (data) {
            var titlestr = $(data).filter('title').text();
            // "Directory listing for /Resource/materials/xxx"
            var thisDirectory = titlestr.slice(titlestr.indexOf('/'), titlestr.length)

            //List all image file names in the page
            $(data).find("a").attr("href", function (i, filename) {
                if (filename.match(/\.(jpe?g|jpg|png|gif)$/)) {
                    var fileNameWOExtension = filename.slice(0, filename.lastIndexOf('.'))
                    var img_html = "<img src='{0}' id='{1}' alt='{2}' width='75' height='75' hspace='2' vspace='2' onclick='onImageSelection(this);'>".format(thisDirectory + filename, fileNameWOExtension, fileNameWOExtension);
                    $("#image_pane").append(img_html);
                }
                else {
                    $.ajax({
                        url: thisDirectory + filename,
                        success: fileCrowler
                    });
                }
            });
        }
        $.ajax({
            url: parentDir,
            success: fileCrowler
        });
    }
}

function jsCargar() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/assets/images/Ayuda/ZArqueologicas", true);
    xhr.responseType = 'document';
    xhr.onload = () => {
        if (xhr.status === 200) {
            var elements = xhr.response.getElementsByTagName("a");
            for (x of elements) {
                if (x.href.match(/\.(jpe?g|png|gif)$/)) {
                    let img = document.createElement("img");
                    img.src = x.href;
                    document.body.appendChild(img);
                }
            };
        }
        else {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    }
    xhr.send()

}
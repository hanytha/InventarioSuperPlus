alertas();

function alertas() {

    $.get("/Compra/ConsultaAlertas", function (Data) {
        var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        var alertTrigger = document.getElementById('liveAlertBtn')

        let id = Data.id;
        let ArrayId = id.split(',');
        let Articulo = Data.Articulo;
        let ArrayArticulo = Articulo.split(',');
        let stock = Data.stock;
        let Arraystock = stock.split(',');

        for (var i = 0; i < ArrayId.length; i++) {

            function alert(message, type) {
                var wrapper = document.createElement('div')
                wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

                alertPlaceholder.append(wrapper)
            }

            alert('El artículo ' + ArrayArticulo + ' esta por agotarse!', 'warning ')
        }
    });
}


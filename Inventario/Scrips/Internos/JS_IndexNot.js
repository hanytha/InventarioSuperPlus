
//*******************************************************************************************
not();
function not() {

    $.get("/ExistenciasG/ConsultaArticulosNot", function (Data) {
            CrearTablaCategorias(Data);
        }
        );
    
    function CrearTablaCategorias(Data) {

        let Stock = Data.Stock;
        let ArrayStock = Stock.split(',');
        let Nombre = Data.Nombre;
        let ArrayNombre = Nombre.split(',');

        for (var i = 0; i < ArrayStock.length; i++) {

            if (ArrayStock[i] > 0 && ArrayStock[i] < 30) {
                Push.create('Advertencia!', {
                    body: '' + ArrayStock[i]  + ' esta por agotarse ',
                    icon: 'icon.png',

                });
            }
            else if (ArrayStock[i] == 0) {

                Push.create('Advertencia!', {
                    body: '' + ArrayNombre[i] + ' ya no cuenta con stock ',
                    icon: 'icon.png',

                });

            }
        }

    }

}
ConsultaArticuloComp();
function ConsultaArticuloComp() {
    $.get("/Prueba/ConsultaArticulos", function (Data) {
        CrearArticuloComp(Data);
    });

}

function CrearArticuloComp(Data) {
    var CodigoHtmlArticuloComp = "";
    CodigoHtmlArticuloComp += "<div id='contenedor1'>";
    CodigoHtmlArticuloComp += "<section id='contenedor_follow'>";
    CodigoHtmlArticuloComp += "<hr class='solid'>";
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>ID</div> "
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Nombre Empresa</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Fecha de ingreso</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Stock</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Costo</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono '>Acción</div>";
    CodigoHtmlArticuloComp += "<hr class='solid'>"
    CodigoHtmlArticuloComp += "<div>";

    let id = Data.id;
    let ArrayId = id.split(',');
    let Nombre = Data.Nombre;
    let Arraynombre = Nombre.split(',');
    let Fechas = Data.Fechas;
    let Arrayfechas = Fechas.split(',');
    let Stock = Data.Stock;
    let Arraystock = Stock.split(',');
    let Costos = Data.Costos;
    let Arraycostos = Costos.split(',');


    for (var i = 0; i < (ArrayId, Arraynombre, Arrayfechas, Arraystock, Arraycostos).length; i++) {

        CodigoHtmlArticuloComp += "<div>";
        CodigoHtmlArticuloComp += "<div class='row row-cols-auto '>"
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + ArrayId[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraynombre[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col  Cell'>" + Arrayfechas[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraystock[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraycostos[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"

        CodigoHtmlArticuloComp += "<label>"
        CodigoHtmlArticuloComp += "<button class='btn btn-primary' onclick='Desplegar(" + ArrayId[i]+ ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayId[i] + "' aria-expanded='false' aria-controls='desplegable" + ArrayId[i] + "'>Abrir</button>"
        CodigoHtmlArticuloComp += "<div class='collapse' id='desplegable" + ArrayId[i] + "'>"
        CodigoHtmlArticuloComp += "<div><p>uno</p></div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</label>"

        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
    }
    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;

}

//----------------------------------------------------------------------------------

//Limpia la información y carga la informacion del proveedor
function Desplegar(id) {//la clase  Obligatorio

    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Prueba/ConsultaCompra/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            document.getElementById("TxtIdArtCompra").value = Data[0].IdArticulo;
            document.getElementById("TxtNombreCom").value = Data[0].Articulo;
            document.getElementById("TxtNumCom").value = Data[0].NoCompra;
            document.getElementById("TxtClaveP").value = Data[0].ClaveProveedor;

        });
    }
}


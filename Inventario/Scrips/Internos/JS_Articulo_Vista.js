ConsultaArticuloComp();
function ConsultaArticuloComp() {
    $.get("/ArticuloVista/ConsultaArticulos", function (Data) {
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
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + ArrayId[i]+ "</div>"
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
        CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='collapsible  btn btn-primary'></button>";
        CodigoHtmlArticuloComp += "</label>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
    }
    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;
   
}
//----------------------------------------------------------------------------------------
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

//----------------------------------------------------------------------------------------------

ConsultaArticulo();
function ConsultaArticulo() {
    $.get("/Articulo/ConsultaArticulos", function (Data) {
        CrearArticulo(Data);
    });

}

function CrearArticulo(Data) {
    var CodigoHtmlArticulo = "";
    CodigoHtmlArticulo += "<div id='contenedor3'>";
    CodigoHtmlArticulo += "<section id='contenedor_follow'>";
    CodigoHtmlArticulo += "<hr class='solid3'>";
    CodigoHtmlArticulo += "<div class='col-3 Heading icono'>ID</div> "
    CodigoHtmlArticulo += "<div class='col-3 Heading icono'>Nombre Empresa</div>"
    CodigoHtmlArticulo += "<div class='col-3 Heading icono'>Fecha de ingreso</div>"
    CodigoHtmlArticulo += "<div class='col-3 Heading icono'>Stock</div>"
    CodigoHtmlArticulo += "<div class='col-3 Heading icono'>Costo</div>"
    CodigoHtmlArticulo += "<div class='col-3 Heading icono '>Acción</div>";
    CodigoHtmlArticulo += "<hr class='solid3'>"
    CodigoHtmlArticulo += "<div>";



    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlArticulo += "<div>";
        CodigoHtmlArticulo += "<div class='row row-cols-auto '>"
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col Cell'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col Cell'>" + Data[i].PrecioUnitarioPromedio + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col  Cell'>" + Data[i].UnidadSAT + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col Cell'>" + Data[i].ClaveSAT + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col Cell'>" + Data[i].Descripcion + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<label>"
        CodigoHtmlArticulo += "<button  class='collapsible  btn btn-primary'><i class='fas fa - angle - down'></i></button>"
        CodigoHtmlArticulo += "</label>";
        CodigoHtmlArticulo += "<div class='content'><div id='tablaImpuesto'></div></div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
    }
    document.getElementById("contenedor3").innerHTML = CodigoHtmlArticulo;

}


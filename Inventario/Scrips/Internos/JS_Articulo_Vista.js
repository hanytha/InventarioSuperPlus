var imagen64;
LlenarCMCategoria();

ConsultaArticulo();
function ConsultaArticulo() {
    $.get("/Articulo/ConsultaArticulos", function (Data) {
        CrearDivArticulo(Data);
    }
    );
}
function CrearDivArticulo(Data) {
    var CodigoHtmlArticulo = "";
    CodigoHtmlArticulo += "<div id='container'>";
    CodigoHtmlArticulo += "<div ><h4>Id</h4>";

    CodigoHtmlArticulo += "<div>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlArticulo += "<div>";
        CodigoHtmlArticulo += "<div class='row'>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div  class='col'>" + Data[i].IdArticulos + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreEmpresa + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<button class='btn btn-primary btn-sm ' onclick='editarModal(" + Data[i].IdCategorias + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
    }

    document.getElementById("container").innerHTML = CodigoHtmlArticulo;
}




//Logo
var btnFoto = document.getElementById("BtnFoto");
btnFoto.onchange = function (e) {
    var file = document.getElementById("BtnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("PBFoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);
}

//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Articulo/ConsultaArticulo/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDArt', Data[0].IdArticulos);
            document.getElementById("TxtNombreEmpresa").value = Data[0].NombreEmpresa;
            document.getElementById("TxtNombreProveedor").value = Data[0].NombreProveedor;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;
            document.getElementById("cmbCategoria").value = Data[0].IdCategorias;
            document.getElementById("TxtPrecioUnitarioPromedio").value = Data[0].PrecioUnitarioPromedio;
            document.getElementById("TxtUnidadSAT").value = Data[0].UnidadSAT;
            document.getElementById("TxtClaveSAT").value = Data[0].ClaveSAT;
            document.getElementById("TxtFecha").value = Data[0].Fecha;
            document.getElementById("PBFoto").src = "data:image/png;base64," + Data[0].FOTOMOSTRAR;

        });
    }
}
//limpiar campos
function LimpiarCampos() {
    //Limpiar la casilla de texto
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    //Limpiar las imágenes
    var controlesImg = document.getElementsByClassName("limpiarImg");
    for (var i = 0; i < controlesImg.length; i++) {
        controlesImg[i].value = null;
    }
}


//Guarda los cambios y altas de los proveedores
function GuardarArticulo() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdArticulos = sessionStorage.getItem('IDArt');
            var NombreEmpresa = document.getElementById("TxtNombreEmpresa").value;
            var NombreProveedor = document.getElementById("TxtNombreProveedor").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;

            var IdCategorias = document.getElementById("cmbCategoria").value;
            var TempSupervisor = document.getElementById("cmbCategoria");
            var Categoria = TempSupervisor.options[TempSupervisor.selectedIndex].text;  

            var PrecioUnitarioPromedio = document.getElementById("TxtPrecioUnitarioPromedio").value;
            var UnidadSAT = document.getElementById("TxtUnidadSAT").value;
            var ClaveSAT = document.getElementById("TxtClaveSAT").value;
            var Fecha = document.getElementById("TxtFecha").value;

            var Logo = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");  ///////////-------->
            if (Logo.endsWith('png')) {
                Logo = imagen64.replace("data:image/png;base64,", "");
            }
            var frm = new FormData();
            frm.append("IdArticulos", IdArticulos);
            frm.append("NombreEmpresa", NombreEmpresa);
            frm.append("NombreProveedor", NombreProveedor);
            frm.append("Descripcion", Descripcion);
            frm.append("IdCategorias", IdCategorias);
            frm.append("Categoria", Categoria);
            frm.append("PrecioUnitarioPromedio", PrecioUnitarioPromedio);
            frm.append("UnidadSAT", UnidadSAT);
            frm.append("ClaveSAT", ClaveSAT);
            frm.append("Fecha", Fecha);
            frm.append("cadF", Logo);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Articulo/GuardarArticulo",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el proveedor");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        CrearAcordeonArticulos();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

//marca los campos obligatorios
function CamposObligatorios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");

        }
    }
    return exito;
}
//"Elimina" el área cambia el Estatus
function EliminarArticulo(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Articulo/EliminarArticulo/?Id=" + id, function (DatoArt) {
            if (DatoArt == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonArticulos();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


function LlenarCMCategoria() {
    $.get("/GLOBAL/BDCategorias", function (data) {
        llenarCombo(data, document.getElementById("cmbCategoria"));
    });
}


//funcion general para llenar los select
function llenarCombo(data, control) {

    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}


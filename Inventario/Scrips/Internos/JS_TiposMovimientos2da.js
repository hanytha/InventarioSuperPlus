LlenarCMBUnidad();
LlenarCMBArticulo();
CrearTiposDeMovimiento();
function CrearTiposDeMovimiento() {
    $.get("/TiposDeMovimiento/ConsultaTiposDeMovimientos", function (Data) {
        CrearTablaTiposDeMovimiento(Data);
    }
    );
}
function CrearTablaTiposDeMovimiento(Data) {
    var CodigoHtmlTiposDeMovimiento = "";
    CodigoHtmlTiposDeMovimiento += "<div class='input-group mb-3 float-right '>";
    CodigoHtmlTiposDeMovimiento += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>"
    CodigoHtmlTiposDeMovimiento += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTiposDeMovimiento += "</div>";
    CodigoHtmlTiposDeMovimiento += "<div class='table-responsive'>";
    CodigoHtmlTiposDeMovimiento += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTiposDeMovimiento += "<thead>";
    CodigoHtmlTiposDeMovimiento += "<tr>";
    CodigoHtmlTiposDeMovimiento += "<th>Tipo de Movimiento</th>";
    CodigoHtmlTiposDeMovimiento += "<th>Artículo</th>";
    CodigoHtmlTiposDeMovimiento += "<th>Ud. de medida</th>";
    CodigoHtmlTiposDeMovimiento += "<th>Descripción</th>";
    CodigoHtmlTiposDeMovimiento += "<th>Opción</th>";
    CodigoHtmlTiposDeMovimiento += "</tr>";
    CodigoHtmlTiposDeMovimiento += "</thead>";
    CodigoHtmlTiposDeMovimiento += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTiposDeMovimiento += "<tr>";
        CodigoHtmlTiposDeMovimiento += "<td>" + Data[i].TipoDeMovimiento + "</td>";
        CodigoHtmlTiposDeMovimiento += "<td>" + Data[i].Articulo + "</td>";
        CodigoHtmlTiposDeMovimiento += "<td>" + Data[i].Unidades + "</td>";
        CodigoHtmlTiposDeMovimiento += "<td>" + Data[i].Descripcion+ "</td>";
        CodigoHtmlTiposDeMovimiento += "<td>";
        CodigoHtmlTiposDeMovimiento += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdMovimientos + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHtmlTiposDeMovimiento += "</td>";
        CodigoHtmlTiposDeMovimiento += "</tr>";
    }
    CodigoHtmlTiposDeMovimiento += "</tbody>";
    CodigoHtmlTiposDeMovimiento += "</table>";
    document.getElementById("TablaMovimientos").innerHTML = CodigoHtmlTiposDeMovimiento;
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
        sessionStorage.setItem('IDTDM', '0');
    }
    else {

        $.get("/TiposDeMovimiento/ConsultaTipoDeMovimiento/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDTDM', Data[0].IdMovimientos);
            document.getElementById("TxtTMovimiento").value = Data[0].TipoDeMovimiento;
            document.getElementById("cmbUnidades").value = Data[0].IdUnidadDeMedida;
            document.getElementById("cmbArticulo").value = Data[0].IdArticulos;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;
        });
    }
}
//limpiar campos
function LimpiarCampos() {
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var controlesSLT = document.getElementsByClassName("limpiarSelect");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
    }
}
//Guarda los cambios y altas de las áreas
function GuardarTipoDeMovimiento() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdMovimientos = sessionStorage.getItem('IDTDM');
            var TipoDeMovimiento = document.getElementById("TxtTMovimiento").value;
            var IdUnidadDeMedida = document.getElementById("cmbUnidades").value;
            var TempUn = document.getElementById("cmbUnidades");
            var Unidades = TempUn.options[TempUn.selectedIndex].text;
            var IdArticulos = document.getElementById("cmbArticulo").value;
            var TempArt = document.getElementById("cmbArticulo");
            var Articulo = TempArt.options[TempArt.selectedIndex].text;
            var Descripcion = document.getElementById("TxtDescripcion").value;
            var frm = new FormData();
            frm.append("IdMovimientos", IdMovimientos);
            frm.append("TipoDeMovimiento", TipoDeMovimiento);
            frm.append("IdUnidadDeMedida", IdUnidadDeMedida);
            frm.append("Unidades", Unidades);
            frm.append("IdArticulos", IdArticulos);
            frm.append("Articulo", Articulo);
            frm.append("Descripcion", Descripcion);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/TiposDeMovimiento/GuardarTipoDeMovimiento",
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
                        CrearTiposDeMovimiento();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
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
function LlenarCMBUnidad() {
    $.get("/GLOBAL/BDUnidadesMedida", function (data) {
        llenarCombo(data, document.getElementById("cmbUnidades"));
    });
}
function LlenarCMBArticulo() {
    $.get("/GLOBAL/BDArticulos", function (data) {
        llenarCombo(data, document.getElementById("cmbArticulo"));
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

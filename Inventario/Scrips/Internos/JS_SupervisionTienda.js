const f = new Date();


function Usuarios_X_Tienda(IDTienda) {
    $.get("/Usuario/UsuariosXTienda/?IDTienda=" + IDTienda, function (PersonalTienda) {
        if (PersonalTienda.lenght != 0) {
            llenarComboPersonal(PersonalTienda, document.getElementById("cmbIDUsuario"), sessionStorage.getItem('IDUsuario'), sessionStorage.getItem('Nombre'));
            document.getElementById("cmbIDUsuario").value = sessionStorage.getItem('IDUsuario');
        }
    });
}
//combo personal por tienda
function llenarComboPersonal(Datos, control, IDExtra, NombreExtra) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < Datos.length; i++) {
        contenido += "<option value='" + Datos[i].ID + "'>" + Datos[i].Nombre + "</option>";
    }
    if (IDExtra != "") {
        contenido += "<option value='" + IDExtra + "'>" + NombreExtra + "</option>";
    }
    control.innerHTML = contenido;
}
function Limpiar() {
    var ControlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < ControlesTXT.length; i++) {
        ControlesTXT[i].value = "";
    }
    var ControlesSLT = document.getElementsByClassName("SelectCLS");
    for (var i = 0; i < ControlesSLT.length; i++) {
        document.getElementById(ControlesSLT[i].id).value = 0;
    }
}
//funcion general para llenar los select
function llenarCombo(DAtos, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < DAtos.length; i++) {
        contenido += "<option value='" + DAtos[i].ID + "'>" + DAtos[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}

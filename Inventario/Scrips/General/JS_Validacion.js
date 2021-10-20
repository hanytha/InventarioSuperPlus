//---------Validación existencias almacen---------
function validarFormulario() {

    var TxtNumCompra = document.getElementById('TxtNumCompra').value;
    var TxtExistenciaInicial = document.getElementById('TxtExistenciaInicial').value;
    var TxtExistenciaActual = document.getElementById('TxtExistenciaActual').value;
    var TxtCosto = document.getElementById('TxtCosto').value;


    //Test edad
    if (TxtNumCompra == null || TxtNumCompra.length == 0 || isNaN(TxtNumCompra)) {
        alert('ERROR: Debe ingresar un Número de compra');
        return false;
    }
    //Test edad
    if (TxtExistenciaInicial == null || TxtExistenciaInicial.length == 0 || isNaN(TxtExistenciaInicial)) {
        alert('ERROR: Debe ingresar una Existencia Inicial');
        return false;
    }
    //Test edad
    if (TxtExistenciaActual == null || TxtExistenciaActual.length == 0 || isNaN(TxtExistenciaActual)) {
        alert('ERROR: Debe ingresar una Existencia Actual');
        return false;
    }
    //Test edad
    if (TxtCosto == null || TxtCosto.length == 0 || isNaN(TxtCosto)) {
        alert('ERROR: Debe ingresar un Costo');
        return false;
    }


    return true;
}


//----------------Validación Formulario Compra-------------------------
function validarFormularioCompra() {

    var TxtMetodoDePago = document.getElementById('TxtMetodoDePago').value;

    //Test campo obligatorio
    if (TxtMetodoDePago == null || TxtMetodoDePago.length == 0 || /^\s+$/.test(TxtMetodoDePago)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }

    return true;
}
//------------------Validación proveedor-------------

function validarFormularioProveedor() {

    var TxtNombre = document.getElementById('TxtNombre').value;
    var Txtcorreo = document.getElementById('Txtcorreo').value;
    var TxtRazonSocial = document.getElementById('TxtRazonSocial').value;
    var TxtClaveInterbancaria = document.getElementById('TxtClaveInterbancaria').value;
    var TxtCodigoPostal = document.getElementById('TxtCodigoPostal').value;
    var cmbEstado = document.getElementById('cmbEstado').selectedIndex;
    var cmbMunicipio = document.getElementById('cmbMunicipio').selectedIndex;
    var cmbLocalidad = document.getElementById('cmbLocalidad').selectedIndex;
    var TxtRFC = document.getElementById('TxtRFC').value;
    var TxtDireccion = document.getElementById('TxtDireccion').value;
    var TxtTelefono = document.getElementById('TxtTelefono').value;
    var TxtBanco = document.getElementById('TxtBanco').value;
    var TxtNumeroDeCuenta = document.getElementById('TxtNumeroDeCuenta').value;
    var TxtUsoCFDI = document.getElementById('TxtUsoCFDI').value;
    var TxtNomenclatura = document.getElementById('TxtNomenclatura').value;
    var TxtDescripcion = document.getElementById('TxtDescripcion').value;



    //Test campo obligatorio
    if (TxtNombre == null || TxtNombre.length == 0 || /^\s+$/.test(TxtNombre )) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }
    //Test correo
    if (!(/\S+@\S+\.\S+/.test(Txtcorreo))) {
        alert('ERROR: Debe escribir un correo válido');
        return false;
    }

    //Test campo obligatorio
    if (TxtRazonSocial == null || TxtRazonSocial.length == 0 || /^\s+$/.test(TxtRazonSocial)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtRazonSocial');
        return false;
    }

    //Test edad
    if (TxtClaveInterbancaria == null || TxtClaveInterbancaria.length == 0 || isNaN(TxtClaveInterbancaria)) {
        alert('ERROR: Debe ingresar una edad TxtClaveInterbancaria');
        return false;
    }

    //Test edad
    if (TxtCodigoPostal == null || TxtCodigoPostal.length == 0 || isNaN(TxtCodigoPostal)) {
        alert('ERROR: Debe ingresar una edad TxtCodigoPostal');
        return false;
    }
    //Test comboBox
    if (cmbEstado == null || cmbEstado == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box cmbEstado');
        return false;
    }
    //Test comboBox
    if (cmbMunicipio == null || cmbMunicipio == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box cmbMunicipio');
        return false;
    }
    //Test comboBox
    if (cmbLocalidad == null || cmbLocalidad == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box cmbLocalidad');
        return false;
    }
    //Test campo obligatorio
    if (TxtRFC == null || TxtRFC.length == 0 || /^\s+$/.test(TxtRFC)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco TxtRFC');
        return false;
    }
    //Test campo obligatorio
    if (TxtDireccion == null || TxtDireccion.length == 0 || /^\s+$/.test(TxtDireccion)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco TxtRFC TxtDireccion');
        return false;
    }
    //Test edad
    if (TxtTelefono == null || TxtTelefono.length == 0 || isNaN(TxtTelefono)) {
        alert('ERROR: Debe ingresar una edad TxtTelefono');
        return false;
    }

    //Test campo obligatorio
    if (TxtBanco == null || TxtBanco.length == 0 || /^\s+$/.test(TxtBanco)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco TxtBanco');
        return false;
    }


    //Test edad
    if (TxtNumeroDeCuenta == null || TxtNumeroDeCuenta.length == 0 || isNaN(TxtNumeroDeCuenta)) {
        alert('ERROR: Debe ingresar una edad TxtNumeroDeCuenta');
        return false;
    }

    //Test edad
    if (TxtUsoCFDI == null || TxtUsoCFDI.length == 0 || isNaN(TxtUsoCFDI)) {
        alert('ERROR: Debe ingresar una TxtUsoCFDI');
        return false;
    }


    //Test campo obligatorio
    if (TxtNomenclatura == null || TxtNomenclatura.length == 0 || /^\s+$/.test(TxtNomenclatura)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtNomenclatura');
        return false;
    }
    //Test campo obligatorio
    if (TxtDescripcion == null || TxtDescripcion.length == 0 || /^\s+$/.test(TxtDescripcion)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtDescripcion');
        return false;
    }
    

    return true;
}
//----------------Validación Formulario categorías-------------------------
function validarFormularioCategorias() {

    var TxtClasificacion = document.getElementById('TxtClasificacion').value;

    //Test campo obligatorio
    if (TxtClasificacion == null || TxtClasificacion.length == 0 || /^\s+$/.test(TxtClasificacion)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco TxtClasificacion');
        return false;
    }

    return true;
}   

//---------Validación Departamentos---------
function validarFormularioD() {

    var TxtNombre = document.getElementById('TxtNombre').value;
    var TxtUsuario = document.getElementById('TxtUsuario').value;
    var Txtcorreo = document.getElementById('Txtcorreo').value;
    var TxtTelefono = document.getElementById('TxtTelefono').value;
    var TxtCarpeta = document.getElementById('TxtCarpeta').value;


    //Test campo obligatorio
    if (TxtNombre == null || TxtNombre.length == 0 || /^\s+$/.test(TxtNombre)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }
    //Test campo obligatorio
    if (TxtUsuario == null || TxtUsuario.length == 0 || /^\s+$/.test(TxtUsuario)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtUsuario');
        return false;
    }

    //Test correo
    if (!(/\S+@\S+\.\S+/.test(Txtcorreo))) {
        alert('ERROR: Debe escribir un correo válido');
        return false;
    }

    //Test edad
    if (TxtTelefono == null || TxtTelefono.length == 0 || isNaN(TxtTelefono)) {
        alert('ERROR: Debe ingresar una edad TxtTelefono');
        return false;

    }
    //Test campo obligatorio
    if (TxtCarpeta == null || TxtCarpeta.length == 0 || /^\s+$/.test(TxtCarpeta)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtUsuario TxtCarpeta');
        return false;
    }

    return true;
}



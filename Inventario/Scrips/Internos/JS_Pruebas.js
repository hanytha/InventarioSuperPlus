CrearAcordeonProveedores(); 
function CrearAcordeonProveedores() {
    $.get("/Proveedores/ConsultaProveedores", function (Prov) {
        var CodHTML = "";
        for (var i = 0; i < Prov.length; i++) {
            CodHTML += "<button onclick='myFunction(Pv" + Prov[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Prov[i].Nombre + "</button>";
            CodHTML += "<div id='Pv" + Prov[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Nombre:" + Prov[i].Nombre +"</h4>";
            CodHTML += "<h4>Email:" + Prov[i].Correo+"</h4>" ;
            CodHTML += "<h4>GiroDelProveedor:" + Prov[i].GiroDelProveedor+"</h4>" ;
            CodHTML += "<h4>CuentaInterbancaria" + Prov[i].CuentaInterbancaria + "</h4>";
            CodHTML += "<h4>CodigoPostal:" + Prov[i].CodigoPostal+ "</h4>";
            CodHTML += "<h4>RFC:" + Prov[i].RFC + "</h4>";
            CodHTML += "<h4>Direccion:" + Prov[i].Direccion + "</h4>";
            CodHTML += "<h4>Telefono:" + Prov[i].Telefono + "</h4>";
            CodHTML += "<h4>Banco:" + Prov[i].Banco+ "</h4>";
            CodHTML += "<h4>NumeroDeCuenta" + Prov[i].NumeroDeCuenta + "</h4>";
            CodHTML += "<h4>UsoCFDI:" + Prov[i].UsoCFDI + "</h4>";
            CodHTML += "<h4>Nomenclatura:" + Prov[i].Nomenclatura + "</h4>";
            CodHTML += "<h4>Descripcion:" + Prov[i].Descripcion + "</h4>";
            CodHTML += "<h4>Logo:" + Prov[i].Logo + "</h4>";
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}
function myFunction(Id) {
    var x = document.getElementById(Id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

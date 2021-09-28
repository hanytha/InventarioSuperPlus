CrearAcordeonPedidosExt(); 
function CrearAcordeonPedidosExt() {
    $.get("/Pedidosext/ConsultaPedidosExt", function (Pdds) {
        var CodHTML = "";
        for (var i = 0; i < Pdds.length; i++) {
            CodHTML += "<button onclick='myFunction(Ps" + Pdds[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Pdds[i].NombreArticulo + "</button>";
            CodHTML += "<div id='Ps" + Pdds[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>NumeroPedido:" + Pdds[i].NumeroPedido +"</h4>";
            CodHTML += "<h4>NombreArticulo:" + Pdds[i].NombreArticulo+"</h4>" ;
            CodHTML += "<h4>CantidadSolicitada:" + Pdds[i].CantidadSolicitada+"</h4>" ;
            CodHTML += "<h4>Marca:" + Pdds[i].Marca + "</h4>";
            CodHTML += "<h4>Fecha:" + Pdds[i].Fecha + "</h4>";
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}
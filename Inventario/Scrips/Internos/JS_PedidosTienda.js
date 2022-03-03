
//function ConsultaPedidosRealizados(IDTienda) {
//    if (IDTienda == 0) {
//        sessionStorage.setItem('IDTienda', '0');
//    }
//    else {
//        $.get("/Supervision/ConsultaArticulosVisualizarPedidos/?IDTienda=" + IDTienda, function (Data) {
//            var CodigoHtmlArticuloComp = "";
//            CodigoHtmlArticuloComp += "<div id='contenedorPedidos'>";
//            CodigoHtmlArticuloComp += "<hr class='solid'>";
//            CodigoHtmlArticuloComp += "<div class='row'>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>No. de Pedido</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>Proveedor</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
//            CodigoHtmlArticuloComp += "</div>";
//            CodigoHtmlArticuloComp += "<hr class='solid'>";
//            CodigoHtmlArticuloComp += "</div>";
//            let id = Data.id;
//            let ArrayId = id.split(',');
//            let NoPedido = Data.NoPedido;
//            let ArrayNoPedido = NoPedido.split(',');
//            let fecha = Data.fecha;
//            let Arrayfecha = fecha.split(',');
//            let IdSitio = Data.IdSitio;
//            let ArrayIdSitio = IdSitio.split(',');
//            let Articulo = Data.Articulo;
//            let ArrayArticulo = Articulo.split(',');
//            let Proveedor = Data.Proveedor;
//            let ArrayProveedor = Proveedor.split(',');
//            let IdProveedor = Data.IdProveedor;
//            let ArrayIdProveedor = IdProveedor.split(',');
//            for (var i = 0; i < ArrayId.length; i++) {
//                CodigoHtmlArticuloComp += "<div>";
//                CodigoHtmlArticuloComp += "<div class='row'>";
//                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
//                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayProveedor[i] + "</div>";
//                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
//                CodigoHtmlArticuloComp += "<div class='col'>"
//                CodigoHtmlArticuloComp += "<label>"
//                CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='DesplegarPedidosInternos(" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegablePedido" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegablePedido(" + ArrayNoPedido[i] + ", " + ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
//                CodigoHtmlArticuloComp += "</div>";
//                CodigoHtmlArticuloComp += "</div>";
//                CodigoHtmlArticuloComp += "</div>";
//                CodigoHtmlArticuloComp += "<div class='row'>";
//                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegablePedido" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
//                CodigoHtmlArticuloComp += "</div>";
//            }
//            CodigoHtmlArticuloComp += "</div>";
//            CodigoHtmlArticuloComp += "</br>";
//            CodigoHtmlArticuloComp += "</br>";
//            let contenedorPedidosRealizados = "contenedorPedidos" + IDTienda;
//            document.getElementById(contenedorPedidosRealizados).innerHTML = CodigoHtmlArticuloComp;
//        });
//    }
//}
////---------------------Art pedidos Aceptados--------------------------
//function DesplegarPedidosInternos(IdCmpraInt, id) {
//    if (IdCmpraInt == 0 && id == 0) {
//        sessionStorage.setItem('IDArt', '0');
//    }
//    else {
//        $.get("/Supervision/ConsultaArtTiendaDespl/?idCompraInt=" + IdCmpraInt + "&idS= " + id, function (Data) {
//            var DespXArt = "";
//            //---Encabezado del grid---------
//            DespXArt += "<hr class='solid4'>";
//            DespXArt += "<div class='row'>";
//            DespXArt += "<div class='col-sm'>NoPedido</div>";
//            DespXArt += "<div class='col-sm'>Artículo</div>";
//            DespXArt += "<div class='col-sm'>Fecha del pedido</div>";
//            DespXArt += "<div class='col-sm'>Cantidad Solicitada</div>";
//            DespXArt += "<div class='col-sm'></div>";
//            DespXArt += "</div>";
//            DespXArt += "<hr class='solid4'>";
//            let IdArticulo = Data.IdArticulo;
//            let ArrayIdArticulos = IdArticulo.split(',');
//            let NumeroPedido = Data.NumeroPedido;
//            let ArrayNoPedido = NumeroPedido.split(',');
//            let Fechas = Data.Fechas;
//            let Arrayfecha = Fechas.split(',');
//            let Stock = Data.Stock;
//            let Arraystock = Stock.split(',');
//            let IdSitio = Data.IdSitio;
//            let ArrayIdSitio = IdSitio.split(',');
//            let Nombre = Data.Nombre;
//            let ArrayArticulo = Nombre.split(',');
//            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
//            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');
//            for (var i = 0; i < ArrayIdArticulos.length; i++) {
//                DespXArt += "<div class='row'>";
//                DespXArt += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
//                DespXArt += "<div class='col-sm'>" + ArrayArticulo[i] + "</div>";
//                DespXArt += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
//                DespXArt += "<div class='col-sm'>" + Arraystock[i] + "</div>";
//                DespXArt += "<div class='col-sm'></div>";
//                DespXArt += "</div>";
//            }
//            DespXArt += "</div>";
//            DespXArt += "</br>";
//            DespXArt += "</br>";
//            let compraArticulo = "desplegablePedido" + IdCmpraInt + "," + id;
//            document.getElementById(compraArticulo).innerHTML = DespXArt;
//        });
//    }
//}

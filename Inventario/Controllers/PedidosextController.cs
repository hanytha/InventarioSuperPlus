using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class PedidosextController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Pedidosext
        public ActionResult Pedidosext()
        {
            return View();
        }
        //----------------Consulta para ver todos los pedidos con estatus igual a 1----------------------------------------------
        public JsonResult ConsultaPedidosExternos()
        {
            var pedidosExt = InvBD.PedidosExternos.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.IdPedidosExternos)
                .Select(p => new
                {
                    p.IdPedidosExternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha,
                    p.NumPedidoProveedor,
                });
            return Json(pedidosExt, JsonRequestBehavior.AllowGet);
        }

        //******************************************Cosulta los pedidos por número de compra**************************************************
        public JsonResult ConsultaPedidoXnum(long Num)
        {
            var numero = InvBD.PedidosExternos.Where(p => p.NumeroPedido.Equals(Num) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosExternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha,
                    p.RFC,
                    p.Correo,
                    p.Clabe,
                    p.Telefono,
                    p.UsoCFDI,
                    p.Direccion,
                    p.NumPedidoProveedor,
                });
            return Json(numero, JsonRequestBehavior.AllowGet);
        }

        //****************************************************************************************************************************************
        //***********Join con la tabla de artículos para obtener los precios unitarios y las unidades de media de cada artículo del pedido*********

        public JsonResult ConsultaPedidoJoinArticulo(long Pedi)
        {
            var comps = from pedidos in InvBD.PedidosExternos
                        join artis in InvBD.Articulos
                    on pedidos.Articulo equals artis.NombreEmpresa
                        where pedidos.NumeroPedido.Equals(Pedi) && pedidos.Estatus.Equals(1)
                        select new
                        {
                            Articulo = pedidos.Articulo,
                            CantidadSolicitada = pedidos.CantidadSolicitada,
                            PrecioUnitarioPromedio = artis.PrecioUnitarioPromedio,
                            Unidad = artis.Unidad,

                        };

            return Json(comps, JsonRequestBehavior.AllowGet);

        }

        //*****************************************************************************************************************
    }
}


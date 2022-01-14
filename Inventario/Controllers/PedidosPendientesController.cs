using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Lamar al método de seguridad
    [Seguridad]

    public class PedidosPendientesController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: PedidosPendientes
        public ActionResult PedidosPendientes()
        {
            return View();
        }

        public JsonResult ConsultaPedidos()
        {
            var pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdAsignacion,
                    p.IdTienda,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdProveedor,
                    p.Proveedor,
                    p.Fecha,
                    p.Tienda,

                });
            return Json(pedidos, JsonRequestBehavior.AllowGet);
        }
        //*******************************************************************************************************
        //--------------------------------Consulta los artículos por ID-------------------------------------------
        public JsonResult ConsultaPedidoXNumero(long Num)
        {
            var articulo = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdAsignacion,
                    p.IdTienda,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdProveedor,
                    p.Proveedor,
                    p.Fecha,
                    p.Tienda,

                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
        //*********************************************************************************************************
        //--------------------------------Consulta los artículos por ID-------------------------------------------
        public JsonResult ConsultaArticulosNum(long Num)
        {
            var articulo = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num))
                .Select(p => new
                {
                   p.IdArticulo,
                   p.Articulo,
                   p.CantidadSolicitada,

                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
        //*********************************************************************************************************
        public JsonResult ConsultaComJoinProveedorModal(long Num)
        {
            var comps = from pedidos in InvBD.PedidosInternos
                        join comprs in InvBD.ComprasArticulos  
                    on pedidos.IdArticulo equals comprs.IdArticulo
                        where pedidos.NumeroPedido.Equals(Num)
                        select new
                        {
                            Articulo = pedidos.Articulo,
                            IdArticulo = pedidos.IdArticulo,
                            CantidadSolicitada = pedidos.CantidadSolicitada,
                            StockActual = comprs.StockActual,

                        };


            return Json(comps, JsonRequestBehavior.AllowGet);

        }
    }
}
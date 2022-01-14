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
    }
}
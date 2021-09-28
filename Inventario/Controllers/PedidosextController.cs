using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PedidosextController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Pedidosext
        public ActionResult Pedidosext()
        {
            return View();
        }
        public JsonResult ConsultaPedidosExt()
        {
            var pedidosExt = InvBD.Pedidos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.NumeroPedido,
                    p.NombreArticulo,
                    p.CantidadSolicitada,
                    p.Marca,
                    p.Fecha,

                });
            return Json(pedidosExt, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaPedidoExt(long Id)
        {
            var pedidoExt = InvBD.Pedidos.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.NumeroPedido,
                    p.NombreArticulo,
                    p.CantidadSolicitada,
                    p.Marca,
                    p.Fecha

                });
            return Json(pedidoExt, JsonRequestBehavior.AllowGet);
        }

    }
}
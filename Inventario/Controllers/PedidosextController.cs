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
<<<<<<< HEAD
       
=======
        public JsonResult ConsultaPedidosExt()
        {
            var pedidosExt = InvBD.PedidosExternos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosExternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdUnidadDeMedida,
                    p.IdMarca,
                    p.IdProveedor,
                    p.IdArticulo,
                    p.Fecha,
                    p.Estatus

                });
            return Json(pedidosExt, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaPedidoExt(long Id)
        {
            var pedidoExt = InvBD.PedidosExternos.Where(p => p.IdPedidosExternos.Equals(Id))
                .Select(p => new
                {
                    p.IdPedidosExternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdUnidadDeMedida,
                    p.IdMarca,
                    p.IdProveedor,
                    p.IdArticulo,
                    p.Fecha,
                    p.Estatus

                });
            return Json(pedidoExt, JsonRequestBehavior.AllowGet);
        }
>>>>>>> alma
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PedidosintController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Pedidosint
        public ActionResult Pedidosint()
        {
            return View();
        }
        public JsonResult ConsultaPedidosInt()
        {
            var pedidosInternos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.CantidadAprobada,
                    p.Tipo,
                    p.IdUnidadDeMedida,
                    p.IdMarca,
                    p.IdTienda,
                    p.IdArticulo,
                    p.IdExistenciaAlmacenG,
                    p.Fecha,
                    p.Estatus
                });
            return Json(pedidosInternos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaPedidoInt(long Id)
        {
            var departamento = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.CantidadAprobada,
                    p.Tipo,
                    p.IdUnidadDeMedida,
                    p.IdMarca,
                    p.IdTienda,
                    p.IdArticulo,
                    p.IdExistenciaAlmacenG,
                    p.Fecha,
                    p.Estatus
                });
            return Json(departamento, JsonRequestBehavior.AllowGet);
        }
    }
}
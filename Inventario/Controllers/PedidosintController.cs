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
            var pedidosInternos = InvBD.Pedidos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.NumeroPedido,
                    p.NombreArticulo,
                    p.CantidadSolicitada,
                    p.CantidadAprobada,
                    p.Tipo,
                    p.Marca,
                    p.Destino,
                    p.Fecha,
                });
            return Json(pedidosInternos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaPedidoInt(long Id)
        {
            var departamento = InvBD.Pedidos.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.NumeroPedido,
                    p.IdArticulos,
                    p.NombreArticulo,
                    p.CantidadSolicitada,
                    p.CantidadAprobada,
                    p.Tipo,
                    p.IdMarca,
                    p.Marca,
                    p.IdProveedor,
                    p.IdUsuarios,
                    p.Usuario,
                    p.IdArea,
                    p.Destino,
                    p.Fecha,
                    p.Estatus
                });
            return Json(departamento, JsonRequestBehavior.AllowGet);
        }

    }
}
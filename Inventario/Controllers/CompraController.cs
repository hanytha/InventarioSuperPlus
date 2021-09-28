using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class CompraController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: MetodoPago
        public ActionResult Compra()
        {
            return View();
        }
        public JsonResult ConsultaCompras()
        {
            var Compras = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.MetodoDePago
                });
            return Json(Compras, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaCompra(long Id)
        {
            var Compra = InvBD.Compra.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.MetodoDePago
                });
            return Json(Compra, JsonRequestBehavior.AllowGet);
        }
    }
}
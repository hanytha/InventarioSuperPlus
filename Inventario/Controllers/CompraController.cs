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
        // GET: Compra
        public ActionResult Compra()
        {
            return View();
        }
        public JsonResult ConsultasCompras()
        {
            var compras = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdCompra,
                    p.MetodoDePago,
                    p.ClaveProveedor,
                    p.NoCompra,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.IdImpuesto,
                    p.IdProveedor,
                    p.IdArticulo,

                });
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaCompra(long Id)
        {
            var compra = InvBD.Compra.Where(p => p.IdCompra.Equals(Id))
                .Select(p => new
                {
                    p.IdCompra,
                    p.MetodoDePago,
                    p.ClaveProveedor,
                    p.NoCompra,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.IdImpuesto,
                    p.IdProveedor,
                    p.IdArticulo,

                });
            return Json(compra, JsonRequestBehavior.AllowGet);
        }

    }
}
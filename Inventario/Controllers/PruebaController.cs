using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PruebaController : Controller
    {
        //DCISPlusDataContext InvBD = new DCISPlusDataContext();
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Prueba
        public ActionResult Prueba()
        {
            return View();
        }
        public JsonResult ConsultaCompras()
        {
      
            var compra = InvBD.Compra.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.FechaDeIngreso)
                .Select(p => new
                {
                    p.IdCompra,
                    p.ExitenciaActual,
                    p.FechaDeIngreso,
                    p.Coste,

                });

            return Json(compra, JsonRequestBehavior.AllowGet);
        }
    }
}
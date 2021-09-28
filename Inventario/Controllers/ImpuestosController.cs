using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ImpuestosController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Impuestos
        public ActionResult Impuestos()
        {
            return View();
        }
        public JsonResult ConsultaImpuestos()
        {
            var impuestos = InvBD.Impuesto.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.Porcentaje
                 
                });
            return Json(impuestos, JsonRequestBehavior.AllowGet);
        }
    }

}
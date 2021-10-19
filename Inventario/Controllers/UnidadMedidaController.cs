using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class UnidadMedidaController : Controller
    {//conexion con DB

        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: UnidadMedida
        public ActionResult UnidadMedida()
        {
            return View();
        }
        public JsonResult ConsultaUnidadesDeMedida()
        {
            var unidadesDeMedida = InvBD.UnidadDeMedida.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdUnidadDeMedida,
                    p.Unidad
                });
            return Json(unidadesDeMedida, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaUnidadDeMedida(long Id)
        {
            var unidadDeMedida = InvBD.UnidadDeMedida.Where(p => p.IdUnidadDeMedida.Equals(Id))
                .Select(p => new
                {
                    p.IdUnidadDeMedida,
                    p.Unidad
                });
            return Json(unidadDeMedida, JsonRequestBehavior.AllowGet);
        }
    }
}             

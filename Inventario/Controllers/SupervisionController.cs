using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class SupervisionController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Supervision
        public ActionResult Supervision()
        {
            return View();
        }
        public JsonResult ConsultaSupervisiones()
        {
            var supervisiones = InvBD.Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.Supervicion,
                    p.UNombre,
                    p.Tiendas
                });
            return Json(supervisiones, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSupervision(long Id)
        {
            var supervision = InvBD.Supervision.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.Supervicion,
                    p.UNombre,
                    p.Tiendas
                });
            return Json(supervision, JsonRequestBehavior.AllowGet);
        }
    }
}
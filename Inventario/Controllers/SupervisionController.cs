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
        public JsonResult ConsultaSupervisores()
        {
            var supervisores = InvBD.Supervisor.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdSupervision,
                    p.TipoSupervision,
                    p.Tienda,
                    p.Nombre,
                    p.ApellidoP,
                    p.ApellidoM,
                    p.Telefono,
                    p.Correo,
                });
            return Json(supervisores, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultaSupervisor(long Id)
        {
            var supervisor = InvBD.Supervisor.Where(p => p.IdSupervision.Equals(Id))
                .Select(p => new
                {
<<<<<<< HEAD
                    p.IdSupervision,
=======
                    p.IdSupervisor,
>>>>>>> alma
                    p.TipoSupervision,
                    p.Tienda,
                    p.Nombre,
                    p.ApellidoP,
                    p.ApellidoM,
                    p.Telefono,
                    p.Correo,
                });
            return Json(supervisor, JsonRequestBehavior.AllowGet);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class SubareaController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Subarea
        public ActionResult Subarea()
        {
            return View();
        }
        public JsonResult ConsultaSubAreas()
        {
            var subareas = InvBD.SubAreas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Nombre,
                    p.NoSubArea,
                    p.UNombre,
                    p.Telefono,
                    p.Correo,
                    p.NEncargado2,
                    p.TelefonoE2,
                    p.CorreoE2,
                    p.NEncargado3,
                    p.TelefonoE3,
                    p.CorreoE3
                });
            return Json(subareas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSubArea(long Id)
        {
            var subarea = InvBD.SubAreas.Where(p => p.Estatus.Equals(Id))
                .Select(p => new
                {
                    p.Nombre,
                    p.NoSubArea,
                    p.UNombre,
                    p.Telefono,
                    p.Correo,
                    p.NEncargado2,
                    p.TelefonoE2,
                    p.CorreoE2,
                    p.NEncargado3,
                    p.TelefonoE3,
                    p.CorreoE3
                });
            return Json(subarea, JsonRequestBehavior.AllowGet);
        }

    }
}
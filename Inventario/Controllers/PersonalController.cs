using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PersonalController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Personal
        public ActionResult Personal()
        {
            return View();
        }
        public JsonResult ConsultaPersonales()
        {
            var personales = InvBD.Personal.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.TipoPersonal,
                    p.NumeroTienda
                });
            return Json(personales, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaPersonal(long Id)
        {
            var personal = InvBD.Personal.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.TipoPersonal,
                    p.NumeroTienda
                });
            return Json(personal, JsonRequestBehavior.AllowGet);
        }
    }
}
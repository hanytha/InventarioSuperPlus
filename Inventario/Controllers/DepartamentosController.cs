using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class DepartamentosController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Departamentos
        public ActionResult Departamentos()
        {
            return View();
        }
        public JsonResult ConsultaDepartamentos()
        {
            var departamentos = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdAreas,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(departamentos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultaDepartamento(long Id)
        {
            var departamento = InvBD.Areas.Where(p => p.IdAreas.Equals(Id))
                .Select(p => new
                {
                    p.IdAreas,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(departamento, JsonRequestBehavior.AllowGet);
        }
    }
}
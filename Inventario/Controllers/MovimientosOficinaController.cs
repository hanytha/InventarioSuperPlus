using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class MovimientosOficinaController : Controller
    {
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        public object Datetime { get; private set; }

        // GET: Supervision
        public ActionResult MovimientosOficina()
        {
            return View();
        }
        public JsonResult BDOficina(long Id)
        {
            var datos = InvBD.Areas.Where(p => p.Estatus.Equals(1) && p.IdAreas.Equals(Id))
                .Select(p => new
                {
                    ID = p.IdAreas,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}





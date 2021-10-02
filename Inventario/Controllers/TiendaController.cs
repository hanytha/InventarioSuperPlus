using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class TiendaController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Tienda
        public ActionResult Tienda()
        {
            return View();
        }
        public JsonResult ConsultaTiendas()
        {
            var tiendas = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Nombre,
                    p.NombreS,
                    p.UNombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.Latitud,
                    p.Longitud,
                    p.HApertura,
                    p.HCierre
                });
            return Json(tiendas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaTienda()
        {
            var tienda = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Nombre,
                    p.NombreS,
                    p.UNombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.Latitud,
                    p.Longitud,
                    p.HApertura,
                    p.HCierre
                });
            return Json(tienda, JsonRequestBehavior.AllowGet);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class EntradaController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Entrada
        public ActionResult Entrada()
        {
            return View();
        }
        public JsonResult ConsultaEntradas()
        {
            var entradas = InvBD.Entradas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Cantidad
                });
            return Json(entradas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaEntrada(long Id)
        {
            var entrada = InvBD.Entradas.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Cantidad
                });
            return Json(entrada, JsonRequestBehavior.AllowGet);
        }
    }

}
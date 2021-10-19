using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PerfilesController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Perfiles
        public ActionResult Perfiles()
        {
            return View();
        }
        public JsonResult ConsultaPerfiles()
        {
            var perfiles = InvBD.PerfilDeUsuario.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPerfilDeUsuario,
                    p.Perfil,
                    p.Nivel,
                    p.Permisos,
                    p.Comentarios
                });
            return Json(perfiles, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaConsultaPerfil(long Id)
        {
            var perfil = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(Id))
                .Select(p => new
                {
                    p.IdPerfilDeUsuario,
                    p.Perfil,
                    p.Nivel,
                    p.Permisos,
                    p.Comentarios
                });
            return Json(perfil, JsonRequestBehavior.AllowGet);
        }
    }
}
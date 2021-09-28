using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ConfiguracionController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Configuracion
        public ActionResult Configuracion()
        {
            return View();
        }
        public JsonResult ConsultaConfiguraciones()
        {
            var configuraciones = InvBD.Configuracion.Where(p => p.Estatus.Equals(1))
              .Select(p => new
                {
                    p.RFC,
                    p.NombreEmpresa,
                    p.Vision,
                    p.Mision,
                    p.Valores,
                    p.Direccion,
                    p.Telefono,
                    p.DireccionHost,
                    p.Puerto,
                    p.Logo,
                    p.LogoTexto,
                    p.SesionAbierta,
                    p.SerCorreo,
                    p.SerCorreoPort,
                    p.SerCorreoUser,
                    p.SerCorreoPass,
                    p.DirWeb,
                    p.Tipo,
                    p.Dato2,
                    p.Dato3,
                    p.Dato4
                });
            return Json(configuraciones, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaConfiguracion(long Id)
        {
            var configuracion = InvBD.Configuracion.Where(p => p.Id.Equals(Id))
                  .Select(p => new
                {
                    p.RFC,
                    p.NombreEmpresa,
                    p.Vision,
                    p.Mision,
                    p.Valores,
                    p.Direccion,
                    p.Telefono,
                    p.DireccionHost,
                    p.Puerto,
                    p.Logo,
                    p.LogoTexto,
                    p.SesionAbierta,
                    p.SerCorreo,
                    p.SerCorreoPort,
                    p.SerCorreoUser,
                    p.SerCorreoPass,
                    p.DirWeb,
                    p.Tipo,
                    p.Dato2,
                    p.Dato3,
                    p.Dato4
                });
            return Json(configuracion, JsonRequestBehavior.AllowGet);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class UsuarioController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Usuario
        public ActionResult Usuario()
        {
            return View();
        }

        public JsonResult ConsultaUsuarios()
        {
            var usuarios = InvBD.Usuarios.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.CURP,
                    p.Nombre,
                    p.ApellidosP,
                    p.ApellidosM,
                    p.Foto,
                    p.FechaDeNacimiento,
                    p.IdEstados,
                    p.IdMucipios,
                    p.IdLocalidades,
                    p.RFC,
                    p.NoSS,
                    p.Correo,
                    p.Telefono,
                    p.IdPerfil,
                    p.LvlPerfil,
                    p.NArea,
                    p.NSArea,
                    p.Asignacion,
                    p.sitio,
                    p.Usuario,
                    p.FechaIngreso,
                    p.Contraseña,
                    p.Estatus,
                });
            return Json(usuarios, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaUsuario(long Id)
        {
            var usuario = InvBD.Usuarios.Where(p => p.Estatus.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.CURP,
                    p.Nombre,
                    p.ApellidosP,
                    p.ApellidosM,
                    p.Foto,
                    p.FechaDeNacimiento,
                    p.IdEstados,
<<<<<<< HEAD
=======
                    p.IdMucipios,
                    p.IdLocalidades,
>>>>>>> anabel
                    p.RFC,
                    p.NoSS,
                    p.Correo,
                    p.Telefono,
                    p.IdPerfil,
                    p.LvlPerfil,
                    p.NArea,
                    p.NSArea,
                    p.Asignacion,
                    p.sitio,
                    p.Usuario,
                    p.FechaIngreso,
                    p.Contraseña,
                    p.Estatus,
                });
            return Json(usuario, JsonRequestBehavior.AllowGet);
        }
    }
}



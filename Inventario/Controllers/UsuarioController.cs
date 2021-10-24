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

<<<<<<< HEAD
=======
        public JsonResult ConsultaUsuarios()
        {
            var usuarios = InvBD.Usuarios.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdUsuarios,
                    p.CURP,
                    p.Nombre,
                    p.ApellidosP,
                    p.ApellidosM,
                    p.Foto,
                    p.FechaDeNacimiento,
                    p.IdEstado,
                    p.IdMunicipio,
                    p.IdLocalidad,
                    p.RFC,
                    p.NoSS,
                    p.Correo,
                    p.Telefono,
                    p.IdPerfil,
                    p.LvlPerfil,
                    p.NArea,
                    p.NSArea,
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
                    p.IdUsuarios,
                    p.CURP,
                    p.Nombre,
                    p.ApellidosP,
                    p.ApellidosM,
                    p.Foto,
                    p.FechaDeNacimiento,
                    p.IdEstado,
                    p.IdMunicipio,
                    p.IdLocalidad,
                    p.RFC,
                    p.NoSS,
                    p.Correo,
                    p.Telefono,
                    p.IdPerfil,
                    p.LvlPerfil,
                    p.NArea,
                    p.NSArea,
                    p.Usuario,
                    p.FechaIngreso,
                    p.Contraseña,
                    p.Estatus
                });
            return Json(usuario, JsonRequestBehavior.AllowGet);
        }

        //Guardar los datos del proveedor
        public int GuardarProveedor(Usuarios DatosUsuarios, string cadF)
        {
            int Afectados = 0;
            try
            {
                long id = DatosUsuarios.IdUsuarios;

                if (id.Equals(0))
                {
                    //Guardar el proveedor cuando no exista uno con el mismo nombre en la base de datos
                    int nveces = InvBD.Usuarios.Where(p => p.Nombre.Equals(DatosUsuarios.Nombre)).Count();
                    if (nveces == 0)
                    {
                        DatosUsuarios.Foto = Convert.FromBase64String(cadF);
                        InvBD.Usuarios.InsertOnSubmit(DatosUsuarios);
                        InvBD.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
                else
                {
                    int nveces = InvBD.Usuarios.Where(p => p.CURP.Equals(DatosUsuarios.CURP) && p.Nombre.Equals(DatosUsuarios.Nombre) && p.Correo.Equals(DatosUsuarios.Correo) && p.ApellidosP.Equals(DatosUsuarios.ApellidosP) && p.ApellidosM.Equals(DatosUsuarios.ApellidosM) && p.FechaDeNacimiento.Equals(DatosUsuarios.FechaDeNacimiento) && p.IdEstado.Equals(DatosUsuarios.IdEstado) && p.IdMunicipio.Equals(DatosUsuarios.IdMunicipio) && p.IdLocalidad.Equals(DatosUsuarios.IdLocalidad) && p.RFC.Equals(DatosUsuarios.RFC) && p.RFC.Equals(DatosUsuarios.RFC) && p.NoSS.Equals(DatosUsuarios.NoSS) && p.Telefono.Equals(DatosUsuarios.Telefono) && p.IdPerfil.Equals(DatosUsuarios.IdPerfil) && p.LvlPerfil.Equals(DatosUsuarios.LvlPerfil) && p.NArea.Equals(DatosUsuarios.NArea) && p.NSArea.Equals(DatosUsuarios.NSArea) && p.Usuario.Equals(DatosUsuarios.Usuario)).Count();
                    if (nveces == 0)
                    {
                        Usuarios obj = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(id)).First();
                        obj.CURP = DatosUsuarios.CURP;
                        obj.Nombre = DatosUsuarios.Nombre;
                        obj.ApellidosP = DatosUsuarios.ApellidosP;
                        obj.ApellidosM = DatosUsuarios.ApellidosM;
                        obj.Foto = DatosUsuarios.Foto;

                        obj.FechaDeNacimiento = DatosUsuarios.FechaDeNacimiento;
                        obj.IdEstado = DatosUsuarios.IdEstado;
                        obj.IdMunicipio = DatosUsuarios.IdMunicipio;
                        obj.IdLocalidad = DatosUsuarios.IdLocalidad;
                        obj.Correo = DatosUsuarios.Correo;
                        obj.RFC = DatosUsuarios.RFC;
                        obj.NoSS = DatosUsuarios.NoSS;
                        obj.Correo = DatosUsuarios.Correo;
                        obj.Telefono = DatosUsuarios.Telefono;
                        obj.IdPerfil = DatosUsuarios.IdPerfil;
                        obj.LvlPerfil = DatosUsuarios.LvlPerfil;
                        obj.NArea = DatosUsuarios.NArea;
                        obj.NSArea = DatosUsuarios.NSArea;
                        obj.Usuario = DatosUsuarios.Usuario;
                        obj.FechaIngreso = DatosUsuarios.FechaIngreso;
                        obj.Contraseña = DatosUsuarios.Contraseña;
                        obj.Foto = Convert.FromBase64String(cadF);
                        InvBD.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }
        public int EliminarUsuario(long IdUsuarios)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Usuarios Usr = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(IdUsuarios)).First();
                Usr.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
>>>>>>> alma
    }
}


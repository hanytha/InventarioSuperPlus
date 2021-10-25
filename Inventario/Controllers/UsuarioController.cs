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
        //consulta general de los proveedores
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
                    p.FechaDeNacimiento,
                    p.RFC,
                    p.NoSS,
                    p.Correo,
                    p.Telefono,
                    p.LvlPerfil,
                    p.Usuario,
                    FechaIngreso = ((DateTime)p.FechaIngreso).ToShortDateString(),
                });
            return Json(usuarios, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaUsuario(long Id)
        {//Consulta específico mediante ID
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
                    p.NArea,
                    p.NSArea,
                    p.LvlPerfil,
                    p.Usuario,
                    p.FechaIngreso,
                    p.Password,
                    p.Estatus,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                });
            return Json(usuario, JsonRequestBehavior.AllowGet);
        }
        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaUsr(long Id)
        {
            var us = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(Id) && p.Estatus.Equals(1))
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
                    p.NArea,
                    p.NSArea,
                    p.LvlPerfil,
                    p.Usuario,
                    p.FechaIngreso,
                    p.Password,
                    p.Estatus,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                    Fecha = ((DateTime)p.FechaDeNacimiento).ToShortDateString()
                });
            return Json(us, JsonRequestBehavior.AllowGet);
        }





        //consulta usuario por perfil
        public JsonResult ConsultaUsuarioPerfil(long IDPerf)
        {
            var datos = InvBD.Usuarios.Where(p => p.IdPerfil.Equals(IDPerf) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdUsuarios,
                    p.Nombre,
                    p.ApellidosP,
                    p.ApellidosM
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }


        //consulta areas
        public JsonResult ConsultaPerfiles()
        {
            var datos = InvBD.PerfilDeUsuario.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdPerfilDeUsuario,
                    Nombre = p.Perfil
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }




        //Guardar los datos del proveedor
        public int GuardarUsuario(Usuarios DatosUsuarios, string cadF)
        {
            int Afectados = 0;
            try
            {
                long id = DatosUsuarios.IdUsuarios;
                if (id.Equals(0))
                {
                    //Guardar el Usuario cuando no exista uno con el mismo nombre en la base de datos
                    int nveces = InvBD.Usuarios.Where(p => p.CURP.Equals(DatosUsuarios.CURP)).Count();
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
                    int nveces = InvBD.Usuarios.Where(p => p.CURP.Equals(DatosUsuarios.CURP)
                    && p.IdArea.Equals(DatosUsuarios.IdArea) && p.IdSubArea.Equals(DatosUsuarios.IdSubArea)
                    && p.IdPerfil.Equals(DatosUsuarios.IdPerfil) && p.IdEstado.Equals(DatosUsuarios.IdEstado)
                    && p.IdMunicipio.Equals(DatosUsuarios.IdMunicipio) && p.IdLocalidad.Equals(DatosUsuarios.IdLocalidad)
                    && p.Foto.Equals(DatosUsuarios.Foto) && p.Telefono.Equals(DatosUsuarios.Telefono)).Count();

                    if (nveces == 0)
                    {
                        Usuarios obj = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(id)).First();
                        obj.Nombre = DatosUsuarios.Nombre;
                        obj.ApellidosP = DatosUsuarios.ApellidosP;
                        obj.ApellidosM = DatosUsuarios.ApellidosM;
                        obj.Password = DatosUsuarios.Password;
                        obj.IdArea = DatosUsuarios.IdArea;
                        obj.IdSubArea = DatosUsuarios.IdSubArea;
                        obj.Foto = Convert.FromBase64String(cadF);
                        obj.IdPerfil = DatosUsuarios.IdPerfil;
                        obj.IdMunicipio = DatosUsuarios.IdMunicipio;
                        //obj.NombreM = usuario.NombreM;
                        //obj.NombreL = usuario.NombreL;
                        obj.IdLocalidad = DatosUsuarios.IdLocalidad;
                        obj.Correo = DatosUsuarios.Correo;
                        obj.Telefono = DatosUsuarios.Telefono;
                      
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
        public int EliminarUsuarios(long IdUsuarios)
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
    }
}


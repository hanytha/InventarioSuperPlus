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
        public JsonResult BDPaginas()
        {
            var DatosPaginas = InvBD.Pagina.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdPagina,
                    Nombre = p.Mensaje,
                    p.Accion,
                    p.Controlador,
                    p.Descripcion,
                    p.Icono
                });
            return Json(DatosPaginas, JsonRequestBehavior.AllowGet);
        }
        //Consulta la página que tenga el ID
        public JsonResult BDPagina(long ID)
        {
            var DatosPagina = InvBD.Pagina.Where(p => p.Estatus.Equals(1) && p.IdPagina.Equals(ID))
                .Select(p => new
                {
                    ID = p.IdPagina,
                    Nombre = p.Mensaje,
                    p.Accion,
                    p.Controlador,
                    p.Icono,
                    p.Descripcion
                });
            return Json(DatosPagina, JsonRequestBehavior.AllowGet);
        }
        //Guarda las nuevas páginas y los cambios
        public int GuardarPagina(Pagina DataPagina)
        {
            int Afectados = 0;
            //try
            //{
            long IDPagina = DataPagina.IdPagina;
            if (IDPagina.Equals(0))
            {
                int nveces = InvBD.Pagina.Where(p => p.Accion.Equals(DataPagina.Accion) && p.Controlador.Equals(DataPagina.Controlador) && p.Mensaje.Equals(DataPagina.Mensaje)).Count();
                if (nveces == 0)
                {
                    InvBD.Pagina.InsertOnSubmit(DataPagina);
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
                int nveces = InvBD.Pagina.Where(p => p.Accion.Equals(DataPagina.Accion) && p.Controlador.Equals(DataPagina.Controlador) && p.Mensaje.Equals(DataPagina.Mensaje) && p.Icono.Equals(DataPagina.Icono) && p.Descripcion.Equals(DataPagina.Descripcion)).Count();
                if (nveces == 0)
                {
                    Pagina obj = InvBD.Pagina.Where(p => p.IdPagina.Equals(IDPagina)).First();
                    obj.Mensaje = DataPagina.Mensaje;
                    obj.Accion = DataPagina.Accion;
                    obj.Controlador = DataPagina.Controlador;
                    obj.Icono = DataPagina.Icono;
                    obj.Descripcion = DataPagina.Descripcion;
                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
        //}
        //catch (Exception ex)
        //{
        //    Afectados = 0;
        //}
            return Afectados;
        }

    //Eliminia la área
    public int EliminarPagina(long IdPagina)
        {
            int Afectado = 0;
            try
            {
                Pagina Pagina = InvBD.Pagina.Where(p => p.IdPagina.Equals(IdPagina)).First();
                Pagina.Estatus = 0;
                InvBD.SubmitChanges();
                Afectado = 1;
            }
            catch (Exception ex)
            {
                Afectado = 0;
            }
            return Afectado;
        }
        //****************************************************************************************
        //Consulta todos los perfiles
        public JsonResult BDPerfiles()
        {
            var DatosPaginas = InvBD.PerfilDeUsuario.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdPerfilDeUsuario,
                    Nombre = p.Perfil,
                    p.Nivel,
                    p.Permisos,
                    p.Comentarios
                });
            return Json(DatosPaginas, JsonRequestBehavior.AllowGet);
        }
        //Busca el perfil según su ID
        public JsonResult BDPerfil(long IDPerfil)
        {
            var DatosPaginas = InvBD.PerfilDeUsuario.Where(p => p.Estatus.Equals(1) && p.IdPerfilDeUsuario.Equals(IDPerfil))
                .Select(p => new
                {
                    ID = p.IdPerfilDeUsuario,
                    Nombre = p.Perfil,
                    p.Nivel,
                    p.Permisos,
                    p.Comentarios
                });
            return Json(DatosPaginas, JsonRequestBehavior.AllowGet);
        }
        //Guarda las nuevas páginas y los cambios
        public int GuardarPerfil(PerfilDeUsuario DataPerfil)
        {
            int Afectados = 0;
            try
            {
                long IDPerfil = DataPerfil.IdPerfilDeUsuario;
                if (IDPerfil.Equals(0))
                {
                    int nveces = InvBD.PerfilDeUsuario.Where(p => p.Perfil.Equals(DataPerfil.Perfil) && p.Nivel.Equals(DataPerfil.Nivel) && p.Permisos.Equals(DataPerfil.Permisos)).Count();
                    if (nveces == 0)
                    {
                        InvBD.PerfilDeUsuario.InsertOnSubmit(DataPerfil);
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
                    int nveces = InvBD.PerfilDeUsuario.Where(p => p.Perfil.Equals(DataPerfil.Perfil) && p.Nivel.Equals(DataPerfil.Nivel) && p.Permisos.Equals(DataPerfil.Permisos) && p.Comentarios.Equals(DataPerfil.Comentarios)).Count();
                    if (nveces == 0)
                    {
                        PerfilDeUsuario obj = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(IDPerfil)).First();
                        obj.Perfil = DataPerfil.Perfil;
                        obj.Nivel = DataPerfil.Nivel;
                        obj.Permisos = DataPerfil.Permisos;
                        obj.Comentarios = DataPerfil.Comentarios;
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
        //Eliminia la área
        public int EliminarPerfil(long IdPerfil)
        {
            int Afectado = 0;
            try
            {
                PerfilDeUsuario Perfil = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(IdPerfil)).First();
                Perfil.Estatus = 0;
                InvBD.SubmitChanges();
                Afectado = 1;
            }
            catch (Exception ex)
            {
                Afectado = 0;
            }
            return Afectado;
        }
    }
}
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//namespace Inventario.Controllers
//{
//    public class PerfilesController : Controller
//    {//conexion con DB
//        InventarioBDDataContext InvBD = new InventarioBDDataContext();
//        // GET: Perfiles
//        public ActionResult Perfiles()
//        {
//            return View();
//        }
//        //
//        //consulta general de los proveedores
//        public JsonResult ConsultaPefiles()
//        {
//            var perfiles = InvBD.PerfilDeUsuario.Where(p => p.Estatus.Equals(1))
//                .Select(p => new
//                {
//                    p.IdPerfilDeUsuario,
//                    p.IdPagina,
//                    p.Perfil,
//                    p.Nivel,
//                    p.Permisos,
//                    p.Comentarios
//                });
//            return Json(perfiles, JsonRequestBehavior.AllowGet);
//        }
//        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
//        public JsonResult ConsultaPerfil(long Id)
//        {
//            var perfil = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(Id) && p.Estatus.Equals(1))
//                .Select(p => new
//                {
//                    p.IdPerfilDeUsuario,
//                    p.IdPagina,
//                    p.Perfil,
//                    p.Nivel,
//                    p.Permisos,
//                    p.Comentarios
//                });
//            return Json(perfil, JsonRequestBehavior.AllowGet);
//        }
//        //Guardar los datos de la compra
//        public int GuardarPerfil(PerfilDeUsuario DatosPerfil)
//        {
//            int Afectados = 0;
//            try
//            {
//                long id = DatosPerfil.IdPerfilDeUsuario;
//                if (id.Equals(0))
//                {
//                    int nveces = InvBD.PerfilDeUsuario.Where(p => p.Perfil.Equals(DatosPerfil.Perfil)).Count();
//                    // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
//                    if (nveces == 0)
//                    {
//                        InvBD.PerfilDeUsuario.InsertOnSubmit(DatosPerfil);
//                        InvBD.SubmitChanges();
//                        Afectados = 1;
//                    }
//                    else
//                    {
//                        Afectados = -1;
//                    }
//                }
//                else
//                {
//                    int nveces = InvBD.PerfilDeUsuario.Where(p => p.Perfil.Equals(DatosPerfil.Perfil) && p.Nivel.Equals(DatosPerfil.Nivel) && p.Permisos.Equals(DatosPerfil.Permisos) && p.Comentarios.Equals(DatosPerfil.Comentarios)).Count();
//                    if (nveces == 0)
//                    {
//                        PerfilDeUsuario obj = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(id)).First();
//                        obj.Perfil = DatosPerfil.Perfil;
//                        obj.Nivel = DatosPerfil.Nivel;
//                        obj.Permisos = DatosPerfil.Permisos;
//                        obj.Comentarios = DatosPerfil.Comentarios;
//                        InvBD.SubmitChanges();
//                        Afectados = 1;
//                    }
//                    else
//                    {
//                        Afectados = -1;
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                Afectados = 0;
//            }
//            return Afectados;
//        }

//        public int EliminarPerfil(long Id)
//        {
//            int nregistradosAfectados = 0;
//            try
//            {//Consulta los datos y el primer Id que encuentra  lo compara
//                PerfilDeUsuario Pag = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(Id)).First();
//                Pag.Estatus = 0;//Cambia el estatus en 0
//                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
//                nregistradosAfectados = 1;//Se pudo realizar
//            }
//            catch (Exception ex)
//            {
//                nregistradosAfectados = 0;
//            }
//            return nregistradosAfectados;
//        }

//    }
//}


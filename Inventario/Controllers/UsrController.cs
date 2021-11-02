//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace Inventario.Controllers
//{
//    public class UsrController : Controller
//    {//conexion con DB
//        InventarioBDDataContext InvBD = new InventarioBDDataContext();
//        // GET: Usr
//        public ActionResult Usr()
//        {
//            return View();
//        }
//        //consulta general
//        public JsonResult ConsultaUsuarios()
//        {
//            var usuarios = InvBD.Usuarios.Where(p => p.Estatus.Equals(1))
//                .Select(p => new
//                {
//                    p.IdUsuarios,
//                    p.CURP,
//                    p.Nombre,
//                    p.ApellidosP,
//                    p.ApellidosM,
//                    p.Foto,
//                    p.FechaDeNacimiento,
//                    p.IdEstado,
//                    p.IdMunicipio,
//                    p.IdLocalidad,
//                    p.RFC,
//                    p.NoSS,
//                    p.Correo,
//                    p.Telefono,
//                    p.IdPerfil,
//                    p.NArea,
//                    p.NSArea,
//                    p.LvlPerfil,
//                    p.Usuario,
//                    FechaIngreso = ((DateTime)p.FechaIngreso).ToShortDateString(),
//                    p.Password,
//                    p.Estado,
//                    p.Municipio,
//                    p.Localidad,
//                    p.IdArea,
//                    p.IdSubArea,
//                    p.Area,
//                    p.SubArea
//                });
//            return Json(usuarios, JsonRequestBehavior.AllowGet);
//        }

//        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
//        public JsonResult ConsultaUsuario(long Id)
//        {
//            var usuario = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(Id) && p.Estatus.Equals(1))
//                .Select(p => new
//                {
//                    p.IdUsuarios,
//                    p.CURP,
//                    p.Nombre,
//                    p.ApellidosP,
//                    p.ApellidosM,
//                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
//                    FechaNaci = ((DateTime)p.FechaDeNacimiento).ToShortDateString(),
//                    p.IdEstado,
//                    p.IdMunicipio,
//                    p.IdLocalidad,
//                    p.RFC,
//                    p.NoSS,
//                    p.Correo,
//                    p.Telefono,
//                    p.IdPerfil,
//                    p.NArea,
//                    p.NSArea,
//                    p.LvlPerfil,
//                    p.Usuario,
//                    p.FechaIngreso,
//                    p.Password,
//                    p.Estado,
//                    p.Municipio,
//                    p.Localidad,
//                    p.IdArea,
//                    p.IdSubArea,
//                    p.Area,
//                    p.SubArea
//                });
//            return Json(usuario, JsonRequestBehavior.AllowGet);
//        }


//        //consulta usuario por perfil
//        public JsonResult ConsultaUsuarioPerfil(long IDPerf)
//        {
//            var datos = InvBD.Usuarios.Where(p => p.IdPerfil.Equals(IDPerf) && p.Estatus.Equals(1))
//                .Select(p => new
//                {
//                    p.IdUsuarios,
//                    p.Nombre,
//                    p.ApellidosP,
//                    p.ApellidosM
//                });
//            return Json(datos, JsonRequestBehavior.AllowGet);
//        }


//        //consulta perfil
//        public JsonResult ConsultaPerfiles()
//        {
//            var datos = InvBD.PerfilDeUsuario.Where(p => p.Estatus.Equals(1))
//                .Select(p => new
//                {
//                    ID = p.IdPerfilDeUsuario,
//                    Nombre = p.Perfil
//                });
//            return Json(datos, JsonRequestBehavior.AllowGet);
//        }

//        //Guardar los datos del usuario
//        public int GuardarUsuario(Usuarios usuario, string cadF)
//        {
//            int Afectados = 0;
//            try
//            {
//            long id = usuario.IdUsuarios;
//            if (id.Equals(0))
//            {
//                int nveces = InvBD.Usuarios.Where(p => p.CURP.Equals(usuario.CURP)).Count();

//                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
//                if (nveces == 0)
//                {
//                    usuario.Foto = Convert.FromBase64String(cadF);
//                    InvBD.Usuarios.InsertOnSubmit(usuario);
//                    InvBD.SubmitChanges();
//                    Afectados = 1;
//                }
//                else
//                {
//                    Afectados = -1;
//                }
//            }
//            else
//            {
//                int nveces = InvBD.Usuarios.Where(p => p.CURP.Equals(usuario.CURP) && p.Nombre.Equals(usuario.Nombre) &&
//                p.Nombre.Equals(usuario.Nombre) && p.ApellidosP.Equals(usuario.ApellidosP) && p.ApellidosM.Equals(usuario.ApellidosM) &&
//                p.Foto.Equals(usuario.Foto) &&  p.FechaDeNacimiento.Equals(usuario.FechaDeNacimiento) && p.IdEstado.Equals(usuario.IdEstado) &&
//                p.IdMunicipio.Equals(usuario.IdMunicipio) && p.IdLocalidad.Equals(usuario.IdLocalidad) && p.RFC.Equals(usuario.RFC) && 
//                p.NoSS.Equals(usuario.NoSS) && p.Correo.Equals(usuario.Correo) && p.Telefono.Equals(usuario.Telefono) && p.IdPerfil.Equals(usuario.IdPerfil) && 
//                p.NArea.Equals(usuario.NArea) && p.NSArea.Equals(usuario.NSArea) && p.LvlPerfil.Equals(usuario.LvlPerfil) && 
//                p.FechaIngreso.Equals(usuario.FechaIngreso) && p.Password.Equals(usuario.Password) && p.Estado.Equals(usuario.Estado) && 
//                p.Municipio.Equals(usuario.Municipio) && p.Localidad.Equals(usuario.Localidad) && p.IdArea.Equals(usuario.IdArea) && 
//                usuario.IdSubArea.Equals(usuario.IdSubArea) && p.Area.Equals(usuario.Area) && p.SubArea.Equals(usuario.SubArea)).Count();
//                if (nveces == 0)
//                {
//                    Usuarios obj = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(id)).First();
//                    obj.CURP = usuario.CURP;
//                    obj.Nombre = usuario.Nombre;
//                    obj.ApellidosP = usuario.ApellidosP;
//                    obj.ApellidosM = usuario.ApellidosM;
//                    obj.Foto = Convert.FromBase64String(cadF);
//                    obj.FechaDeNacimiento = usuario.FechaDeNacimiento;
//                    obj.IdEstado = usuario.IdEstado;
//                    obj.IdMunicipio = usuario.IdMunicipio;
//                    obj.IdLocalidad = usuario.IdLocalidad;
//                    obj.RFC = usuario.RFC;
//                    obj.NoSS = usuario.NoSS;
//                    obj.Telefono = usuario.Telefono;
//                    obj.Correo = usuario.Correo;
//                    obj.IdPerfil = usuario.IdPerfil;
//                    obj.NArea = usuario.NArea;
//                    obj.NSArea = usuario.NSArea; 
//                    obj.NArea = usuario.NArea;
//                    obj.LvlPerfil = usuario.LvlPerfil;
//                    obj.Usuario = usuario.Usuario;
//                    obj.FechaIngreso = usuario.FechaIngreso; 
//                    obj.Password = usuario.Password;
//                    obj.estados = usuario.estados; 
//                    obj.municipios = usuario.municipios;
//                    obj.localidades = usuario.localidades;
//                    obj.Usuario = usuario.Usuario;
//                    obj.FechaIngreso = usuario.FechaIngreso;
//                    obj.Password = usuario.Password;
//                    InvBD.SubmitChanges();
//                    Afectados = 1;
//                }
//                else
//                {
//                    Afectados = -1;
//                }
//            }
//            }
//            catch (Exception ex)
//            {
//                Afectados = 0;
//            }
//            return Afectados;
//        }



//        //Eliminar Compra
//        public int EliminarUsuario(long Id)
//        {
//            int nregistradosAfectados = 0;
//            try
//            {//Consulta los datos y el primer Id que encuentra  lo compara
//                Usuarios usuario = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(Id)).First();
//                usuario.Estatus = 0;//Cambia el estatus en 0
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

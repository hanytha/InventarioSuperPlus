using Inventario.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View();
        }
        public int IniciarUsuario(string User, string Password)
        {
            int solicitud = 0;
            try
            {
                string ConSif = Encrypt(Password);
                using (InventarioBDDataContext InvBD = new InventarioBDDataContext())
                {
                    solicitud = InvBD.Usuarios.Where(p => p.Usuario == User && p.Password == ConSif && p.Estatus.Equals(1)).Count();
                    if (solicitud == 1)
                    {
                        var DatosUsuario = InvBD.Usuarios.Where(p => p.Usuario == User && p.Password == ConSif && p.Estatus.Equals(1))
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
                            p.Estado,
                            p.Municipio,
                            p.Localidad,
                            p.IdArea,
                            p.IdSubArea,
                            p.NArea,
                            p.NSArea,
                            p.Usuario,
                            p.FechaIngreso,
                            p.Password
                        }).First();

                        Session["Usuario"] = DatosUsuario.IdUsuarios;
                        Accesos.Id = DatosUsuario.IdUsuarios;
                        Accesos.CURP = DatosUsuario.CURP;
                        Accesos.Nombre = DatosUsuario.Nombre;
                        Accesos.ApellidosP = DatosUsuario.ApellidosP;
                        Accesos.ApellidosM = DatosUsuario.ApellidosM;
                        Accesos.CURP = DatosUsuario.CURP;
                        Accesos.Usuario = DatosUsuario.Usuario;
                        Accesos.Foto = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());
                        Accesos.FechaDeNacimiento = DatosUsuario.FechaDeNacimiento;
                        Accesos.IdEstado = DatosUsuario.IdEstado;
                        Accesos.IdMunicipio = DatosUsuario.IdMunicipio;
                        Accesos.IdLocalidad = DatosUsuario.IdLocalidad;
                        Accesos.RFC = DatosUsuario.RFC;
                        Accesos.NoSS = DatosUsuario.NoSS;
                        Accesos.Correo = DatosUsuario.Correo;
                        Accesos.Telefono = DatosUsuario.Telefono;
                        Accesos.IdPerfil = DatosUsuario.IdPerfil;
                        Accesos.LvlPerfil = DatosUsuario.LvlPerfil;
                        Accesos.FechaIngreso = DatosUsuario.FechaIngreso;
                        Accesos.Estado = DatosUsuario.Estado;
                        Accesos.Municipio = DatosUsuario.Municipio;
                        Accesos.Localidad = DatosUsuario.Localidad;
                        Accesos.IdArea = DatosUsuario.IdArea;
                        Accesos.IdSubArea = DatosUsuario.IdArea;
                        Accesos.NArea = DatosUsuario.NArea;
                        Accesos.NSArea = DatosUsuario.NSArea;
                        Session["IDAsignacion"] = (long)DatosUsuario.IdArea;
                        //Accesos.IDAsignacion = (long)DatosUsuario.IDAsignacion;
                        //Session["IDSitio"] = (long)DatosUsuario.IDSitio;
                        //Accesos.IDSitio = (long)DatosUsuario.IDSitio;
                        ////Accesos.Sitio = DatosUsuario.IDSitio;
                        if (Accesos.IDAsignacion != 0)
                        {
                            //    var Asignasion = InvBD.System_Inf_Asignacion.Where(p => p.IDAsignacion.Equals(DatosUsuario.IDAsignacion)).First();
                            //    Accesos.Asignacion = Asignasion.Nombre;
                            if (Accesos.IDAsignacion == 1)
                            {
                                var Sucursal = InvBD.Tienda.Where(p => p.IdTienda.Equals(DatosUsuario.IdArea)).First();
                                //Accesos.Nombre = Sucursal.Nombre;
                                Accesos.Tienda = DatosUsuario.Nombre.ToString();
                            }
                            else if (Accesos.IDAsignacion == 2)
                            {
                                var Supervision = InvBD.Supervision.Where(p => p.IdSupervision.Equals(DatosUsuario.IdArea)).First();
                                Accesos.Tienda = Supervision.Tienda;
                                Accesos.IdArea = Supervision.IdSupervision;
                            }
                            //else if (Accesos.IDAsignacion == 3) {
                            //    Accesos.Sitio = "Oficina";
                            //    Accesos.Tiendas = "";
                            //}
                            //else {
                            //    Accesos.Sitio = "No tiene ninguna asignación";
                            //    Accesos.Tiendas = "";
                            //}
                        }
                        if (DatosUsuario.NArea != "--Seleccione--")
                        {
                            Accesos.NArea = DatosUsuario.NArea;
                        }
                        else
                        {
                            Accesos.NSArea = "";
                        }

                        //    if (DatosUsuario.CManejador != null) {
                        //        Accesos.CManejador = DatosUsuario.CManejador;
                        //    }
                        //    else {
                        //        Accesos.CManejador = "Aun no se le ha asignado una contraseña.";
                        //    }

                        //    if (DatosUsuario.CPlataforma != null) {
                        //        Accesos.CPlataforma = DatosUsuario.CPlataforma;
                        //    }
                        //    else {
                        //        Accesos.CPlataforma = "Aun no se le ha asignado una contraseña.";
                        //}
                        var Permisos = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(DatosUsuario.IdPerfil)).First();

                        string[] abreviaturas = Permisos.Permisos.Split('$');
                        int Filas = abreviaturas.GetLength(0);

                        string[,] IdPagina = new string[Filas, 3];
                        Accesos.Perfil = Permisos.Perfil;
                        Accesos.Accion = new List<string>();
                        Accesos.Controlador = new List<string>();
                        Accesos.Mensaje = new List<string>();
                        Accesos.Icono = new List<string>();

                        for (int i = 0; i < Filas; i++)
                        {
                            var Pagina = InvBD.Pagina.Where(p => p.IdPagina.Equals(abreviaturas[i]))
                                .Select(p => new
                                {
                                    p.Accion,
                                    p.Controlador,
                                    p.Mensaje,
                                    p.Icono
                                });
                            foreach (var item in Pagina)
                            {
                                Accesos.Accion.Add(item.Accion);
                                Accesos.Controlador.Add(item.Controlador);
                                Accesos.Mensaje.Add(item.Mensaje);
                                Accesos.Icono.Add(item.Icono);
                            }
                        }
                    }
                }
            }


            catch (Exception ex)
            {
                solicitud = 0;
            }
            return solicitud;
        }
        static readonly string password = "P455W0rd";

        public int Filas { get; private set; }

        public static string Encrypt(string plainText)
        {
            if (plainText == null)
            {
                return null;
            }
            var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            passwordBytes = SHA512.Create().ComputeHash(passwordBytes);
            var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);
            return Convert.ToBase64String(bytesEncrypted);
        }
        private static byte[] Encrypt(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        {
            byte[] encryptedBytes = null;
            var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);
                    AES.Mode = CipherMode.CBC;
                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                        cs.Close();
                    }
                    encryptedBytes = ms.ToArray();
                }
            }
            return encryptedBytes;
        }
        public ActionResult logout()
        {
            Session["Usuario"] = null;
            return RedirectToAction("Login");
        }

    }
}














//public int IniciarUsuario(string User, string Password)
//{
//    int solicitud = 0;
//    try
//    {
//        string ConSif = Encrypt(Password);

//        using (InventarioBDDataContext InvBD = new InventarioBDDataContext())
//        {
//            solicitud = InvBD.Usuario.Where(p => p.Usuario == User && p.Password == ConSif && p.Estatus.Equals(1)).Count();
//            if (solicitud == 1)
//            {
//                var DatosUsuario = InvBD.Usuario.Where(p => p.Usuario == User && p.Password == ConSif && p.Estatus.Equals(1))
//                    .Select(p => new
//                    {
//                        p.IdUsuarios,
//                        P.CURP,
//                        P.Nombre,
//                        P.ApellidosP,
//                        P.ApellidosM,
//                        P.Usuario,
//                        P.Foto,
//                        P.FechaDeNacimiento,
//                        P.IdEstado,
//                        P.IdMunicipio,
//                        P.IdLocalidad,
//                        P.RFC,
//                        P.NoSS,
//                        P.Correo,
//                        P.Telefono,
//                        P.IdPerfil,
//                        P.LvlPerfil,
//                        P.FechaIngreso,
//                        P.Password,
//                        P.Estado,
//                        P.Municipio,
//                        P.Localidad,
//                        P.IdArea,
//                        P.IdSubArea,
//                        P.NArea,
//                        P.NSArea
//                    }).First();

//                Session["Usuario"] = DatosUsuario.IdUsuarios;
//                Accesos.ID = DatosUsuario.IdUsuarios;
//                Accesos.CURP = DatosUsuario.CURP;
//                Accesos.Nombre = DatosUsuario.Nombre;
//                Accesos.APaterno = DatosUsuario.APaterno;
//                Accesos.AMaterno = DatosUsuario.AMaterno;
//                Accesos.Foto = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());
//                Accesos.FechaDeNacimiento = DatosUsuario.FechaDeNacimiento;
//                Accesos.IdEstado = DatosUsuario.IdEstado;
//                Accesos.IdMunicipio = DatosUsuario.IdMunicipio;
//                Accesos.IdLocalidad = DatosUsuario.IdLocalidad;
//                Accesos.Estado = DatosUsuario.Estado;
//                Accesos.Municipio = DatosUsuario.Municipio;
//                Accesos.Localidad = DatosUsuario.Localidad;
//                Accesos.RFC = DatosUsuario.RFC;
//                Accesos.NoSS = DatosUsuario.NoSS;
//                Accesos.Correo = DatosUsuario.Correo;
//                Accesos.Telefono = DatosUsuario.Telefono;
//                Accesos.IdPerfil = DatosUsuario.IdPerfil;
//                Accesos.LvlPerfil = DatosUsuario.LvlPerfil;
//                Accesos.FechaIngreso = DatosUsuario.FechaIngreso;
//                Accesos.NArea = DatosUsuario.NArea;
//                Accesos.IdArea = DatosUsuario.IdArea;
//                //Session["IDAsignacion"] = (long)DatosUsuario.IDAsignacion;
//                //Accesos.IDAsignacion = (long)DatosUsuario.IDAsignacion;
//                //Session["IDSitio"] = (long)DatosUsuario.IDSitio;
//                //Accesos.IDSitio = (long)DatosUsuario.IDSitio;
//                ////Accesos.Sitio = DatosUsuario.IDSitio;
//                //if (Accesos.IDAsignacion != 0) {
//                //    var Asignasion = InvBD.System_Inf_Asignacion.Where(p => p.IDAsignacion.Equals(DatosUsuario.IDAsignacion)).First();
//                //    Accesos.Asignacion = Asignasion.Nombre;
//                //    if (Accesos.IDAsignacion == 1) {
//                var Sucursal = InvBD.Tiendas.Where(p => p.IdTienda.Equals(DatosUsuario.IdTienda)).First();
//                //Accesos.Nombre = Sucursal.Nombre;
//                Accesos.Tiendas = DatosUsuario.Nombre.ToString();
//                //}
//                //else if (Accesos.IDAsignacion == 2) {
//                //    var Supervision = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(DatosUsuario.IDSitio)).First();
//                //    Accesos.Tiendas = Supervision.Tiendas;
//                //    Accesos.Sitio = Supervision.Supervision;
//                //}
//                //else if (Accesos.IDAsignacion == 3) {
//                //    Accesos.Sitio = "Oficina";
//                //    Accesos.Tiendas = "";
//                //}
//                //else {
//                //    Accesos.Sitio = "No tiene ninguna asignación";
//                //    Accesos.Tiendas = "";
//                //}
//            }
//            if (DatosUsuario.NSArea != "--Seleccione--")
//            {
//                Accesos.NSArea = DatosUsuario.NSArea;
//            }
//            else
//            {
//                Accesos.NSArea = "";
//            }

//            //    if (DatosUsuario.CManejador != null) {
//            //        Accesos.CManejador = DatosUsuario.CManejador;
//            //    }
//            //    else {
//            //        Accesos.CManejador = "Aun no se le ha asignado una contraseña.";
//            //    }

//            //    if (DatosUsuario.CPlataforma != null) {
//            //        Accesos.CPlataforma = DatosUsuario.CPlataforma;
//            //    }
//            //    else {
//            //        Accesos.CPlataforma = "Aun no se le ha asignado una contraseña.";
//            //}
//            var Permisos = InvBD.PerfilDeUsuario.Where(p => p.IdPerfil.Equals(DatosUsuario.IdPerfil)).First();

//            //string[] abreviaturas = Permisos.Permisos.Split('#');
//            //int Filas = abreviaturas.GetLength(0);
//            string[,] IdPagina = new string[Filas, 3];
//            Accesos.Perfil = Permisos.Perfil;
//            Accesos.Accion = new List<string>();
//            Accesos.Controlador = new List<string>();
//            Accesos.Mensaje = new List<string>();
//            Accesos.Icono = new List<string>();

//            for (int i = 0; i < Filas; i++)
//            {
//                var Pagina = InvBD.Pagina.Where(p => p.IdPA.Equals(abreviaturas[i]))
//                    .Select(p => new
//                    {
//                        p.Accion,
//                        p.Controlador,
//                        p.Mensaje,
//                        p.Icono
//                    });
//                foreach (var item in Pagina)
//                {
//                    Accesos.Accion.Add(item.Accion);
//                    Accesos.Controlador.Add(item.Controlador);
//                    Accesos.Mensaje.Add(item.Mensaje);
//                    Accesos.Icono.Add(item.Icono);
//                }
//            }
//        }
//    }

//    catch (Exception ex)
//    {
//        solicitud = 0;
//    }
//    return solicitud;
//}


using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class LoginController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        /*
        public int IniciarUsuario(string User, string Password)
        {
            int solicitud = 0;
            try
            {
                string ConSif = Encrypt(Password);
                using (InventarioBDDataContext SIGES = new InventarioBDDataContext())
                {
                    solicitud = SIGES.Usuarios.Where(p => p.Usuario == User && p.Contraseña == ConSif && p.Estatus.Equals(1)).Count();
                    if (solicitud == 1)
                    {
                        var DatosUsuario = SIGES.Usuarios.Where(p => p.Usuario == User && p.Contraseña == ConSif && p.Estatus.Equals(1))
                        .Select(p => new
                        {
                            p.IdUsuarios,
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
                            p.Usuario,
                            p.FechaIngreso,
                            p.Contraseña,
                            p.Estatus,
                        }).First();

                        Session["Usuario"] = DatosUsuario.IdUsuarios;
                        Accesos.ID = DatosUsuario.IdUsuarios;
                        Accesos.CURP = DatosUsuario.CURP;
                        Accesos.Nombre = DatosUsuario.Nombre;
                        Accesos.APaterno = DatosUsuario.ApellidosP;
                        Accesos.AMaterno = DatosUsuario.ApellidosM;
                        Accesos.FNacimiento = DatosUsuario.FechaDeNacimiento;
                        Accesos.RFC = DatosUsuario.RFC;
                        Accesos.NoSS = DatosUsuario.NoSS;
                        Accesos.Foto = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());
                        Accesos.NArea = DatosUsuario.NArea;
                        Accesos.IdPerfil = (long)DatosUsuario.IdPerfil;
                        Accesos.IDSitio = (long)DatosUsuario.IDSitio;
                        //Accesos.Sitio = DatosUsuario.IDSitio;
                        if (Accesos.IdPerfil != 0) 
                        {
                            var Asignasion = SIGES.System_Inf_Asignacion.Where(p => p.IDAsignacion.Equals(DatosUsuario.IDAsignacion)).First();
                            Accesos.Asignacion = Asignasion.Nombre;
                            if (Accesos.IDAsignacion == 1)
                            {
                                var Sucursal = SIGES.System_Sis_Tienda.Where(p => p.IDTienda.Equals(DatosUsuario.IDSitio)).First();
                                Accesos.Sitio = Sucursal.Nombre;
                            }
                            else if (Accesos.IDAsignacion == 2)
                            {
                                var Supervision = SIGES.System_Supervision.Where(p => p.IDSupervision.Equals(DatosUsuario.IDSitio)).First();
                                Accesos.Sitio = Supervision.Supervision;
                                Accesos.Tiendas = Supervision.Tiendas;

                            }
                            else if (Accesos.IDAsignacion == 3)
                            {
                                Accesos.Sitio = "Oficina";
                                Accesos.Tiendas = "";
                            }
                            else
                            {
                                Accesos.Sitio = "No tiene ninguna asignación";
                                Accesos.Tiendas = "";
                            }
                        }
                        if (DatosUsuario.NSArea != "--Seleccione--")
                        {
                            Accesos.NSArea = DatosUsuario.NSArea;
                        }
                        else
                        {
                            Accesos.NSArea = "";
                        }

                        if (DatosUsuario.CManejador != null)
                        {
                            Accesos.CManejador = DatosUsuario.CManejador;
                        }
                        else
                        {
                            Accesos.CManejador = "Aun no se le ha asignado una contraseña de la plataforma FRONT.";
                        }

                        if (DatosUsuario.CPlataforma != null)
                        {
                            Accesos.CPlataforma = DatosUsuario.CPlataforma;
                        }
                        else
                        {
                            Accesos.CPlataforma = "Aun no se le ha asignado una contraseña de la plataforma MTCenter.";
                        }
                        var Permisos = SIGES.System_Sis_PerfilUsuario.Where(p => p.IDPerfil.Equals(DatosUsuario.IDPerfil)).First();

                        string[] abreviaturas = Permisos.Permisos.Split('$');
                        int Filas = abreviaturas.GetLength(0);
                        string[,] Paginas = new string[Filas, 3];

                        Accesos.Perfil = Permisos.Perfil;
                        Accesos.Accion = new List<string>();
                        Accesos.Controlador = new List<string>();
                        Accesos.Mensaje = new List<string>();
                        Accesos.Icono = new List<string>();

                        for (int i = 0; i < Filas; i++)
                        {
                            var Pagina = SIGES.System_Sis_Pagina.Where(p => p.IDPagina.Equals(abreviaturas[i]))
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
        */
    }
}
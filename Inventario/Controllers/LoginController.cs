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
                            p.NArea,
                            p.NSArea,
                            p.Usuario,
                            p.FechaIngreso,
                            p.Password
                        }).First();

                        Session["Usuario"] = DatosUsuario.IdUsuarios;
                        Accesos.Id = DatosUsuario.IdUsuarios;

                        Accesos.Nombre = DatosUsuario.Nombre;
                        Accesos.ApellidosP = DatosUsuario.ApellidosP;
                        Accesos.ApellidosM = DatosUsuario.ApellidosM;
                        Accesos.Foto = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());

                        //Accesos.Sitio = DatosUsuario.IDSitio;
                        if (Accesos.IDAsignacion != 0)
                        {

                            if (DatosUsuario.NSArea != "--Seleccione--")
                            {
                                Accesos.NSArea = DatosUsuario.NSArea;
                            }
                            else
                            {
                                Accesos.NSArea = "";
                            }


                            var Permisos = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(DatosUsuario.IdPerfil)).First();

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
                                    //  Accesos.Icono.Add(item.Icono);
                                }
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
    }
}
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
            Session["Usuario"] = User;
            int solicitud = 0;
            try
            {//Encriptar la contraseña recibida en la caja de texto(Ingresado por el usuario)
                string ConSif = Encrypt(Password);
                using (InventarioBDDataContext InvBD = new InventarioBDDataContext())
                {
                    solicitud = InvBD.Usuarios.Where(p => p.Usuario == (string)Session["Usuario"] && p.Password == ConSif && p.Estatus.Equals(1)).Count();


                    if (solicitud == 1)
                    {
                        var DatosUsuario = InvBD.Usuarios.Where(p => p.Usuario == (string)Session["Usuario"] && p.Password == ConSif && p.Estatus.Equals(1))
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
                            p.IdAsignacion,
                            p.NombreAsignacion,
                            p.IdSitio,
                            p.NombreSitio,
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
                        Session["IdPerfil"] = (long)DatosUsuario.IdPerfil;
                        Accesos.IdPerfil = DatosUsuario.IdPerfil;
                        Accesos.LvlPerfil = DatosUsuario.LvlPerfil;
                        Accesos.FechaIngreso = DatosUsuario.FechaIngreso;
                        Accesos.Estado = DatosUsuario.Estado;
                        Accesos.Municipio = DatosUsuario.Municipio;
                        Accesos.Localidad = DatosUsuario.Localidad;
                        Accesos.IdArea = DatosUsuario.IdArea;
                        Accesos.IdSubArea = DatosUsuario.IdSubArea;
                        Accesos.NArea = DatosUsuario.NArea;
                        Accesos.NSArea = DatosUsuario.NSArea;
                        Session["IDAsignacion"] = (long)DatosUsuario.IdAsignacion;
                        Accesos.IDAsignacion = (long)DatosUsuario.IdAsignacion;
                        Session["IDSitio"] = (long)DatosUsuario.IdSitio;
                        Accesos.IDSitio = (long)DatosUsuario.IdSitio;
                        //Accesos.Sitio = DatosUsuario.IDSitio;
                        



                        if ((long)Session["IDAsignacion"] != 0)
                        {
                            var Asignasion = InvBD.Asignacion.Where(p => p.IdAsignacion.Equals(DatosUsuario.IdAsignacion)).First();
                            Accesos.Asignacion = Asignasion.Nombre;
                            if (Accesos.IDAsignacion == 1)
                            {
                                var Sucursal = InvBD.Tienda.Where(p => p.IdTienda.Equals(DatosUsuario.IdSitio)).First();
                                Accesos.Sitio = Sucursal.Nombre;
                                Accesos.Tiendas = DatosUsuario.IdSitio.ToString();
                            }
                            else if ((long)Session["IDAsignacion"] == 2)
                            {
                                var Supervision = InvBD.Supervision.Where(p => p.IdSupervision.Equals(DatosUsuario.IdSitio)).First();
                                Accesos.Tiendas = Supervision.Tienda;
                                Accesos.Sitio = Supervision.TipoSupervicion;
                            }
                            else if ((long)Session["IDAsignacion"] == 3)
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


                       
                        var Permisos = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(Session["IdPerfil"])).First();
                        string[] IdPaginas = Permisos.Permisos.Split('#');
                        int Filas = IdPaginas.GetLength(0);
                        string[,] IdPagina = new string[Filas, 3];
                        Accesos.Perfil = Permisos.Perfil;
                        Accesos.NIvel = Permisos.Nivel;
                        Accesos.Accion = new List<string>();
                        Accesos.Controlador = new List<string>();
                        Accesos.Mensaje = new List<string>();
                        Accesos.Icono = new List<string>();
                        Accesos.Estatus = new List<long>();

                        for (int i = 0; i < Filas; i++)
                        {
                            var Pagina = InvBD.Pagina.Where(p => p.IdPagina.Equals(IdPaginas[i]))
                                .Select(p => new
                                {
                                    p.Accion,
                                    p.Controlador,
                                    p.Mensaje,
                                    p.Icono,
                                    p.Estatus
                                });
                            foreach (var item in Pagina)
                            {
                                Accesos.Accion.Add(item.Accion);
                                Accesos.Controlador.Add(item.Controlador);
                                Accesos.Mensaje.Add(item.Mensaje);
                                Accesos.Icono.Add(item.Icono);
                                Accesos.Estatus.Add(item.Estatus);
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
        //La llave de la contraseña encriptada
        static readonly string password = "P455W0rd";
        public int Filas { get; private set; }
        //Metodo de seguridad: cifrar y descifrar contraseñas en la base de datos con el método de encriptación (Advanced Encryption Standard (AES)),también conocido como Rijndael Encryption
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
        //Funcion Desencriptar
        public static byte[] Decrypt(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;
            byte[] saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    AES.KeySize = 256;
                    AES.BlockSize = 128;

                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);

                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                        cs.Close();
                    }
                    decryptedBytes = ms.ToArray();
                }
            }
            return decryptedBytes;
        }
    }
}


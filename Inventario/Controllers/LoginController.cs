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

                        Session["IdUsuarios"] = (long)DatosUsuario.IdUsuarios;
                        Session["Usuario"] = DatosUsuario.Usuario;
                        Session["CURP"] = DatosUsuario.CURP;
                        Session["Nombre"] = DatosUsuario.Nombre;
                        Session["ApellidosP"] = DatosUsuario.ApellidosP;
                        Session["ApellidosM"] = DatosUsuario.ApellidosM;
                        Session["FechaDeNacimiento"] = DatosUsuario.FechaDeNacimiento;
                        Session["IdEstado"] = (long)DatosUsuario.IdEstado;
                        Session["IdMunicipio"] = (long)DatosUsuario.IdMunicipio;
                        Session["IdLocalidad"] = (long)DatosUsuario.IdLocalidad;
                        Session["RFC"] = DatosUsuario.RFC;
                        Session["NoSS"] = DatosUsuario.NoSS;
                        Session["Correo"] = DatosUsuario.Correo;
                        Session["Telefono"] = DatosUsuario.Telefono;
                        Session["IdPerfil"] = (long)DatosUsuario.IdPerfil;
                        Session["LvlPerfil"] = DatosUsuario.LvlPerfil;
                        Session["FechaIngreso"] = DatosUsuario.FechaIngreso;
                        Session["Estado"] = DatosUsuario.Estado;
                        Session["Municipio"] = DatosUsuario.Municipio;
                        Session["Localidad"] = DatosUsuario.Localidad;
                        Session["IdArea"] = (long)DatosUsuario.IdArea;
                        Session["IdSubArea"] = (long)DatosUsuario.IdSubArea;
                        Session["NArea"] = DatosUsuario.NArea;

                        Session["NSArea"] = DatosUsuario.NSArea;
                        Session["NombreSitio"] = DatosUsuario.NombreSitio;
                        Session["IDAsignacion"] = (long)DatosUsuario.IdAsignacion;
                        Session["NombreAsignacion"] = DatosUsuario.NombreAsignacion;
                        Session["IDSitio"] = (long)DatosUsuario.IdSitio;
                        Session["Foto"] = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());
                        //Accesos.Id = DatosUsuario.IdUsuarios;
                        //Accesos.CURP = DatosUsuario.CURP;
                        //Accesos.Nombre = DatosUsuario.Nombre;
                        //Accesos.ApellidosP = DatosUsuario.ApellidosP;
                        //Accesos.ApellidosM = DatosUsuario.ApellidosM;;
                        //Accesos.Usuario = DatosUsuario.Usuario;
                        //Accesos.Foto = "data:image/png;base64," + Convert.ToBase64String(DatosUsuario.Foto.ToArray());
                        //Accesos.FechaDeNacimiento = DatosUsuario.FechaDeNacimiento;
                        //Accesos.IdEstado = DatosUsuario.IdEstado;
                        //Accesos.IdMunicipio = DatosUsuario.IdMunicipio;
                        //Accesos.IdLocalidad = DatosUsuario.IdLocalidad;
                        //Accesos.RFC = DatosUsuario.RFC;
                        //Accesos.NoSS = DatosUsuario.NoSS;
                        //Accesos.Correo = DatosUsuario.Correo;
                        //Accesos.Telefono = DatosUsuario.Telefono;
                        //Session["IdPerfil"] = (long)DatosUsuario.IdPerfil;
                        //Accesos.IdPerfil = DatosUsuario.IdPerfil;
                        //Accesos.LvlPerfil = DatosUsuario.LvlPerfil;
                        //Accesos.FechaIngreso = DatosUsuario.FechaIngreso;
                        //Accesos.Estado = DatosUsuario.Estado;
                        //Accesos.Municipio = DatosUsuario.Municipio;
                        //Accesos.Localidad = DatosUsuario.Localidad;
                        //Accesos.IdArea = DatosUsuario.IdArea;
                        //Accesos.IdSubArea = DatosUsuario.IdSubArea;
                        //Accesos.NArea = DatosUsuario.NArea;
                        //Accesos.NSArea = DatosUsuario.NSArea;
                        //Session["IDAsignacion"] = (long)DatosUsuario.IdAsignacion;
                        //Accesos.IDAsignacion = (long)DatosUsuario.IdAsignacion;
                        //Session["IDSitio"] = (long)DatosUsuario.IdSitio;
                        //Accesos.IDSitio = (long)DatosUsuario.IdSitio;
                        //Accesos.Sitio = DatosUsuario.IDSitio;




                        if (Accesos.IDAsignacion != 0)
                        {
                            var Asignasion = InvBD.Asignacion.Where(p => p.IdAsignacion.Equals(Session["IDAsignacion"])).First();
                            Session["IDAsignacion"] = Asignasion.Nombre;
                            if ((long)Session["IDAsignacion"] == 1)
                            {
                                var Sucursal = InvBD.Tienda.Where(p => p.IdTienda.Equals(Session["IDSitio"])).First();
                                Session["IDSitio"] = Sucursal.Nombre;
                                Session["Tiendas"] = DatosUsuario.IdSitio.ToString();

                            }
                            else if ((long)Session["IDAsignacion"] == 2)
                            {
                                var Supervision = InvBD.Supervision.Where(p => p.IdSupervision.Equals(Session["IDSitio"])).First();
                                Session["Tiendas"] = Supervision.Tienda;
                                Session["IDSitio"] = Supervision.TipoSupervicion;
                            }
                            else if ((long)Session["IDAsignacion"] == 3)
                            {
                                Session["NombreSitio"] = "Oficina";
                                Session["Tiendas"] = "";
                            }
                            else
                            {
                                Session["NombreSitio"] = "No tiene ninguna asignación";
                                Session["Tiendas"] = "";
                            }
                        }
                        if ((string)Session["NSArea"] != "--Seleccione--")
                        {
                            Session["NSArea"] = Session["NSArea"];
                        }
                        else
                        {
                            Session["NSArea"] = "";
                        }



                        var Permisos = InvBD.PerfilDeUsuario.Where(p => p.IdPerfilDeUsuario.Equals(Session["IdPerfil"])).First();
                        string[] IdPaginas = Permisos.Permisos.Split('#');
                        int Filas = IdPaginas.GetLength(0);
                        string[,] IdPagina = new string[Filas, 3];
                        Session["Perfil"] = Permisos.Perfil;
                        Session["Nivel"] = Permisos.Nivel;



                        string Accion = "";
                        string Controlador = "";
                        string Icono = "";
                        string Mensaje = "";
                        //string Estatus = "";

                        for (int i = 0; i < Filas; i++)
                        {
                            var Pagina = InvBD.Pagina.Where(p => p.IdPagina.Equals(IdPaginas[i]) && p.Estatus.Equals(1))
                                .Select(p => new
                                {
                                    p.Accion,
                                    p.Controlador,
                                    p.Mensaje,
                                    p.Icono
                                    //p.Estatus
                                });
                            foreach (var item in Pagina)
                            {
                                Accion += item.Accion + ",";
                                Controlador += item.Controlador + ",";
                                Mensaje += item.Mensaje + ",";
                                Icono += item.Icono + ",";
                                //Estatus += item.Estatus + ",";
                            }

                        }

                        Accion = Accion.Substring(0, Accion.Length - 1);
                        Controlador = Controlador.Substring(0, Controlador.Length - 1);
                        Mensaje = Mensaje.Substring(0, Mensaje.Length - 1);
                        Icono = Icono.Substring(0, Icono.Length - 1);
                        //Estatus = Estatus.Substring(0, Estatus.Length - 1);
                        Session["Acciones"] = Accion;
                        Session["Controladores"] = Controlador;
                        Session["Mensajes"] = Mensaje;
                        Session["Iconos"] = Icono;


                        //string[] Acciones = Accion.Substring(0, Accion.Length - 1).Split(',');
                        //string[] Controladores = Controlador.Substring(0, Controlador.Length - 1).Split(',');
                        //string[] Mensajes = Mensaje.Substring(0, Mensaje.Length - 1).Split(',');
                        //string[] Iconos = Icono.Substring(0, Icono.Length - 1).Split(',');
                        //string[] Estu = Estatus.Substring(0, Estatus.Length - 1).Split(',');

                        //for (int i = 0; i < Acciones.GetLength(0); i++)
                        //{
                        //    Session["Acciones"] = Convert.ToString(Acciones[i]);
                        //    Session["Controladores"] = Convert.ToString(Controladores[i]);
                        //    Session["Mensajes"] = Convert.ToString(Mensajes[i]);
                        //    Session["Iconos"] = Convert.ToString(Iconos[i]);
                        //    Session["Estu"] = Convert.ToInt32(Estu[i]);
                        //}

                        //Session["Acciones"] = Acciones;
                        //Session["Controladores"] = Controladores;
                        //Session["Mensajes"] = Mensajes;
                        //Session["Iconos"] = Iconos;
                        //Session["Estu"] = Estu;


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


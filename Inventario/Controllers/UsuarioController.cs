using Inventario.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
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
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.LvlPerfil,
                    p.Password,
                    p.FechaIngreso,
                    p.Usuario,
                    p.NArea,
                    p.NSArea
                });
            return Json(usuarios, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult ConsultaUsuario(long Id)
        //{//Consulta específico mediante ID
        //    var usuario = InvBD.Usuarios.Where(p => p.Estatus.Equals(Id))
        //        .Select(p => new
        //        {
        //            p.IdUsuarios
        //        });
        //    return Json(usuario, JsonRequestBehavior.AllowGet);
        //}


        public JsonResult ConsultaUsuario(long Id)
        {
            var usuario = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(Id) && p.Estatus.Equals(1))

                .Select(p => new
                {
                    p.IdUsuarios,
                    p.CURP,
                    p.Nombre,
                    p.ApellidosP,
                    p.ApellidosM,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Foto.ToArray()),
                    //   FechaDeNacimiento = ((DateTime)p.FechaDeNacimiento).ToShortDateString(),
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
                    //p.Password,
                    Password = Decrypt(p.Password),
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.IdArea,
                    p.IdSubArea
                });
            return Json(usuario, JsonRequestBehavior.AllowGet);

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
            //Encriptar la contraseña
            DatosUsuarios.Password = Encrypt(DatosUsuarios.Password);

            //Encriptar la contraseña


            int Afectados = 0;
            //try
            //{
            long id = DatosUsuarios.IdUsuarios;

            if (id.Equals(0))
            {
                //Guardar el Usuario cuando no exista uno con el mismo nombre en la base de datos
                int nveces = InvBD.Usuarios.Where(p => p.CURP.Equals(DatosUsuarios.CURP)).Count();
                if (nveces == 0)
                {
                    DatosUsuarios.Foto = Convert.FromBase64String(cadF);
                    //Encriptar la contraseña
                    //DatosUsuarios.Password = Encrypt(DatosUsuarios.Password);

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
                && p.Nombre.Equals(DatosUsuarios.Nombre) && p.ApellidosP.Equals(DatosUsuarios.ApellidosP)
                && p.ApellidosM.Equals(DatosUsuarios.ApellidosM) && p.FechaDeNacimiento.Equals(DatosUsuarios.FechaDeNacimiento)
                && p.RFC.Equals(DatosUsuarios.RFC) && p.NoSS.Equals(DatosUsuarios.NoSS)
                && p.Correo.Equals(DatosUsuarios.Correo) && p.Telefono.Equals(DatosUsuarios.Telefono)
                && p.IdArea.Equals(DatosUsuarios.IdArea) && p.IdSubArea.Equals(DatosUsuarios.IdSubArea)
                && p.IdPerfil.Equals(DatosUsuarios.IdPerfil) && p.IdEstado.Equals(DatosUsuarios.IdEstado)
                && p.LvlPerfil.Equals(DatosUsuarios.LvlPerfil) && p.Usuario.Equals(DatosUsuarios.Usuario)
                && p.IdEstado.Equals(DatosUsuarios.IdEstado) && p.IdMunicipio.Equals(DatosUsuarios.IdMunicipio)
                && p.IdLocalidad.Equals(DatosUsuarios.IdLocalidad) && p.Estado.Equals(DatosUsuarios.Estado)
                && p.Municipio.Equals(DatosUsuarios.Municipio) && p.Localidad.Equals(DatosUsuarios.Localidad)
                && p.Foto.Equals(DatosUsuarios.Foto) && p.Telefono.Equals(DatosUsuarios.Telefono)).Count();

                if (nveces == 0)
                {//Datos que se guardan al modificar el registro
                    Usuarios obj = InvBD.Usuarios.Where(p => p.IdUsuarios.Equals(id)).First();
                    obj.Nombre = DatosUsuarios.Nombre;
                    obj.ApellidosP = DatosUsuarios.ApellidosP;
                    obj.ApellidosM = DatosUsuarios.ApellidosM;
                    obj.Password = DatosUsuarios.Password;
                    obj.IdArea = DatosUsuarios.IdArea;
                    obj.IdSubArea = DatosUsuarios.IdSubArea;
                    obj.Foto = Convert.FromBase64String(cadF);
                    obj.IdPerfil = DatosUsuarios.IdPerfil;
                    obj.LvlPerfil = DatosUsuarios.LvlPerfil;
                    obj.IdEstado = DatosUsuarios.IdEstado;
                    obj.Estado = DatosUsuarios.Estado;
                    obj.IdMunicipio = DatosUsuarios.IdMunicipio;
                    obj.Municipio = DatosUsuarios.Municipio;
                    //obj.NombreM = usuario.NombreM;
                    //obj.NombreL = usuario.NombreL;
                    obj.IdLocalidad = DatosUsuarios.IdLocalidad;
                    obj.Localidad = DatosUsuarios.Localidad;
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
            //}
            //catch (Exception ex)
            //{
            //    Afectados = 0;
            //}
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

        //La llave de la contraseña encriptada
        static readonly string password = "P455W0rd";
        public static string Encrypt(string plainText)
        {
            if (plainText == null)
            {
                return null;
            }
            // Get the bytes of the string
            var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            // Hash the password with SHA256
            passwordBytes = SHA512.Create().ComputeHash(passwordBytes);
            var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);
            return Convert.ToBase64String(bytesEncrypted);
        }
        public static string Decrypt(string encryptedText)
        {
            if (encryptedText == null)
            {
                return null;
            }
            // Get the bytes of the string
            var bytesToBeDecrypted = Convert.FromBase64String(encryptedText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            passwordBytes = SHA512.Create().ComputeHash(passwordBytes);
            var bytesDecrypted = Decrypt(bytesToBeDecrypted, passwordBytes);
            return Encoding.UTF8.GetString(bytesDecrypted);
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
        private static byte[] Decrypt(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;
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
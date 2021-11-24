using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class ProveedoresController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Proveedores
        public ActionResult Proveedores()
        {
            return View();
        }
        //consulta general de los proveedores
        //consulta general de los proveedores
        public JsonResult ConsultaProveedores()
        {
            var proveedores = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdProveedores,
                    p.Nombre,
                    p.Correo,
                    p.RazonSocial,
                    p.ClaveInterbancaria,
                    p.CodigoPostal,
                    p.IdEstado,
                    p.Estado,
                    p.IdMunicipio,
                    p.Municipio,
                    p.IdLocalidad,
                    p.Localidad,
                    p.RFC,
                    p.Direccion,
                    p.Telefono,
                    p.Banco,
                    p.NumeroDeCuenta,
                    p.UsoCFDI,
                    p.Descripcion,
                    p.Logo
                });
            return Json(proveedores, JsonRequestBehavior.AllowGet);
        }


        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaProveedor(long Id)
        {
            var proveedores = InvBD.Proveedores.Where(p => p.IdProveedores.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdProveedores,
                    p.Nombre,
                    p.Correo,
                    p.RazonSocial,
                    p.ClaveInterbancaria,
                    p.CodigoPostal,
                    p.IdEstado,
                    p.IdMunicipio,
                    p.IdLocalidad,
                    p.RFC,
                    p.Direccion,
                    p.Telefono,
                    p.Banco,
                    p.NumeroDeCuenta,
                    p.UsoCFDI,
                    p.Descripcion,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Logo.ToArray()),
                });
            return Json(proveedores, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos del proveedor
        public int GuardarProveedor(Proveedores DatosProveedor, string cadF)
        {
            int Afectados = 0;
            try
            {
                long id = DatosProveedor.IdProveedores;
                if (id.Equals(0))
                {
                    //Guardar el proveedor cuando no exista uno con el mismo nombre en la base de datos
                    int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre)).Count();
                    if (nveces == 0)
                    {
                        DatosProveedor.Logo = Convert.FromBase64String(cadF);
                        InvBD.Proveedores.InsertOnSubmit(DatosProveedor);
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
                    int nveces = InvBD.Proveedores.Where(p => p.Correo.Equals(DatosProveedor.Correo)
                    && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria)
                    && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal)
                    && p.IdEstado.Equals(DatosProveedor.IdEstado)
                    && p.IdMunicipio.Equals(DatosProveedor.IdMunicipio)
                    && p.IdLocalidad.Equals(DatosProveedor.IdLocalidad)
                    && p.Direccion.Equals(DatosProveedor.Direccion)
                    && p.Telefono.Equals(DatosProveedor.Telefono)
                    && p.Banco.Equals(DatosProveedor.Banco)
                    && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta)
                    && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI)
                    && p.Descripcion.Equals(DatosProveedor.Descripcion)
                    && p.Logo.Equals(DatosProveedor.Logo)).Count();
                    if (nveces == 0)
                    {
                        Proveedores obj = InvBD.Proveedores.Where(p => p.IdProveedores.Equals(id)).First();
                        obj.Nombre = DatosProveedor.Nombre;
                        //   obj.Id = DatosProveedor.Id;
                        obj.Correo = DatosProveedor.Correo;
                        obj.ClaveInterbancaria = DatosProveedor.ClaveInterbancaria;
                        obj.CodigoPostal = DatosProveedor.CodigoPostal;
                        obj.IdEstado = DatosProveedor.IdEstado;
                        obj.Estado = DatosProveedor.Estado;
                        obj.IdMunicipio = DatosProveedor.IdMunicipio;
                        obj.Municipio = DatosProveedor.Municipio;
                        obj.IdLocalidad = DatosProveedor.IdLocalidad;
                        obj.Localidad = DatosProveedor.Localidad;
                        obj.Direccion = DatosProveedor.Direccion;
                        obj.Telefono = DatosProveedor.Telefono;
                        obj.Banco = DatosProveedor.Banco;
                        obj.NumeroDeCuenta = DatosProveedor.NumeroDeCuenta;
                        obj.UsoCFDI = DatosProveedor.UsoCFDI;
                        obj.Descripcion = DatosProveedor.Descripcion;
                        obj.Logo = Convert.FromBase64String(cadF);
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
        public int EliminarProveedores(long IdProveedores)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Proveedores Prvdr = InvBD.Proveedores.Where(p => p.IdProveedores.Equals(IdProveedores)).First();
                Prvdr.Estatus = 0;//Cambia el estatus en 0
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


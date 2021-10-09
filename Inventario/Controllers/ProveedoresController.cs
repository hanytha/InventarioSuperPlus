using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ProveedoresController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Proveedores
        public ActionResult Proveedores()
        {
            return View();
        }
        public JsonResult ConsultaProveedores()
        {//Consulta general
            var proveedores = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Correo,
                    p.RazonSocial,
                    p.ClaveInterbancaria,
                    p.CodigoPostal,
                    p.IdEstado,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.RFC,
                    p.Direccion,
                    p.Telefono,
                    p.Banco,
                    p.NumeroDeCuenta,
                    p.UsoCFDI,
                    p.Nomenclatura,
                    p.Descripcion,
                    p.Logo
                });
            return Json(proveedores, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaProveedor(long Id)
        {//Consulta específico mediante ID
            var proveedor = InvBD.Proveedores.Where(p => p.Estatus.Equals(Id))
                .Select(p => new
                {
                    p.Id,
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
                    p.Nomenclatura,
                    p.Descripcion,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Logo.ToArray()),
                });
            return Json(proveedor, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos del proveedor
        public int GuardarProveedor(Proveedores DatosProveedor, string cadF)
        {
            int Afectados = 0;
            try
            {
                long id = DatosProveedor.Id;

                if (id.Equals(0))
                {
                    //Guardar el proveedor cuando no exista uno cn el mismo nombre en la base de datos
                    int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre)).Count();

                    // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
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
                    int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.IdEstado.Equals(DatosProveedor.IdEstado) && p.IdMunicipio.Equals(DatosProveedor.IdMunicipio) && p.IdLocalidad.Equals(DatosProveedor.IdLocalidad) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura) && p.Descripcion.Equals(DatosProveedor.Descripcion) && p.Logo.Equals(DatosProveedor.Logo)).Count();
                    if (nveces == 0)
                    {
                        Proveedores obj = InvBD.Proveedores.Where(p => p.Id.Equals(id)).First();
                        obj.Nombre = DatosProveedor.Nombre;
                        //   obj.Id = DatosProveedor.Id;
                        obj.Correo = DatosProveedor.Correo;
                        obj.RazonSocial = DatosProveedor.RazonSocial;
                        obj.ClaveInterbancaria = DatosProveedor.ClaveInterbancaria;
                        obj.CodigoPostal = DatosProveedor.CodigoPostal;

                        obj.IdEstado = DatosProveedor.IdEstado;
                        obj.Municipio = DatosProveedor.Municipio;         // <!---->   
                        obj.IdLocalidad = DatosProveedor.IdLocalidad;   // < !---->
                        obj.Localidad = DatosProveedor.Localidad;         // <!----> 

                        obj.Estado = DatosProveedor.Estado;    // < !---->
                        obj.IdLocalidad = DatosProveedor.IdLocalidad; // < !---->
                        obj.Localidad = DatosProveedor.Localidad; // < !---->
                        obj.IdMunicipio = DatosProveedor.IdMunicipio; // < !---->
                        obj.Municipio = DatosProveedor.Municipio;  // < !---->

                        obj.RFC = DatosProveedor.RFC;
                        obj.Direccion = DatosProveedor.Direccion;
                        obj.Telefono = DatosProveedor.Telefono;
                        obj.Banco = DatosProveedor.Banco;
                        obj.NumeroDeCuenta = DatosProveedor.NumeroDeCuenta;
                        obj.UsoCFDI = DatosProveedor.UsoCFDI;
                        obj.Nomenclatura = DatosProveedor.Nomenclatura;
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

        public int EliminarProveedor(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Proveedores Prvdr = InvBD.Proveedores.Where(p => p.Id.Equals(Id)).First();
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

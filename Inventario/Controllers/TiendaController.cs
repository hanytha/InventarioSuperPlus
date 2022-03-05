using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Lamar al método de seguridad
    [Seguridad]
    public class TiendaController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Tienda
        public ActionResult Tienda()
        {
            return View();
        }
        public JsonResult ConsultaTiendas()
        {
            var tiendas = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.IdSupervisor,
                    p.NombreS,
                    p.IdSupervision,
                    p.Unombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.IdEstado,
                    p.Estado,
                    p.IdMunicipio,
                    p.Municipio,
                    p.Direccion,
                    p.IdLocalidad,
                    p.Localidad,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus,

                });
            return Json(tiendas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaTienda(long Id)
        {
            var tienda = InvBD.Tienda.Where(p => p.IdTienda.Equals(Id))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.IdSupervisor,
                    p.NombreS,
                    p.IdSupervision,
                    p.Unombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.IdEstado,
                    p.Estado,
                    p.IdMunicipio,
                    p.Municipio,
                    p.IdLocalidad,
                    p.Localidad,
                    p.Direccion,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus,
                });
            return Json(tienda, JsonRequestBehavior.AllowGet);
        }

        //Guardar los datos de la compra
        public int GuardarTienda(Tienda DatosTienda)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosTienda.IdTienda;
            if (id.Equals(0))
            {
                int nveces = InvBD.Tienda.Where(p => p.Nombre.Equals(DatosTienda.Nombre)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Tienda.InsertOnSubmit(DatosTienda);
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
                int nveces = InvBD.Tienda.Where(p => p.Nombre.Equals(DatosTienda.Nombre)
                && p.IdSupervisor.Equals(DatosTienda.IdSupervisor)
                && p.IdEstado.Equals(DatosTienda.IdEstado)
                && p.IdMunicipio.Equals(DatosTienda.IdMunicipio)
                && p.IdLocalidad.Equals(DatosTienda.IdLocalidad)
                && p.Direccion.Equals(DatosTienda.Direccion)
                && p.Calle.Equals(DatosTienda.Calle)
                && p.CP.Equals(DatosTienda.CP)
                && p.Telefono.Equals(DatosTienda.Telefono)
                && p.HApertura.Equals(DatosTienda.HApertura)
                && p.HCierre.Equals(DatosTienda.HCierre)
                && p.IdSupervision.Equals(DatosTienda.IdSupervision)
                && p.Unombre.Equals(DatosTienda.Unombre)
                && p.LNombre.Equals(DatosTienda.LNombre)
                && p.E1Nombre.Equals(DatosTienda.E1Nombre)
                && p.E2Nombre.Equals(DatosTienda.E2Nombre)
                && p.E3Nombre.Equals(DatosTienda.E3Nombre)
                && p.A1Nombre.Equals(DatosTienda.A1Nombre)
                && p.A2Nombre.Equals(DatosTienda.A2Nombre)
                && p.A3Nombre.Equals(DatosTienda.A3Nombre)).Count();


                if (nveces == 0)
                {
                    Tienda obj = InvBD.Tienda.Where(p => p.IdTienda.Equals(id)).First();

                    obj.Nombre = DatosTienda.Nombre;
                    obj.IdSupervisor = DatosTienda.IdSupervisor;
                    obj.NombreS = DatosTienda.NombreS;
                    obj.IdEstado = DatosTienda.IdEstado;
                    obj.Estado = DatosTienda.Estado;
                    obj.IdMunicipio = DatosTienda.IdMunicipio;
                    obj.Municipio = DatosTienda.Municipio;
                    obj.IdLocalidad = DatosTienda.IdLocalidad;
                    obj.Localidad = DatosTienda.Localidad;
                    obj.Direccion = DatosTienda.Direccion;
                    obj.Calle = DatosTienda.Calle;
                    obj.CP = DatosTienda.CP;
                    obj.Telefono = DatosTienda.Telefono;
                    obj.HApertura = DatosTienda.HApertura;
                    obj.HCierre = DatosTienda.HCierre;
                    obj.IdSupervision = DatosTienda.IdSupervision;
                    obj.Unombre = DatosTienda.Unombre;
                    obj.LNombre = DatosTienda.LNombre;
                    obj.E1Nombre = DatosTienda.E1Nombre;
                    obj.E2Nombre = DatosTienda.E2Nombre;
                    obj.E3Nombre = DatosTienda.E3Nombre;
                    obj.A1Nombre = DatosTienda.A1Nombre;
                    obj.A2Nombre = DatosTienda.A2Nombre;
                    obj.A3Nombre = DatosTienda.A3Nombre;

                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }

            return Afectados;
        }



        //Eliminar Compra
        public int EliminarTienda(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Tienda tiend = InvBD.Tienda.Where(p => p.IdTienda.Equals(Id)).First();
                tiend.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }

        //**************Retorna la segunada vista de tienda*************
        // GET: Tienda
        public ActionResult Tienda2da()
        {
            return View();
        }

    }
}
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
    public class CompraController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Compra
        public ActionResult Compra()
        {
            return View();
        }
        public JsonResult ConsultasCompras()
        {
            var compras = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdCompra,
                    p.NoCompra,
                    p.MetodoDePago,
                    p.Proveedor,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.Impuesto,
                    p.Articulo,
                    p.IdImpuesto,
                    p.IdProveedor,
                    p.IdArticulo,

                });
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaCompra(long Id)
        {
            var compra = InvBD.Compra.Where(p => p.IdCompra.Equals(Id))
                .Select(p => new
                {
                    p.IdCompra,
                    p.NoCompra,
                    p.MetodoDePago,
                    p.Proveedor,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.Impuesto,
                    p.Articulo,
                    p.IdImpuesto,
                    p.IdProveedor,
                    p.IdArticulo,

                });
            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarCompra(Compra DatosCompra)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosCompra.IdCompra;
            if (id.Equals(0))
            {
                int nveces = InvBD.Compra.Where(p => p.ExitenciaInicial.Equals(DatosCompra.ExitenciaInicial)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Compra.InsertOnSubmit(DatosCompra);
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
                int nveces = InvBD.Compra.Where(p => p.ExitenciaInicial.Equals(DatosCompra.ExitenciaInicial)
                && p.MetodoDePago.Equals(DatosCompra.MetodoDePago)
                && p.IdProveedor.Equals(DatosCompra.IdProveedor) 
                && p.FechaDeIngreso.Equals(DatosCompra.FechaDeIngreso)
                && p.ExitenciaActual.Equals(DatosCompra.ExitenciaActual)
                && p.FechaFinal.Equals(DatosCompra.FechaFinal)
                && p.NoCompra.Equals(DatosCompra.NoCompra)
                && p.Coste.Equals(DatosCompra.Coste)
                && p.IdImpuesto.Equals(DatosCompra.IdImpuesto)
                && p.IdArticulo.Equals(DatosCompra.IdArticulo)
                ).Count();
                if (nveces == 0)
                {
                    Compra obj = InvBD.Compra.Where(p => p.IdCompra.Equals(id)).First();
                    obj.NoCompra = DatosCompra.NoCompra;
                    obj.MetodoDePago = DatosCompra.MetodoDePago;
                    obj.IdProveedor = DatosCompra.IdProveedor;
                    obj.Proveedor = DatosCompra.Proveedor;
                    obj.FechaDeIngreso = DatosCompra.FechaDeIngreso;
                    obj.ExitenciaInicial = DatosCompra.ExitenciaInicial;
                    obj.FechaFinal = DatosCompra.FechaFinal;
                    obj.ExitenciaActual = DatosCompra.ExitenciaActual;
                    obj.Coste = DatosCompra.Coste;
                    obj.IdImpuesto = DatosCompra.IdImpuesto;
                    obj.Impuesto = DatosCompra.Impuesto;
                    obj.IdArticulo = DatosCompra.IdArticulo;
                    obj.Articulo = DatosCompra.Articulo;
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



        //Eliminar Compra
        public int EliminarCompra(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Compra compra = InvBD.Compra.Where(p => p.IdCompra.Equals(Id)).First();
                compra.Estatus = 0;//Cambia el estatus en 0
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
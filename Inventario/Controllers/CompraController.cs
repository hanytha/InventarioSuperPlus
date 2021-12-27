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
            var compras = InvBD.Compra.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.NoCompra)
                .Select(p => new
                {
                    p.IdCompra,
                    p.NoCompra,
                    p.MetodoDePago,
                    p.Proveedor,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.PrecioUnitario,
                    p.ExitenciaActual,
                    p.Coste,
                    p.Impuesto,
                    p.Articulo,
                    p.IdImpuesto,
                    p.IdProveedor,
                    p.IdArticulo,
                    p.IdUnidadDeMedida,
                    p.Unidad,

                });
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
        //***********************************************************************************
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
                    p.PrecioUnitario,
                    p.ExitenciaActual,
                    p.Coste,
                    p.Impuesto,
                    p.Articulo,
                    p.IdImpuesto,
                    p.IdProveedor,
                    p.IdArticulo,
                    p.IdUnidadDeMedida,
                    p.Unidad

                });
            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //*************************************************************************************************************
        //Guardar los datos de la compra
        public int GuardarCompra(Compra DatosCompra)
        {
            int Afectados = 0;
            long id = DatosCompra.IdCompra;
            if (id.Equals(0))
            {
                int nveces = InvBD.Compra.Where(p => p.ExitenciaInicial.Equals(DatosCompra.ExitenciaInicial)).Count();
                if (nveces >= 0)
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
                && p.PrecioUnitario.Equals(DatosCompra.PrecioUnitario)
                && p.NoCompra.Equals(DatosCompra.NoCompra)
                && p.Coste.Equals(DatosCompra.Coste)
                && p.IdImpuesto.Equals(DatosCompra.IdImpuesto)
                && p.IdArticulo.Equals(DatosCompra.IdArticulo)
                && p.IdUnidadDeMedida.Equals(DatosCompra.IdUnidadDeMedida)
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
                    obj.PrecioUnitario = DatosCompra.PrecioUnitario;
                    obj.ExitenciaActual = DatosCompra.ExitenciaActual;
                    obj.Coste = DatosCompra.Coste;
                    obj.IdImpuesto = DatosCompra.IdImpuesto;
                    obj.Impuesto = DatosCompra.Impuesto;
                    obj.IdArticulo = DatosCompra.IdArticulo;
                    obj.Articulo = DatosCompra.Articulo;
                    obj.IdUnidadDeMedida = DatosCompra.IdUnidadDeMedida;
                    obj.Unidad = DatosCompra.Unidad;
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

        //**************Eliminar Compra***********************************
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


   //**************Consulta los provedores por ID de artículo********************************
        public JsonResult ConsultaProveedorxArticulo(long IdPro)
        {
            string proveedor = "";
            var proveedores = InvBD.Articulos.Where(p => p.IdArticulos.Equals(IdPro) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    Id = p.Proveedor,
                });
                foreach (var num in proveedores)
                {

                proveedor += num.Id + ",";
                }

            var provedores = new { proveedor = proveedor.Substring(0, proveedor.Length - 1) };
            return Json(provedores, JsonRequestBehavior.AllowGet);
        }
        //*********************************************************************************************
        public JsonResult ConsultaProveedorxArti(long IdPro)
        {
            string proveedor = "";
            var proveedores = InvBD.Articulos.Where(p => p.IdArticulos.Equals(IdPro) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    Id = p.Proveedor,
                });
            foreach (var num in proveedores)
            {

                proveedor += num.Id + ",";

            }

            var provedores = new { proveedor = proveedor.Substring(0, proveedor.Length - 1) };
            return Json(provedores, JsonRequestBehavior.AllowGet);
        }
        //*********************************************************************************************
    }

}
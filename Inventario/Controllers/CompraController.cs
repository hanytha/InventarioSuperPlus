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
                    p.Coste,
                    p.IdProveedor,


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
                    p.Coste,
                    p.IdProveedor,

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
                int nveces = InvBD.Compra.Where(p => p.MetodoDePago.Equals(DatosCompra.MetodoDePago)).Count();
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
                int nveces = InvBD.Compra.Where(p => p.MetodoDePago.Equals(DatosCompra.MetodoDePago)
                && p.IdProveedor.Equals(DatosCompra.IdProveedor)
                && p.FechaDeIngreso.Equals(DatosCompra.FechaDeIngreso)
                && p.NoCompra.Equals(DatosCompra.NoCompra)
                && p.Coste.Equals(DatosCompra.Coste)
                ).Count();
                if (nveces == 0)
                {
                    Compra obj = InvBD.Compra.Where(p => p.IdCompra.Equals(id)).First();
                    obj.NoCompra = DatosCompra.NoCompra;
                    obj.MetodoDePago = DatosCompra.MetodoDePago;
                    obj.IdProveedor = DatosCompra.IdProveedor;
                    obj.Proveedor = DatosCompra.Proveedor;
                    obj.FechaDeIngreso = DatosCompra.FechaDeIngreso;
                    obj.Coste = DatosCompra.Coste;
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
        //***********Genera las otras dos vistas de compras**************
        // GET: Compra
        public ActionResult Compra2()
        {
            return View();
        }
        // GET: Compra
        public ActionResult Compra3()
        {
            return View();
        }
        //******************************************************************************************
        public JsonResult ConsultaArticuloxIdProveedor(string IdPro)
        {
            var compra = InvBD.Articulos.Where(p => p.Proveedor.Contains(IdPro) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.NombreEmpresa,
                    p.IdArticulos,
                    p.Unidad,
                    p.PrecioUnitarioPromedio,
                    p.Impuesto,
                });

            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //*******************************************************************************************************


        public JsonResult ConsultaPedidosDecendiente()
        {
            string NumeroPedido = "";
            var pedidosNum = InvBD.Compra.Where(p => p.Estatus.Equals(1)).OrderBy(p => p.NoCompra)
                .Select(p => new
                {
                    p.IdCompra,
                    Pedido = p.NoCompra,
                });

            if (pedidosNum.Count() > 0)
            {
                foreach (var ped in pedidosNum)
                {
                    int SumaNum = (int)(ped.Pedido + 1);
                    NumeroPedido += SumaNum + ",";
                }
            }
            //****************Condición para concatenar con uno el número de pedido cuand est sea null**************************
            else
            {
                NumeroPedido += "1" + ",";
            }
            var compras = new { NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1) };
            return Json(compras, JsonRequestBehavior.AllowGet);
        }

        //**************Consulta los provedores por ID de artículo********************************
        //public JsonResult ConsultaProveedorxArticulo(long IdPro)
        //{
        //    string proveedor = "";
        //    var proveedores = InvBD.Articulos.Where(p => p.IdArticulos.Equals(IdPro) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            Id = p.Proveedor,
        //        });
        //        foreach (var num in proveedores)
        //        {

        //        proveedor += num.Id + ",";
        //        }

        //    var provedores = new { proveedor = proveedor.Substring(0, proveedor.Length - 1) };
        //    return Json(provedores, JsonRequestBehavior.AllowGet);
        //}
        ////*********************************************************************************************
        //public JsonResult ConsultaProveedorxArti(long IdPro)
        //{
        //    string proveedor = "";
        //    var proveedores = InvBD.Articulos.Where(p => p.IdArticulos.Equals(IdPro) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            Id = p.Proveedor,
        //        });
        //    foreach (var num in proveedores)
        //    {

        //        proveedor += num.Id + ",";

        //    }

        //    var provedores = new { proveedor = proveedor.Substring(0, proveedor.Length - 1) };
        //    return Json(provedores, JsonRequestBehavior.AllowGet);
        //}
        //*********************************************************************************************


        //---------------Guardar los datos de los articulos de las compras en la tabla ComprasArticulos--------------

        public int GuardarDatosArticuloCompra(ComprasArticulos DatosTienda)
        {
            int Afectados = 0;
          
             long id = (long) DatosTienda.IdExistenciaCompra;
            if (id.Equals(0))
            {
                int nveces = InvBD.ComprasArticulos.Where(p => p.Articulo.Equals(DatosTienda.Articulo)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.ComprasArticulos.InsertOnSubmit(DatosTienda);
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
                int nveces = InvBD.ComprasArticulos.Where(p => p.Articulo.Equals(DatosTienda.Articulo)
      
                && p.ExistenciaInicial.Equals(DatosTienda.ExistenciaInicial)
                && p.StockActual.Equals(DatosTienda.StockActual)
                && p.Articulo.Equals(DatosTienda.Articulo)
                && p.Unidad.Equals(DatosTienda.Unidad)
                && p.NoCompra.Equals(DatosTienda.NoCompra)
                && p.Impuesto.Equals(DatosTienda.Impuesto)
                && p.PrecioUnitario.Equals(DatosTienda.PrecioUnitario)
                ).Count();


                if (nveces == 0)
                {
                    ComprasArticulos obj = InvBD.ComprasArticulos.Where(p => p.IdExistenciaCompra.Equals(id)).First();

                    obj.StockActual = DatosTienda.StockActual;
                    obj.Articulo = DatosTienda.Articulo;
                    obj.Unidad = DatosTienda.Unidad;
                    obj.NoCompra = DatosTienda.NoCompra;
                    obj.Impuesto = DatosTienda.Impuesto;
                    obj.PrecioUnitario = DatosTienda.PrecioUnitario;

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


    }

}
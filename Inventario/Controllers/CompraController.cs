﻿using Inventario.Models;
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
            CompraController ARTICULOS = new CompraController();
            ARTICULOS.ConsultasCompras();
            return View();
        }
        //***********************************************************************************
        public void ConsultasCompras()
        {
            ModeloCompra modeloCompras = new ModeloCompra();
            ModeloCompra.IdArea = new List<long>();
            ModeloCompra.IdCompra = new List<long>();
            ModeloCompra.NoCompra = new List<long>();
            ModeloCompra.Proveedor = new List<string>();
            ModeloCompra.NomArea = new List<string>();
            ModeloCompra.TipoOperacion = new List<string>();
            ModeloCompra.FechaDeIngreso = new List<string>();

            var compras = InvBD.Compra.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.NoCompra)
                .Select(p => new
                {
                    p.IdCompra,
                    p.NoCompra,
                    p.MetodoDePago,
                    p.Proveedor,
                    p.FechaDeIngreso,
                    p.Coste,
                    p.NoCompraProveedor,
                    p.IdProveedor,
                    p.TipoOperacion,
                    p.IdArea,
                    p.NomArea,


                });
            foreach (var com in compras)
            {
                ModeloCompra.IdCompra.Add((long)com.IdCompra);
                ModeloCompra.IdArea.Add((long)com.IdArea);
                ModeloCompra.NoCompra.Add((long)com.NoCompra);
                ModeloCompra.Proveedor.Add(com.Proveedor);
                ModeloCompra.NomArea.Add(com.NomArea);
                ModeloCompra.TipoOperacion.Add(com.TipoOperacion);
                ModeloCompra.FechaDeIngreso.Add(com.FechaDeIngreso);

            }
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
                    p.NoCompraProveedor,
                    p.IdProveedor,
                    p.IdMetodoPago,
                    p.IdArea,
                    p.NomArea,

                });
            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //*************************************************************************************************************
        //Guardar los datos de la compra
        public long GuardarCompra(Compra DatosCompra)
        {
            long Afectados = 0;
            long id = DatosCompra.IdCompra;
            if (id.Equals(0))
            {
                int nveces = InvBD.Compra.Where(p => p.MetodoDePago.Equals(DatosCompra.MetodoDePago)
                  && p.IdProveedor.Equals(DatosCompra.IdProveedor)
                  && p.FechaDeIngreso.Equals(DatosCompra.FechaDeIngreso)
                  && p.NoCompra.Equals(DatosCompra.NoCompra)
                  && p.NoCompraProveedor.Equals(DatosCompra.NoCompraProveedor)
                  && p.Coste.Equals(DatosCompra.Coste)

                  ).Count();

                if (nveces == 0)
                {
                    InvBD.Compra.InsertOnSubmit(DatosCompra);
                    InvBD.SubmitChanges();

                    var IdCompra = InvBD.Compra.Where(p => p.MetodoDePago.Equals(DatosCompra.MetodoDePago)

             && p.IdProveedor.Equals(DatosCompra.IdProveedor)
             && p.FechaDeIngreso.Equals(DatosCompra.FechaDeIngreso)
             && p.NoCompra.Equals(DatosCompra.NoCompra)
             && p.Coste.Equals(DatosCompra.Coste)
             && p.IdArea.Equals(DatosCompra.IdArea)
              ).First();
                    Afectados = IdCompra.IdCompra;
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
                && p.IdMetodoPago.Equals(DatosCompra.IdMetodoPago)
                && p.FechaDeIngreso.Equals(DatosCompra.FechaDeIngreso)
                && p.NoCompra.Equals(DatosCompra.NoCompra)
                && p.NoCompraProveedor.Equals(DatosCompra.NoCompraProveedor)
                && p.Coste.Equals(DatosCompra.Coste)
                && p.IdArea.Equals(DatosCompra.IdArea)
                ).Count();
                if (nveces == 0)
                {
                    Compra obj = InvBD.Compra.Where(p => p.IdCompra.Equals(id)).First();
                    obj.NoCompra = DatosCompra.NoCompra;
                    obj.NoCompraProveedor = DatosCompra.NoCompraProveedor;
                    obj.IdProveedor = DatosCompra.IdProveedor;
                    obj.Proveedor = DatosCompra.Proveedor;
                    obj.FechaDeIngreso = DatosCompra.FechaDeIngreso;
                    obj.Coste = DatosCompra.Coste;
                    obj.TipoOperacion = DatosCompra.TipoOperacion;
                    obj.IdMetodoPago = DatosCompra.IdMetodoPago;
                    obj.MetodoDePago = DatosCompra.MetodoDePago;
                    obj.IdArea = DatosCompra.IdArea;
                    obj.NomArea = DatosCompra.NomArea;
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
                    p.Impuesto,
                });

            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //**************************Consulta los números de compra para poder generar el siguiente**************************
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

        //********************************************************************************************************************************

        public JsonResult ConsultaId()
        {
            var compras = InvBD.Compra.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.IdCompra)
                .Select(p => new
                {
                    p.IdCompra
                });
            return Json(compras, JsonRequestBehavior.AllowGet);
        }

        //***********************Consulta el siguiente número de pedido por proveedor********************************************
        public JsonResult ConsultaNumPedidoProveedor(long ID)
        {
            string numPedidoProve = "";
            var numero = InvBD.Compra.Where(p => p.IdProveedor.Equals(ID) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    Id = p.IdProveedor,
                    NumeroPProveedor = p.NoCompraProveedor,

                });

            if (numero.Count() > 0)
            {
                foreach (var num in numero)
                {
                    int SumaNumero = (int)(num.NumeroPProveedor + 1);
                    numPedidoProve += SumaNumero + ",";

                }

            }
            //****************Condición para concatenar con uno el número de pedido cuand est sea null**************************
            else
            {
                numPedidoProve += "1" + ",";
            }
            var numeros = new { numPedidoProve = numPedidoProve.Substring(0, numPedidoProve.Length - 1) };
            return Json(numeros, JsonRequestBehavior.AllowGet);
        }

        //****************************************************************************************************************
        //---------------Guardar los datos de los articulos de las compras en la tabla ComprasArticulos--------------

        public int GuardarDatosArticuloCompra(ComprasArticulos DatosArticulos)
        {
            int Afectados = 0;


            InvBD.ComprasArticulos.InsertOnSubmit(DatosArticulos);
            InvBD.SubmitChanges();
            Afectados = 1;



            return Afectados;
        }

        //****************************************************************************************************************
        //---------------Guardar los datos de las modificaciones de los articulos de las compras en la tabla ComprasArticulos--------------


        public int GuardarModificacionesArticulos(ComprasArticulos DatosTienda)
        {
            int Afectados = 0;

            long id = DatosTienda.IdExistenciaCompra;

            
                    ComprasArticulos obj = InvBD.ComprasArticulos.Where(p => p.IdExistenciaCompra.Equals(id)).First();

                    obj.StockActual = DatosTienda.StockActual;
                    obj.PrecioUnitario = DatosTienda.PrecioUnitario;
                    obj.TipoDeOperacion = DatosTienda.TipoDeOperacion;
                    obj.ExistenciaInicial = DatosTienda.ExistenciaInicial;



                    InvBD.SubmitChanges();
                    Afectados = 1;
                
                if(Afectados == -1)
                {
                    Afectados = -1;
                }
            

            return Afectados;
        }

        //------------------------------------Consultar los artículos por id de compra----------------------------
        public JsonResult ConsultaIdCompraenCompraArts(long Id)
        {
            var compra = InvBD.ComprasArticulos.Where(p => p.IdCompra.Equals(Id))
                .Select(p => new
                {
                    p.IdCompra,
                    p.Articulo,
                    p.Unidad,
                    p.Impuesto,
                    p.StockActual,
                    p.PrecioUnitario,
                    p.IdExistenciaCompra,
                    p.ExistenciaInicial,
                    p.IdArticulo,
                });
            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //-------------------Termina------------------------------------------------------------------------------------------
        //-------------------------------Consulta Modal y conversión----------------------------------------------------------
        public JsonResult ConsultaModalConversion(string IdPro)
        {
            string IDArticulo = "";
            string Articulo = "";
            string Unidad = "";
            string Impuesto = "";
            string Conversion = "";

            var compra = InvBD.Articulos.Where(p => p.Proveedor.Contains(IdPro) && p.Estatus.Equals(1))
             .Select(p => new
             {
                 Articulo = p.NombreEmpresa,
                 IdArticulos = p.IdArticulos,
                 Unid = p.Unidad,
                 Impus = p.Impuesto,
                 conver = p.Conversion,

             });

            if (compra.Count() > 0)
            {
                foreach (var num in compra)
                {

                    IDArticulo += num.IdArticulos + ",";
                    Articulo += num.Articulo + ",";
                    Unidad += num.Unid + ",";
                    Impuesto += num.Impus + ",";
                    Conversion += num.conver + ",";
                }

            }
            //****************Condición para concatenar con uno el número de pedido cuand est sea null**************************
            else
            {
                IDArticulo += "0" + ",";
                Articulo += "0" + ",";
                Unidad += "0" + ",";
                Impuesto += "0" + ",";
                Conversion += "0" + ",";
            }


            var numeros = new
            {
                IDArticulo = IDArticulo.Substring(0, IDArticulo.Length - 1),
                Articulo = Articulo.Substring(0, Articulo.Length - 1),
                Unidad = Unidad.Substring(0, Unidad.Length - 1),
                Impuesto = Impuesto.Substring(0, Impuesto.Length - 1),
                Conversion = Conversion.Substring(0, Conversion.Length - 1),
            };



            return Json(numeros, JsonRequestBehavior.AllowGet);
        }
        //---------------------------------------Termina-----------------------------------------------------------------------

    }

}
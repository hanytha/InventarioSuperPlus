﻿using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class PedidosextController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Pedidosext
        public ActionResult Pedidosext()
        {
            return View();
        }

        public JsonResult ConsultaPedidosExternos()
        {
            var pedidosExt = InvBD.PedidosExternos.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.IdPedidosExternos)
                .Select(p => new
                {
                    p.IdPedidosExternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha,
                    p.NumPedidoProveedor,
                });
            return Json(pedidosExt, JsonRequestBehavior.AllowGet);
        }

 //******************************************Cosulta los pedidos por número de compra**************************************************
        public JsonResult ConsultaPedidoXnum(long Num)
        {
            var numero = InvBD.PedidosExternos.Where(p => p.NumeroPedido.Equals(Num) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosExternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha,
                    p.RFC,
                    p.Correo,
                    p.Clabe,
                    p.Telefono,
                    p.UsoCFDI,
                    p.Direccion,
                    p.NumPedidoProveedor,
                });
            return Json(numero, JsonRequestBehavior.AllowGet);
        }

 //****************************************************************************************************************************************
//***********Join con la tabla de artículos para obtener los precios unitarios y las unidades de media de cada artículo del pedido*********

        public JsonResult ConsultaPedidoJoinArticulo(long Pedi)
        {
            var comps = from pedidos in InvBD.PedidosExternos
                        join artis in InvBD.Articulos
                    on pedidos.Articulo equals artis.NombreEmpresa
                        where pedidos.NumeroPedido.Equals(Pedi) && pedidos.Estatus.Equals(1)
                        select new
                        {
                            Articulo = pedidos.Articulo,
                            CantidadSolicitada = pedidos.CantidadSolicitada,
                            PrecioUnitarioPromedio = artis.PrecioUnitarioPromedio,
                            Unidad = artis.Unidad,
                            
                        };


            return Json(comps, JsonRequestBehavior.AllowGet);

        }


        //*****************************************************************************************************************
        //*****************************************************************************************************************
        //Guardar los datos de la compra
        public int GuardarPedidoExterno(PedidosExternos DatosPedidoExterno)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosPedidoExterno.IdPedidosExternos;
            if (id.Equals(0))
            {
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoExterno.NumeroPedido)).Count();

                //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.PedidosExternos.InsertOnSubmit(DatosPedidoExterno);
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
                int nveces = InvBD.PedidosExternos.Where(p => p.NumeroPedido.Equals(DatosPedidoExterno.NumeroPedido)
                && p.CantidadSolicitada.Equals(DatosPedidoExterno.CantidadSolicitada)

                     && p.IdProveedor.Equals(DatosPedidoExterno.IdProveedor)
                      && p.Proveedor.Equals(DatosPedidoExterno.Proveedor)
                       && p.IdArticulo.Equals(DatosPedidoExterno.IdArticulo)
                        && p.Articulo.Equals(DatosPedidoExterno.Articulo)
                          && p.Fecha.Equals(DatosPedidoExterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosExternos obj = InvBD.PedidosExternos.Where(p => p.IdPedidosExternos.Equals(id)).First();
                    //obj.NumeroPedido = DatosPedidoExterno.NumeroPedido;
                    obj.CantidadSolicitada = DatosPedidoExterno.CantidadSolicitada;
                    obj.IdProveedor = DatosPedidoExterno.IdProveedor;
                    obj.Proveedor = DatosPedidoExterno.Proveedor;
                    obj.Articulo = DatosPedidoExterno.Articulo;
                    obj.Fecha = DatosPedidoExterno.Fecha;
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
        public int EliminarPedidoExterno(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                PedidosExternos pedidosExternos = InvBD.PedidosExternos.Where(p => p.IdPedidosExternos.Equals(Id)).First();
                pedidosExternos.Estatus = 0;//Cambia el estatus en 0
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


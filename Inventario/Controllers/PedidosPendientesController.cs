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

    public class PedidosPendientesController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: PedidosPendientes
        public ActionResult PedidosPendientes()
        {
            return View();
        }

        public JsonResult ConsultaPedidos()
        {
            var pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdAsignacion,
                    p.IdTienda,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdProveedor,
                    p.Proveedor,
                    p.Fecha,
                    p.Tienda,

                });
            return Json(pedidos, JsonRequestBehavior.AllowGet);
        }

 //****************************************************************************************************************************
        //****************************Consulta de pedidos internos***********************************************************

        public JsonResult ConsultaPedidosNumeroPedido()
        {
            string NoPedido = "";
            string IdAsignacion = "";
            string IdTienda = "";
            string NomTienda = "";

            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1)).OrderBy(p => p.NumeroPedido)
               .Select(p => new
               {
                   pedido = p.NumeroPedido,
                   asignacion = p.IdAsignacion,
                   Idtienda = p.IdTienda,
                   tiendas = p.Tienda,

               });
            if (Pedidos.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long pedi = Pedidos.Count();

                foreach (var numero in Pedidos)
                {
                    if (contador == 0)
                    {
                        tem1 = numero.pedido;
                        tem2 = (int)numero.asignacion;
                        tem3 = (int)numero.Idtienda;

                        NoPedido += numero.pedido + ",";
                        IdAsignacion += numero.asignacion + ",";
                        IdTienda += numero.Idtienda + ",";
                        NomTienda += numero.tiendas + ",";

                    }
                    if (numero.pedido != tem1 || numero.asignacion != tem2 || numero.Idtienda != tem3)
                    {
                        NoPedido += numero.pedido + ",";
                        IdAsignacion += numero.asignacion + ",";
                        IdTienda += numero.Idtienda + ",";
                        NomTienda += numero.tiendas + ",";

                        tem1 = numero.pedido;
                        tem2 = (int)numero.asignacion;
                        tem3 = (int)numero.Idtienda;

                        contador++;
                    }
                    else
                    {
                        contador++;
                    }
                }
            }
            else
            {
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                IdTienda += "0" + ",";
                NomTienda += "0" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length -1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length -1),
                IdTienda = IdTienda.Substring(0, IdTienda.Length -1),
                NomTienda = NomTienda.Substring(0, NomTienda.Length -1)
            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }

        //*************************************************************************************************************
            //--------------------------------Consulta los artículos por ID-------------------------------------------
            public JsonResult ConsultaPedidoXNumero(long Num)
        {
            var articulo = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.IdAsignacion,
                    p.IdTienda,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdProveedor,
                    p.Proveedor,
                    p.Fecha,
                    p.Tienda,

                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
 
   //*****************Consulta los articulos por pedidos y su stock en la tabala de comprasArticulos*************************

        public JsonResult ConsultaPedidosNumero(long Num)
        {
            string solicitada = "";
            string IdArticulo = "";
            string Articulo = "";
            string stock = "";
            var pedidosNum = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num))
                .Select(p => new
                {
                    solicitada = p.CantidadSolicitada,
                    articulo = p.Articulo,
                    IdArticulo = p.IdArticulo,

                });

            if (pedidosNum.Count() > 0)
            {
                foreach (var ped in pedidosNum)
                {
                    IdArticulo += ped.IdArticulo + ",";
                    Articulo += ped.articulo + ",";
                    solicitada += ped.solicitada + ",";

                    var consultaStock = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(ped.IdArticulo))
                        .Select(p => new
                        {
                            stock = p.StockActual,

                        });

                    int SumaStock = 0;

                    foreach (var com in consultaStock)
                    {
                        SumaStock = (int)(SumaStock + com.stock);
                    }
                    stock += SumaStock + ",";
                }
            }
            else
            {
                IdArticulo += "0" + ",";
                Articulo += "0" + ",";
                solicitada += "0" + ",";
                stock += "0" + ",";
            }

            var compras = new { solicitada = solicitada.Substring(0, solicitada.Length - 1),
                Articulo = Articulo.Substring(0, Articulo.Length - 1),
                IdArticulo = IdArticulo.Substring(0, IdArticulo.Length - 1),
                stock = stock.Substring(0, stock.Length - 1)
            };
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
//**************************************************************************

    }
}
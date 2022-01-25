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

        //****************************Consulta el último número de pedido*************************************************

        public JsonResult ConsultaPedidosDecendiente(PedidosExternos DatosPedidoExterno)
        {

            int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoExterno.NumeroPedido)).Count();

            string NumeroPedido = "";
            string Tienda = "";

            var pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1))
                   .Select(p => new
                {
                   pedido=  p.NumeroPedido,
                    plus = p.Tienda,
                });
            foreach (var com in pedidos) {

                if (nveces == 0)
                {
                    NumeroPedido += com.pedido + ",";
                    Tienda += com.plus + ",";
                }
                else
                {
                    NumeroPedido += "1" + ",";
                    Tienda += "1" + ",";
                }
            }
            var compras = new { NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1), Tienda = Tienda.Substring(0, Tienda.Length - 1) };
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
        //*******************************************************************************************************
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
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

        public JsonResult ConsultaPedidosDecendiente(long Num)
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
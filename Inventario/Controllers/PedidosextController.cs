using Inventario.Models;
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
        //----------------Consulta para ver todos los pedidos con estatus igual a 1----------------------------------------------
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
        //***********consulta obtener los artículos y sus demas caracteristicas por número de pedido*********
        public JsonResult ConsultaPedidosArticuos(long Pedi)
        {
            var numero = InvBD.PedidosExternos.Where(p => p.NumeroPedido.Equals(Pedi) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Articulo,
                    p.CantidadSolicitada,
                    p.PrecioUnitario,
                    p.Unidad
                });
            return Json(numero, JsonRequestBehavior.AllowGet);
        }
        //*****************************************************************************************************************
    }
}


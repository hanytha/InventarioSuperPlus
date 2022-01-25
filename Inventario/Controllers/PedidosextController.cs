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
                    p.IdArea,
                    p.Area
                });
            return Json(pedidosExt, JsonRequestBehavior.AllowGet);
        }
        //****************************************************************************************************************************
        //****************************Consulta de pedidos internos***********************************************************

        public JsonResult ConsultaPedidosNumeroPedido()
        {
            string NoPedido = "";
            string NoProvedor = "";
            string Proveedor = "";
            string fecha = "";
            string IdPedido = "";
            

            var Pedidos = InvBD.PedidosExternos.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.IdPedidosExternos)
               .Select(p => new
               {
                   pedido = p.NumeroPedido,
                   proveedors = p.Proveedor,
                   fecha = p.Fecha,
                   id = p.IdPedidosExternos,
                   noProve = p.NumPedidoProveedor
               });
            if (Pedidos.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;

                long pedi = Pedidos.Count();

                foreach (var numero in Pedidos)
                {
                    if (contador == 0)
                    {
                        tem1 = (int)numero.pedido;
                        tem2 = (int)numero.noProve;
                      

                        NoPedido += numero.pedido + ",";
                        NoProvedor += numero.noProve + ",";
                        Proveedor += numero.proveedors + ",";
                        fecha += numero.fecha + ",";
                        IdPedido += numero.id + ",";

                    }
                    if (numero.pedido != tem1 || numero.noProve != tem2)
                    {
                        NoPedido += numero.pedido + ",";
                        NoProvedor += numero.noProve + ",";
                        Proveedor += numero.proveedors + ",";
                        fecha += numero.fecha + ",";
                        IdPedido += numero.id + ",";

                        tem1 = (int)numero.pedido;
                        tem2 = (int)numero.noProve;

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
                NoProvedor += "0" + ",";
                Proveedor += "0" + ",";
                fecha += "0" + ",";
                IdPedido += "0" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                NoProvedor = NoProvedor.Substring(0, NoProvedor.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                fecha = fecha.Substring(0, fecha.Length - 1),
                IdPedido = IdPedido.Substring(0, IdPedido.Length - 1)
            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
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
                    p.Telefono,
                    p.UsoCFDI,
                    p.Direccion,
                    p.NumPedidoProveedor,
                    p.Area,
                    p.IdArea,

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


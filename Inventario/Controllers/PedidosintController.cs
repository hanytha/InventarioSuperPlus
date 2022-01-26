
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
    public class PedidosintController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Pedidosint
        public ActionResult Pedidosint()
        {
            return View();
        }
        public JsonResult ConsultaPedidosInternos()
        {
            var pedidosInt = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                   // p.CantidadAprobada,
                  //  p.Tipo,
                    p.Proveedor,
                    //p.IdUnidadDeMedida,
                    //p.UnidadDeMedida,
                    //p.IdMarca,
                    //p.Marca,
                    p.IdSitio,
                    p.Sitio,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha
                });
            return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        }


        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaPedidoInterno(long Id)
        {
            var pedidosInt = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.NumPedidoProveedor,
                    p.CantidadSolicitada,
                   // p.CantidadAprobada,
                   // p.Tipo,
                    p.IdProveedor,
                    p.Proveedor,
                    //p.IdUnidadDeMedida,
                    //p.UnidadDeMedida,
                    //p.IdMarca,
                    //p.Marca,
                    p.IdSitio,
                    p.Sitio,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha
                });
            return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        }

        //Cosulta los pedidos por número de compra
        //public JsonResult ConsultaPedidoXnum(long Num)
        //{
        //    var numero = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            p.IdPedidosInternos,
        //            p.NumeroPedido,
        //            p.CantidadSolicitada,
        //            p.Tipo,
        //            p.IdProveedor,
        //            p.Proveedor,
        //            p.NumPedidoProveedor,
        //            p.IdTienda,
        //            p.Tienda,
        //            p.IdArticulo,
        //            p.Articulo,
        //            p.Fecha

        //        });
        //    return Json(numero, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult ConsultaPedidoXnum(long Num)
        {
            var numero = from proveedor in InvBD.Areas
                                 join pedido in InvBD.PedidosInternos
                             on proveedor.IdAreas equals pedido.IdProveedor
                         join tienda in InvBD.Tienda
                           on pedido.IdSitio equals tienda.IdTienda
                         where pedido.NumeroPedido.Equals(Num) && pedido.Estatus.Equals(1)
                                 select new
                                 {
                                     IdPedidosInternos = pedido.IdPedidosInternos,
                                     NumeroPedido = pedido.NumeroPedido,
                                     CantidadSolicitada = pedido.CantidadSolicitada,
                                     
                                     IdProveedor = proveedor.IdAreas,
                                     Proveedor = proveedor.Nombre,
                                     Direccion= tienda.Direccion,
                                     NumPedidoProveedor = pedido.NumeroPedido,
                                     IdTienda = pedido.IdSitio,
                                     Tienda = pedido.Sitio,
                                     IdArticulo = pedido.IdArticulo,
                                     Fecha = pedido.Fecha,
                                     Correo = proveedor.Correo,
                                     Telefono = proveedor.Telefono,
                                 };
            return Json(numero, JsonRequestBehavior.AllowGet);
        }
        //***********consulta obtener los artículos y sus demas caracteristicas por número de pedido*********
        public JsonResult ConsultaPedidosArticuos(long Pedi)
        {
            var numero = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Pedi) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Articulo,
                    p.CantidadSolicitada,
                    //p.PrecioUnitario,
                    //p.Unidad
                });
            return Json(numero, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarPedidoInterno(PedidosInternos DatosPedidoInterno)
        {
            int Afectados = 0;
            try
            {
            long id = DatosPedidoInterno.IdPedidosInternos;
            if (id.Equals(0))
            {
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)).Count();

                //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.PedidosInternos.InsertOnSubmit(DatosPedidoInterno);
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
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)
                && p.CantidadSolicitada.Equals(DatosPedidoInterno.CantidadSolicitada)
                 //  && p.CantidadAprobada.Equals(DatosPedidoInterno.CantidadAprobada)
                //   && p.Tipo.Equals(DatosPedidoInterno.Tipo)
                     //&& p.IdUnidadDeMedida.Equals(DatosPedidoInterno.IdUnidadDeMedida)
                     // && p.UnidadDeMedida.Equals(DatosPedidoInterno.UnidadDeMedida)
                     //  && p.IdMarca.Equals(DatosPedidoInterno.IdMarca)
                     //   && p.Marca.Equals(DatosPedidoInterno.Marca)
                     && p.IdSitio.Equals(DatosPedidoInterno.IdSitio)
                      && p.Sitio.Equals(DatosPedidoInterno.Sitio)
                       && p.IdArticulo.Equals(DatosPedidoInterno.IdArticulo)
                        && p.Articulo.Equals(DatosPedidoInterno.Articulo)
                          && p.Fecha.Equals(DatosPedidoInterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosInternos obj = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(id)).First();
                    //obj.NumeroPedido = DatosPedidoInterno.NumeroPedido;
                    obj.CantidadSolicitada = DatosPedidoInterno.CantidadSolicitada;
                 //   obj.CantidadAprobada = DatosPedidoInterno.CantidadAprobada;
                  //  obj.Tipo = DatosPedidoInterno.Tipo;
                    //obj.IdUnidadDeMedida = DatosPedidoInterno.IdUnidadDeMedida;
                    //obj.UnidadDeMedida = DatosPedidoInterno.UnidadDeMedida;
                    //obj.IdMarca = DatosPedidoInterno.IdMarca;
                    //obj.Marca = DatosPedidoInterno.Marca;
                    obj.IdSitio = DatosPedidoInterno.IdSitio;
                    obj.IdArticulo = DatosPedidoInterno.IdArticulo;
                    obj.Articulo = DatosPedidoInterno.Articulo;
                    obj.Fecha = DatosPedidoInterno.Fecha;
                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }



        //Eliminar Compra
        public int EliminarPedidoInterno(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                PedidosInternos PedidosInternos = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id)).First();
                PedidosInternos.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
        public ActionResult Pedido2da()
        {
            return View();
        }
    }
}


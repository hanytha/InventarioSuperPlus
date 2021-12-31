
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
                    p.CantidadAprobada,
                    p.Tipo,
                    //p.IdUnidadDeMedida,
                    //p.UnidadDeMedida,
                    //p.IdMarca,
                    //p.Marca,
                    p.IdTienda,
                    p.Tienda,
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
                    p.CantidadSolicitada,
                    p.CantidadAprobada,
                    p.Tipo,
                    //p.IdUnidadDeMedida,
                    //p.UnidadDeMedida,
                    //p.IdMarca,
                    //p.Marca,
                    p.IdTienda,
                    p.Tienda,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha
                });
            return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarPedidoInterno(PedidosInternos DatosPedidoInterno)
        {
            int Afectados = 0;
            //try
            //{
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
                   && p.CantidadAprobada.Equals(DatosPedidoInterno.CantidadAprobada)
                   && p.Tipo.Equals(DatosPedidoInterno.Tipo)
                 //&& p.IdUnidadDeMedida.Equals(DatosPedidoInterno.IdUnidadDeMedida)
                 // && p.UnidadDeMedida.Equals(DatosPedidoInterno.UnidadDeMedida)
                 //  && p.IdMarca.Equals(DatosPedidoInterno.IdMarca)
                 //   && p.Marca.Equals(DatosPedidoInterno.Marca)
                     && p.IdTienda.Equals(DatosPedidoInterno.IdTienda)
                      && p.Tienda.Equals(DatosPedidoInterno.Tienda)
                       && p.IdArticulo.Equals(DatosPedidoInterno.IdArticulo)
                        && p.Articulo.Equals(DatosPedidoInterno.Articulo)
                          && p.Fecha.Equals(DatosPedidoInterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosInternos obj = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(id)).First();
                    //obj.NumeroPedido = DatosPedidoInterno.NumeroPedido;
                    obj.CantidadSolicitada = DatosPedidoInterno.CantidadSolicitada;
                    obj.CantidadAprobada = DatosPedidoInterno.CantidadAprobada;
                    obj.Tipo = DatosPedidoInterno.Tipo;
                    //obj.IdUnidadDeMedida = DatosPedidoInterno.IdUnidadDeMedida;
                    //obj.UnidadDeMedida = DatosPedidoInterno.UnidadDeMedida;
                    //obj.IdMarca = DatosPedidoInterno.IdMarca;
                    //obj.Marca = DatosPedidoInterno.Marca;
                    obj.IdTienda = DatosPedidoInterno.IdTienda;
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
            //}
            //catch (Exception ex)
            //{
            //    Afectados = 0;
            //}
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


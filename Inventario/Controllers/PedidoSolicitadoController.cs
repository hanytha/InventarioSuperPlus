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
    public class PedidoSolicitadoController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Subarea
        public ActionResult Subarea()
        {
            return View();
        }
        public JsonResult ConsultaSubAreas()
        {
            var subareas = InvBD.PedidoSolicitado.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidoSolicitado,
                    p.CantidadSolicitada,
                    p.IdUnidadDeMedida,
                    p.UnidadDeMedida,
                    p.IdMarca,
                    p.Marca,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdPedidoExterno,
                    p.NumeroPedido,
                    p.Estatus
                });
            return Json(subareas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultasPedidos(long idPedido)
        {
            var subareas = InvBD.PedidoSolicitado.Where(p => p.Estatus.Equals(1) && p.IdPedidoSolicitado.Equals(idPedido))
                .Select(p => new
                {
                    p.IdPedidoSolicitado,
                    p.CantidadSolicitada,
                    p.IdUnidadDeMedida,
                    p.UnidadDeMedida,
                    p.IdMarca,
                    p.Marca,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdPedidoExterno,
                    p.NumeroPedido,
                    p.Estatus

                });
            return Json(subareas, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ConsultasSubAreasXAreas(long idArea)
        {
            var subareas = InvBD.PedidoSolicitado.Where(p => p.Estatus.Equals(1) && p.IdPedidoExterno.Equals(idArea))
                .Select(p => new
                {
                   

                    p.IdPedidoSolicitado,
                    p.CantidadSolicitada,
                    p.IdUnidadDeMedida,
                    p.UnidadDeMedida,
                    p.IdMarca,
                    p.Marca,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdPedidoExterno,
                    p.NumeroPedido,
                    p.Estatus
                });
            return Json(subareas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSubArea(long id)
        {
            var subarea = InvBD.PedidoSolicitado.Where(p => p.IdPedidoSolicitado.Equals(id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidoSolicitado,
                    p.CantidadSolicitada,
                    p.IdUnidadDeMedida,
                    p.UnidadDeMedida,
                    p.IdMarca,
                    p.Marca,
                    p.IdProveedor,
                    p.Proveedor,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdPedidoExterno,
                    p.NumeroPedido,
                    p.Estatus
                });
            return Json(subarea, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarSubarea(PedidoSolicitado DatosPedido)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosPedido.IdPedidoSolicitado;
            if (id.Equals(0))
            {
                int nveces = InvBD.PedidoSolicitado.Where(p => p.NumeroPedido.Equals(DatosPedido.NumeroPedido)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.PedidoSolicitado.InsertOnSubmit(DatosPedido);
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
                int nveces = InvBD.PedidoSolicitado.Where(p => p.NumeroPedido.Equals(DatosPedido.NumeroPedido)
                && p.IdPedidoSolicitado.Equals(DatosPedido.IdPedidoSolicitado)
                && p.CantidadSolicitada.Equals(DatosPedido.CantidadSolicitada)

                 && p.IdUnidadDeMedida.Equals(DatosPedido.IdUnidadDeMedida)
                  && p.UnidadDeMedida.Equals(DatosPedido.UnidadDeMedida)
                   && p.IdMarca.Equals(DatosPedido.IdMarca)
                    && p.Marca.Equals(DatosPedido.Marca)
                     && p.IdProveedor.Equals(DatosPedido.IdProveedor)
                      && p.Proveedor.Equals(DatosPedido.Proveedor)
                       && p.IdArticulo.Equals(DatosPedido.IdArticulo)
                        && p.Articulo.Equals(DatosPedido.Articulo)).Count();
                if (nveces == 0)
                {
                    PedidoSolicitado obj = InvBD.PedidoSolicitado.Where(p => p.IdPedidoSolicitado.Equals(id)).First();
                    //obj.NumeroPedido = DatosPedido.NumeroPedido;
                    obj.CantidadSolicitada = DatosPedido.CantidadSolicitada;

                    obj.IdUnidadDeMedida = DatosPedido.IdUnidadDeMedida;
                    obj.UnidadDeMedida = DatosPedido.UnidadDeMedida;
                    obj.IdMarca = DatosPedido.IdMarca;
                    obj.Marca = DatosPedido.Marca;
                    obj.IdProveedor = DatosPedido.IdProveedor;
                    obj.Proveedor = DatosPedido.Proveedor;
                    obj.Articulo = DatosPedido.Articulo;
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
        public int EliminarSubarea(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                PedidoSolicitado Pedido = InvBD.PedidoSolicitado.Where(p => p.IdPedidoSolicitado.Equals(Id)).First();
                Pedido.Estatus = 0;//Cambia el estatus en 0
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
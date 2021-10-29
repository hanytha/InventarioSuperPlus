using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
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
                    p.IdUnidadDeMedida,
                    p.IdMarca,
                    p.IdTienda,
                    p.IdArticulo,
                    p.IdExistenciaAlmacenG,
                    p.Fecha
                });
            return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        }

        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaPedidoInterno(long Id)
        {
            var pedidoInt = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                    p.CantidadAprobada,
                    p.Tipo,
                    p.IdUnidadDeMedida,
                    p.IdMarca,
                    p.IdTienda,
                    p.IdArticulo,
                    p.IdExistenciaAlmacenG,
                    p.Fecha
                });
            return Json(pedidoInt, JsonRequestBehavior.AllowGet);
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

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
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
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido) && p.CantidadSolicitada.Equals(DatosPedidoInterno.CantidadSolicitada) && p.CantidadAprobada.Equals(DatosPedidoInterno.CantidadAprobada) && p.Tipo.Equals(DatosPedidoInterno.Tipo) && p.IdUnidadDeMedida.Equals(DatosPedidoInterno.IdUnidadDeMedida) && p.IdMarca.Equals(DatosPedidoInterno.IdMarca)
                && p.IdTienda.Equals(DatosPedidoInterno.IdTienda) && p.IdArticulo.Equals(DatosPedidoInterno.IdArticulo) && p.Fecha.Equals(DatosPedidoInterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosInternos obj = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(id)).First();
                    obj.NumeroPedido = DatosPedidoInterno.NumeroPedido;
                    obj.CantidadSolicitada = DatosPedidoInterno.CantidadSolicitada;
                    obj.CantidadAprobada = DatosPedidoInterno.CantidadAprobada;
                    obj.Tipo = DatosPedidoInterno.Tipo;
                    obj.IdUnidadDeMedida = DatosPedidoInterno.IdUnidadDeMedida;
                    obj.IdMarca = DatosPedidoInterno.IdMarca;
                    obj.IdTienda = DatosPedidoInterno.IdTienda;
                    obj.IdArticulo = DatosPedidoInterno.IdArticulo;
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
                Supervisor super = InvBD.Supervisor.Where(p => p.IdSupervisor.Equals(Id)).First();
                super.Estatus = 0;//Cambia el estatus en 0
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


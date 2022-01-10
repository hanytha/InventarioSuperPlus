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
    public class ExistenciaAlmacenController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: ExistenciaAlmacen
        public ActionResult ExistenciaAlmacen()
        {
            return View();
        }
        public JsonResult ConsultaExistenciaAlmacenes()
        {
            var Almacenes = InvBD.ExistenciaAlmacenG
                .Select(p => new
                {
                    p.IdExistenciaAlmacenG,
                    p.IdCompra,
                    p.NoPedido,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeOperacion,
                    p.IdAsignacion,
                    p.IdSitio,
                    p.IdArticulo,
                    p.NombreEmpresa,
                    //p.IdProveedor,
                });
            return Json(Almacenes, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaExistenciaAlmacen(long Id)
        {
            var Almacenes = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(Id))
                .Select(p => new
                {
                    p.IdExistenciaAlmacenG,
                    p.IdCompra,
                    p.NoPedido,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeOperacion,
                    p.IdAsignacion,
                    p.IdSitio,
                    p.IdArticulo,
                    p.NombreEmpresa,
                    //p.IdProveedor
                });
            return Json(Almacenes, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la Existencia
        public int GuardarAlmacen(ExistenciaAlmacenG DatosAlmacen)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosAlmacen.IdExistenciaAlmacenG;
            if (id.Equals(0))
            {
                //int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)).Count();
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)
                //&& p.ExitenciaInicial.Equals(DatosAlmacen.ExitenciaInicial)
                && p.IdCompra.Equals(DatosAlmacen.IdCompra)
                && p.ExitenciaActual.Equals(DatosAlmacen.ExitenciaActual)
                && p.FechaDeIngreso.Equals(DatosAlmacen.FechaDeIngreso)
                //&& p.FechaFinal.Equals(DatosAlmacen.FechaFinal)
                && p.Coste.Equals(DatosAlmacen.Coste)
                && p.TipoDeOperacion.Equals(DatosAlmacen.TipoDeOperacion)
                && p.IdAsignacion.Equals(DatosAlmacen.IdAsignacion)
                && p.IdSitio.Equals(DatosAlmacen.IdSitio)
                && p.IdArticulo.Equals(DatosAlmacen.IdArticulo)
                && p.NombreEmpresa.Equals(DatosAlmacen.NombreEmpresa)
                //&& p.IdProveedor.Equals(DatosAlmacen.IdProveedor)
                && p.Coste.Equals(DatosAlmacen.Coste)
                ).Count();
                if (nveces == 0)
                {
                    InvBD.ExistenciaAlmacenG.InsertOnSubmit(DatosAlmacen);
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
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)
                && p.ExitenciaInicial.Equals(DatosAlmacen.ExitenciaInicial)
                && p.IdCompra.Equals(DatosAlmacen.IdCompra)
                && p.ExitenciaActual.Equals(DatosAlmacen.ExitenciaActual)
                && p.FechaDeIngreso.Equals(DatosAlmacen.FechaDeIngreso)
                 && p.Coste.Equals(DatosAlmacen.Coste)
                && p.TipoDeOperacion.Equals(DatosAlmacen.TipoDeOperacion)
                && p.IdAsignacion.Equals(DatosAlmacen.IdAsignacion)
                && p.IdSitio.Equals(DatosAlmacen.IdSitio)
                  && p.IdArticulo.Equals(DatosAlmacen.IdArticulo)
                && p.NombreEmpresa.Equals(DatosAlmacen.NombreEmpresa)
                //&& p.IdProveedor.Equals(DatosAlmacen.IdProveedor)
                && p.Coste.Equals(DatosAlmacen.Coste)).Count();
                if (nveces == 0)
                {
                    ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
                    obj.IdCompra = DatosAlmacen.IdCompra;
                    obj.NoPedido = DatosAlmacen.NoPedido;
                    obj.ExitenciaInicial = DatosAlmacen.ExitenciaInicial;
                    obj.ExitenciaActual = DatosAlmacen.ExitenciaActual;
                    obj.FechaDeIngreso = DatosAlmacen.FechaDeIngreso;
                    obj.TipoDeOperacion = DatosAlmacen.TipoDeOperacion;
                    obj.Coste = DatosAlmacen.Coste;
                    obj.IdAsignacion = DatosAlmacen.IdAsignacion;
                    obj.IdSitio = DatosAlmacen.IdSitio;
                    obj.IdArticulo = DatosAlmacen.IdArticulo;
                    obj.NombreEmpresa = DatosAlmacen.NombreEmpresa;
                    //obj.IdProveedor = DatosAlmacen.IdProveedor;
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








        public long GuardarCompra(CompraInterno DatosCompra)
        {
            long Afectados = 0;
            long id = DatosCompra.IdCompraInterno;
            if (id.Equals(0))
            {
                int nveces = InvBD.CompraInterno.Where(p => p.IdCompraInterno.Equals(DatosCompra.IdCompraInterno)
                  && p.IdProveedor.Equals(DatosCompra.IdProveedor)

                  //&& p.NoPedido.Equals(DatosCompra.NoPedido)
                  && p.Proveedor.Equals(DatosCompra.Proveedor)
                  && p.NoCompraProveedor.Equals(DatosCompra.NoCompraProveedor)
                  && p.FechaIngreso.Equals(DatosCompra.FechaIngreso)
                  //&& p.Costo.Equals(DatosCompra.Costo)
                  ).Count();

                if (nveces >= 0)
                {
                    InvBD.CompraInterno.InsertOnSubmit(DatosCompra);
                    InvBD.SubmitChanges();

                    var IdCompra = InvBD.CompraInterno.Where(p => p.Proveedor.Equals(DatosCompra.Proveedor)

             && p.IdProveedor.Equals(DatosCompra.IdProveedor)
             //&& p.NoPedido.Equals(DatosCompra.NoPedido)
             && p.Proveedor.Equals(DatosCompra.Proveedor)
             && p.NoCompraProveedor.Equals(DatosCompra.NoCompraProveedor)
              //&& p.Costo.Equals(DatosCompra.Costo)
              ).First();
                    Afectados = IdCompra.IdCompraInterno;
                }
                else
                {
                    Afectados = -1;
                }
            }
            else
            {
                int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(DatosCompra.NoPedido)
                 && p.IdProveedor.Equals(DatosCompra.IdProveedor)
             && p.NoPedido.Equals(DatosCompra.NoPedido)
             && p.Proveedor.Equals(DatosCompra.Proveedor)
             && p.NoCompraProveedor.Equals(DatosCompra.NoCompraProveedor)
                //&& p.Costo.Equals(DatosCompra.Costo)
                ).Count();
                if (nveces == 0)
                {
                    CompraInterno obj = InvBD.CompraInterno.Where(p => p.IdCompraInterno.Equals(id)).First();
                    obj.IdProveedor = DatosCompra.IdProveedor;
                    obj.NoPedido = DatosCompra.NoPedido;
                    obj.Proveedor = DatosCompra.Proveedor;
                    obj.IdProveedor = DatosCompra.IdProveedor;
                    obj.Proveedor = DatosCompra.Proveedor;
                    obj.NoCompraProveedor = DatosCompra.NoCompraProveedor;
                    //obj.Costo = DatosCompra.Costo;
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











        //Eliminar Existencia
        //public int EliminarAlmacen(long Id)
        //{
        //    int nregistradosAfectados = 0;
        //    try
        //    {//Consulta los datos y el primer Id que encuentra  lo compara
        //        ExistenciaAlmacenG almacenG = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(Id)).First();
        //        almacenG.Estatus = 0;//Cambia el estatus en 0
        //        InvBD.SubmitChanges();//Guarda los datos en la Base de datos
        //        nregistradosAfectados = 1;//Se pudo realizar
        //    }
        //    catch (Exception ex)
        //    {
        //        nregistradosAfectados = 0;
        //    }
        //    return nregistradosAfectados;
        //}

        ///------------------------------------GuardraCompraInt


        public int GuardarDatosArticuloCompra(ExistenciaAlmacenG DatosAlmacen)
        {
            int Afectados = 0;

            long id = (long)DatosAlmacen.IdExistenciaAlmacenG;
            if (id.Equals(0))
            {
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.ExistenciaAlmacenG.InsertOnSubmit(DatosAlmacen);
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
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)

               && p.IdCompra.Equals(DatosAlmacen.IdCompra)
                    && p.ExitenciaActual.Equals(DatosAlmacen.ExitenciaActual)
                    && p.FechaDeIngreso.Equals(DatosAlmacen.FechaDeIngreso)
                    //&& p.FechaFinal.Equals(DatosAlmacen.FechaFinal)
                    && p.Coste.Equals(DatosAlmacen.Coste)
                    && p.TipoDeOperacion.Equals(DatosAlmacen.TipoDeOperacion)
                    && p.IdAsignacion.Equals(DatosAlmacen.IdAsignacion)
                    && p.IdSitio.Equals(DatosAlmacen.IdSitio)
                    && p.IdArticulo.Equals(DatosAlmacen.IdArticulo)
                    && p.NombreEmpresa.Equals(DatosAlmacen.NombreEmpresa)
                    //&& p.IdProveedor.Equals(DatosAlmacen.IdProveedor)
                    && p.Coste.Equals(DatosAlmacen.Coste)
                ).Count();


                if (nveces == 0)
                {
                    ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
                    obj.IdCompra = DatosAlmacen.IdCompra;
                    obj.NoPedido = DatosAlmacen.NoPedido;
                    obj.ExitenciaInicial = DatosAlmacen.ExitenciaInicial;
                    obj.ExitenciaActual = DatosAlmacen.ExitenciaActual;
                    obj.FechaDeIngreso = DatosAlmacen.FechaDeIngreso;
                    obj.TipoDeOperacion = DatosAlmacen.TipoDeOperacion;
                    obj.Coste = DatosAlmacen.Coste;
                    obj.IdAsignacion = DatosAlmacen.IdAsignacion;
                    obj.IdSitio = DatosAlmacen.IdSitio;
                    obj.IdArticulo = DatosAlmacen.IdArticulo;
                    obj.NombreEmpresa = DatosAlmacen.NombreEmpresa;
                    //obj.IdProveedor = DatosAlmacen.IdProveedor;

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

        //public JsonResult ConsultaNumPedidoProveedor(long ID)
        //{
        //    string numPedidoProve = "";
        //    var numero = InvBD.CompraInterno.Where(p => p.IdProveedor.Equals(ID) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            Id = p.IdProveedor,
        //            NumeroPProveedor = p.NoCompraProveedor,

        //        });

        //    if (numero.Count() > 0)
        //    {
        //        foreach (var num in numero)
        //        {
        //            int SumaNumero = (int)(num.NumeroPProveedor + 1);
        //            numPedidoProve += SumaNumero + ",";

        //        }

        //    }
        //    //****************Condición para concatenar con uno el número de pedido cuand est sea null**************************
        //    else
        //    {
        //        numPedidoProve += "1" + ",";
        //    }
        //    var numeros = new { numPedidoProve = numPedidoProve.Substring(0, numPedidoProve.Length - 1) };
        //    return Json(numeros, JsonRequestBehavior.AllowGet);
        //}



        public JsonResult ConsultaPedidosDecendiente()
        {
            string NumeroPedido = "";
            var pedidosNum = InvBD.CompraInterno.OrderBy(p => p.NoPedido)
                .Select(p => new
                {
                    p.IdCompraInterno,
                    Pedido = p.NoPedido,
                });

            if (pedidosNum.Count() > 0)
            {
                foreach (var ped in pedidosNum)
                {
                    int SumaNum = (int)(ped.Pedido + 1);
                    NumeroPedido += SumaNum + ",";
                }
            }
            //****************Condición para concatenar con uno el número de pedido cuand est sea null**************************
            else
            {
                NumeroPedido += "1" + ",";
            }
            var compras = new { NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1) };
            return Json(compras, JsonRequestBehavior.AllowGet);
        }



        ///------------------------------------




        //----------------------------------Empieza ExistenciaAlmacen2da
        // GET: ExistenciaAlmacen
        public ActionResult ExistenciaAlmacen2da()
        {
            return View();
        }
    }
}

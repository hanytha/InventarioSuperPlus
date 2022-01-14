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
    public class ExistenciasGController : Controller
    {
        //DCISPlusDataContext InvBD = new DCISPlusDataContext();
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Prueba
        public ActionResult ExistenciasG()
        {
            return View();
        }
        public JsonResult ConsultaArticulos()
        {
            string id = "";
            string Nombre = "";
            string Fechas = "";//Es la fecha de la ultima compra reaizada
            string Stock = "";//Es la suma del stock atcual de todas las compras
            string Costos = "";//Es el costo de la compra que actualmente se esta consumiendo
            var ConsultaArticulo = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
            .Select(p => new
            {
                Id = p.IdArticulos,
                nombres = p.NombreEmpresa
            });
            foreach (var art in ConsultaArticulo)
            {
                id += art.Id + ",";
                Nombre += art.nombres + ",";
                var consultaFecha = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(art.Id) && p.StockActual > 0).OrderBy(p => p.IdCompra)
                    .Select(p => new
                    {
                        fechaIngreso = p.FechaIngreso,
                        stockActual = p.StockActual,
                        costo = p.PrecioUnitario,
                    });

                if (consultaFecha.Count() > 0)
                {
                    int UltimoReg = consultaFecha.Count() - 1;
                    int cont = 0;
                    int SumaStock = 0;
                    //inicia
                    //DateTime FultCompra;                
                    foreach (var comp in consultaFecha)
                    {

                        SumaStock = (int)(SumaStock + comp.stockActual);
                        if (cont == 0)
                        {
                            Costos += comp.costo + ",";
                        }
                        if (cont == UltimoReg)
                        {
                            Fechas += comp.fechaIngreso + ",";
                        }
                        cont++;
                    }
                    Stock += SumaStock + ",";
                    //termina
                }
                else
                {
                    Costos += "0" + ",";

                    Fechas += "2010-08-10" + ",";
                    Stock += "0" + ",";
                }
            }
            var Resultado = new { id = id.Substring(0, id.Length - 1), Nombre = Nombre.Substring(0, Nombre.Length - 1), Fechas = Fechas.Substring(0, Fechas.Length - 1), Stock = Stock.Substring(0, Stock.Length - 1), Costos = Costos.Substring(0, Costos.Length - 1) };
            return Json(Resultado, JsonRequestBehavior.AllowGet);
        }
        //---------------Consulta datos del artículo por Número de compra en la tabla de compras-----------------
        public JsonResult ConsultaNumCompra(long No)
        {
            var compra = InvBD.ComprasArticulos.Where(p => p.NoCompra.Equals(No) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.NoCompra,
                    p.Articulo,
                    p.FechaIngreso,
                    p.Unidad,
                    p.PrecioUnitario,
                });

            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //------------------------------------------------------------
        //---------------Consulta datos del artículo por Número de compra en la tabla de compras-----------------
        public JsonResult ConsultaIdArticulo(long Id)
        {
            var compra = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.NoCompra,
                    p.Articulo,
                    p.FechaIngreso,
                    p.Unidad,
                    p.TipoDeOperacion,
                    p.PrecioUnitario
                });

            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //------------------------------------------------------------
        //-----------Consulta los datos por ID del artículo pero en la tabla de compras JOIN Proveedores------------------
        public JsonResult ConsultaCompraJoinProveedor(long Id)
        {
            var compras = from comprs in InvBD.Compra
                          join provedor in InvBD.Proveedores
                      on comprs.IdProveedor equals provedor.IdProveedores
                          where comprs.IdArticulo.Equals(Id) && comprs.Estatus.Equals(1)
                          select new
                          {
                              FechaDeIngreso = comprs.FechaDeIngreso,
                              NoCompra = comprs.NoCompra,
                              Articulo = comprs.Articulo,
                              Coste = comprs.Coste,
                              IdArticulo = comprs.IdArticulo,
                              IdProveedor = provedor.IdProveedores,
                              Proveedor = provedor.Nombre,


                          };


            return Json(compras, JsonRequestBehavior.AllowGet);

        }
        //-----------Consulta los datos por ID del proveedor pero en la tabla de compras JOIN Proveedor------------------
        public JsonResult ConsultaComJoinProveedorModal(long Id)
        {
            var comps = from comprs in InvBD.Compra
                        join provedor in InvBD.Proveedores
                    on comprs.IdProveedor equals provedor.IdProveedores
                        where comprs.IdProveedor.Equals(Id) && comprs.Estatus.Equals(1)
                        select new
                        {
                            Articulo = comprs.Articulo,
                            IdArticulo = comprs.IdArticulo,
                            IdProveedor = provedor.IdProveedores,
                            Proveedor = provedor.Nombre,
                            Correo = provedor.Correo,
                            Clabe = provedor.ClaveInterbancaria,
                            Telefono = provedor.Telefono,
                            RFC = provedor.RFC,
                            UsoCFDI = provedor.UsoCFDI,
                            Direccion = provedor.Direccion,

                        };


            return Json(comps, JsonRequestBehavior.AllowGet);

        }

        //********************Consulta para mostrar los artículos por proveedor consultando la tabla de artículos**************
        public JsonResult ConsultaIdPro(string IdPro)
        {
            var compra = InvBD.Articulos.Where(p => p.Proveedor.Contains(IdPro) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.NombreEmpresa,
                    p.IdArticulos,
                    p.Unidad,
                    p.PrecioUnitarioPromedio
                });

            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //****************************************************************************************************

        //****************************Consulta el último número de pedido*************************************************

        public JsonResult ConsultaPedidosDecendiente()
        {
            string NumeroPedido = "";
            var pedidosNum = InvBD.PedidosExternos.Where(p => p.Estatus.Equals(1)).OrderBy(p => p.NumeroPedido)
                .Select(p => new
                {
                    p.IdPedidosExternos,
                    Pedido = p.NumeroPedido,
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
        //***********************Consulta el siguiente número de pedido por proveedor********************************************
        public JsonResult ConsultaNumPedidoProveedor(long ID)
        {
            string numPedidoProve = "";
            var numero = InvBD.PedidosExternos.Where(p => p.IdProveedor.Equals(ID) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    Id = p.IdProveedor,
                    NumeroPProveedor = p.NumPedidoProveedor,

                });

            if (numero.Count() > 0)
            {
                foreach (var num in numero)
                {
                    int SumaNumero = (int)(num.NumeroPProveedor + 1);
                    numPedidoProve += SumaNumero + ",";

                }

            }
            //****************Condición para concatenar con uno el número de pedido cuand est sea null**************************
            else
            {
                numPedidoProve += "1" + ",";
            }
            var numeros = new { numPedidoProve = numPedidoProve.Substring(0, numPedidoProve.Length - 1) };
            return Json(numeros, JsonRequestBehavior.AllowGet);
        }

        //*********************************************************************************************************************
        //----------------------Lenar el combobox----------------------------
        public JsonResult BDProveedor()
        {
            var datos = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdProveedores,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        //----------------------Guarda los datos de los pedidos que son realizados-----------------------------------------
        public int GuardarPedidoExterno(PedidosExternos DatosPedidoExterno)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosPedidoExterno.IdPedidosExternos;
            if (id.Equals(0))
            {
                int nveces = InvBD.PedidosExternos.Where(p => p.NumeroPedido.Equals(DatosPedidoExterno.NumeroPedido)).Count();

                //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces >= 0)
                {
                    InvBD.PedidosExternos.InsertOnSubmit(DatosPedidoExterno);
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
                int nveces = InvBD.PedidosExternos.Where(p => p.NumeroPedido.Equals(DatosPedidoExterno.NumeroPedido)
                && p.CantidadSolicitada.Equals(DatosPedidoExterno.CantidadSolicitada)
                 && p.IdProveedor.Equals(DatosPedidoExterno.IdProveedor)
                 && p.Proveedor.Equals(DatosPedidoExterno.Proveedor)
                 && p.Articulo.Equals(DatosPedidoExterno.Articulo)
                 && p.RFC.Equals(DatosPedidoExterno.RFC)
                 && p.Correo.Equals(DatosPedidoExterno.Correo)
                 && p.Telefono.Equals(DatosPedidoExterno.Telefono)
                 && p.UsoCFDI.Equals(DatosPedidoExterno.UsoCFDI)
                 && p.Direccion.Equals(DatosPedidoExterno.Direccion)
                 && p.NumPedidoProveedor.Equals(DatosPedidoExterno.NumPedidoProveedor)
                 && p.Unidad.Equals(DatosPedidoExterno.Unidad)
                 && p.PrecioUnitario.Equals(DatosPedidoExterno.PrecioUnitario)
                 && p.Fecha.Equals(DatosPedidoExterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosExternos obj = InvBD.PedidosExternos.Where(p => p.IdPedidosExternos.Equals(id)).First();
                    obj.CantidadSolicitada = DatosPedidoExterno.CantidadSolicitada;
                    obj.IdProveedor = DatosPedidoExterno.IdProveedor;
                    obj.Proveedor = DatosPedidoExterno.Proveedor;
                    obj.Articulo = DatosPedidoExterno.Articulo;
                    obj.RFC = DatosPedidoExterno.RFC;
                    obj.Correo = DatosPedidoExterno.Correo;
                    obj.Telefono = DatosPedidoExterno.Telefono;
                    obj.Fecha = DatosPedidoExterno.Fecha;
                    obj.UsoCFDI = DatosPedidoExterno.UsoCFDI;
                    obj.Direccion = DatosPedidoExterno.Direccion;
                    obj.NumPedidoProveedor = DatosPedidoExterno.NumPedidoProveedor;
                    obj.Unidad = DatosPedidoExterno.Unidad;
                    obj.PrecioUnitario = DatosPedidoExterno.PrecioUnitario;
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
    }
}
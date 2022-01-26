using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class SupervisionController : Controller
    {
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Supervision
        public ActionResult Supervision()
        {
            return View();
        }
        public JsonResult ConsultaSuperviciones()
        {
            var superviciones = InvBD.Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdSupervision,
                    p.TipoSupervicion,
                    p.IdUsuario,
                    p.IdAreas,
                    p.Tienda,
                    p.nombreUsuario,
                    p.Estatus
                });
            return Json(superviciones, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSupervicion(long Id)
        {
            var supervicion = InvBD.Supervision.Where(p => p.IdSupervision.Equals(Id))
                .Select(p => new
                {
                    p.IdSupervision,
                    Nombre = p.TipoSupervicion,
                    p.TipoSupervicion,
                    p.IdUsuario,
                    p.IdAreas,
                    p.Tienda,
                    p.nombreUsuario,
                    p.Estatus,
                });
            return Json(supervicion, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarSupervicion(Supervision DatosSupervicion)
        {
            int Afectados = 0;
            try
            {
                long id = DatosSupervicion.IdSupervision;
                if (id.Equals(0))
                {
                    int nveces = InvBD.Supervision.Where(p => p.TipoSupervicion.Equals(DatosSupervicion.TipoSupervicion)).Count();

                    if (nveces == 0)
                    {
                        InvBD.Supervision.InsertOnSubmit(DatosSupervicion);
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
                    int nveces = InvBD.Supervision.Where(p => p.TipoSupervicion.Equals(DatosSupervicion.TipoSupervicion) && p.IdUsuario.Equals(DatosSupervicion.IdUsuario) && p.nombreUsuario.Equals(DatosSupervicion.nombreUsuario) && p.Tienda.Equals(DatosSupervicion.Tienda)).Count();
                    if (nveces == 0)
                    {
                        Supervision obj = InvBD.Supervision.Where(p => p.IdSupervision.Equals(id)).First();
                        obj.TipoSupervicion = DatosSupervicion.TipoSupervicion;
                        obj.Tienda = DatosSupervicion.Tienda;
                        obj.IdUsuario = DatosSupervicion.IdUsuario;
                        obj.nombreUsuario = DatosSupervicion.nombreUsuario;
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
        public int EliminarSupervicion(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Supervision Sprv = InvBD.Supervision.Where(p => p.IdSupervision.Equals(Id)).First();
                Sprv.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
        //--------------------Controlador SucursalesSupervision--------------------
        public ActionResult SucursalesSupervision()
        {
            return View();
        }
        public int CargarSucursalesXSupervision()
        {
            int Encontrados = 0;
            string[] Sucursales = Accesos.Tiendas.Split('#');
            TiendasSupervision.IDTienda = new List<long>();
            TiendasSupervision.Nombre = new List<string>();
            TiendasSupervision.LNombre = new List<string>();
            TiendasSupervision.E1Nombre = new List<string>();
            TiendasSupervision.E2Nombre = new List<string>();
            TiendasSupervision.E3Nombre = new List<string>();
            TiendasSupervision.A1Nombre = new List<string>();
            TiendasSupervision.A2Nombre = new List<string>();
            TiendasSupervision.A3Nombre = new List<string>();
            TiendasSupervision.Estado = new List<string>();
            TiendasSupervision.Municipio = new List<string>();
            TiendasSupervision.Localidad = new List<string>();
            TiendasSupervision.Calle = new List<string>();
            TiendasSupervision.CP = new List<long>();
            TiendasSupervision.Telefono = new List<long>();
            TiendasSupervision.HApertura = new List<string>();
            TiendasSupervision.HCierre = new List<string>();
            TiendasSupervision.Estatus = new List<int>();
            for (int i = 0; i < Sucursales.Length; i++)
            {
                var Tienda = InvBD.Tienda.Where(p => p.IdTienda.Equals(Sucursales[i]))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus
                }).First();
                TiendasSupervision.IDTienda.Add(Tienda.IdTienda);
                TiendasSupervision.Nombre.Add(Tienda.Nombre);
                TiendasSupervision.LNombre.Add(Tienda.LNombre);
                if (Tienda.E1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E1Nombre.Add(Tienda.E1Nombre);
                }
                else
                {
                    TiendasSupervision.E1Nombre.Add("");
                }
                if (Tienda.E2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E2Nombre.Add(Tienda.E2Nombre);
                }
                else
                {
                    TiendasSupervision.E2Nombre.Add("");
                }
                if (Tienda.E3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E3Nombre.Add(Tienda.E3Nombre);
                }
                else
                {
                    TiendasSupervision.E3Nombre.Add("");
                }
                if (Tienda.A1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A1Nombre.Add(Tienda.A1Nombre);
                }
                else
                {
                    TiendasSupervision.A1Nombre.Add("");
                }
                if (Tienda.A2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A2Nombre.Add(Tienda.A2Nombre);
                }
                else
                {
                    TiendasSupervision.A2Nombre.Add("");
                }
                if (Tienda.A3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A3Nombre.Add(Tienda.A3Nombre);
                }
                else
                {
                    TiendasSupervision.A3Nombre.Add("");
                }
                TiendasSupervision.Estado.Add(Tienda.Estado);
                TiendasSupervision.Municipio.Add(Tienda.Municipio);
                TiendasSupervision.Localidad.Add(Tienda.Localidad);
                TiendasSupervision.Calle.Add(Tienda.Calle);
                TiendasSupervision.CP.Add(Tienda.CP);
                TiendasSupervision.Telefono.Add(Tienda.Telefono);
                TiendasSupervision.Estatus.Add(Convert.ToInt32(Tienda.Estatus));

                if (Tienda.HApertura != null)
                {
                    TiendasSupervision.HApertura.Add(Tienda.HApertura);
                }
                else
                {
                    TiendasSupervision.HApertura.Add("");

                }
                if (Tienda.HCierre != null)
                {
                    TiendasSupervision.HCierre.Add(Tienda.HCierre);
                }
                else
                {
                    TiendasSupervision.HCierre.Add("");
                }

            }
            return Encontrados;
        }
        //---------------Tabla de las tiendas---------------
        public JsonResult ConsultaArticulos(long IDTienda)
        {
            string id = "";
            string NoPedido = "";
            string Nombre = "";
            string Fechas = "";//Es la fecha de la ultima compra reaizada
            string Stock = "";//Es la suma del stock atcual de todas las compras
            string IdSitio = "";
            string IdArticulos = "";
            //var ConsultaArticulo = from Articulos in InvBD.Articulos
            //                       join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
            //                       on Articulos.IdArticulos equals ExistenciaAlmacenG.IdArticulo
            //                       join CompraInterno in InvBD.CompraInterno
            //                        on ExistenciaAlmacenG.IdCompraInterno equals CompraInterno.IdCompraInterno
            //                       where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(1)
            //                       select new




           var ConsultaArticulo = from CompraInterno in InvBD.CompraInterno
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on CompraInterno.IdCompraInterno equals ExistenciaAlmacenG.IdCompraInterno
                                  
                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(1)
                                   select new



                                   {

                                       Id = ExistenciaAlmacenG.IdArticulo,
                                       IdExistencia = ExistenciaAlmacenG.IdExistenciaAlmacenG,
                                       NoPedido = ExistenciaAlmacenG.NoPedidoG,
                                       nombres = ExistenciaAlmacenG.Articulo,
                                       IdArticulos = ExistenciaAlmacenG.IdArticulo,
                                       Articulo = ExistenciaAlmacenG.Articulo,
                                       IdAsignacion = CompraInterno.IdAsignacion,
                                       ExitenciaActual = ExistenciaAlmacenG.ExitenciaActual,
                                       IdSitio = CompraInterno.IdSitio,
                                       FechaDeIngreso = CompraInterno.FechaIngreso
                                   };
            foreach (var art in ConsultaArticulo)
            {
                id += art.Id + ",";
                Nombre += art.nombres + ",";
                NoPedido += art.NoPedido + ",";
                IdSitio += art.IdSitio + ",";
                IdArticulos += art.IdArticulos + ",";
                var consultaFecha = ConsultaArticulo.Where(p => p.Id.Equals(art.Id) && p.ExitenciaActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.IdArticulos)
                   .Select(p => new
                   {
                       fechaIngreso = p.FechaDeIngreso,
                       stockActual = p.ExitenciaActual,
                   });
                if (consultaFecha.Count() > 0)
                {
                    int UltimoReg = consultaFecha.Count() - 1;
                    int cont = 0;
                    int SumaStock = 0;
                    foreach (var comp in consultaFecha)
                    {
                        SumaStock = (int)(SumaStock + comp.stockActual);

                        if (cont == UltimoReg)
                        {
                            Fechas += comp.fechaIngreso + ",";
                        }
                        cont++;
                    }
                    Stock += SumaStock + ",";

                }
                else
                {
                    Fechas += "2010-08-10" + ",";
                    Stock += "0" + ",";
                }
            }
            var Resultado = new { id = id.Substring(0, id.Length - 1), Nombre = Nombre.Substring(0, Nombre.Length - 1), NoPedido = NoPedido.Substring(0, NoPedido.Length - 1), IdSitio = IdSitio.Substring(0, IdSitio.Length - 1), Fechas = Fechas.Substring(0, Fechas.Length - 1), Stock = Stock.Substring(0, Stock.Length - 1) };
            return Json(Resultado, JsonRequestBehavior.AllowGet);
        }




        public JsonResult ConsultaArticulo(long Id)
        {
            string id = "";
            string Nombre = "";
            string NombreProveedor = "";
            string Fechas = "";//Es la fecha de la ultima compra reaizada
            string Stock = "";//Es la suma del stock atcual de todas las compras
            string Costos = "";//Es el costo de la compra que actualmente se esta consumiendo


            var ConsultaArticulo = from Articulos in InvBD.Articulos
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on Articulos.IdArticulos equals ExistenciaAlmacenG.IdArticulo
                                   join CompraInterno in InvBD.CompraInterno
                                    on ExistenciaAlmacenG.IdCompraInterno equals CompraInterno.IdCompraInterno
                                   where Articulos.IdArticulos.Equals(Id)
                                   select new

                                   {

                                       Id = Articulos.IdArticulos,
                                       IdExistencia = ExistenciaAlmacenG.IdExistenciaAlmacenG,
                                       NoPedido = ExistenciaAlmacenG.NoPedidoG,
                                       nombres = Articulos.NombreEmpresa,
                                       IdArticulos = Articulos.IdArticulos,
                                       Articulo = Articulos.NombreEmpresa,
                                       IdAsignacion = CompraInterno.IdAsignacion,
                                       ExitenciaActual = ExistenciaAlmacenG.ExitenciaActual,
                                       IdSitio = CompraInterno.IdSitio,
                                       NombreProveedor = Articulos.IdAreas,
                                       FechaDeIngreso = CompraInterno.FechaIngreso
                                   };
            foreach (var art in ConsultaArticulo)
            {
                id += art.Id + ",";
                Nombre += art.nombres + ",";
                NombreProveedor += art.nombres + ",";
                var consultaFecha = ConsultaArticulo.Where(p => p.Id.Equals(art.Id) && p.ExitenciaActual > 0).OrderBy(p => p.IdAsignacion)
                    .Select(p => new
                    {
                        fechaIngreso = p.FechaDeIngreso,
                        stockActual = p.ExitenciaActual,
                        //  costo = p.PrecioUnitario,
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
                            // Costos += comp.costo + ",";
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
            var ResultadoId = new { id = id.Substring(0, id.Length - 1), Nombre = Nombre.Substring(0, Nombre.Length - 1), Fechas = Fechas.Substring(0, Fechas.Length - 1), Stock = Stock.Substring(0, Stock.Length - 1), NombreProveedor = NombreProveedor.Substring(0, NombreProveedor.Length - 1) };
            return Json(ResultadoId, JsonRequestBehavior.AllowGet);
        }

        //Obtener las tiendas de la supervisión en SucursalesSupervisión.cshtml-------
        public JsonResult BDSupervisionTiendas()
        {
            var datos = InvBD.Supervision.Where(p => p.IdSupervision.Equals(Accesos.IDSitio) && p.IdUsuario.Equals(Accesos.Id))
                .Select(p => new
                {
                    ID = p.IdSupervision,
                    Nombre = p.TipoSupervicion,
                    p.IdUsuario,
                    p.Tienda
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public void CargarSucursales()
        {
            Sucursales Sucursal = new Sucursales();
            Sucursales.IDTienda = new List<long>();
            Sucursales.NoTienda = new List<long>();
            Sucursales.Nombre = new List<string>();
            Sucursales.LNombre = new List<string>();
            Sucursales.E1Nombre = new List<string>();
            Sucursales.E2Nombre = new List<string>();
            Sucursales.E3Nombre = new List<string>();
            Sucursales.A1Nombre = new List<string>();
            Sucursales.A2Nombre = new List<string>();
            Sucursales.A3Nombre = new List<string>();
            Sucursales.Estado = new List<string>();
            Sucursales.Municipio = new List<string>();
            Sucursales.Localidad = new List<string>();
            Sucursales.Calle = new List<string>();
            Sucursales.CP = new List<long>();
            Sucursales.Telefono = new List<long>();
            Sucursales.Latitud = new List<string>();
            Sucursales.Longitud = new List<string>();
            Sucursales.HApertura = new List<string>();
            Sucursales.HCierre = new List<string>();
            Sucursales.Estatus = new List<int>();
            var Tienda = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
            .Select(p => new
            {
                p.IdTienda,
                p.Nombre,
                p.LNombre,
                p.E1Nombre,
                p.E2Nombre,
                p.E3Nombre,
                p.A1Nombre,
                p.A2Nombre,
                p.A3Nombre,
                p.Estado,
                p.Municipio,
                p.Localidad,
                p.Calle,
                p.CP,
                p.Telefono,
                p.HApertura,
                p.HCierre,
                p.Estatus
            });
            foreach (var Suc in Tienda)
            {
                Sucursales.IDTienda.Add(Suc.IdTienda);
                Sucursales.Nombre.Add(Suc.Nombre);
                Sucursales.LNombre.Add(Suc.LNombre);
                if (Suc.E1Nombre != "--Seleccione--")
                {
                    Sucursales.E1Nombre.Add(Suc.E1Nombre);
                }
                else
                {
                    Sucursales.E1Nombre.Add("");
                }
                if (Suc.E2Nombre != "--Seleccione--")
                {
                    Sucursales.E2Nombre.Add(Suc.E2Nombre);
                }
                else
                {
                    Sucursales.E2Nombre.Add("");
                }
                if (Suc.E3Nombre != "--Seleccione--")
                {
                    Sucursales.E3Nombre.Add(Suc.E3Nombre);
                }
                else
                {
                    Sucursales.E3Nombre.Add("");
                }
                if (Suc.A1Nombre != "--Seleccione--")
                {
                    Sucursales.A1Nombre.Add(Suc.A1Nombre);
                }
                else
                {
                    Sucursales.A1Nombre.Add("");
                }
                if (Suc.A2Nombre != "--Seleccione--")
                {
                    Sucursales.A2Nombre.Add(Suc.A2Nombre);
                }
                else
                {
                    Sucursales.A2Nombre.Add("");
                }
                if (Suc.A3Nombre != "--Seleccione--")
                {
                    Sucursales.A3Nombre.Add(Suc.A3Nombre);
                }
                else
                {
                    Sucursales.A3Nombre.Add("");
                }
                Sucursales.Estado.Add(Suc.Estado);
                Sucursales.Municipio.Add(Suc.Municipio);
                Sucursales.Localidad.Add(Suc.Localidad);
                Sucursales.Calle.Add(Suc.Calle);
                Sucursales.CP.Add(Suc.CP);
                Sucursales.Telefono.Add(Suc.Telefono);
                Sucursales.Estatus.Add(Convert.ToInt32(Suc.Estatus));

                if (Suc.HApertura != null)
                {
                    Sucursales.HApertura.Add(Suc.HApertura);
                }
                else
                {
                    Sucursales.HApertura.Add("");

                }
                if (Suc.HCierre != null)
                {
                    Sucursales.HCierre.Add(Suc.HCierre);
                }
                else
                {
                    Sucursales.HCierre.Add("");
                }
            }
        }
        //Consulta de la tabla de articulos x tienda
        //-----------Consulta los datos por ID del artículo pero en la tabla de existencias almacen G------------------
        public JsonResult ConsultaExistenciaAlmGJoinProveedor(long No, long Id)
        {
            var ExistenciaAlmG = from ExistenciAAlmacen in InvBD.ExistenciaAlmacenG
                                 join CompraInterno in InvBD.CompraInterno
                            on ExistenciAAlmacen.IdCompraInterno equals CompraInterno.IdCompraInterno
                                 join provedor in InvBD.Areas
                             on CompraInterno.IdProveedor equals provedor.IdAreas
                                 join Tienda in InvBD.Tienda
                                   on CompraInterno.IdSitio equals Tienda.IdTienda
                                 where ExistenciAAlmacen.NoPedidoG.Equals(No) && CompraInterno.IdSitio.Equals(Id) && CompraInterno.EstatusPedido.Equals(1)
                                 select new
                                 {
                                     FechaDeIngreso = CompraInterno.FechaIngreso,
                                     NoPedido = ExistenciAAlmacen.NoPedidoG,
                                     Articulo = ExistenciAAlmacen.Articulo,
                                     // Coste = ExistenciAAlmacen.PrecioUnitario,
                                     IdArticulo = ExistenciAAlmacen.IdArticulo,
                                     //    IdProveedor = provedor.IdAreas,
                                     //    Proveedor = provedor.Nombre
                                 };
            return Json(ExistenciaAlmG, JsonRequestBehavior.AllowGet);
        }




        //public JsonResult ConsultaExistenciaAlmGJoinProveedor(long No, long Id)
        //{
        //    var ExistenciaAlmG = from ExistenciAAlmacen in InvBD.ExistenciaAlmacenG
        //                         join provedor in InvBD.Areas
        //                     on ExistenciAAlmacen.IdProveedor equals provedor.IdAreas
        //                         join Tienda in InvBD.Tienda
        //                           on ExistenciAAlmacen.IdSitio equals Tienda.IdTienda
        //                         where ExistenciAAlmacen.NoPedido.Equals(No) && ExistenciAAlmacen.IdSitio.Equals(Id)
        //                         select new
        //                         {
        //                             FechaDeIngreso = ExistenciAAlmacen.FechaDeIngreso,
        //                             NoPedido = ExistenciAAlmacen.NoPedido,
        //                             Articulo = ExistenciAAlmacen.NombreEmpresa,
        //                             Coste = ExistenciAAlmacen.Coste,
        //                             IdArticulo = ExistenciAAlmacen.IdArticulo,
        //                             //    IdProveedor = provedor.IdAreas,
        //                             //    Proveedor = provedor.Nombre
        //                         };
        //    return Json(ExistenciaAlmG, JsonRequestBehavior.AllowGet);
        //}



        //----------------------Lenar el combobox----------------------------
        public JsonResult BDTienda(long Id)
        {
            var datos = InvBD.Tienda.Where(p => p.Estatus.Equals(1) && p.IdTienda.Equals(Id))
                .Select(p => new
                {
                    ID = p.IdTienda,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSitio(long IdS)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join CompraInterno in InvBD.CompraInterno
                            on ExistAlm.IdCompraInterno equals CompraInterno.IdCompraInterno
                            join provedor in InvBD.Areas
                        on CompraInterno.IdProveedor equals provedor.IdAreas
                            where CompraInterno.IdSitio.Equals(IdS)
                            select new
                            {
                                Articulo = ExistAlm.Articulo,
                                IdArticulo = ExistAlm.IdArticulo,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = provedor.IdAreas,
                                Proveedor = provedor.Nombre,
                                Tienda = CompraInterno.IdSitio,
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Consulta(long Id)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where Compra.IdSitio.Equals(Id)
                            select new
                            {
                                Articulo = ExistAlm.Articulo,
                                IdArticulo = ExistAlm.IdArticulo,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre,
                                Tienda = Compra.IdSitio,
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult BDNoPedido(long Id)
        //{
        //    var datos = from Art in InvBD.Articulos
        //                    join existenciaAlm in InvBD.ExistenciaAlmacenG
        //              on Art.IdArticulos equals existenciaAlm.IdArticulo
        //                where Art.IdArticulos.Equals(Id)
        //                    select new
        //                    {
        //                        NoPedido = existenciaAlm.NoPedidoG

        //                    };
        //    return Json(datos, JsonRequestBehavior.AllowGet);
        //}

        //Consulta de proveedores en la tabla existenciaAlmacenGeneral
        public JsonResult ConsultaComJoinProveedor(long Id)
        {
            var ExistAlmG = from Art in InvBD.Articulos
                            join areas in InvBD.Areas
                        on Art.IdAreas equals areas.IdAreas

                            //join ExistenciaAlmacen in InvBD.ExistenciaAlmacenG
                            //   on Art.IdArticulos equals ExistenciaAlmacen.IdArticulo

                            where Art.IdAreas.Equals(Id)
                            select new
                            {
                                Articulo = Art.NombreEmpresa,
                                IdArticulo = Art.IdArticulos,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre,
                                //NoPedido = ExistenciaAlmacen.NoPedidoG
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultaArtDev(long Id)
        {
            var ExistAlmG = from Art in InvBD.Articulos
                            join areas in InvBD.Areas
                        on Art.IdAreas equals areas.IdAreas

                            join ExistenciaAlmacen in InvBD.ExistenciaAlmacenG
                               on Art.IdArticulos equals ExistenciaAlmacen.IdArticulo

                            where Art.IdArticulos.Equals(Id)
                            select new
                            {
                                Nombre = Art.NombreEmpresa,
                                IdArticulo = Art.IdArticulos,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre,
                                NoPedido = ExistenciaAlmacen.NoPedidoG
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }



        public JsonResult BDProveedor()
        {
            var datos = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdAreas,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Combo proveedores en la tabla articulos
        public JsonResult ConsultaIdPro(string IdPro)
        {
            var compra = InvBD.Articulos.Where(p => p.IdAreas.Equals(IdPro) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.NombreEmpresa,
                    p.IdArticulos,
                    p.Unidad
                });
            return Json(compra, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ConsultaArticulosXtienda(string IdPro)
        {
            //var compra = InvBD.Articulos.Where(p => p.IdAreas.Equals(IdPro) && p.Estatus.Equals(1))
            //    .Select(p => new
            //    {
            //        p.NombreEmpresa,
            //        p.IdArticulos,
            //        p.Unidad
            //    });
            //return Json(compra, JsonRequestBehavior.AllowGet);

            var compra = from ExistAlm in InvBD.ExistenciaAlmacenG
                         join Compra in InvBD.CompraInterno
                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                         join areas in InvBD.Areas
                     on Compra.IdProveedor equals areas.IdAreas
                         where Compra.IdSitio.Equals(IdPro)
                         select new
                         {
                             NombreEmpresa = ExistAlm.Articulo,
                             IdArticulos = ExistAlm.IdArticulo,
                             Tipo = ExistAlm.TipoDeOperacion,
                             IdProveedor = areas.IdAreas,
                             Proveedor = areas.Nombre,
                             Tienda = Compra.IdSitio,
                         };
            return Json(compra, JsonRequestBehavior.AllowGet);


        }

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
                if (nveces >= 0)
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
                && p.NumPedidoProveedor.Equals(DatosPedidoInterno.NumPedidoProveedor)
                && p.CantidadSolicitada.Equals(DatosPedidoInterno.CantidadSolicitada)
                 && p.IdArticulo.Equals(DatosPedidoInterno.IdArticulo)
                 && p.Articulo.Equals(DatosPedidoInterno.Articulo)
                 && p.Fecha.Equals(DatosPedidoInterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosInternos obj = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(id)).First();
                    obj.CantidadSolicitada = DatosPedidoInterno.CantidadSolicitada;
                    obj.IdProveedor = DatosPedidoInterno.IdProveedor;
                    obj.Proveedor = DatosPedidoInterno.Proveedor;
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
            //    catch (Exception ex)
            //    {
            //        Afectados = 0;
            //    }
            return Afectados;
        }



        public JsonResult ConsultaPedidosDecendiente()
        {
            string NumeroPedido = "";
            var pedidosNum = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1)).OrderBy(p => p.NumeroPedido)
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    Pedido = p.NumeroPedido,
                });
            foreach (var ped in pedidosNum)
            {
                int SumaNum = (int)(ped.Pedido + 1);
                NumeroPedido += SumaNum + ",";
            }
            var compras = new { NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1) };
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
        //Consulta el siguiente número de pedido por proveedor
        public JsonResult ConsultaNumPedidoProveedor(long ID)
        {
            string numPedidoProve = "";
            var numero = InvBD.PedidosInternos.Where(p => p.IdProveedor.Equals(ID) && p.Estatus.Equals(1))
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
                    numPedidoProve = SumaNumero + ",";
                }
            }
            else
            {
                numPedidoProve += "1" + ",";
            }

            var numeros = new { numPedidoProve = numPedidoProve.Substring(0, numPedidoProve.Length - 1) };
            return Json(numeros, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ConsultaArticulosAceptar(long IDTienda)
        {
            string id = "";
            string NoPedido = "";
            string Nombre = "";
            string Proveedor = "";
            string Fechas = "";//Es la fecha de la ultima compra reaizada
            string Stock = "";//Es la suma del stock atcual de todas las compras
            string IdSitio = "";
            string IdArticulos = "";
            var ConsultaArticulo = from Articulos in InvBD.Articulos
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on Articulos.IdArticulos equals ExistenciaAlmacenG.IdArticulo
                                   join CompraInterno in InvBD.CompraInterno
                                    on ExistenciaAlmacenG.IdCompraInterno equals CompraInterno.IdCompraInterno
                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(0)
                                   select new
                                   {

                                       Id = Articulos.IdArticulos,
                                       IdExistencia = ExistenciaAlmacenG.IdExistenciaAlmacenG,
                                       NoPedido = ExistenciaAlmacenG.NoPedidoG,
                                       nombres = Articulos.NombreEmpresa,
                                       Proveedor = CompraInterno.Proveedor,
                                       IdArticulos = Articulos.IdArticulos,
                                       Articulo = Articulos.NombreEmpresa,
                                       ExitenciaActual = ExistenciaAlmacenG.ExitenciaActual,
                                       IdAsignacion = CompraInterno.IdAsignacion,
                                       IdSitio = CompraInterno.IdSitio,
                                       FechaDeIngreso = CompraInterno.FechaIngreso
                                   };
            foreach (var art in ConsultaArticulo)
            {
                id += art.Id + ",";
                Nombre += art.nombres + ",";
                Proveedor += art.Proveedor + ",";
                NoPedido += art.NoPedido + ",";
                IdSitio += art.IdSitio + ",";
                IdArticulos += art.IdArticulos + ",";
                var consultaFecha = ConsultaArticulo.Where(p => p.Id.Equals(art.Id) && p.ExitenciaActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.IdArticulos)
                   .Select(p => new
                   {
                       fechaIngreso = p.FechaDeIngreso,
                       stockActual = p.ExitenciaActual,
                   });
                if (consultaFecha.Count() > 0)
                {
                    int UltimoReg = consultaFecha.Count() - 1;
                    int cont = 0;
                    int SumaStock = 0;
                    foreach (var comp in consultaFecha)
                    {
                        SumaStock = (int)(SumaStock + comp.stockActual);

                        if (cont == UltimoReg)
                        {
                            Fechas += comp.fechaIngreso + ",";
                        }
                        cont++;
                    }
                    Stock += SumaStock + ",";

                }
                else
                {
                    Fechas += "2010-08-10" + ",";
                    Stock += "0" + ",";
                }
            }
            var Resultado = new { id = id.Substring(0, id.Length - 1), Nombre = Nombre.Substring(0, Nombre.Length - 1), Proveedor = Proveedor.Substring(0, Proveedor.Length - 1), NoPedido = NoPedido.Substring(0, NoPedido.Length - 1), IdSitio = IdSitio.Substring(0, IdSitio.Length - 1), Fechas = Fechas.Substring(0, Fechas.Length - 1), Stock = Stock.Substring(0, Stock.Length - 1) };
            return Json(Resultado, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult BDTiposMovimiento()
        //{
        //    var datos = InvBD.TipoDeMovimientos.Where(p => p.Estatus.Equals(1))
        //        .Select(p => new {
        //            ID = p.IdMovimientos,
        //            Nombre = p.TipoDeMovimiento
        //        });
        //    return Json(datos, JsonRequestBehavior.AllowGet);
        //}

        //------------------Supervision2da------------------------------------
        public ActionResult Supervision2da()
        {
            return View();
        }

        public ActionResult TiendaLider()
        {
            return View();
        }

        public int CargarTiendaLider()
        {
            int Encontrados = 0;
            string[] Sucursales = Accesos.Tiendas.Split('#');
            TiendasSupervision.IDTienda = new List<long>();
            TiendasSupervision.Nombre = new List<string>();
            TiendasSupervision.LNombre = new List<string>();
            TiendasSupervision.E1Nombre = new List<string>();
            TiendasSupervision.E2Nombre = new List<string>();
            TiendasSupervision.E3Nombre = new List<string>();
            TiendasSupervision.A1Nombre = new List<string>();
            TiendasSupervision.A2Nombre = new List<string>();
            TiendasSupervision.A3Nombre = new List<string>();
            TiendasSupervision.Estado = new List<string>();
            TiendasSupervision.Municipio = new List<string>();
            TiendasSupervision.Localidad = new List<string>();
            TiendasSupervision.Calle = new List<string>();
            TiendasSupervision.CP = new List<long>();
            TiendasSupervision.Telefono = new List<long>();
            TiendasSupervision.HApertura = new List<string>();
            TiendasSupervision.HCierre = new List<string>();
            TiendasSupervision.Estatus = new List<int>();
            for (int i = 0; i < Sucursales.Length; i++)
            {
                var Tienda = InvBD.Tienda.Where(p => p.IdTienda.Equals(Sucursales[i]))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus
                }).First();
                TiendasSupervision.IDTienda.Add(Tienda.IdTienda);
                TiendasSupervision.Nombre.Add(Tienda.Nombre);
                TiendasSupervision.LNombre.Add(Tienda.LNombre);
                if (Tienda.E1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E1Nombre.Add(Tienda.E1Nombre);
                }
                else
                {
                    TiendasSupervision.E1Nombre.Add("");
                }
                if (Tienda.E2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E2Nombre.Add(Tienda.E2Nombre);
                }
                else
                {
                    TiendasSupervision.E2Nombre.Add("");
                }
                if (Tienda.E3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E3Nombre.Add(Tienda.E3Nombre);
                }
                else
                {
                    TiendasSupervision.E3Nombre.Add("");
                }
                if (Tienda.A1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A1Nombre.Add(Tienda.A1Nombre);
                }
                else
                {
                    TiendasSupervision.A1Nombre.Add("");
                }
                if (Tienda.A2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A2Nombre.Add(Tienda.A2Nombre);
                }
                else
                {
                    TiendasSupervision.A2Nombre.Add("");
                }
                if (Tienda.A3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A3Nombre.Add(Tienda.A3Nombre);
                }
                else
                {
                    TiendasSupervision.A3Nombre.Add("");
                }
                TiendasSupervision.Estado.Add(Tienda.Estado);
                TiendasSupervision.Municipio.Add(Tienda.Municipio);
                TiendasSupervision.Localidad.Add(Tienda.Localidad);
                TiendasSupervision.Calle.Add(Tienda.Calle);
                TiendasSupervision.CP.Add(Tienda.CP);
                TiendasSupervision.Telefono.Add(Tienda.Telefono);
                TiendasSupervision.Estatus.Add(Convert.ToInt32(Tienda.Estatus));

                if (Tienda.HApertura != null)
                {
                    TiendasSupervision.HApertura.Add(Tienda.HApertura);
                }
                else
                {
                    TiendasSupervision.HApertura.Add("");

                }
                if (Tienda.HCierre != null)
                {
                    TiendasSupervision.HCierre.Add(Tienda.HCierre);
                }
                else
                {
                    TiendasSupervision.HCierre.Add("");
                }

            }
            return Encontrados;
        }



        //public JsonResult ConsultaPedidosArticulos(long Pedi)
        //{
        //    var numero = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Pedi) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            p.Articulo,
        //            p.CantidadSolicitada,
        //            //p.PrecioUnitario,
        //            //p.Unidad
        //        });
        //    return Json(numero, JsonRequestBehavior.AllowGet);
        //}


        public JsonResult ConsultaPedidosArticulos(long id, long no)
        //{(long Id)
        {
            var numero = from ExistAlm in InvBD.ExistenciaAlmacenG
                         join Compra in InvBD.CompraInterno
                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                         join areas in InvBD.Areas
                     on Compra.IdProveedor equals areas.IdAreas
                         where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
                         select new
                         {
                             IdPedidosInternos = ExistAlm.IdCompraInterno,
                             NumeroPedido = ExistAlm.Articulo,
                             NumPedidoProveedor = Compra.NoPedidoProveedor,
                             Articulo = ExistAlm.Articulo,
                             CantidadSolicitada = ExistAlm.ExitenciaInicial,
                             CantidadAprobada = ExistAlm.ExitenciaActual,
                             Tipo = ExistAlm.TipoDeOperacion,
                             IdProveedor = Compra.IdProveedor,
                             Proveedor = Compra.Proveedor,
                             IdTienda = Compra.IdSitio,
                             IdArticulo = ExistAlm.IdArticulo,
                             //Articulo = ExistAlm.NombreEmpresa,
                             Fecha = Compra.FechaIngreso,
                         };
            return Json(numero, JsonRequestBehavior.AllowGet);
        }



        //public JsonResult ConsultaAceptarPedido(long Id)
        //{
        //    var pedidosInt = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            p.IdPedidosInternos,
        //            p.NumeroPedido,
        //            p.NumPedidoProveedor,
        //            p.CantidadSolicitada,
        //            p.CantidadAprobada,
        //            p.Tipo,
        //            p.IdProveedor,
        //            p.Proveedor,
        //            //p.IdUnidadDeMedida,
        //            //p.UnidadDeMedida,
        //            //p.IdMarca,
        //            //p.Marca,
        //            p.IdTienda,
        //            p.Tienda,
        //            p.IdArticulo,
        //            p.Articulo,
        //            p.Fecha
        //        });
        //    return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult ConsultaAceptarPedido(long Id, long No)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join Tienda in InvBD.Tienda
                           on Compra.IdSitio equals Tienda.IdTienda
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where ExistAlm.IdArticulo.Equals(Id) && ExistAlm.NoPedidoG.Equals(No)
                            select new
                            {
                                IdPedidosInternos = ExistAlm.IdCompraInterno,
                                NumeroPedido = ExistAlm.NoPedidoG,
                                NumPedidoProveedor = Compra.NoPedidoProveedor,
                                NoCompraProveedor = Compra.NoPedidoProveedor,
                                // CantidadSolicitada = ExistAlm.CantidadSolicitada,
                                // CantidadAprobada = ExistAlm.CantidadAprobada,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = Compra.IdProveedor,
                                Proveedor = Compra.Proveedor,
                                IdTienda = Compra.IdSitio,
                                IdArticulo = ExistAlm.IdArticulo,
                                Articulo = ExistAlm.Articulo,
                                Fecha = Compra.FechaIngreso,
                                Telefono = areas.Telefono,
                                Correo = areas.Correo,
                                Tienda = Tienda.Nombre,
                                Direccion = Tienda.Direccion
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult ConsultaPedidoXnum(long Id, long No)
        //{
        //    var numero = from proveedor in InvBD.Areas
        //                 join pedido in InvBD.PedidosInternos
        //             on proveedor.IdAreas equals pedido.IdProveedor
        //                 join tienda in InvBD.Tienda
        //                   on pedido.IdTienda equals tienda.IdTienda
        //                 where pedido.NumeroPedido.Equals(Num) && pedido.Estatus.Equals(1)
        //                 select new
        //                 {
        //                     IdPedidosInternos = pedido.IdPedidosInternos,
        //                     NumeroPedido = pedido.NumeroPedido,
        //                     CantidadSolicitada = pedido.CantidadSolicitada,

        //                     IdProveedor = proveedor.IdAreas,
        //                     Proveedor = proveedor.Nombre,
        //                     Direccion = tienda.Direccion,
        //                     NumPedidoProveedor = pedido.NumeroPedido,
        //                     IdTienda = pedido.IdTienda,
        //                     Tienda = pedido.Tienda,
        //                     IdArticulo = pedido.IdArticulo,
        //                     Fecha = pedido.Fecha,
        //                     Correo = proveedor.Correo,
        //                     Telefono = proveedor.Telefono,
        //                 };
        //    return Json(numero, JsonRequestBehavior.AllowGet);
        //}


        public int Guardar(CompraInterno AceptarPedido)
        {
            int Afectados = 0;
            //try
            //{
            long id = AceptarPedido.IdCompraInterno;
            if (id.Equals(0))
            {
                //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(0)).Count();

                int nveces = InvBD.CompraInterno.Count();
                //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.CompraInterno.InsertOnSubmit(AceptarPedido);
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

                //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
                //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(1)).Count();
                //if (nveces == 0)
                //{
                CompraInterno obj = InvBD.CompraInterno.Where(p => p.IdCompraInterno.Equals(id)).First();
                obj.NoPedido = AceptarPedido.NoPedido;
                obj.EstatusPedido = AceptarPedido.EstatusPedido;
                obj.Usuario = AceptarPedido.Usuario;
                //obj.NoCompraProveedor = AceptarPedido.NoCompraProveedor;
                InvBD.SubmitChanges();
                Afectados = 1;
                //}
                //else
                //{
                //    Afectados = -1;
                //}
            }

            return Afectados;
        }

        //----------------Guardar movimiento de  SupervisionTienda------------

        public int GuardarUsados(MovimientosTienda DatosUsados)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosUsados.IdMovimiento;
            if (id.Equals(0))
            {
                int nveces = InvBD.MovimientosTienda.Where(p => p.IdMovimiento.Equals(DatosUsados.IdMovimiento)).Count();

                //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces >= 0)
                {
                    InvBD.MovimientosTienda.InsertOnSubmit(DatosUsados);
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
                int nveces = InvBD.MovimientosTienda.Where(p => p.IdMovimiento.Equals(DatosUsados.IdMovimiento)
                && p.IdExistencia.Equals(DatosUsados.IdExistencia)
                && p.IdCompra.Equals(DatosUsados.IdCompra)
                 && p.IdArticulo.Equals(DatosUsados.IdArticulo)
                 && p.Movimiento.Equals(DatosUsados.Movimiento)
                 && p.Fecha.Equals(DatosUsados.Fecha)
                  && p.Cantidad.Equals(DatosUsados.Cantidad)
                 && p.Costo.Equals(DatosUsados.Costo)
                 && p.Fecha.Equals(DatosUsados.Fecha)
                 ).Count();
                if (nveces == 0)
                {
                    MovimientosTienda obj = InvBD.MovimientosTienda.Where(p => p.IdMovimiento.Equals(id)).First();
                    obj.IdExistencia = DatosUsados.IdExistencia;
                    obj.IdCompra = DatosUsados.IdCompra;
                    obj.IdArticulo = DatosUsados.IdArticulo;
                    obj.Movimiento = DatosUsados.Movimiento;
                    obj.Movimiento = DatosUsados.Movimiento;
                    obj.Cantidad = DatosUsados.Cantidad;
                    obj.Costo = DatosUsados.Costo;
                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
            //}
            //    catch (Exception ex)
            //    {
            //        Afectados = 0;
            //    }
            return Afectados;
        }



    }
}
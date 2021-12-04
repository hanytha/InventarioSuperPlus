using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventario.Models;

namespace Inventario.Controllers
{
    //Lamar al método de seguridad
    [Seguridad]
    public class DepartamentosController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Departamentos
        public ActionResult Departamentos()
        {
            return View();
        }
        public void ConsultaDepartamentos()
        {
            ModeloAreas ModeloAreas = new ModeloAreas();
            ModeloAreas.IdAreas = new List<long>();
            ModeloAreas.Nombre = new List<string>();
            ModeloAreas.IDUsuario = new List<long>();
            ModeloAreas.UNombre = new List<string>();
            ModeloAreas.Correo = new List<string>();
            ModeloAreas.Telefono = new List<long>();
            ModeloAreas.Carpeta = new List<string>();
            var departamentos = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdAreas,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            foreach(var area in departamentos)
            {
                ModeloAreas.IdAreas.Add(area.IdAreas);
                ModeloAreas.Nombre.Add(area.Nombre);
                ModeloAreas.UNombre.Add(area.UNombre);
                ModeloAreas.Correo.Add(area.Correo);
               ModeloAreas.Telefono.Add(area.Telefono);
                ModeloAreas.Carpeta.Add(area.Carpeta);
            }
        }

        public JsonResult ConsultaDepartamento(long Id)
        {
            var departamento = InvBD.Areas.Where(p => p.IdAreas.Equals(Id))
                .Select(p => new
                {
                    p.IdAreas,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(departamento, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarDepartamento(Areas DatosAreas)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosAreas.IdAreas;
            if (id.Equals(0))
            {
                int nveces = InvBD.Areas.Where(p => p.Nombre.Equals(DatosAreas.Nombre)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Areas.InsertOnSubmit(DatosAreas);
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
                int nveces = InvBD.Areas.Where(p => p.Nombre.Equals(DatosAreas.Nombre) && p.UNombre.Equals(DatosAreas.UNombre) && p.Correo.Equals(DatosAreas.Correo) && p.Telefono.Equals(DatosAreas.Telefono) && p.Carpeta.Equals(DatosAreas.Carpeta)).Count();
                if (nveces == 0)
                {
                    Areas obj = InvBD.Areas.Where(p => p.IdAreas.Equals(id)).First();
                    obj.Nombre = DatosAreas.Nombre;
                    obj.UNombre = DatosAreas.UNombre;
                    obj.Correo = DatosAreas.Correo;
                    obj.Telefono = DatosAreas.Telefono;
                    obj.Carpeta = DatosAreas.Carpeta;

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
        public int EliminarDepartamento(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Areas areas = InvBD.Areas.Where(p => p.IdAreas.Equals(Id)).First();
                areas.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
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
            Sucursales.IUSACodigo = new List<string>();
            Sucursales.IUSAUsuario = new List<string>();
            Sucursales.IUSAContraseña = new List<string>();
            Sucursales.PCPAYUsuario = new List<string>();
            Sucursales.PCPAYContraseña = new List<string>();
            Sucursales.NoServicioLuz = new List<string>();
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

        ///--------------Join Tabla---

        //public JsonResult BDArtExist()
        //{
        //    var datos = from Articulos in InvBD.Articulos
        //                join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
        //                on Articulos.IdArticulos equals ExistenciaAlmacenG.IdArticulo

        //                where Articulos.IdArticulos.Equals(Accesos.IDSitio)
        //                select new
        //                {
        //                    ID = Articulos.IdArticulos,
        //                    Nombre = Articulos.NombreEmpresa,
        //                    IdArticulos = Articulos.IdArticulos,
        //                    IdAsignacion = ExistenciaAlmacenG.IdAsignacion,
        //                    IdSitio = ExistenciaAlmacenG.IdSitio,
        //                    FechaDeIngreso = ExistenciaAlmacenG.FechaDeIngreso

        //                };
        //    return Json(datos, JsonRequestBehavior.AllowGet);
        //}

        //Obtener los articulos de las tiendas-------
        //BDSupervisionTiendas

        //----
        public JsonResult BDTiendaArt()
        {
            var datos = InvBD.ExistenciaAlmacenG.Where(p => p.IdSitio.Equals(Accesos.IDSitio))
                .Select(p => new
                {
                    ID = p.IdSitio,
                    Nombre = p.IdSitio
                  
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public void CargarArticulos()
        {
            ModeloExistAlm ModeloExistAlm = new ModeloExistAlm();
            ModeloExistAlm.IdExistenciaAlmacenG = new List<long>();
            ModeloExistAlm.NoPedido = new List<long>();
            ModeloExistAlm.FechaDeIngreso = new List<string>();
            ModeloExistAlm.ExitenciaInicial = new List<long>();
            ModeloExistAlm.FechaFinal = new List<string>();
            ModeloExistAlm.ExitenciaActual = new List<long>();
            ModeloExistAlm.Coste = new List<long>();
            ModeloExistAlm.TipoDeOperacion = new List<string>();
            ModeloExistAlm.NombreEmpresa = new List<string>();
            ModeloExistAlm.IdCompra = new List<long>();
            ModeloExistAlm.IdAsignacion = new List<long>();
            ModeloExistAlm.IdSitio = new List<long>();
            ModeloExistAlm.IdArticulo = new List<long>();
           

            var Existencia = InvBD.ExistenciaAlmacenG
            .Select(p => new
            {
                p.IdExistenciaAlmacenG,
                p.NoPedido,
                p.FechaDeIngreso,
                p.ExitenciaInicial,
                p.FechaFinal,
                p.ExitenciaActual,
                p.Coste,
                p.TipoDeOperacion,
                p.IdCompra,
                p.IdAsignacion,
                p.IdSitio,
                p.IdArticulo
            });
            foreach (var Ext in Existencia)
            {
                ModeloExistAlm.IdExistenciaAlmacenG.Add(Ext.IdExistenciaAlmacenG);
                ModeloExistAlm.NoPedido.Add(Ext.NoPedido);
                ModeloExistAlm.FechaDeIngreso.Add(Ext.FechaDeIngreso);
                ModeloExistAlm.ExitenciaInicial.Add(Ext.ExitenciaInicial);
                ModeloExistAlm.FechaFinal.Add(Ext.FechaFinal);
                ModeloExistAlm.ExitenciaActual.Add(Ext.ExitenciaActual);
                ModeloExistAlm.Coste.Add(Ext.Coste);
                ModeloExistAlm.TipoDeOperacion.Add(Ext.TipoDeOperacion);
                ModeloExistAlm.IdAsignacion.Add(Convert.ToInt32(Ext.IdAsignacion));
                ModeloExistAlm.IdArticulo.Add(Convert.ToInt32(Ext.IdArticulo));
                ModeloExistAlm.IdSitio.Add(Convert.ToInt32(Ext.IdSitio));
                ModeloExistAlm.IdCompra.Add(Convert.ToInt32(Ext.IdCompra));
                

            }
        }



    }
}
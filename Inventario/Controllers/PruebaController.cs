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
    public class PruebaController : Controller
    {
        //DCISPlusDataContext InvBD = new DCISPlusDataContext();
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Prueba
        public ActionResult Prueba()
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
                var consultaFecha = InvBD.Compra.Where(p => p.IdArticulo.Equals(art.Id) && p.ExitenciaActual > 0).OrderBy(p => p.IdCompra)
                    .Select(p => new
                    {
                        fechaIngreso = p.FechaDeIngreso,
                        stockActual = p.ExitenciaActual,
                        costo = p.Coste,
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
        ////-----------Consulta los datos por ID del artículo pero en la tabla de compras------------------
        //public JsonResult ConsultaCompra(long Id)
        //{
        //    var compra = InvBD.Compra.Where(p => p.IdArticulo.Equals(Id)).OrderByDescending(p => p.FechaDeIngreso)
        //        .Select(p => new
        //        {
        //            p.IdCompra,
        //            p.NoCompra,
        //            p.ClaveProveedor,
        //            p.Articulo,
        //            p.FechaDeIngreso,
        //            p.Coste,
        //            p.IdArticulo,

        //        });

        //    return Json(compra, JsonRequestBehavior.AllowGet);

        //}
        //---------------Consulta datos del artículo por ID de artíulo en la tabla de artículos-----------------
        public JsonResult ConsultaNumCompra(long No)
        {
            var compra = InvBD.Compra.Where(p => p.NoCompra.Equals(No)&& p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.NoCompra,
                    p.Articulo,
                    p.FechaDeIngreso,
                    p.MetodoDePago,
                    p.Coste,
                });

            return Json(compra, JsonRequestBehavior.AllowGet);
        }
        //-----------Consulta los datos por ID del artículo pero en la tabla de compras------------------
        public JsonResult ConsultaCompraJoinProveedor(long Id)
        {
            var compras = from comprs in InvBD.Compra
                         join provedor in InvBD.Proveedores
                         on comprs.IdProveedor equals provedor.IdProveedores
                         where comprs.IdArticulo.Equals(Id) && comprs.Estatus.Equals(1)
                         select new
                         {
                             IdCompra = comprs.IdCompra,
                             NoCompra = comprs.NoCompra,
                             Articulo = comprs.Articulo,
                             ClaveProveedor = provedor.Nombre,
                             FechaDeIngreso = comprs.FechaDeIngreso,
                             Coste = comprs.Coste,
                             IdArticulo = comprs.IdArticulo
                         };


            return Json(compras, JsonRequestBehavior.AllowGet);

        }
    }
}
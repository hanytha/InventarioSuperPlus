using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ArticuloVistaController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: ArticuloVista
        public ActionResult ArticuloVista()
        {
            return View();
        }
        public void ConsultaArticulos()
        {
            string id = "";
            string Nombre = "";
            string Fechas = "";
            String Stock = "";
            String Costos = "";


            var ConsultaArticulo = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    Id = p.IdArticulos,
                    nombre = p.NombreEmpresa
                });

            foreach (var art in ConsultaArticulo)
            {

                id += art.Id + ",";
                Nombre += art.nombre + ",";


                var consultaFecha = InvBD.Compra.Where(p => p.IdArticulo.Equals(art.Id) && p.ExitenciaActual > 0).OrderByDescending(p => p.FechaDeIngreso)
                    .Select(p => new
                    {
                        fechaIngreso = p.FechaDeIngreso,
                        stockActual = p.ExitenciaActual,
                        //costo = p.Coste

                    });



                foreach (var comp in consultaFecha)
                {
                    Fechas += comp.fechaIngreso + ",";
                    Stock += comp.stockActual + ",";
                    //Costos += comp.costo + ",";


                    var cosulFecha = InvBD.Compra.Where(p => p.IdArticulo.Equals(art.Id) && p.ExitenciaActual > 0).OrderBy(p => p.Coste)
                          .Select(p => new
                          {
                              costo = p.Coste
                          });
                    int UltimoReg = cosulFecha.Count() - 1;
                    int cont = 0;
                    int SumaStock = 0;


                    foreach (var stock in cosulFecha)
                    {
                        Costos = stock.costo + ",";

                        SumaStock = SumaStock + Stock.Length;

                        if (cont == UltimoReg)
                        {
                            Fechas += comp.fechaIngreso + ",";

                        }
                        cont++;
                    }
                }

            }

        }

    }
}
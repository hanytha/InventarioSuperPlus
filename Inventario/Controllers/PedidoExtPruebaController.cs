using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    [Seguridad]
    public class PedidoExtPruebaController : Controller
    {
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
   
        // GET: PedidoExtPrueba
        public ActionResult PedidoExtPrueba()
        {
            return View();
        }
        public void ConsultaDepartamentos()
        {
            ModeloPedidoExtPrueba ModeloPedidoExtPrueba = new ModeloPedidoExtPrueba();
            ModeloPedidoExtPrueba.IdAreas = new List<long>();
            ModeloPedidoExtPrueba.Nombre = new List<string>();
            ModeloPedidoExtPrueba.IDUsuario = new List<long>();
            ModeloPedidoExtPrueba.UNombre = new List<string>();
            ModeloPedidoExtPrueba.Correo = new List<string>();
            ModeloPedidoExtPrueba.Telefono = new List<long>();
            ModeloPedidoExtPrueba.Carpeta = new List<string>();
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
            foreach (var area in departamentos)
            {
                ModeloPedidoExtPrueba.IdAreas.Add(area.IdAreas);
                ModeloPedidoExtPrueba.Nombre.Add(area.Nombre);
                ModeloPedidoExtPrueba.UNombre.Add(area.UNombre);
                ModeloPedidoExtPrueba.Correo.Add(area.Correo);
                ModeloPedidoExtPrueba.Telefono.Add(area.Telefono);
                ModeloPedidoExtPrueba.Carpeta.Add(area.Carpeta);
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
    }
}
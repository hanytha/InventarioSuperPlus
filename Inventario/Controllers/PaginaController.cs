using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PaginaController : Controller
    {
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Pagina
        public ActionResult Pagina()
        {
            return View();
        }
        //
        //consulta general de los proveedores
        public JsonResult ConsultaPaginas()
        {
            var paginas = InvBD.Pagina.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPagina,
                    p.Mensaje,
                    p.Accion,
                    p.Controlador,
                    p.Icono,
                    p.Descripcion
                });
            return Json(paginas, JsonRequestBehavior.AllowGet);
        }

        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaPag(long Id)
        {
            var pagina = InvBD.Pagina.Where(p => p.IdPagina.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPagina,
                    p.Mensaje,
                    p.Accion,
                    p.Controlador,
                    p.Icono,
                    p.Descripcion
                });
            return Json(pagina, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarPagina(Pagina DatosPagina)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosPagina.IdPagina;
            if (id.Equals(0))
            {
                int nveces = InvBD.Pagina.Where(p => p.Descripcion.Equals(DatosPagina.Descripcion)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Pagina.InsertOnSubmit(DatosPagina);
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
                int nveces = InvBD.Pagina.Where(p => p.Mensaje.Equals(DatosPagina.Mensaje) &&
                p.Accion.Equals(DatosPagina.Accion) &&
                p.Controlador.Equals(DatosPagina.Controlador) && 
                p.Descripcion.Equals(DatosPagina.Descripcion) &&
                p.Icono.Equals(DatosPagina.Icono)).Count();
                if (nveces == 0)
                {
                    Pagina obj = InvBD.Pagina.Where(p => p.IdPagina.Equals(id)).First();
                    obj.Mensaje = DatosPagina.Mensaje;
                    obj.Accion = DatosPagina.Accion;
                    obj.Controlador = DatosPagina.Controlador;
                    obj.Descripcion = DatosPagina.Descripcion;
                    obj.Icono = DatosPagina.Icono;
                   
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
        //public int EliminarPagina(long Id)
        //{
        //    int nregistradosAfectados = 0;
        //    try
        //    {//Consulta los datos y el primer Id que encuentra  lo compara
        //        Pagina pagina = InvBD.Pagina.Where(p => p.IdPagina.Equals(Id)).First();
        //        pagina.Estatus = 0;//Cambia el estatus en 0
        //        InvBD.SubmitChanges();//Guarda los datos en la Base de datos
        //        nregistradosAfectados = 1;//Se pudo realizar
        //    }
        //    catch (Exception ex)
        //    {
        //        nregistradosAfectados = 0;
        //    }
        //    return nregistradosAfectados;
        //}


        public int EliminarPagina(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Pagina Pag = InvBD.Pagina.Where(p => p.IdPagina.Equals(Id)).First();
                Pag.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }



        public JsonResult BDPagina()
        {
            var datos = InvBD.Pagina.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdPagina,
                    Descripcion = p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}


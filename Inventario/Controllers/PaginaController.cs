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
                    p.Abreviatura,
                    p.Mensaje,
                    p.Accion,
                    p.Controlador,
                    p.Icono,
                    p.Descripcion,
                    p.Tipo,
                    p.Padre
                });
            return Json(paginas, JsonRequestBehavior.AllowGet);
        }

        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaPag(long Id)
        {
            var paginas = InvBD.Pagina.Where(p => p.IdPagina.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPagina,
                    p.Abreviatura,
                    p.Mensaje,
                    p.Accion,
                    p.Controlador,
                    p.Icono,
                    p.Descripcion,
                    p.Tipo,
                    p.Padre
                });
            return Json(paginas, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos del proveedor
        public int GuardarPagina(Pagina DatosPagina)
        {
            int Afectados = 0;
           try
            {
                long id = DatosPagina.IdPagina;
                if (id.Equals(0))
                {
                    //Guardar el proveedor cuando no exista uno con el mismo nombre en la base de datos
                    int nveces = InvBD.Pagina.Where(p => p.Mensaje.Equals(DatosPagina.Mensaje)).Count();
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
                    int nveces = InvBD.Pagina.Where(p => p.Mensaje.Equals(DatosPagina.Mensaje)
                    && p.Accion.Equals(DatosPagina.Accion)
                    && p.Abreviatura.Equals(DatosPagina.Abreviatura)
                    && p.Controlador.Equals(DatosPagina.Controlador)
                    && p.Descripcion.Equals(DatosPagina.Descripcion)
                    && p.Tipo.Equals(DatosPagina.Tipo)
                    && p.Padre.Equals(DatosPagina.Padre)
                    && p.Icono.Equals(DatosPagina.Icono)).Count();
                    if (nveces == 0)
                    {
                        Pagina obj = InvBD.Pagina.Where(p => p.IdPagina.Equals(id)).First(); 
                        obj.Abreviatura = DatosPagina.Abreviatura;
                        obj.Mensaje = DatosPagina.Mensaje;
                        obj.Accion = DatosPagina.Accion;
                        obj.Controlador = DatosPagina.Controlador;
                        obj.Descripcion = DatosPagina.Descripcion;
                        obj.Tipo = DatosPagina.Tipo;
                        obj.Padre = DatosPagina.Padre;
                        obj.Icono = DatosPagina.Icono;
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
        public int EliminarPagina(long IdPagina)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Pagina Pag = InvBD.Pagina.Where(p => p.IdPagina.Equals(IdPagina)).First();
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
    }
}


using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventario;

namespace Inventario.Controllers
{
    [Seguridad]
    public class IndexController : Controller
    {
        // GET: Index
        public ActionResult Index()
        {

            long nivel = Convert.ToInt32(Session["Nivel"]);
            String tiendas1 = Convert.ToString(Session["Tiendas"]);
            //var nom = System.Web.HttpContext.Current.Session["IDAsignacionUno"];
            long Asignaciones = Convert.ToInt32(Session["IDAsignacion"]);
            //Obtener las consultas del controlador de departamentos
            //DepartamentosController departamento = new DepartamentosController();
            //departamento.ConsultaDepartamentos();
            //Obtener las consultas del controlador de Supervisión
            //SupervisionController TiendaSupervision = new SupervisionController();
            ////Cargar las tiendas al iniciar sesión
            //TiendaSupervision.CargarSucursales();
            //PedidosInternos ModeloPedidoInt = new PedidosInternos();
            //Al entrar en el inicio se cargen los estados
            //CardinalController DPto = new CardinalController();
            GLOBALController cargarEstados = new GLOBALController();
            cargarEstados.BDEstados();

            SupervisionController ARTICULOS = new SupervisionController();
            ARTICULOS.ConsultaPedidosNumeroPedidoRa();
            //-------------------------------------------------
            DepartamentosController departamento = new DepartamentosController();
            departamento.ConsultaDepartamentos();
            //-------------------------------------------------
            SupervisionController Tiendas = new SupervisionController();
            Tiendas.CargarSucursalesXSupervision();
            //Cargar las tiendas cuando el usuario que inicia sesión es un supervisor(Visualizar solo las tiendas que son asignadas a ese supervisor)
            if (nivel == 1)
            {
                SupervisionController tiendas = new SupervisionController();
                tiendas.CargarTiendasAdm();
            }
            else if (Asignaciones == 3)
            {
                DepartamentosController areas = new DepartamentosController();
                areas.ConsultaDepartamentos();
            }
            //else if (Asignaciones == 1)
            //{
            //    //if (NomTienda != "")
            //    //{
            //        SupervisionController Super = new SupervisionController();
            //        Super.CargarSucursalesXSupervision();

            //    //}
            //}
            //else if (Asignaciones == 2)
            //{
            //    //if (NomTienda != "")
            //    //{

                
            //        SupervisionController Super = new SupervisionController();
            //        Super.CargarSucursalesXSupervision();

            //    //}
            //}

            return View();

        }
   
    }
}
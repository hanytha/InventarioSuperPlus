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
            //Obtener las consultas del controlador de departamentos
            DepartamentosController departamento = new DepartamentosController();
            departamento.ConsultaDepartamentos();
            //Obtener las consultas del controlador de Supervisión
            SupervisionController TiendaSupervision = new SupervisionController();
            //Cargar las tiendas al iniciar sesión
            TiendaSupervision.CargarSucursales();
            //PedidosInternos ModeloPedidoInt = new PedidosInternos();
            //Al entrar en el inicio se cargen los estados
            //CardinalController DPto = new CardinalController();
            GLOBALController cargarEstados = new GLOBALController();
            cargarEstados.BDEstados();
            //Cargar las tiendas cuando el usuario que inicia sesión es un supervisor(Visualizar solo las tiendas que son asignadas a ese supervisor)
            if (Accesos.IDAsignacion == 3) { }
            if (Accesos.IDAsignacion == 1)
            {
                //if (Accesos.Tiendas != "")
                //{
                SupervisionController Tienda = new SupervisionController();
                Tienda.CargarTiendaLider();
        
                //}
            }
            else if (Accesos.IDAsignacion == 2)
            {
                if (Accesos.Tiendas != "")
                {
                    SupervisionController Super = new SupervisionController();
                    Super.CargarSucursalesXSupervision();

                }
            }

            return View();

        }
    }
}
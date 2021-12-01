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

            DepartamentosController departamento = new DepartamentosController();
            departamento.ConsultaDepartamentos();
            departamento.CargarSucursales();

            //Al entrar en el inicio se cargen los estados
            //CardinalController DPto = new CardinalController();
            GLOBALController cargarEstados = new GLOBALController();
            cargarEstados.BDEstados();
            //DPto.Clases_Departamentos();
            if (Accesos.IDAsignacion == 1) { }
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
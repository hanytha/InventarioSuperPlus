using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventario;

namespace Inventario.Controllers
{
    public class IndexController : Controller
    {
        // GET: Index
        public ActionResult Index()
        {
            DepartamentosController departamento = new DepartamentosController();
            departamento.ConsultaDepartamentos();
            //Al entrar en el inicio se cargen los estados
            //CardinalController DPto = new CardinalController();
            GLOBALController cargarEstados = new GLOBALController();
            cargarEstados.BDEstados();
            //DPto.Clases_Departamentos();
            return View();

        }
    }
}
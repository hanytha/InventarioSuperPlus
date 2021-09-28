using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PaginaController : Controller
    {
        // GET: Pagina
        public ActionResult Pagina()
        {
            return View();
        }
    }
}
using System.Web;
using System.Web.Mvc;

namespace Inventario.Models
{
    public class Seguridad : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //Método de Seguridad para no permitir que se acceda a las vistas con la dirección
            var Usuario = HttpContext.Current.Session["Usuario"];
            if (Usuario == null)
            {
                //Mandar siempre al inicio de sesion aunque se ingrese la dirección
                filterContext.Result = new RedirectResult("~/Login/Login");
            }
            base.OnActionExecuting(filterContext);
        }
    }
}
using System.Web.Mvc;

namespace Bpm.Web.App.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
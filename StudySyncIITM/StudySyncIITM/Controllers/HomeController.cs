using Microsoft.AspNetCore.Mvc;

namespace StudySyncIITM.Controllers
{
    public class HomeController : Controller
    {
        [Route("/home")]
        public IActionResult Index()
        {
            return View();
        }
    }
}

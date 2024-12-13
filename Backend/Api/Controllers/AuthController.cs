using Api.Manager.Interface;
using Core.Common.Extensions;
using Library.Model.Command;
using Library.Model.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthManager _authManager;
        public AuthController(IAuthManager authManager)
        {
            _authManager=authManager;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginCommand loginModel)
        {
            var res = await _authManager.Login(loginModel).AsSuccess();
            return Ok(res);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand registerModel)
        {
           var res= await _authManager.Register(registerModel).AsCreated(); 
            return Ok(res);

        }
        [HttpPost("logout")]
        public async Task<IActionResult>  Logout()
        {              
            return Ok("Logged out successfully.");
        }

    }
}

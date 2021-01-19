using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using BookMyShowAPI.Models.CoreModels;
using BookMyShowAPI.Services.Auth;
using BookMyShowAPI.Models.ViewModels;

namespace BookMyShowAPI.Controllers
{

    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [Route("login")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<AuthDetails>> Login(User loginRequest)
        {
            var result = await this.authService.Login(loginRequest);
            if (result == null)
            {
                return BadRequest(new { message = "Email or password is incorrect" });
            }
            else
            {
                return Ok(result);
            }

        }

        [Route("register")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Register(User user)
        {
            try
            {
                var result = await this.authService.Register(user, "User");
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [Route("registeradmin")]
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> RegisterAdmin(User user)
        {
            try
            {
                var result = await this.authService.Register(user, "Admin");
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [Route("google")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> ValidateGoogleAuth(SocialLoginCredentials login)
        {
            var result = await this.authService.ValidateGoogleLogin(login);
            if (result == false)
            {
                return BadRequest();
            }
            else
            {
                var authDetails = await this.authService.GetTokenForSocialLogin(login);
                return Ok(authDetails);
            }
        }
    }
}

using System.Threading.Tasks;
using BookMyShowAPI.Models.CoreModels;
using Microsoft.AspNetCore.Identity;
using BookMyShowAPI.Models.ViewModels;

namespace BookMyShowAPI.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthDetails> Login(User user);

        Task<AuthDetails> Register(User user, string role);

        string GenerateToken(IdentityUser user, string role);

        Task<bool> InitRoles();

        Task<bool> ValidateGoogleLogin(SocialLoginCredentials login);

        Task<AuthDetails> GetTokenForSocialLogin(SocialLoginCredentials loginCredentials);
    }
}

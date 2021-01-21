using System.Threading.Tasks;
using BookMyShowAPI.Models.ViewModels;
using BookMyShowAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace BookMyShowAPI.Services
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

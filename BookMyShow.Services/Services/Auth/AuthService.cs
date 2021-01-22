using BookMyShowAPI.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookMyShowAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<IdentityUser> signInManager;

        private string AuthConfig { get; set; }

        public AuthService(IConfiguration configuration, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            var initRoles = this.InitRoles().Result;
            this.AuthConfig = configuration.GetSection("AuthSettings")["Secret"];
        }

        public string GenerateToken(IdentityUser user, string role)
        {
            var claims = new[]
{
                new Claim(ClaimTypes.Email , user.Email),
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.Role, role),
            };
            var algo = SecurityAlgorithms.HmacSha256;
            var secret = Encoding.UTF8.GetBytes(AuthConfig);

            SymmetricSecurityKey key = new SymmetricSecurityKey(secret);
            SigningCredentials signingCredentials = new SigningCredentials(key, algo);
            //the json token representation of the jwt token
            var token = new JwtSecurityToken(
                "issuer_name",
                "audience_name",
                claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(6),
                signingCredentials
                );
            var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenJson;
        }

        public async Task<AuthDetails> Login(User user)
        {
            var getUser = await this.userManager.FindByEmailAsync(user.Email);
            if (getUser == null)
            {
                return null;
            }

            var signinResult = await this.signInManager.PasswordSignInAsync(getUser, user.Password, false, false);
            if (!signinResult.Succeeded)
            {

                return null;
            }

            var role = await this.userManager.IsInRoleAsync(getUser, "Admin") ? "Admin" : "User";

            var tokenJson = this.GenerateToken(getUser, role);

            return new AuthDetails { AccessToken = tokenJson, UserId = getUser.Id, UserName = getUser.UserName, UserRole = role };
        }

        public async Task<AuthDetails> Register(User user, string role)
        {
            IdentityUser newUser = new IdentityUser
            {
                UserName = user.UserName,
                Email = user.Email
            };
            //Create the user
            var registerResult = await this.userManager.CreateAsync(newUser, user.Password);
            if (!registerResult.Succeeded)
            {
                throw new Exception(registerResult.Errors.Select(e => e.Description).Aggregate((a, b) => a + "\n" + b));
            }

            //Create the role
            var roleResult = await this.userManager.AddToRoleAsync(newUser, role);
            if (!roleResult.Succeeded)
            {
                throw new Exception(roleResult.Errors.Select(e => e.Description).Aggregate((a, b) => a + "\n" + b));
            }
            var tokenJson = this.GenerateToken(newUser, role);

            return new AuthDetails { AccessToken = tokenJson, UserId = newUser.Id, UserName = newUser.UserName, UserRole = role };

        }

        public async Task<bool> InitRoles()
        {
            if (await this.roleManager.RoleExistsAsync("User") == false)
            {
                IdentityRole userRole = new IdentityRole
                {
                    Name = "User"
                };
                await this.roleManager.CreateAsync(userRole);
            }

            if (await this.roleManager.RoleExistsAsync("Admin") == false)
            {
                IdentityRole userRole = new IdentityRole
                {
                    Name = "Admin"
                };
                await this.roleManager.CreateAsync(userRole);
            }

            return true;
        }

        public async Task<bool> ValidateGoogleLogin(SocialLoginCredentials login)
        {
            try
            {
                var result = await GoogleJsonWebSignature.ValidateAsync(login.IdToken);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public async Task<AuthDetails> GetTokenForSocialLogin(SocialLoginCredentials loginCredentials)
        {
            var user = await this.userManager.FindByEmailAsync(loginCredentials.Email);

            //user dosent exist, create new user in DB and the related token 
            if (user == null)
            {
                IdentityUser newUser = new IdentityUser
                {
                    UserName = loginCredentials.Name,
                    Email = loginCredentials.Email
                };

                var createUser = await this.userManager.CreateAsync(newUser);

                if (createUser.Succeeded)
                {
                    AuthDetails authDetails = new AuthDetails
                    {
                        AccessToken = this.GenerateToken(newUser, "User"),
                        UserId = newUser.Id,
                        UserRole = "User",
                        UserName = newUser.UserName
                    };

                    return authDetails;
                }
                else
                {
                    throw new Exception("User cannot be created");
                }
            }
            else
            {
                var role = await this.userManager.IsInRoleAsync(user, "Admin") ? "Admin" : "User";
                //User exists, create the token
                AuthDetails authDetails = new AuthDetails
                {
                    AccessToken = this.GenerateToken(user, role),
                    UserId = user.Id,
                    UserRole = role,
                    UserName = user.UserName

                };

                return authDetails;

            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BookMyShowAPI.Config
{

    public static class JwtAuthConfig
    {
       
        public static AuthenticationBuilder ConfigureJwt(this AuthenticationBuilder service, IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            var authSecret = serviceProvider.GetRequiredService<IOptions<AuthSecret>>().Value.Secret;
            var secretBytes = Encoding.UTF8.GetBytes(authSecret);
            SymmetricSecurityKey key = new SymmetricSecurityKey(secretBytes);

            return service.AddJwtBearer(configure =>
             {
                 configure.TokenValidationParameters = new TokenValidationParameters()
                 {
                     ValidateIssuer = false,
                     ValidateAudience = false,
                     IssuerSigningKey = key
                 };
                 configure.Events = new JwtBearerEvents()
                 {
                     OnAuthenticationFailed = context =>
                     {
                         Console.WriteLine(context.Exception);
                         return Task.CompletedTask;
                     }
                 };
             });
        }
    }
}

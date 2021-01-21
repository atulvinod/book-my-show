using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BookMyShowAPI.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using BookMyShowAPI.Config;
using SimpleInjector;
using BookMyShowAPI.Services;
using Microsoft.AspNetCore.Identity;

namespace BookMyShowAPI
{
    public class Startup
    {
        private readonly Container injectorContainer = new Container();
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                    });
            });

            services.AddControllers();

            services.Configure<AuthSecret>(Configuration.GetSection("AuthSettings"));

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("BookMyShowDB"));
            });

            services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                //email should be unique
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            }).AddEntityFrameworkStores<AppDbContext>();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).ConfigureJwt(services);
            //.AddGoogle(options=>
            //{
            //    options.ClientId = "578676376086-grfj331sbobl9v0mvs6jlj7o0vvkadiu.apps.googleusercontent.com";
            //    options.ClientSecret = "X3VcGuBxgnWrOvtZgjBCPicQ"
            //});

            //   services.AddScoped<IAuthService, AuthService>();

            services.AddSimpleInjector(this.injectorContainer, options =>
            {
                options.AddAspNetCore().AddControllerActivation();
            });

            this.InitializeContainer();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSimpleInjector(this.injectorContainer);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            this.injectorContainer.Verify();

        }

        private void InitializeContainer()
        {
            this.injectorContainer.Register<IShowService, ShowService>(Lifestyle.Scoped);

            this.injectorContainer.Register<IVenueService, VenueService>(Lifestyle.Scoped);

            this.injectorContainer.Register<IReservationsService, ReservationService>(Lifestyle.Scoped);

            this.injectorContainer.Register<IAuthService, AuthService>(Lifestyle.Scoped);
        }

    }
}

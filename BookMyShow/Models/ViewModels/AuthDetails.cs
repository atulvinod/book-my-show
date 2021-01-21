using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models.ViewModels
{
    public class AuthDetails
    {
        public string AccessToken { get; set; }

        public string UserId { get; set; }

        public string UserName { get; set; }

        public string UserRole { get; set; }
    }
}

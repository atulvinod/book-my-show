using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models
{
    public class SocialLoginCredentials
    {
        public string AuthToken { get; set; }

        public string IdToken { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }
    }
}

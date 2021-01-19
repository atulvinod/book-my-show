using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models.CoreModels
{
    public class Show
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Duration { get; set; }

        public string PosterImgPath { get; set; }

        public string Genre { get; set; }

        public string Description { get; set; }
    }
}

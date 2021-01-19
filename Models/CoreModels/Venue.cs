using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models.CoreModels
{
    public class Venue
    {
        public int Id { get; set; }

        public string ShowDateTime { get; set; }

        public string Address { get; set; }

        public string TotalSeatCount { get; set; }

        public string AvailableSeatCount { get; set; }

        public string ShowId { get; set; }

        public string ShowPrice { get; set; }
    }
}

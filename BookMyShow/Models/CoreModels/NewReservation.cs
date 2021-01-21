using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models.CoreModels
{
    public class NewReservation
    {
        public string VenueId { get; set; }

        public string UserId { get; set; }

        public ICollection<int> SeatNumbers { get; set; }
    }
}

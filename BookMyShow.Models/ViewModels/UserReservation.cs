using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models.ViewModels
{
    public class UserReservation
    {
        public IEnumerable<Reservation> Reservations { get; set; }

        public int VenueId { get; set; }

        public int ShowId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models
{
    public class Reservation
    {
        public string VenueId { get; set; }

        public string UserId { get; set; }

        public string SeatNumber { get; set; }

        public string Id { get; set; }

        public bool ReservationCancelled { get; set; }
    }
}

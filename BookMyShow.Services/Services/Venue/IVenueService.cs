﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookMyShowAPI.Models;

namespace BookMyShowAPI.Services
{
    public interface IVenueService
    {
        void CreateVenue(Venue venueDetails);

        int DeleteVenue(Venue showVenueId);

        int UpdateVenue(Venue showVenue);

        Venue GetVenue(int showVenueId);

        IEnumerable<Venue> GetVenuesForShow(int showId);

    }
}

﻿using BookMyShowAPI.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyShowAPI.Models.ViewModels
{
    /// <summary>
    /// Used to capture joined data as part service's logic
    /// </summary>
    public class ShowAndVenue
    {
        public Show Show { get; set; }

        public Venue Venue { get; set; }
    }
}

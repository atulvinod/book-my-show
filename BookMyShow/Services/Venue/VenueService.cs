using BookMyShowAPI.Models.CoreModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using BookMyShowAPI.AutomapperProfiles;

namespace BookMyShowAPI.Services.VenueService
{

    public class VenueService : IVenueService
    {
        private readonly PetaPoco.Database database;

        public VenueService(IConfiguration configuration)
        {
            this.database = new PetaPoco.Database(configuration.GetConnectionString("BookMyShowDB"), "System.Data.SqlClient");
        }

        public void CreateVenue(Venue venueDetails)
        {
            try
            {
                var venueDataModel = venueDetails.CreateVenueDataModel();
                venueDataModel.AvailableSeatCount = venueDataModel.TotalSeatCount;
                this.database.Insert(venueDataModel);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        public int DeleteVenue(Venue venue)
        {
            return this.database.Delete(venue);
        }

        public Venue GetVenue(int venueId)
        {
            var query = this.database.Query<Models.DataModels.Venue>("SELECT * FROM Venue WHERE Id = @0", venueId).Select(s => s.CreateVenueCoreModel());
            return query.FirstOrDefault();
        }

        public IEnumerable<Venue> GetVenuesForShow(int showId)
        {
            var query = this.database.Query<Models.DataModels.Venue>("SELECT * FROM Venue WHERE ShowId = @0", showId).Select(s => s.CreateVenueCoreModel()); ;
            return query;
        }

        public int UpdateVenue(Venue showVenue)
        {
            var venueDataModel = showVenue.CreateVenueDataModel();
            return this.database.Update(venueDataModel);
        }

    }
}

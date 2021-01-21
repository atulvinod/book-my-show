using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using BookMyShowAPI.Models;
using BookMyShowAPI.MapExtensions;

namespace BookMyShowAPI.Services
{
    public class ShowService : IShowService
    {

        private readonly PetaPoco.Database database;

        public ShowService(IConfiguration configuration)
        {
            this.database = new PetaPoco.Database(configuration.GetConnectionString("BookMyShowDB"), "System.Data.SqlClient");
       
        }

        public int CreateShow(Show show)
        {
            try
            {
                //var newShow = this.mapper.Map<Models.DataModels.Show>(show);
                var newShow = show.CreateShowDataModel();
                var newShowId = this.database.Insert(newShow);
                return (int)newShowId;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        public int DeleteShow(Show show)
        {
            //var showDataModel = this.mapper.Map<Models.DataModels.Show>(show);
            var showDataModel = show.CreateShowDataModel();
            return this.database.Delete(showDataModel);
        }

        public List<Show> GetAllShows()
        {
            //Fetches the shows which have a venue whose time and date is greater than the current date time
            return this.database.Query<Services.Models.Show>("SELECT * FROM Show s WHERE EXISTS( SELECT * FROM Venue v WHERE s.Id = v.ShowId AND v.ShowDateTime > GETDATE()) ORDER BY s.Id DESC").Select(s => {return s.CreateShowCoreModel(); }).ToList();
        }

        public Show GetShow(int showId)
        {
            var query = this.database.Query< Services.Models.Show>("SELECT * FROM Show WHERE Id = @0", showId).Select(s => s.CreateShowCoreModel()); ; 
            return query.FirstOrDefault<Show>();
        }

        public int UpdateShow(Show updatedShow)
        {
            //var showDataModel = this.mapper.Map<Models.DataModels.Show>(updatedShow);
            var showDataModel = updatedShow.CreateShowDataModel();
            return this.database.Update(showDataModel);
        }
    }
}

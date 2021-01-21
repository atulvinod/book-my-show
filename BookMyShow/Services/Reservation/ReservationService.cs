using BookMyShowAPI.Models.CoreModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using BookMyShowAPI.Models.ViewModels;
using BookMyShowAPI.Services.VenueService;
using BookMyShowAPI.AutomapperProfiles;

namespace BookMyShowAPI.Services.ReservationService
{
    public class ReservationService : IReservationsService
    {
        private readonly  PetaPoco.Database database;
        private readonly IVenueService venuesService;
     
        public ReservationService(IConfiguration configuration, IVenueService venuesService)
        {
            this.database = new PetaPoco.Database(configuration.GetConnectionString("BookMyShowDB"), "System.Data.SqlClient");
            this.venuesService = venuesService;
        }

        public void CreateReservation(NewReservation reservation)
        {

            var venueDataModel = this.venuesService.GetVenue(int.Parse(reservation.VenueId)).CreateVenueDataModel();

            if (venueDataModel.AvailableSeatCount < reservation.SeatNumbers.Count)
            {
                throw new Exception("Not enough seats");
            }

            foreach (var seat in reservation.SeatNumbers)
            {
                var newReservation = new Models.DataModels.Reservation
                {
                    SeatNumber = seat,
                    UserId = reservation.UserId,
                    VenueId = int.Parse(reservation.VenueId)
                };
                this.database.Insert(newReservation);
            }

            venueDataModel.AvailableSeatCount -= reservation.SeatNumbers.Count;
            this.database.Update(venueDataModel);
        }

        public int DeleteReservation(Reservation reservation)
        {
            var dataModel = reservation.CreateReservationDataModel();
            return this.database.Delete(dataModel);
        }

        public IEnumerable<Reservation> GetAllReservations()
        {
            return this.database.Query<Models.DataModels.Reservation>("SELECT * FROM Reservation").Select(s => { return s.CreateReservationCoreModel(); });
        }

        public IEnumerable<UserReservation> GetUserReservations(string userId)
        {
            var reservationAndVenueJoinSql = PetaPoco.Sql.Builder.Append("SELECT Reservation.* ,Venue.*")
                 .Append("FROM Reservation").Append(
                 "INNER JOIN Venue ON Reservation.VenueId = Venue.Id")
                 .Append("WHERE Reservation.UserId = @0;", userId);

            var reservationAndVenue = this.database.Query<Models.DataModels.Reservation, Models.DataModels.Venue, ReservationAndVenue>((a, u) => { return new ReservationAndVenue { Reservation = a, Venue = u }; }, reservationAndVenueJoinSql);

            var showAndVenueJoinSql = PetaPoco.Sql.Builder.Append("SELECT Show.*,Venue.* FROM Show INNER JOIN Venue ON Show.Id = Venue.ShowId");

            var showAndVenueJoin = this.database.Query<Models.DataModels.Show, Models.DataModels.Venue, Models.ViewModels.ShowAndVenue>((a, u) => { return new Models.ViewModels.ShowAndVenue { Show = a, Venue = u }; }, showAndVenueJoinSql);

            //format the join result 
            var venueAndReservationList = (from p in reservationAndVenue group p.Reservation by p.Venue.Id into g select new { venueDetails = g.Key, reservation = g.ToList() }).ToList();

            List<UserReservation> finalResult = new List<UserReservation>();

            foreach (var i in venueAndReservationList)
            {
                finalResult.Add(new UserReservation
                {
                    ShowId = showAndVenueJoin.Where(e => { return e.Show.Id == e.Venue.ShowId && e.Venue.Id == i.venueDetails; }).Select(n => n.Show.Id).First(),
                    VenueId = i.venueDetails,
                    Reservations = i.reservation
                });
            }

            return finalResult;
        }

        public void UpdateReservation(Reservation reservation)
        {
            //var dataModel = this.mapper.Map<Models.DataModels.Reservation>(reservation);
            var dataModel = reservation.CreateReservationDataModel();
            this.database.Update(dataModel);
        }

        public Reservation GetReservation(string reservationId)
        {
            return this.database.Query<Models.DataModels.Reservation>("SELECT * FROM Reservation WHERE Id = @0", reservationId).Select(s => { return s.CreateReservationCoreModel(); }).FirstOrDefault();
        }

        public List<Reservation> GetReservationsForVenue(int venueId)
        {
            return this.database.Query<Models.DataModels.Reservation>("SELECT * FROM Reservation WHERE VenueId =@0", venueId).Select(s => { return s.CreateReservationCoreModel(); }).ToList();

        }

        public void CancelReservation(Reservation reservation)
        {
            var getReservation = this.database.Query<Models.DataModels.Reservation>("SELECT * FROM Reservation WHERE Id = @0", reservation.Id).FirstOrDefault();
            if (getReservation != null)
            {
                getReservation.ReservationCancelled = true;
                this.database.Update(getReservation);

                //Increase the available seat count in the Venue
                var updateVenueSql = PetaPoco.Sql.Builder.Append("UPDATE Venue SET AvailableSeatCount = AvailableSeatCount+1 WHERE Id = @0", getReservation.VenueId);
                this.database.Execute(updateVenueSql);
            }
            else
            {
                throw new Exception("No Reservation found");
            }
        }

        public List<string> GetReservedSeatsForVenue(int venueId)
        {
            return this.GetReservationsForVenue(venueId).Where(n => n.ReservationCancelled == false).Select<Reservation, string>(s => s.SeatNumber).ToList();
        }
    }
}

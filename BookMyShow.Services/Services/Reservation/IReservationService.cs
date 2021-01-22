using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookMyShowAPI.Models;
using BookMyShowAPI.Models.ViewModels;

namespace BookMyShowAPI.Services
{
    public interface IReservationsService
    {
        IEnumerable<UserReservation> GetUserReservations(string userId);

        IEnumerable<Reservation> GetAllReservations();

        void CreateReservation(NewReservation reservation);

        int DeleteReservation(Reservation reservationID);

        void UpdateReservation(Reservation reservation);

        Reservation GetReservation(string reservationId);

        List<Reservation> GetReservationsForVenue(int venueId);

        List<string> GetReservedSeatsForVenue(int venueId);

        void CancelReservation(Reservation reservation);
    }
}

using BookMyShowAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using BookMyShowAPI.Models.ViewModels;
using BookMyShowAPI.Models;

namespace BookMyShowAPI.Controllers
{
    [Route("reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationsService reservationsService;

        public ReservationsController(IReservationsService reservationService)
        {
            this.reservationsService = reservationService;
        }

        [HttpPost]
        [Authorize(Roles = "User, Admin")]
        public ActionResult<IEnumerable<UserReservation>> GetUserReservations(User user)
        {
            return this.reservationsService.GetUserReservations(user.Id).ToList();
        }

        [HttpPost]
        [Authorize(Roles = "User, Admin")]
        [Route("reserve")]
        public ActionResult CreateReservation(NewReservation reservation)
        {
            try
            {
                this.reservationsService.CreateReservation(reservation);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet]
        [Route("all")]
        [Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<Reservation>> GetAllReservations()
        {
            return this.reservationsService.GetAllReservations().ToList();
        }

        [HttpPost]
        [Route("cancel")]
        [Authorize(Roles = "Admin, User")]
        public ActionResult CancelReservation(Reservation reservation)
        {
            try
            {
                this.reservationsService.CancelReservation(reservation);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound(new { message = "No reservation found" });
            }
        }

        [HttpGet]
        [Route("reservedseats")]
        [Authorize(Roles = "Admin, User")]
        public ActionResult<List<string>> GetReservedSeats([FromQuery] int venueId)
        {
            return this.reservationsService.GetReservedSeatsForVenue(venueId);
        }
    }
}

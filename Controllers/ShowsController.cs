using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using BookMyShowAPI.Services.ShowService;
using BookMyShowAPI.Services.VenueService;
using BookMyShowAPI.Models.CoreModels;

namespace BookMyShowAPI.Controllers
{
    [Route("shows")]
    [ApiController]
    public class ShowsController : ControllerBase
    {
        private readonly IShowService showService;
        private readonly IVenueService venueService;

        public ShowsController(IShowService showsService, IVenueService venuesService)
        {
            this.showService = showsService;
            this.venueService = venuesService;
        }

        [HttpPost]
        [Route("createshow")]
        [Authorize(Roles = "Admin")]
        public ActionResult<Show> CreateShow(Show show)
        {
            try
            {
                var showId = this.showService.CreateShow(show);
                return Ok(showId);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

        }

        [Route("getallshows")]
        [HttpGet]
        public ActionResult<IEnumerable<Show>> GetAllShows()
        {
            return this.showService.GetAllShows();
        }

        [HttpPost]
        [Route("createvenue")]
        [Authorize(Roles = "Admin")]
        public ActionResult CreateVenue(Venue venue)
        {
            try
            {
                this.venueService.CreateVenue(venue);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

        }

        [HttpGet]
        [Route("getshow")]
        public ActionResult<Show> GetShow([FromQuery] int showId)
        {
            var show = this.showService.GetShow(showId);
            if (show == null)
            {
                return NotFound(new { message = "No show exists with the provided ID" });
            }
            else
            {
                return Ok(show);
            }
        }

        [HttpGet]
        [Route("getvenue")]
        public ActionResult<Venue> GetVenue([FromQuery] int venueId)
        {
            var venue = this.venueService.GetVenue(venueId);
            if (venue == null)
            {
                return NotFound(new { message = "No venue exists with the provided ID" });
            }
            else
            {
                return Ok(venue);
            }
        }

        [HttpGet]
        [Route("venuesforshow")]
        public ActionResult<Venue> GetVenuesForShow([FromQuery] int showId)
        {
            var result = this.venueService.GetVenuesForShow(showId);
            return Ok(result);
        }
    }
}

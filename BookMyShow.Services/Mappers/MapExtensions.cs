using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;


namespace BookMyShowAPI.MapExtensions
{
    public static class MapExtensions
    {
        public static Services.Models.Venue CreateVenueDataModel(this Models.Venue venue)
        {
            var config = new MapperConfiguration(
                (cfg) =>
                {
                    cfg.CreateMap<Models.Venue, Services.Models.Venue>()
                   .ForMember(src => src.ShowDateTime, opt => opt.MapFrom(src => DateTime.Parse(src.ShowDateTime)))
                   .ForMember(src => src.ShowId, opt => opt.MapFrom(src => int.Parse(src.ShowId)))
                   .ForMember(src => src.ShowPrice, opt => opt.MapFrom(src => Decimal.Parse(src.ShowPrice)));
                }
                );

            return config.CreateMapper().Map<Services.Models.Venue>(venue);
        }

        public static Models.Venue CreateVenueCoreModel(this Services.Models.Venue venue)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Services.Models.Venue, Models.Venue>());
            return config.CreateMapper().Map<Models.Venue>(venue);
        }

        public static Models.Reservation CreateReservationCoreModel(this Services.Models.Reservation reservation)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Services.Models.Reservation, Models.Reservation>());
            return config.CreateMapper().Map<Models.Reservation>(reservation);
        }

        public static Services.Models.Reservation CreateReservationDataModel(this Models.Reservation reservation)
        {
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Models.Reservation, Services.Models.Reservation>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => int.Parse(src.Id)))
                    .ForMember(dest => dest.VenueId, opt => opt.MapFrom(src => int.Parse(src.VenueId)))
                    .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                    .ForMember(dest => dest.SeatNumber, opt => opt.MapFrom(src => src.SeatNumber));

                });

            return config.CreateMapper().Map<Services.Models.Reservation>(reservation);
        }

        public static Services.Models.Show CreateShowDataModel(this Models.Show show)
        {
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Models.Show,Services.Models.Show>()
                    .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => TimeSpan.Parse(src.Duration.ToString())));

                });

            return config.CreateMapper().Map<Services.Models.Show>(show);
        }

        public static Models.Show CreateShowCoreModel(this Services.Models.Show show)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Services.Models.Show, Models.Show>());
            return config.CreateMapper().Map<Models.Show>(show);
        }
    }
}

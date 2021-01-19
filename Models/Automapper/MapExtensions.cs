using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;


namespace BookMyShowAPI.AutomapperProfiles
{
    public static class MapExtensions
    {
        public static Models.DataModels.Venue CreateVenueDataModel(this Models.CoreModels.Venue venue)
        {
            var config = new MapperConfiguration(
                (cfg) =>
                {
                    cfg.CreateMap<Models.CoreModels.Venue, Models.DataModels.Venue>()
                   .ForMember(src => src.ShowDateTime, opt => opt.MapFrom(src => DateTime.Parse(src.ShowDateTime)))
                   .ForMember(src => src.ShowId, opt => opt.MapFrom(src => int.Parse(src.ShowId)))
                   .ForMember(src => src.ShowPrice, opt => opt.MapFrom(src => Decimal.Parse(src.ShowPrice)));
                }
                );

            return config.CreateMapper().Map<Models.DataModels.Venue>(venue);
        }

        public static Models.CoreModels.Venue CreateVenueCoreModel(this Models.DataModels.Venue venue)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Models.DataModels.Venue, Models.CoreModels.Venue>());
            return config.CreateMapper().Map<Models.CoreModels.Venue>(venue);
        }

        public static Models.CoreModels.Reservation CreateReservationCoreModel(this Models.DataModels.Reservation reservation)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Models.DataModels.Reservation, Models.CoreModels.Reservation>());
            return config.CreateMapper().Map<Models.CoreModels.Reservation>(reservation);
        }

        public static Models.DataModels.Reservation CreateReservationDataModel(this Models.CoreModels.Reservation reservation)
        {
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Models.CoreModels.Reservation, Models.DataModels.Reservation>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => int.Parse(src.Id)))
                    .ForMember(dest => dest.VenueId, opt => opt.MapFrom(src => int.Parse(src.VenueId)))
                    .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                    .ForMember(dest => dest.SeatNumber, opt => opt.MapFrom(src => src.SeatNumber));

                });

            return config.CreateMapper().Map<Models.DataModels.Reservation>(reservation);
        }

        public static Models.DataModels.Show CreateShowDataModel(this Models.CoreModels.Show show)
        {
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Models.CoreModels.Show,Models.DataModels.Show>()
                    .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => TimeSpan.Parse(src.Duration.ToString())));

                });

            return config.CreateMapper().Map<Models.DataModels.Show>(show);
        }

        public static Models.CoreModels.Show CreateShowCoreModel(this Models.DataModels.Show show)
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<Models.DataModels.Show, Models.CoreModels.Show>());
            return config.CreateMapper().Map<Models.CoreModels.Show>(show);
        }
    }
}

using PetaPoco;

namespace BookMyShowAPI.Models.DataModels

{
    [TableName("Reservation")]
    [PrimaryKey("Id")]
    public class Reservation
    {
        [Column]
        public int Id { get; set; }

        [Column]
        public int VenueId { get; set; }

        [Column]
        public string UserId { get; set; }

        [Column]
        public int SeatNumber { get; set; }

        [Column]
        public bool ReservationCancelled { get; set; }
    }
}

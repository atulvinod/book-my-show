using PetaPoco;
using System;

namespace BookMyShowAPI.Models.DataModels
{
    [TableName("Venue")]
    [PrimaryKey("Id")]
    public class Venue
    {
        [Column]
        public int Id { get; set; }

        [Column]
        public DateTime ShowDateTime { get; set; }

        [Column]
        public string Address { get; set; }

        [Column]
        public int TotalSeatCount { get; set; }

        [Column]
        public int AvailableSeatCount { get; set; }

        [Column]
        public int ShowId { get; set; }

        [Column]
        public decimal ShowPrice { get; set; }

    }
}

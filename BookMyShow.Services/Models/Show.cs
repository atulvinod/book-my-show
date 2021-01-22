using System;
using PetaPoco;

namespace BookMyShowAPI.Services.Models
{
    [TableName("Show")]
    [PrimaryKey("Id")]
    public class Show
    {
        [Column]
        public int Id { get; set; }

        [Column]
        public string Name { get; set; }

        [Column]
        public TimeSpan Duration { get; set; }

        [Column]
        public string PosterImgPath { get; set; }

        [Column]
        public string Genre { get; set; }

        [Column]
        public string Description { get; set; }

    }
}

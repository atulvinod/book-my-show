using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookMyShowAPI.Models.CoreModels;

namespace BookMyShowAPI.Services.ShowService
{
    public interface IShowService
    {
        List<Show> GetAllShows();

        int CreateShow(Show newShow);

        int UpdateShow(Show updatedShow);

        Show GetShow(int showId);

        int DeleteShow(Show show);

    }
}

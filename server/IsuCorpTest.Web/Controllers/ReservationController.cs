using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IsuCorpTest.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IsuCorpTest.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : CustomControllerBase
    {
        public ReservationController(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        [HttpGet]
        public async Task<ReservationListItem[]> Get()
        {
            var reservations = await UnitOfWork.Reservation.ListAll();
            return reservations
                .Select(r => new ReservationListItem(
                    r.Id,
                    r.Contact.Name,
                    r.DateTime,
                    r.Ranking ?? 0,
                    r.Favorite
                ))
                .ToArray();
        }
    }

    public record ReservationListItem(int Id, string ContactName, DateTime ReservationDate, int Ranking, bool Favorite);
}

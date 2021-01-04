using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IsuCorpTest.Core;
using IsuCorpTest.Core.Util;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IsuCorpTest.Web.Controllers
{
    public abstract class CustomControllerBase : ControllerBase
    {
        protected const int DefaultPageSize = 10;

        protected IUnitOfWork UnitOfWork { get; }

        public CustomControllerBase(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }
    }

    [ApiController]
    [Route("[controller]")]
    public class ReservationController : CustomControllerBase
    {
        public ReservationController(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        [HttpGet]
        public async Task<PagedResult<ReservationListItem>> Get(int page = 1)
        {
            var pagedResult = await UnitOfWork.Reservation.ListWithContacts(DefaultPageSize, page);

            return pagedResult.Convert(r => new ReservationListItem(
                r.Id,
                r.Contact.Name,
                r.DateTime,
                r.Ranking ?? 0,
                r.Favorite
            ));
        }
    }

    public record ReservationListItem(int Id, string ContactName, DateTime ReservationDate, int Ranking, bool Favorite);
}

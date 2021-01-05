using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IsuCorpTest.Core;
using IsuCorpTest.Core.Entity;
using IsuCorpTest.Core.Enums;
using IsuCorpTest.Core.Models;
using IsuCorpTest.Core.Services;
using IsuCorpTest.Core.Util;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IsuCorpTest.Web.Controllers
{
    public abstract class CustomControllerBase : ControllerBase
    {
        protected const int DefaultPageSize = 10;

        protected (T Column, SortingDirection Direction) ParseSorting<T>(string sorting)
            where T : struct, Enum
        {
            var s = sorting.Split("-");

            if (s.Length == 2)
            {
                (T Column, SortingDirection Direction) result;

                if (Enum.TryParse<T>(s[0], true, out result.Column) && Enum.TryParse<SortingDirection>(s[1], true, out result.Direction))
                {
                    return result;
                }
            }

            return (default(T), SortingDirection.Asc);
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class ReservationController : CustomControllerBase
    {
        private ReservationService ReservationService { get; init; }

        public ReservationController(ReservationService reservationService)
        {
            ReservationService = reservationService;
        }

        [HttpGet]
        [Route("{id}")]
        public Task<Reservation> GetById(int id) => ReservationService.GetReservation(id);

        [HttpGet]
        public Task<PagedResult<ReservationListItem>> Get(int page = 1, string sorting = "date-asc") {
            var sortingData = ParseSorting<ReservationSortingColumn>(sorting);
            return ReservationService.ListReservations(DefaultPageSize, page, sortingData.Column, sortingData.Direction);
        }

        [HttpPost]
        public Task<Reservation> Post(Reservation reservation) => ReservationService.CreateOrUpdateReservationAndContact(reservation);

        [HttpPost]
        [Route("{id}/ToggleFavorite/{flag}")]
        public Task PostToggleFavorite(int id, bool flag) => ReservationService.ToggleFavorite(id, flag);
    }


    [ApiController]
    [Route("[controller]")]
    public class ContactTypeController : CustomControllerBase
    {
        private ContactService ContactService { get; init; }

        public ContactTypeController(ContactService contactService)
        {
            ContactService = contactService;
        }

        [HttpGet]
        public Task<ContactType[]> Get() => ContactService.ListContactTypes();
    }
}

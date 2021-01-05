using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IsuCorpTest.Core;
using IsuCorpTest.Core.Entity;
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
        public Task<PagedResult<ReservationListItem>> Get(int page = 1) => ReservationService.ListReservations(DefaultPageSize, page);

        [HttpPost]
        public Task<Reservation> Post(Reservation reservation) => ReservationService.CreateOrUpdateReservationAndContact(reservation);
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

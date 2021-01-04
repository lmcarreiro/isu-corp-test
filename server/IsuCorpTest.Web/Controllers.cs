using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IsuCorpTest.Core;
using IsuCorpTest.Core.Entity;
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
            return pagedResult.Convert(r => ReservationListItem.FromEntity(r));
        }

        [HttpPost]
        public async Task<Reservation> Post(Reservation input)
        {
            var contact = input.Contact.Id.HasValue
                ? await UnitOfWork.Contact.GetById(input.Contact.Id.Value)
                : UnitOfWork.Contact.CreateInstance();

            var reservation = UnitOfWork.Reservation.CreateInstance();

            contact.Name = input.Contact.Name;
            contact.Type = await UnitOfWork.ContactType.GetById(input.Contact.TypeId);
            contact.Phone = input.Contact.Phone;
            contact.BirthDate = input.Contact.BirthDate;

            reservation.Description = input.Description;
            reservation.Contact = contact;

            await UnitOfWork.Reservation.Insert(reservation);
            await UnitOfWork.Save();

            return Reservation.FromEntity(reservation);
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class ContactTypeController : CustomControllerBase
    {
        public ContactTypeController(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        [HttpGet]
        public async Task<ContactType[]> Get(int page = 1)
        {
            var list = await UnitOfWork.ContactType.ListAll();
            return list.Select(t => ContactType.FromEntity(t)).ToArray();
        }
    }

    public record Reservation(
        int? Id
        , string Description
        , Contact Contact
    )
    {
        public static Reservation FromEntity(IReservation reservation) =>
            new Reservation(reservation.Id, reservation.Description, Contact.FromEntity(reservation.Contact));
    }

    public record Contact(
        int? Id
        , string Name
        , int TypeId
        , string Phone
        , DateTime BirthDate
    )
    {
        public static Contact FromEntity(IContact contact) =>
            new Contact(contact.Id, contact.Name, contact.Type.Id, contact.Phone, contact.BirthDate);
    }

    public record ReservationListItem(
        int Id
        , string ContactName
        , DateTime ReservationDate
        , int Ranking
        , bool Favorite
    )
    {
        public static ReservationListItem FromEntity(IReservation reservation) => new ReservationListItem(
            reservation.Id,
            reservation.Contact.Name,
            reservation.DateTime,
            reservation.Ranking ?? 0,
            reservation.Favorite
        );
    }

    public record ContactType(
        int Id
        , string Name
    )
    {
        public static ContactType FromEntity(IContactType contactType) => new ContactType(contactType.Id, contactType.Name);
    }
}

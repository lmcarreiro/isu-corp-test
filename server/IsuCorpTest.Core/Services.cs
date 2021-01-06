using IsuCorpTest.Core.Entity;
using IsuCorpTest.Core.Enums;
using IsuCorpTest.Core.Models;
using IsuCorpTest.Core.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Core.Services
{
    public abstract class ServiceBase
    {
        protected IUnitOfWork UnitOfWork { get; }

        public ServiceBase(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }
    }

    public class ContactService : ServiceBase
    {
        public ContactService(IUnitOfWork unitOfWork) : base(unitOfWork) { }


        public async Task<ContactType[]> ListContactTypes()
        {
            var list = await UnitOfWork.ContactType.ListAll();
            return list.Select(t => ContactType.FromEntity(t)).ToArray();
        }

        public async Task<Contact[]> ListContactsByName(string name, int limit)
        {
            var list = await UnitOfWork.Contact.ListByName(name, limit);
            return list.Select(t => Contact.FromEntity(t)).ToArray();
        }
    }

    public class ReservationService : ServiceBase
    {
        public ReservationService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public async Task<Reservation> GetReservation(int id)
        {
            var reservation = await UnitOfWork.Reservation.GetById(id);
            return Reservation.FromEntity(reservation);
        }

        public async Task<PagedResult<ReservationListItem>> ListReservations(int pageSize, int page, ReservationSortingColumn sortBy, SortingDirection sortDirection)
        {
            var pagedResult = await UnitOfWork.Reservation.ListWithContacts(pageSize, page, sortBy, sortDirection);
            return pagedResult.Convert(r => ReservationListItem.FromEntity(r));
        }

        public async Task<Reservation> CreateOrUpdateReservationAndContact(Reservation input)
        {
            var contact = await InsertOrUpdateContact(input);
            var reservation = await InsertOrUpdateReservation(input, contact);

            await UnitOfWork.Save();

            return Reservation.FromEntity(reservation);


            async Task<IContact> InsertOrUpdateContact(Reservation input)
            {
                var contact = input.Contact.Id > 0
                    ? await UnitOfWork.Contact.GetById(input.Contact.Id)
                    : UnitOfWork.Contact.CreateInstance();

                contact.Name = input.Contact.Name;
                contact.Type = await UnitOfWork.ContactType.GetById(input.Contact.TypeId);
                contact.Phone = input.Contact.Phone;
                contact.BirthDate = input.Contact.BirthDate;

                await UnitOfWork.Contact.InsertOrUpdate(contact);

                return contact;
            }

            async Task<IReservation> InsertOrUpdateReservation(Reservation input, IContact contact)
            {
                var reservation = input.Id > 0
                    ? await UnitOfWork.Reservation.GetById(input.Id)
                    : UnitOfWork.Reservation.CreateInstance();

                reservation.DateTime = DateTime.Now;
                reservation.Description = input.Description;
                reservation.Contact = contact;

                await UnitOfWork.Reservation.InsertOrUpdate(reservation);

                return reservation;
            }
        }

        public async Task ToggleFavorite(int reservationId, bool flag)
        {
            await UnitOfWork.Reservation.ToggleFavorite(reservationId, flag);
        }
    }
}

using IsuCorpTest.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Core.Models
{
    public record Reservation(
        int Id
        , string Description
        , Contact Contact
    )
    {
        public static Reservation FromEntity(IReservation reservation) =>
            new Reservation(reservation.Id, reservation.Description, Contact.FromEntity(reservation.Contact));
    }

    public record Contact(
        int Id
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

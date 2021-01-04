using IsuCorpTest.Core.Entity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Data.Models
{
    public abstract class EFCoreEntity : IEntity
    {
        public int Id { get; }
    }

    public class ContactType : EFCoreEntity, IContactType
    {
        public ContactType(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }

    public class Contact : EFCoreEntity, IContact
    {
        public Contact(string name, string phone)
        {
            Name = name;
            Phone = phone;
        }

        public string Name { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }

        private ContactType? _type;
        public virtual ContactType Type
        {
            get => _type ?? throw new InvalidOperationException($"Uninitialized property: {nameof(Type)}");
            set => _type = value;
        }

        private ICollection<Reservation>? _reservations;
        public virtual ICollection<Reservation> Reservations
        {
            get => _reservations ?? throw new InvalidOperationException($"Uninitialized property: {nameof(Reservations)}");
            set => _reservations = value;
        }

        IContactType IContact.Type { get => Type; set => Type = (ContactType)value; }
        ICollection<IReservation> IContact.Reservations => new ProxyCollection<Reservation, IReservation>(Reservations);
    }

    public class Reservation : EFCoreEntity, IReservation
    {
        public Reservation(string description)
        {
            Description = description;
        }

        public string Description { get; set; }
        public DateTime DateTime { get; set; }
        public bool Favorite { get; set; }
        public int? Ranking { get; set; }

        private Contact? _contact;
        public virtual Contact Contact
        {
            get => _contact ?? throw new InvalidOperationException($"Uninitialized property: {nameof(Contact)}");
            set => _contact = value;
        }

        IContact IReservation.Contact { get => Contact; set => Contact = (Contact)value; }
    }


    class ProxyCollection<TConcret, TInterface> : ICollection<TInterface>
        where TConcret : TInterface
        where TInterface : notnull
    {
        private ICollection<TConcret> Collection { get; }

        public ProxyCollection(ICollection<TConcret> collection)
        {
            Collection = collection;
        }

        int ICollection<TInterface>.Count => Collection.Count;
        bool ICollection<TInterface>.IsReadOnly => Collection.IsReadOnly;
        void ICollection<TInterface>.Add(TInterface item) => Collection.Add((TConcret)item);
        void ICollection<TInterface>.Clear() => Collection.Clear();
        bool ICollection<TInterface>.Contains(TInterface item) => Collection.Contains((TConcret)item);
        void ICollection<TInterface>.CopyTo(TInterface[] array, int arrayIndex) => throw new NotImplementedException(); //this.collection.CopyTo(array, arrayIndex);
        IEnumerator<TInterface> IEnumerable<TInterface>.GetEnumerator() => throw new NotImplementedException(); //this.collection.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => Collection.GetEnumerator();
        bool ICollection<TInterface>.Remove(TInterface item) => Collection.Remove((TConcret)item);
    }
}
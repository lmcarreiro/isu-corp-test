using IsuCorpTest.Core.Entity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Data.Models
{
    public class ContactType : IContactType
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Contact : IContact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }

        public virtual ContactType Type { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }

        IContactType IContact.Type { get => Type; set => Type = (ContactType)value; }
        ICollection<IReservation> IContact.Reservations => new ProxyCollection<Reservation, IReservation>(Reservations);
    }

    public class Reservation : IReservation
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }
        public bool Favorite { get; set; }
        public int? Ranking { get; set; }
        public virtual Contact Contact { get; set; }

        IContact IReservation.Contact { get => Contact; set => Contact = (Contact)value; }
    }


    class ProxyCollection<TConcret, TInterface> : ICollection<TInterface> where TConcret : TInterface
    {
        ICollection<TConcret> collection;

        public ProxyCollection(ICollection<TConcret> collection)
        {
            this.collection = collection;
        }

        int ICollection<TInterface>.Count => this.collection.Count;
        bool ICollection<TInterface>.IsReadOnly => this.collection.IsReadOnly;
        void ICollection<TInterface>.Add(TInterface item) => this.collection.Add((TConcret)item);
        void ICollection<TInterface>.Clear() => this.collection.Clear();
        bool ICollection<TInterface>.Contains(TInterface item) => this.collection.Contains((TConcret)item);
        void ICollection<TInterface>.CopyTo(TInterface[] array, int arrayIndex) => throw new NotImplementedException(); //this.collection.CopyTo(array, arrayIndex);
        IEnumerator<TInterface> IEnumerable<TInterface>.GetEnumerator() => throw new NotImplementedException(); //this.collection.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => this.collection.GetEnumerator();
        bool ICollection<TInterface>.Remove(TInterface item) => this.collection.Remove((TConcret)item);
    }
}
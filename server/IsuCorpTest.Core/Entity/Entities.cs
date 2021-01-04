using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Core.Entity
{
    public interface IEntity
    {
        int Id { get; }
    }

    public interface IContactType : IEntity
    {
        string Name { get; set; }
    }

    public interface IContact : IEntity
    {
        string Name { get; set; }
        string Phone { get; set; }
        DateTime BirthDate { get; set; }
        IContactType Type { get; set; }
        ICollection<IReservation> Reservations { get; }
    }

    public interface IReservation : IEntity
    {
        string Description { get; set; }
        DateTime DateTime { get; set; }
        bool Favorite { get; set; }
        int? Ranking { get; set; }
        IContact Contact { get; set; }
    }
}
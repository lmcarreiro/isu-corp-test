using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Data.Models
{
    public class ContactType
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public virtual ContactType Type { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }

    public class Reservation
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }
        public bool Favorite { get; set; }
        public int? Ranking { get; set; }
        public virtual Contact Contact { get; set; }
    }
}
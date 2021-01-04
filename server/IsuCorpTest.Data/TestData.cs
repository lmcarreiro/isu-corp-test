using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IsuCorpTest.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IsuCorpTest.Data
{
    public class TestData
    {
        private DataContext Context { get; }

        public TestData(DataContext context)
        {
            Context = context;
        }

        public void InsertData()
        {
            // Creates the database if not exists
            // TODO: on a real production app I would certainly not use this to create the database.
            // Instead I would use migrations, which is the recommended way.
            Context.Database.EnsureCreated();

            ContactType[] contactTypes = new[]
            {
                new ContactType("Contact Type 1"),
                new ContactType("Contact Type 2"),
                new ContactType("Contact Type 3"),
            };
            Context.ContactType.AddRange(contactTypes);

            Contact[] contacts = new[]
            {
                new Contact("Second Dock"  , "+55 21 987-654-321") { BirthDate = new DateTime(2001, 12,  1), Type = contactTypes[0] },
                new Contact("Primer Puerto", "+55 21 987-654-321") { BirthDate = new DateTime(2002, 10,  5), Type = contactTypes[0] },
                new Contact("Stella"       , "+55 21 987-654-321") { BirthDate = new DateTime(2003,  8, 10), Type = contactTypes[1] },
                new Contact("Island Creek" , "+55 21 987-654-321") { BirthDate = new DateTime(2004,  6, 15), Type = contactTypes[1] },
                new Contact("Fogo the Chao", "+55 21 987-654-321") { BirthDate = new DateTime(2005,  4, 20), Type = contactTypes[2] },
                new Contact("Fontana"      , "+55 21 987-654-321") { BirthDate = new DateTime(2006,  2, 25), Type = contactTypes[2] },
            };
            Context.Contact.AddRange(contacts);

            Reservation[] reservations = new[]
            {
                new Reservation("Test number <b>1</b>") { Contact = contacts[0], DateTime = new DateTime(2020, 5, 17, 21, 0, 0), Favorite = true , Ranking = 4    },
                new Reservation("Test number <b>2</b>") { Contact = contacts[1], DateTime = new DateTime(2020, 5, 18, 20, 0, 0), Favorite = false, Ranking = 3    },
                new Reservation("Test number <b>3</b>") { Contact = contacts[2], DateTime = new DateTime(2020, 5, 20, 19, 0, 0), Favorite = false, Ranking = 2    },
                new Reservation("Test number <b>4</b>") { Contact = contacts[3], DateTime = new DateTime(2020, 5, 21, 20, 0, 0), Favorite = false, Ranking = 2    },
                new Reservation("Test number <b>5</b>") { Contact = contacts[4], DateTime = new DateTime(2020, 5, 17, 21, 0, 0), Favorite = true , Ranking = 2    },
                new Reservation("Test number <b>6</b>") { Contact = contacts[5], DateTime = new DateTime(2020, 5, 23, 20, 0, 0), Favorite = false, Ranking = 2    },
                new Reservation("Test number <b>7</b>") { Contact = contacts[3], DateTime = new DateTime(2020, 5, 24, 21, 0, 0), Favorite = true , Ranking = 1    },
                new Reservation("Test number <b>8</b>") { Contact = contacts[4], DateTime = new DateTime(2020, 5, 25, 20, 0, 0), Favorite = false, Ranking = null },
            };
            Context.Reservation.AddRange(reservations);

            // Saves changes
            Context.SaveChanges();
        }

        public void PrintData()
        {
            // Gets and prints all reservations in database
            var reservations = Context.Reservation.Include(p => p.Contact);

            foreach (var r in reservations)
            {
                var data = new StringBuilder();
                data.AppendLine($"Description: {r.Description}");
                data.AppendLine($"Contact Name: {r.Contact.Name}");
                Console.WriteLine(data.ToString());
            }
        }
    }
}

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
        private DataContext context;

        public TestData(DataContext context)
        {
            this.context = context;
        }

        public void InsertData()
        {
            // Creates the database if not exists
            context.Database.EnsureCreated();

            ContactType[] contactTypes = new[]
            {
                new ContactType { Name = "Contact Type 1" },
                new ContactType { Name = "Contact Type 2" },
                new ContactType { Name = "Contact Type 3" },
            };
            context.ContactType.AddRange(contactTypes);

            Contact[] contacts = new[]
            {
                new Contact { Name = "Second Dock"  , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2001, 12,  1), Type = contactTypes[0] },
                new Contact { Name = "Primer Puerto", Phone = "+55 21 987-654-321", BirthDate = new DateTime(2002, 10,  5), Type = contactTypes[0] },
                new Contact { Name = "Stella"       , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2003,  8, 10), Type = contactTypes[1] },
                new Contact { Name = "Island Creek" , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2004,  6, 15), Type = contactTypes[1] },
                new Contact { Name = "Fogo the Chao", Phone = "+55 21 987-654-321", BirthDate = new DateTime(2005,  4, 20), Type = contactTypes[2] },
                new Contact { Name = "Fontana"      , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2006,  2, 25), Type = contactTypes[2] },
            };
            context.Contact.AddRange(contacts);

            Reservation[] reservations = new[]
            {
                new Reservation { Contact = contacts[0], DateTime = new DateTime(2020, 5, 17, 21, 0, 0), Favorite = true , Ranking = 4   , Description = "Test number <b>1</b>" },
                new Reservation { Contact = contacts[1], DateTime = new DateTime(2020, 5, 18, 20, 0, 0), Favorite = false, Ranking = 3   , Description = "Test number <b>2</b>" },
                new Reservation { Contact = contacts[2], DateTime = new DateTime(2020, 5, 20, 19, 0, 0), Favorite = false, Ranking = 2   , Description = "Test number <b>3</b>" },
                new Reservation { Contact = contacts[3], DateTime = new DateTime(2020, 5, 21, 20, 0, 0), Favorite = false, Ranking = 2   , Description = "Test number <b>4</b>" },
                new Reservation { Contact = contacts[4], DateTime = new DateTime(2020, 5, 17, 21, 0, 0), Favorite = true , Ranking = 2   , Description = "Test number <b>5</b>" },
                new Reservation { Contact = contacts[5], DateTime = new DateTime(2020, 5, 23, 20, 0, 0), Favorite = false, Ranking = 2   , Description = "Test number <b>6</b>" },
                new Reservation { Contact = contacts[3], DateTime = new DateTime(2020, 5, 24, 21, 0, 0), Favorite = true , Ranking = 1   , Description = "Test number <b>7</b>" },
                new Reservation { Contact = contacts[4], DateTime = new DateTime(2020, 5, 25, 20, 0, 0), Favorite = false, Ranking = null, Description = "Test number <b>8</b>" },
            };
            context.Reservation.AddRange(reservations);

            // Saves changes
            context.SaveChanges();
        }

        public void PrintData()
        {
            // Gets and prints all reservations in database
            var reservations = context.Reservation.Include(p => p.Contact);

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

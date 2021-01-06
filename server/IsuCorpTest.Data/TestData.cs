using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IsuCorpTest.Data.DataModels;
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
        
        /// <summary>
        /// This is just test data. I would remove this code on a real production app and use migrations/seeds instead.
        /// </summary>
        public void InsertTestData()
        {
            // Creates the database if not exists
            // TODO: on a real production app I would certainly not use this to create the database.
            // Instead I would use migrations, which is the recommended way.
            Context.Database.EnsureCreated();
            Context.Database.ExecuteSqlRaw(@"
                DROP PROCEDURE IF EXISTS ToggleReservationFavorite;
                CREATE PROCEDURE ToggleReservationFavorite(IN resId INT, IN flag TINYINT)
                BEGIN
                    UPDATE Reservation SET Favorite = flag Where Id = resId;
                END;
            ");

            ContactType[] contactTypes =
            {
                new () { Name = "Contact Type 1" },
                new () { Name = "Contact Type 2" },
                new () { Name = "Contact Type 3" },
            };
            Context.ContactType.AddRange(contactTypes);

            Contact[] contacts =
            {
                new () { Name = "Second Dock"  , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2001, 12,  1), Type = contactTypes[0] },
                new () { Name = "Primer Puerto", Phone = "+55 21 987-654-321", BirthDate = new DateTime(2002, 10,  5), Type = contactTypes[0] },
                new () { Name = "Stella"       , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2003,  8, 10), Type = contactTypes[1] },
                new () { Name = "Island Creek" , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2004,  6, 15), Type = contactTypes[1] },
                new () { Name = "Fogo the Chao", Phone = "+55 21 987-654-321", BirthDate = new DateTime(2005,  4, 20), Type = contactTypes[2] },
                new () { Name = "Fontana"      , Phone = "+55 21 987-654-321", BirthDate = new DateTime(2006,  2, 25), Type = contactTypes[2] },
            };
            Context.Contact.AddRange(contacts);

            Reservation[] reservations =
            {
                new () { Contact = contacts[0], DateTime = new DateTime(2020, 5, 17, 21, 0, 0), Favorite = true , Ranking = 4   , Description = "Test number <b>1</b>" },
                new () { Contact = contacts[1], DateTime = new DateTime(2020, 5, 18, 20, 0, 0), Favorite = false, Ranking = 3   , Description = "Test number <b>2</b>" },
                new () { Contact = contacts[2], DateTime = new DateTime(2020, 5, 20, 19, 0, 0), Favorite = false, Ranking = 2   , Description = "Test number <b>3</b>" },
                new () { Contact = contacts[3], DateTime = new DateTime(2020, 5, 21, 20, 0, 0), Favorite = false, Ranking = 2   , Description = "Test number <b>4</b>" },
                new () { Contact = contacts[4], DateTime = new DateTime(2020, 5, 17, 21, 0, 0), Favorite = true , Ranking = 2   , Description = "Test number <b>5</b>" },
                new () { Contact = contacts[5], DateTime = new DateTime(2020, 5, 23, 20, 0, 0), Favorite = false, Ranking = 2   , Description = "Test number <b>6</b>" },
                new () { Contact = contacts[3], DateTime = new DateTime(2020, 5, 24, 21, 0, 0), Favorite = true , Ranking = 1   , Description = "Test number <b>7</b>" },
                new () { Contact = contacts[4], DateTime = new DateTime(2020, 5, 25, 20, 0, 0), Favorite = false, Ranking = null, Description = "Test number <b>8</b>" },
            };
            Context.Reservation.AddRange(reservations);

            try
            {
                // Saves changes
                Context.SaveChanges();
            }
            catch
            {
                // if it fails it's because the data were already inserted in a previous run. Just ignore.
            }
        }
    }
}

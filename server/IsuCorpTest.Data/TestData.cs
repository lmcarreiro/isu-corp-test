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

            // Adds a publisher
            var publisher = new Publisher
            {
                Name = "Mariner Books"
            };
            context.Publisher.Add(publisher);

            // Adds some books
            context.Book.Add(new Book
            {
                ISBN = "978-0544003415",
                Title = "The Lord of the Rings",
                Author = "J.R.R. Tolkien",
                Language = "English",
                Pages = 1216,
                Publisher = publisher
            });
            context.Book.Add(new Book
            {
                ISBN = "978-0547247762",
                Title = "The Sealed Letter",
                Author = "Emma Donoghue",
                Language = "English",
                Pages = 416,
                Publisher = publisher
            });

            // Saves changes
            context.SaveChanges();
        }

        public void PrintData()
        {
            // Gets and prints all books in database
            var books = context.Book
                .Include(p => p.Publisher);
            foreach (var book in books)
            {
                var data = new StringBuilder();
                data.AppendLine($"ISBN: {book.ISBN}");
                data.AppendLine($"Title: {book.Title}");
                data.AppendLine($"Publisher: {book.Publisher.Name}");
                Console.WriteLine(data.ToString());
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IsuCorpTest.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IsuCorpTest.Data
{
    public class DataContext : DbContext
    {
        public DbSet<ContactType> ContactType { get; set; }

        public DbSet<Contact> Contact { get; set; }

        public DbSet<Reservation> Reservation { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ContactType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Phone).IsRequired();
                entity.Property(e => e.BirthDate).IsRequired();

                entity.HasOne(e => e.Type).WithMany()
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.Favorite).IsRequired();
                entity.Property(e => e.Ranking);

                entity.HasOne(e => e.Contact).WithMany(c => c.Reservations)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
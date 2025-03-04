﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IsuCorpTest.Data.DataModels;
using Microsoft.EntityFrameworkCore;

namespace IsuCorpTest.Data
{
    public class DataContext : DbContext
    {
        public DbSet<ContactType> ContactType { get; set; } = null!;
        public DbSet<Contact> Contact { get; set; } = null!;
        public DbSet<Reservation> Reservation { get; set; } = null!;

        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ContactType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(32);

                entity.HasIndex(e => e.Name).IsUnique();
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(64);
                entity.Property(e => e.Phone).IsRequired().HasMaxLength(24);
                entity.Property(e => e.BirthDate).IsRequired().HasColumnType("date");

                entity.HasOne(e => e.Type).WithMany()
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasIndex(e => e.Name).IsUnique();
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.DateTime).IsRequired();
                entity.Property(e => e.Favorite).IsRequired();
                entity.Property(e => e.Ranking).IsRequired(false).HasColumnType("tinyint");

                entity.HasOne(e => e.Contact).WithMany(c => c.Reservations)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(e => e.DateTime).IsUnique(false);
                entity.HasIndex(e => e.Ranking).IsUnique(false);
            });
        }
    }
}
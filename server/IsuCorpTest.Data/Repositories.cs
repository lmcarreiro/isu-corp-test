using IsuCorpTest.Core.Entity;
using IsuCorpTest.Core.Repository;
using IsuCorpTest.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Data.Repository
{
    public class EFCoreRepository<TConcret, TInterface> : IRepository<TInterface>
        where TConcret : class, TInterface
        where TInterface : IEntity
    {
        protected DataContext Context { get; }
        protected DbSet<TConcret> Set { get; }

        public EFCoreRepository(DataContext context, Func<DataContext, DbSet<TConcret>> setSelector)
        {
            Context = context;
            Set = setSelector(context);
        }

        Task IRepository<TInterface>.Delete(TInterface entity)
        {
            Set.Remove((TConcret)entity);
            return Task.CompletedTask;
        }

        Task IRepository<TInterface>.Insert(TInterface entity)
        {
            Set.Add((TConcret)entity);
            return Task.CompletedTask;
        }

        Task IRepository<TInterface>.Update(TInterface entity)
        {
            Set.Update((TConcret)entity);
            return Task.CompletedTask;
        }

        async Task<TInterface> IRepository<TInterface>.GetById(int id)
        {
            var entity = await Set.FindAsync(id);
            return entity;
        }

        async Task<IList<TInterface>> IRepository<TInterface>.ListAll()
        {
            var list = await Set.ToListAsync<TInterface>();
            return list;
        }
    }

    public class ContactTypeRepository : EFCoreRepository<ContactType, IContactType>, IContactTypeRepository
    {
        public ContactTypeRepository(DataContext context)
            : base(context, c => c.ContactType)
        {

        }
    }

    public class ContactRepository : EFCoreRepository<Contact, IContact>, IContactRepository
    {
        public ContactRepository(DataContext context)
            : base(context, c => c.Contact)
        {

        }
    }

    public class ReservationRepository : EFCoreRepository<Reservation, IReservation>, IReservationRepository
    {
        public ReservationRepository(DataContext context)
            : base(context, c => c.Reservation)
        {

        }
    }
}
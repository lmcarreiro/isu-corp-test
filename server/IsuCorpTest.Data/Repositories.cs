using IsuCorpTest.Core.Entity;
using IsuCorpTest.Core.Repository;
using IsuCorpTest.Core.Util;
using IsuCorpTest.Data.DataModels;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Data.Repository
{
    public abstract class EFCoreRepository<TConcret, TInterface> : IRepository<TInterface>
        where TConcret : class, TInterface, new()
        where TInterface : notnull, IEntity
    {
        protected DataContext Context { get; }
        protected DbSet<TConcret> Set { get; }

        public EFCoreRepository(DataContext context, Func<DataContext, DbSet<TConcret>> setSelector)
        {
            Context = context;
            Set = setSelector(context);
        }

        public TInterface CreateInstance() => new TConcret();

        public virtual Task Delete(TInterface entity)
        {
            Set.Remove((TConcret)entity);
            return Task.CompletedTask;
        }

        public virtual Task Insert(TInterface entity)
        {
            Set.Add((TConcret)entity);
            return Task.CompletedTask;
        }

        public virtual Task InsertOrUpdate(TInterface entity)
        {
            if (entity.Id > 0)
            {
                Set.Update((TConcret)entity);
            }
            else
            {
                Set.Add((TConcret)entity);
            }
            
            return Task.CompletedTask;
        }

        public virtual Task Update(TInterface entity)
        {
            Set.Update((TConcret)entity);
            return Task.CompletedTask;
        }

        public virtual async Task<TInterface> GetById(int id)
        {
            var entity = await Set.SingleAsync(e => e.Id == id);
            return entity;
        }

        public virtual async Task<TInterface?> TryGetById(int id)
        {
            var entity = await Set.SingleOrDefaultAsync(e => e.Id == id);
            return entity;
        }

        public virtual async Task<IList<TInterface>> ListAll()
        {
            var list = await Set.ToListAsync<TInterface>();
            return list;
        }

        protected async Task<PagedResult<TInterface>> ListWithPading(IQueryable<TConcret> query, int pageSize = 0, int page = 1)
        {
            var totalCount = await query.CountAsync();

            if (pageSize > 0)
            {
                query = query.Skip((page - 1) * pageSize);
                query = query.Take(pageSize);
            }

            var pagedRecords = await query.ToListAsync<TInterface>();

            return new PagedResult<TInterface>
            {
                PageSize = pageSize > 0 ? pageSize : totalCount,
                PageNumber = page,
                TotalCount = totalCount,
                PagedRecords = pagedRecords,
            };
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

        public override async Task<IReservation> GetById(int id)
        {
            var entity = await Set
                .Include(e => e.Contact)
                .ThenInclude(c => c.Type)
                .SingleAsync(e => e.Id == id);

            return entity;
        }

        public async Task<PagedResult<IReservation>> ListWithContacts(int pageSize = 0, int page = 1)
        {
            var query = Set.Include(r => r.Contact);
            var result = await ListWithPading(query, pageSize, page);
            return result;
        }

        public async Task ToggleFavorite(int reservationId, bool flag)
        {
            await Context.Database.ExecuteSqlRawAsync(
                "CALL ToggleReservationFavorite(@reservationId, @flag)"
                , new MySqlParameter("@reservationId", reservationId)
                , new MySqlParameter("@flag", flag)
            );
        }
    }
}
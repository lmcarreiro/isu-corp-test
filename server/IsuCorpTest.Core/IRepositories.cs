using IsuCorpTest.Core.Entity;
using IsuCorpTest.Core.Enums;
using IsuCorpTest.Core.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Core.Repository
{
    public interface IRepository<T> where T : notnull, IEntity
    {
        T CreateInstance();
        Task<T> GetById(int id);
        Task<T?> TryGetById(int id);
        Task<IList<T>> ListAll();
        Task Insert(T entity);
        Task InsertOrUpdate(T entity);
        Task Update(T entity);
        Task Delete(T entity);
    }

    public interface IContactTypeRepository : IRepository<IContactType>
    {

    }

    public interface IContactRepository : IRepository<IContact>
    {

    }

    public interface IReservationRepository : IRepository<IReservation>
    {
        Task<PagedResult<IReservation>> ListWithContacts(int pageSize, int page, ReservationSortingColumn sortBy, SortingDirection sortDirection);
        Task ToggleFavorite(int reservationId, bool flag);
    }
}
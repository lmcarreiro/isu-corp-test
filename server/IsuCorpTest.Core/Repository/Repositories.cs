using IsuCorpTest.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Core.Repository
{
    public interface IRepository<T> where T : notnull, IEntity
    {
        Task<T?> GetById(int id);
        Task<IList<T>> ListAll();
        Task Insert(T entity);
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

    }
}
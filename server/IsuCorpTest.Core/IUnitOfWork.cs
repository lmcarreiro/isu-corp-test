using IsuCorpTest.Core.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace IsuCorpTest.Core
{
    public interface IUnitOfWork
    {
        IContactTypeRepository ContactType { get; }
        IContactRepository Contact { get; }
        IReservationRepository Reservation { get; }

        Task Save(CancellationToken cancellationToken = default);
    }
}

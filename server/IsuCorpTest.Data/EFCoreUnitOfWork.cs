using IsuCorpTest.Core;
using IsuCorpTest.Core.Repository;
using IsuCorpTest.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace IsuCorpTest.Data
{
    public class EFCoreUnitOfWork : IUnitOfWork
    {
        private DataContext Context { get; }

        public EFCoreUnitOfWork(DataContext context)
        {
            Context = context;
        }

        private IContactTypeRepository _contactType;
        public IContactTypeRepository ContactType => _contactType = _contactType ?? new ContactTypeRepository(Context);

        private IContactRepository _contact;
        public IContactRepository Contact => _contact = _contact ?? new ContactRepository(Context);

        private IReservationRepository _reservation;
        public IReservationRepository Reservation => _reservation = _reservation ?? new ReservationRepository(Context);

        public async Task Save(CancellationToken cancellationToken)
        {
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}

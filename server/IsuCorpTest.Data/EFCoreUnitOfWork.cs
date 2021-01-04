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

        public IContactTypeRepository ContactType => _contactType ??= new ContactTypeRepository(Context);
        private IContactTypeRepository? _contactType;

        public IContactRepository Contact => _contact ??= new ContactRepository(Context);
        private IContactRepository? _contact;

        public IReservationRepository Reservation => _reservation ??= new ReservationRepository(Context);
        private IReservationRepository? _reservation;

        public async Task Save(CancellationToken cancellationToken = default)
        {
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IsuCorpTest.Core.Util
{
    public sealed class PagedResult<T>
    {
        public int PageSize { get; init; }
        public int PageNumber { get; init; }
        public int TotalCount { get; init; }
        public IList<T> PagedRecords { get; init; } = null!;

        public PagedResult<TNew> Convert<TNew>(Func<T, TNew> convert) => new PagedResult<TNew>
        {
            PageSize = PageSize,
            PageNumber = PageNumber,
            TotalCount = TotalCount,
            PagedRecords = PagedRecords.Select(convert).ToList(),
        };
    }
}

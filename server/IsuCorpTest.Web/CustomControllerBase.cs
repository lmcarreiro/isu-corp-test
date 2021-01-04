using IsuCorpTest.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IsuCorpTest.Web
{
    public abstract class CustomControllerBase : ControllerBase
    {
        protected const int DefaultPageSize = 10;

        protected IUnitOfWork UnitOfWork { get; }

        public CustomControllerBase(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }
    }
}

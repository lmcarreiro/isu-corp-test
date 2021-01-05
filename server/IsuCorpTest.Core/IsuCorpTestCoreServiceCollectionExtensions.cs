using IsuCorpTest.Core.Services;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class IsuCorpTestCoreServiceCollectionExtensions
    {
        public static IServiceCollection AddIsuCorpTestCore(this IServiceCollection services)
        {
            services.AddTransient<ContactService>();
            services.AddTransient<ReservationService>();
            return services;
        }
    }
}

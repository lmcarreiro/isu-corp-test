﻿using IsuCorpTest.Core;
using IsuCorpTest.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class IsuCorpTestDataServiceCollectionExtensions
    {
        public static IServiceCollection AddIsuCorpTestData(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContextPool<DataContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

            services.AddTransient<TestData>(); // TODO: This is for testing only.
            services.AddTransient<IUnitOfWork, EFCoreUnitOfWork>();

            // TODO: add services
            return services;
        }
    }
}

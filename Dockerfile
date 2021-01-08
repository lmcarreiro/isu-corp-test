FROM node:12 AS node-build-env
    WORKDIR /app

    # Download front-end dependencies
    COPY ./client/package.json ./
    COPY ./client/yarn.lock ./
    RUN yarn install

    # Build the front-end
    # TODO: copy just the necessary files to build the front-end
    COPY ./client ./
    RUN yarn build


FROM mcr.microsoft.com/dotnet/sdk:5.0 AS dotnet-build-env
    WORKDIR /app

    # Download back-end dependencies
    COPY server/*.sln ./
    COPY server/*/*.csproj ./
    RUN find ./*.csproj -exec echo {} \; | sed -E 's|([.]/(.+).csproj)|./\2/|' | xargs -I % sh -c 'mkdir %'
    RUN find ./*.csproj -exec echo {} \; | sed -E 's|([.]/(.+).csproj)|\1 ./\2/\2.csproj|' | xargs -I % sh -c 'mv %'
    RUN dotnet restore IsuCorpTest.sln

    # Build the back-end
    COPY ./server ./
    RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:5.0
    WORKDIR /app

    #COPY --from=dotnet-build-env /app/IsuCorpTest.Web/out .
    COPY --from=dotnet-build-env /app/out .
    COPY --from=node-build-env /app/dist/isu-corp-test ./wwwroot

    ENTRYPOINT ["dotnet", "IsuCorpTest.Web.dll"]

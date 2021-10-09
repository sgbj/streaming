# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN curl -sL https://deb.nodesource.com/setup_16.x |  bash -
RUN apt-get install -y nodejs
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY Streaming/*.csproj ./Streaming/
RUN dotnet restore

# copy everything else and build app
COPY Streaming/. ./Streaming/
WORKDIR /source/Streaming
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "Streaming.dll"]

EXPOSE 80
EXPOSE 443

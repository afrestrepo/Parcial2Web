# Parcial2Web

**PreParcial------------------------------------**

**Cómo ejecutar el proyecto**

El proyecto utiliza TypeORM y PostgreSQL. 

Configuración de la base de datos:

El proyecto espera una base de datos PostgreSQL con los siguientes datos:

Host: localhost

Puerto: 5432

Usuario: postgres

Contraseña: postgres

Nombre de la base: travel_plans

Crear la base travel_plans desde pgAdmin4 y asignarle como owner postgres.

Desde la raíz del proyecto:

npm install

Ejecutar:

npm run start:dev

La API quedará disponible en http://localhost:3000.


**Modulos**

El proyecto está organizado en dos módulos principales:

Countries: proveedor y gestión de países. Consulta la API externa (RESTCountries) y almacena en la base de datos como caché.

TravelPlans: gestión de planes de viaje (CRUD). Al crear un plan valida datos mediante DTOs y se asegura de que el país asociado esté en caché (lo trae de RESTCountries si hace falta).

Endpoints

Countries

GET /countries

Lista todos los países que están en la caché (tabla country).

Ejemplo:

http://localhost:3000/countries

GET /countries/:alpha3Code

Consulta un país por su código alfa-3 (ej: COL).

Ejemplo:

http://localhost:3000/countries/COL

TravelPlans

POST /travel-plans

Crea un nuevo plan de viaje. Valida entrada mediante DTO. Si el país asociado no está en caché, se trae de RESTCountries y se guarda antes de crear el plan.

GET /travel-plans

Lista todos los planes de viaje.

Ejemplo:

http://localhost:3000/travel-plans

GET /travel-plans/:id

Obtiene un plan por su identificador numérico.

Ejemplo:

http://localhost:3000/travel-plans/1

PATCH /travel-plans/:id
Actualiza campos permitidos de un plan (usa update-travel-plan.dto).

DELETE /travel-plans/:id
Elimina un plan.


**Provider externo**

El proyecto incluye RestCountriesProvider, responsable de consultar la API pública RESTCountries. 

El proveedor realiza una petición a https://restcountries.com/v3.1/alpha/{alpha3}?fields=name,cca3,region,subregion,capital,population,flags

Normaliza la respuesta a un objeto con los campos usados por CountryEntity (alpha3Code, name, region, subregion, capital, population, flag).

Devuelve el objeto al CountriesService, que persiste la entidad en la base de datos la primera vez que se solicita ese país.


**Modelo de datos**

CountryEntity :

alpha3Code 

name 

region 

subregion 

capital 

population 

flag 

TravelPlanEntity :

id 

title 

countryCode 

startDate 

endDate 

notes 


**Pruebas sugeridas en Postman**

Consultar un país por primera vez

Petición:

GET http://localhost:3000/countries/COL

Resultado esperado:

Respuesta con el objeto country y origin: "restcountries".

Se genera un registro en la tabla country en PostgreSQL.

{
  "country": {
    "alpha3Code": "COL",
    "name": "Colombia",
    "region": "Americas",
    "subregion": "South America",
    "capital": "Bogotá",
    "population": 50372424,
    "flag": "https://restcountries.com/data/col.svg"
  },
  "origin": "restcountries"
}

Consultar un país por segunda vez

Petición:

GET http://localhost:3000/countries/COL

Resultado esperado:

Respuesta con el mismo objeto country y origin: "cache".

No se debe realizar una nueva consulta a RESTCountries.

{
  "country": {
    "alpha3Code": "COL",
    "name": "Colombia",
    "region": "Americas",
    "subregion": "South America",
    "capital": "Bogotá",
    "population": 50372424,
    "flag": "https://restcountries.com/data/col.svg"
  },
  "origin": "cache"
}

Crear un plan de viaje

Petición:

POST http://localhost:3000/travel-plans

Content-Type: application/json

{
  "title": "Vacaciones",
  "countryCode": "COL",
  "startDate": "2025-12-01",
  "endDate": "2025-12-10",
  "notes": "Prueba"
}

Resultado esperado:

Si COL no existía en caché, se traerá de RESTCountries y se guardará.

Se creará una fila en travel_plan.

Respuesta con el objeto creado (incluye el país embebido por la relación).

{
    "id": 1,
    "countryCode": "COL",
    "country": {
        "alpha3Code": "COL",
        "name": "Colombia",
        "region": "Americas",
        "subregion": "South America",
        "capital": "Bogotá",
        "population": "53057212",
        "flag": "https://flagcdn.com/co.svg"
    },
    "title": "Vacaciones",
    "startDate": "2025-01-10",
    "endDate": "2025-01-20",
    "notes": "Prueba"
}

**PARCIAL------------------------------------**

Se incorporó el endpoint DELETE /countries/:alpha3Code para permitir la eliminación de países almacenados. Solo puede eliminarse un país si no tiene planes de viaje asociados y si existe en la base de datos. Además, la operación se protegió mediante un guard personalizado que valida un token enviado mediante el header x-api-key.
Antes de ejecutar la operación, este endpoint requiere el envío del header x-api-key con un token válido, en mi caso escogi el token 'admin123'. Si falta el header o es incorrecto, se retorna un 401 Unauthorized. Una vez superada la verificación, el servicio valida que el país exista y que no tenga planes de viaje asociados; de lo contrario, se devuelven errores 404 Not Found o 400 Bad Request, respectivamente. Para validarlo, bastan tres pruebas en Postman: sin token, con token inválido y con token correcto.

Adicionalmente, la aplicación ahora incluye un middleware de logging que registra cada petición realizada a las rutas relacionadas con países y planes de viaje. Este middleware captura el método HTTP, la ruta solicitada, el código de estado generado por la respuesta y el tiempo total de procesamiento.
Para validarlo, basta con realizar cualquier operación (GET, POST, DELETE) en estas rutas y observar en la consola del servidor que se genera una línea con el formato esperado ej:
[HTTP] DELETE /countries/USA - 404 - 63ms
[HTTP] GET /travel-plans/ - 200 - 77ms

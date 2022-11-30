To run project locally (require Node version 18.x):
```
cd /frontend
yarn install
yarn start
```

To run backend locally need Java version 1.8, IDE Intellij and change these config in backend\src\main\resources\application.properties to your local config with local server host and local database

Example
```
spring.datasource.url=jdbc:postgresql://localhost:5432/VTT
spring.datasource.username=postgres
spring.datasource.password=1234
```

# projekt-frontend-backend

## 📚 Konfiguracja bazy danych PostgreSQL 📚

W folderze `src/main/resources/` są pliki:

`schema.sql` - create tables

`data.sql` - insert testowych danych

`query.sql` - testowe zapytania

---

W pliku `application.properties` dodaj:

```
spring.sql.init.mode=always

spring.datasource.initialization-mode=always
```

Spring Boot 2.x – `initialization-mode`

Spring Boot 3.x - `sql.init.mode`

---

Po starcie Spring Boot automatycznie utworzy tabele i wypełni je danymi (zapytań nie wykona)

Baza PostgreSQL była testowana w pgAdmin4


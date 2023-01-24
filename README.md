# MD GUESTBOOK

Az MD Guestbook egy vendégkönyv app. Felhasználók által létrehozott témákat tudunk olvasni. Ha regisztrálunk vagy bejelentkezünk akkor üzenetet tudunk írni a témákhoz, illetve csinálhatunk saját témát.

Letöltés után felkell telepíteni az npm modulokat.

*npm* install

Az apphoz tartozik egy backend. Ebben vannak statikus objektumok amik az adatokat tartalmazzák. Ez a usersDatabase és bookDatabase. Itt az index.js file amit futtatni kell az app elindítása előtt. Ez a localhost:8080 portot figyeli.

*cd* backend_guestbook/

*node* index.js

Ha elindítjuk és fut a backendünk akkor ezt az üzenetet kapjuk:

"MD guestbook backend app is listening on 8080-port!"

## Előre létrehozott teszt felhasználók:

| username | email           | password |
|----------|:---------------:|----------|
| Dániel   | mail@mail.hu    | 123456   |
| Petike   | petike@mail.hu  | 654321   |
| Zsuzsika | zsuzsi@gmail.hu | abcdef   |


Főként saját CSS-t írtam. Viszont CSS Framework-nek MUI-ból használtam a Box, TextField, Button elemeket.


## Regisztráció esetén a következőket figyeli a program:

- Rendelkezik egy "nem vagyok robot" kapcsolóval.

- A felhasználónév és e-mail regisztrálva van-e már az adatbázisban.

- A felhasználó nevünknek hat és tíz karakter között kell lennie.

- Az e-mailünket jó formátumban adtuk-e meg.

- A jelszónak minimum hat karakternek kell lennie, illetve kétszer kell beírni.

 

## Felhasználó módosítása:

- Minden módosítás alap feltétele hogy megadjuk a jelszavunkat.

- A felhasználó nevünknek hat és tíz karakter között kell megadnunk.

- A felhasználónév és e-mail átírásakor ellenőrzi hogy már regisztráltak-e ilyen névvel és e-maillel.

- Ha módosítani szeretnénk a jelszavunkat akkor legalább hat karakternek kell lennie az új jelszónak is, illetve kétszer kell beírnunk.

- Ha töröljük a felhasználót akkor a nevét és az id-jét megtartja a régi üzenetei azonosítása miatt. Viszont az e-mailt törli és többet nem tudunk bejelentkezni vele.

 

## Új téma és üzenet hozzáadása és törlése:

- Ha be vagyunk jelentkezve akkor megjelenik a téma és üzenet hozzáadó felület.

- Ha új témát akarunk létrehozni a téma címének és az első üzenetnek legalább tíz karakter hosszúnak kell lennie. Ugyanez vonatkozik az új üzenet hozzáadásához.

- A saját témánk és üzenetünk alatt megjelenik egy gomb amivel törölhetjük a megfelelő beírásunkat.

 

## MD Guestbook Backend:

backend_guestbook/index.js

Felhasználók lekérdezése:

http://localhost:8080/api/userslist


Témák lekérdezése:

http://localhost:8080/api/bookslist

 

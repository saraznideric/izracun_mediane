# izracun_mediane

BACKEND
  Za backend je uporabljen Express js. Za zagon aplikacije je potrebno nasneti pakete node.js
   - npm i
  Za zagon aplikacije se uporablja ukaz 
  - npm run start
  
  Aplikacija se servira na portu 3000 in ima 2 endpointa: 
   - Endpoint /api/mediana/calculate (POST) (izračuna mediano, jo shrani v mysql bazo in pošlje frontendu)
   - Endpoint /api/mediana/get (pridobi vse podatke iz podatkovne baze)

FRONTEND
  Frontend je statična datoteka mediana.html

PODATKOVNA BAZA
  Baza je MySql
  Shema: default
  Ime tabele: bankart 
  Tabela vsebuje tri stolpce:
    - Id (autoincrement)
    - MEDIANA (rezultat) 
    - CREATED_AT (auto add now field)


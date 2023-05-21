# Dziś na PWR

## Jak odpalić?

Wymagania:
- docker
- docker compose v2 (wersja v1 nie zadziała)
- node@18
- npm@9

Instrukcja:
1. Skopiuj przykładowe zmienne środowiskowe

   ```
   cp .env.local.example .env.local
   ```
2. Zainstaluj dependencies
   ```bash
   npm install
   ```
3. 💻 Uruchom baze danych i aplikacje webowom w jednym terminalu
   ```bash
   npm run dev
   ```
4. 📱 Uruchom aplkacje mobilną (expo) w drugim terminalu
   ```bash
   npm run dev:mobile
   ```
5. 🔥 Ustaw najnowsze migracje na bazie danych
   ```bash
   npm run db:push
   ```
6. Jak chcesz to zaseeduj baze danych
   ```bash
   npm run db:seed
   ```

## Jak zdeployować?

Wymagania:

- docker
- docker compose v2 (wersja v1 nie zadziała)
- npm

Instrukcja

1. Pobierz repo na swój serwer

   ```bash
   git clone https://github.com/informatyzacja/dzis-na-pwr
   ```
2. Wejdź do katalogu z repo
   ```bash
   cd dzis-na-pwr
   ```
4. Skopiuj defaultowe zmienne środowiskowe
   ```bash
   cp .env.example .env
   ```
5. Ustaw zmienną `NEXTAUTH_URL` na adres url strony na produkcji
6. Wygeneruj sekret dla `NEXTAUTH_SECRET` przy użyciu
   ```bash
   openssl rand -base64 32
   ```
7. Ustaw nowy sekret.
8. ODPALAMY 🚀🚀🚀
   ```bash
   npm run docker:run:prod -- -d
   ```
9. 🎉 Ciesz się działającą (albo nie) produkcją 🎉

Aplikacja automatycznie się zupdate'uje, gdy zostaną upublicznione nowe obrazy dockera w tym repozytorium. ([jak?](https://containrrr.dev/watchtower/))

### Jak zupdate'ować zmienne środowiskowe po deployu?
Zmień plik `.env`, tak żeby Ci pasował

Odpal kontenery na nowo
```bash
npm run docker:run:prod -- -d
```

### Jak zaseedować baze danych w dockerze?

```bash
npm run docker:seed
```

### Jak działają backupy?
xd

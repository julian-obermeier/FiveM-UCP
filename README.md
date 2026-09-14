# FIVEM UCP

Professionelles User Control Panel als React/Vite-Frontend für einen FiveM-Roleplay-Server.

## Enthalten

- Responsive App-Shell mit Desktop-Sidebar und Mobile-Bottom-Navigation
- Übersicht mit Live-Serverstatus, Charakteren, Aktivitäten, Fahrzeugen und Fraktionszugängen
- Charakter-, Fahrzeug-, Fraktions- und Support-Ansichten
- Lokale Demo-Interaktionen: Navigation, Suche, Filter, Auswahlzustände, Popovers, Modals, Toast-Meldungen und neues Support-Ticket
- Eigenständige, optimierte generierte Medien für die Willkommensfläche und Fahrzeugdarstellung unter `public/assets`

## Lokal starten

```bash
npm install
npm run dev
```

Für einen Produktions-Build:

```bash
npm run build
npm run preview
```

## Backend-Integration

Die Oberfläche arbeitet aktuell mit Demo-Daten in `src/App.jsx`. Für den FiveM-Server können die Datenquellen anschließend gegen die vorhandene API/Authentifizierung ausgetauscht werden. Sinnvolle Endpunkte sind beispielsweise:

```text
GET  /api/me
GET  /api/characters
GET  /api/vehicles
GET  /api/factions
GET  /api/activities
GET  /api/support/tickets
POST /api/support/tickets
```

Die React-Komponenten sind dafür bereits nach den Bereichen des UCP getrennt. Die Demo ist bewusst ohne FiveM-Framework-, Datenbank- oder OAuth-Abhängigkeit gehalten, damit die konkrete Serverbasis (ESX, QBCore oder eigene Ressourcen) später angeschlossen werden kann.

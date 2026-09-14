import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Bell,
  Building2,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  FileText,
  Gauge,
  Home,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Package,
  PanelLeftClose,
  Plus,
  Search,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Übersicht', icon: LayoutDashboard },
  { id: 'characters', label: 'Charaktere', icon: UserRound },
  { id: 'vehicles', label: 'Fahrzeuge', icon: Car },
  { id: 'factions', label: 'Fraktionen', icon: UsersRound },
  { id: 'support', label: 'Support', icon: MessageCircle },
];

const characters = [
  {
    id: 'julian',
    name: 'Julian Obermeier',
    short: 'JO',
    tone: 'cyan',
    characterId: '#4821',
    role: 'Zivilist',
    level: 18,
    money: 12450,
    location: 'Los Santos',
    lastSeen: 'Heute, 20:41',
    status: 'Aktiv',
    playtime: '214 Std. 38 Min.',
    created: '12.04.2025',
  },
  {
    id: 'maximilian',
    name: 'Maximilian Brandt',
    short: 'MB',
    tone: 'amber',
    characterId: '#3176',
    role: 'LSPD',
    level: 24,
    money: 85200,
    location: 'Mission Row',
    lastSeen: 'Gestern, 23:17',
    status: 'Offline',
    playtime: '402 Std. 12 Min.',
    created: '21.08.2024',
  },
  {
    id: 'leon',
    name: 'Leon Wagner',
    short: 'LW',
    tone: 'violet',
    characterId: '#5502',
    role: 'Zivilist',
    level: 7,
    money: 3890,
    location: 'Vespucci',
    lastSeen: '12. Mai, 18:42',
    status: 'Offline',
    playtime: '74 Std. 55 Min.',
    created: '03.01.2026',
  },
];

const vehicles = [
  {
    id: 'schafter',
    name: 'Benefactor Schafter V12',
    plate: 'LS · J082',
    type: 'Limousine',
    fuel: 'Benzin',
    power: '412 PS',
    condition: 92,
    location: 'Pillbox Hill Garage',
    status: 'Eingelagert',
    lastUsed: 'Heute, 18:27',
    image: '/assets/schafter-black.webp',
  },
  {
    id: 'sultan',
    name: 'Karin Sultan RS',
    plate: 'LS · J443',
    type: 'Sportwagen',
    fuel: 'Benzin',
    power: '340 PS',
    condition: 78,
    location: 'Vespucci Garage',
    status: 'Eingelagert',
    lastUsed: '12. Mai, 19:04',
    image: '/assets/schafter-black.webp',
  },
  {
    id: 'bison',
    name: 'Bravado Bison',
    plate: 'LS · J901',
    type: 'Nutzfahrzeug',
    fuel: 'Diesel',
    power: '210 PS',
    condition: 64,
    location: 'Sandy Shores Depot',
    status: 'Wartung fällig',
    lastUsed: '08. Mai, 08:11',
    image: '/assets/schafter-black.webp',
  },
];

const activities = [
  { id: 1, time: 'Heute, 20:41', title: 'Charakterlogin', text: 'Julian Obermeier hat sich eingeloggt.', icon: KeyRound, tone: 'cyan' },
  { id: 2, time: 'Heute, 18:27', title: 'Fahrzeug geparkt', text: 'Benefactor Schafter V12 in Garage (Pillbox Hill).', icon: Car, tone: 'blue' },
  { id: 3, time: 'Heute, 16:03', title: 'Fraktion', text: 'Du wurdest in die Fraktion LSPD eingeladen.', icon: UsersRound, tone: 'amber' },
  { id: 4, time: 'Heute, 14:18', title: 'Fahrzeug gekauft', text: 'Benefactor Schafter V12 für $320.000 erworben.', icon: WalletCards, tone: 'green' },
  { id: 5, time: 'Heute, 11:52', title: 'Support-Ticket', text: 'Ticket #7842 wurde als gelöst markiert.', icon: MessageCircle, tone: 'violet' },
];

const factions = [
  {
    id: 'lspd',
    name: 'Los Santos Police Department',
    short: 'LSPD',
    tone: 'blue',
    role: 'Police Officer',
    since: '12.04.2025',
    department: 'Patrol Division',
    status: 'Mitglied',
    description: 'Schutz und Sicherheit für die Bürger von Los Santos.',
  },
  {
    id: 'ems',
    name: 'Emergency Medical Services',
    short: 'EMS',
    tone: 'red',
    role: 'Bewerber',
    since: 'Bewerbung vom 20.05.2025',
    department: 'San Andreas Medical',
    status: 'Bewerbung',
    description: 'Medizinische Versorgung und Rettungsdienst für San Andreas.',
  },
];

const initialTickets = [
  { id: '#7842', subject: 'Charakter lässt sich nicht öffnen', category: 'Charaktere', status: 'Gelöst', updated: 'Heute, 11:52', tone: 'green' },
  { id: '#7816', subject: 'Fraktionszugang prüfen', category: 'Fraktionen', status: 'In Bearbeitung', updated: 'Gestern, 19:20', tone: 'amber' },
  { id: '#7743', subject: 'Frage zum Fahrzeugtransfer', category: 'Fahrzeuge', status: 'Geschlossen', updated: '06. Mai, 14:08', tone: 'slate' },
];

const formatMoney = (value) => `$${value.toLocaleString('de-DE')}`;

function BrandMark({ compact = false }) {
  return (
    <div className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}`}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" role="img">
          <path d="M22 3.5 37.5 12v20L22 40.5 6.5 32V12L22 3.5Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="m22 3.5 15.5 8.8L22 21.1 6.5 12.3 22 3.5Z" fill="currentColor" opacity=".28" />
          <path d="M22 21.1v19.4M13.5 16.2l8.5 4.9 8.5-4.9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m14.6 25.9 7.4 4.1 7.4-4.1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="brand-copy"><strong>FIVEM</strong><span>UCP</span></span>
    </div>
  );
}

function Avatar({ character, size = 'md' }) {
  return (
    <span className={`avatar avatar--${character.tone} avatar--${size}`} aria-hidden="true">
      <span>{character.short}</span>
      {size !== 'sm' && <i />}
    </span>
  );
}

function StatusDot({ status = 'Online', tone = 'online' }) {
  return <span className={`status status--${tone}`}><i />{status}</span>;
}

function Panel({ className = '', children }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function PanelHeader({ title, action, onAction, icon: Icon }) {
  return (
    <div className="panel-header">
      <div className="panel-title-wrap">
        {Icon && <Icon size={18} strokeWidth={1.8} />}
        <h2>{title}</h2>
      </div>
      {action && <button className="panel-action" onClick={onAction}>{action}<ArrowRight size={15} /></button>}
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedCharacterId, setSelectedCharacterId] = useState('julian');
  const [selectedVehicleId, setSelectedVehicleId] = useState('schafter');
  const [selectedFactionId, setSelectedFactionId] = useState('lspd');
  const [globalSearch, setGlobalSearch] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('Alle');
  const [supportFilter, setSupportFilter] = useState('Alle');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [tickets, setTickets] = useState(initialTickets);

  const selectedCharacter = characters.find((character) => character.id === selectedCharacterId) ?? characters[0];
  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? vehicles[0];
  const selectedFaction = factions.find((faction) => faction.id === selectedFactionId) ?? factions[0];
  const currentNav = navItems.find((item) => item.id === activeView) ?? navItems[0];

  const filteredVehicles = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    return vehicles.filter((vehicle) => {
      const matchesFilter = vehicleFilter === 'Alle' || (vehicleFilter === 'Wartung' && vehicle.status === 'Wartung fällig');
      const matchesQuery = !query || `${vehicle.name} ${vehicle.plate} ${vehicle.type}`.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  }, [globalSearch, vehicleFilter]);

  const filteredCharacters = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    return characters.filter((character) => !query || `${character.name} ${character.role} ${character.characterId}`.toLowerCase().includes(query));
  }, [globalSearch]);

  const filteredTickets = useMemo(() => tickets.filter((ticket) => supportFilter === 'Alle' || ticket.status === supportFilter), [supportFilter, tickets]);

  const goTo = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, tone = 'success') => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 3200);
  };

  const selectCharacter = (id, open = false) => {
    setSelectedCharacterId(id);
    if (open) goTo('characters');
  };

  const selectVehicle = (id, open = false) => {
    setSelectedVehicleId(id);
    if (open) goTo('vehicles');
  };

  const selectFaction = (id, open = false) => {
    setSelectedFactionId(id);
    if (open) goTo('factions');
  };

  const handleTicketSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = form.get('subject')?.toString().trim();
    if (!subject) return;
    const newTicket = {
      id: `#${7850 + tickets.length}`,
      subject,
      category: form.get('category')?.toString() || 'Allgemein',
      status: 'Offen',
      updated: 'Gerade eben',
      tone: 'cyan',
    };
    setTickets((current) => [newTicket, ...current]);
    setModal(null);
    showToast('Dein Support-Ticket wurde erstellt.');
  };

  const renderView = () => {
    switch (activeView) {
      case 'characters':
        return <CharactersView characters={filteredCharacters} selected={selectedCharacter} onSelect={selectCharacter} onToast={showToast} />;
      case 'vehicles':
        return <VehiclesView vehicles={filteredVehicles} selected={selectedVehicle} filter={vehicleFilter} onFilter={setVehicleFilter} onSelect={selectVehicle} onToast={showToast} />;
      case 'factions':
        return <FactionsView factions={factions} selected={selectedFaction} onSelect={selectFaction} onToast={showToast} />;
      case 'support':
        return <SupportView tickets={filteredTickets} filter={supportFilter} onFilter={setSupportFilter} onNewTicket={() => setModal('ticket')} />;
      default:
        return (
          <OverviewView
            selectedCharacter={selectedCharacter}
            onSelectCharacter={selectCharacter}
            onOpenVehicle={(id) => selectVehicle(id, true)}
            onOpenFaction={(id) => selectFaction(id, true)}
            onGoTo={goTo}
            onToast={showToast}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand"><BrandMark /></div>
        <nav className="sidebar-nav" aria-label="Hauptnavigation">
          <span className="nav-label">Workspace</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={`nav-item${activeView === item.id ? ' nav-item--active' : ''}`} onClick={() => goTo(item.id)}>
                <Icon size={19} strokeWidth={activeView === item.id ? 2.2 : 1.7} />
                <span>{item.label}</span>
                {item.id === 'support' && <span className="nav-count">2</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item nav-item--muted" onClick={() => showToast('Einstellungen sind für die nächste Version vorbereitet.', 'info')}>
            <Settings2 size={19} strokeWidth={1.7} /><span>Einstellungen</span>
          </button>
          <div className="sidebar-server-note">
            <span className="server-live-dot" />
            <div><strong>Los Santos Roleplay</strong><span>Spieler. Geschichten. Zuhause.</span></div>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-trigger" aria-label="Menü öffnen" onClick={() => setMobileMenuOpen((open) => !open)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="breadcrumb"><Home size={16} /><ChevronRight size={14} /><span>{currentNav.label}</span></div>
          </div>
          <div className="topbar-actions">
            <label className="search-field">
              <Search size={17} />
              <input value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder="Suchen ..." aria-label="UCP durchsuchen" />
              <kbd><Command size={11} /> K</kbd>
            </label>
            <div className="topbar-popover-wrap">
              <button className={`icon-button${notificationsOpen ? ' icon-button--active' : ''}`} aria-label="Benachrichtigungen" onClick={() => { setNotificationsOpen((open) => !open); setProfileOpen(false); }}>
                <Bell size={19} strokeWidth={1.75} /><span className="notification-dot" />
              </button>
              {notificationsOpen && <NotificationPopover onClose={() => setNotificationsOpen(false)} onGoTo={goTo} />}
            </div>
            <div className="profile-wrap">
              <button className="profile-trigger" onClick={() => { setProfileOpen((open) => !open); setNotificationsOpen(false); }}>
                <Avatar character={characters[0]} size="sm" />
                <span className="profile-text"><strong>Julian</strong><StatusDot /></span>
                <ChevronDown size={15} />
              </button>
              {profileOpen && <ProfilePopover onClose={() => setProfileOpen(false)} onGoTo={goTo} onToast={showToast} />}
            </div>
          </div>
        </header>
        {mobileMenuOpen && (
          <div className="mobile-menu" aria-label="Mobile Navigation">
            <div className="mobile-menu-head"><BrandMark compact /><button aria-label="Menü schließen" onClick={() => setMobileMenuOpen(false)}><X size={18} /></button></div>
            {navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={`mobile-menu-item${activeView === item.id ? ' is-active' : ''}`} onClick={() => goTo(item.id)}><Icon size={18} /><span>{item.label}</span></button>; })}
          </div>
        )}
        <div className="page-content">{renderView()}</div>
      </main>

      <nav className="mobile-bottom-nav" aria-label="Mobile Hauptnavigation">
        {navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={activeView === item.id ? 'is-active' : ''} onClick={() => goTo(item.id)}><Icon size={19} /><span>{item.label}</span></button>; })}
      </nav>

      {modal === 'ticket' && <TicketModal onClose={() => setModal(null)} onSubmit={handleTicketSubmit} />}
      {modal?.type === 'character' && <CharacterModal character={modal.character} onClose={() => setModal(null)} />}
      {modal?.type === 'vehicle' && <VehicleModal vehicle={modal.vehicle} onClose={() => setModal(null)} onToast={showToast} />}
      {modal?.type === 'faction' && <FactionModal faction={modal.faction} onClose={() => setModal(null)} />}
      {toast && <div className={`toast toast--${toast.tone}`}><CheckCircle2 size={18} /><span>{toast.message}</span><button onClick={() => setToast(null)} aria-label="Meldung schließen"><X size={15} /></button></div>}
    </div>
  );
}

function NotificationPopover({ onGoTo }) {
  return (
    <div className="popover notifications-popover">
      <div className="popover-head"><div><strong>Benachrichtigungen</strong><span>2 neue Updates</span></div><button aria-label="Benachrichtigungen schließen"><MoreHorizontal size={17} /></button></div>
      <button className="notification-item" onClick={() => onGoTo('factions')}><span className="notification-icon notification-icon--amber"><UsersRound size={16} /></span><span><strong>Neue Fraktionseinladung</strong><small>Du wurdest zum LSPD eingeladen.</small><em>vor 4 Stunden</em></span><i /></button>
      <button className="notification-item" onClick={() => onGoTo('support')}><span className="notification-icon notification-icon--cyan"><MessageCircle size={16} /></span><span><strong>Ticket #7842 gelöst</strong><small>Dein Support-Ticket wurde aktualisiert.</small><em>vor 9 Stunden</em></span><i /></button>
      <button className="popover-footer" onClick={() => onGoTo('support')}>Alle Aktivitäten ansehen <ArrowRight size={15} /></button>
    </div>
  );
}

function ProfilePopover({ onGoTo, onToast }) {
  return (
    <div className="popover profile-popover">
      <div className="profile-popover-head"><Avatar character={characters[0]} /><div><strong>Julian Obermeier</strong><span>Account #JULIAN-01</span></div></div>
      <div className="popover-divider" />
      <button className="popover-menu-item" onClick={() => onGoTo('characters')}><UserRound size={16} />Profil & Charaktere</button>
      <button className="popover-menu-item" onClick={() => onToast('Deine Kontoeinstellungen sind für die nächste Version vorbereitet.', 'info')}><Settings2 size={16} />Kontoeinstellungen</button>
      <button className="popover-menu-item popover-menu-item--danger" onClick={() => onToast('Abmelden ist in der Backend-Integration aktiviert.', 'info')}><LogOut size={16} />Abmelden</button>
    </div>
  );
}

function PageHeading({ title, subtitle, action, onAction, actionIcon: ActionIcon = Plus }) {
  return (
    <div className="page-heading page-heading--inner">
      <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
      {action && <button className="primary-button" onClick={onAction}><ActionIcon size={17} />{action}</button>}
    </div>
  );
}

function OverviewView({ selectedCharacter, onSelectCharacter, onOpenVehicle, onOpenFaction, onGoTo, onToast }) {
  const currentDate = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
  return (
    <div className="view view--overview">
      <div className="page-heading page-heading--overview">
        <div><h1>Guten Abend, Julian</h1><p>Dein Server-Überblick auf einen Blick</p></div>
        <div className="heading-context"><span>{currentDate}</span><q>Gute Leute. Starke Geschichten.</q></div>
      </div>

      <div className="overview-grid overview-grid--top">
        <WelcomePanel onOpen={() => onSelectCharacter(selectedCharacter.id, true)} />
        <ServerStatusPanel onToast={onToast} />
      </div>

      <div className="overview-grid overview-grid--middle">
        <CharactersPanel selectedCharacter={selectedCharacter} onSelect={onSelectCharacter} onOpenAll={() => onGoTo('characters')} />
        <ActivityPanel onOpenAll={() => onGoTo('support')} />
      </div>

      <div className="overview-grid overview-grid--bottom">
        <VehiclesPanel onOpenVehicle={onOpenVehicle} onOpenAll={() => onGoTo('vehicles')} />
        <FactionsPanel onOpenFaction={onOpenFaction} onOpenAll={() => onGoTo('factions')} />
      </div>
    </div>
  );
}

function WelcomePanel({ onOpen }) {
  return (
    <section className="welcome-panel">
      <div className="welcome-copy"><h2>Willkommen zurück in<br />Los Santos</h2><p>Hier verwaltest du deine Charaktere, Fahrzeuge, Fraktionen und mehr.</p><button className="welcome-button" onClick={onOpen}>Charakter öffnen <ArrowRight size={16} /></button></div>
      <div className="welcome-ratio" aria-hidden="true" />
    </section>
  );
}

function ServerStatusPanel({ onToast }) {
  return (
    <Panel className="server-panel"><PanelHeader title="Serverstatus" /><div className="server-status-bar"><StatusDot status="Online" /><span className="server-status-message">Alle Systeme funktionieren einwandfrei.</span></div><div className="server-metrics"><Metric icon={UsersRound} label="Spieler" value="128 / 256" /><Metric icon={Clock3} label="Uptime" value="7 Tage, 14 Std." /><Metric icon={Gauge} label="Ping" value="32 ms" accent /></div><div className="server-footer"><span>Letztes Update: 20:42 Uhr</span><button onClick={() => onToast('Serverstatus wurde aktualisiert.', 'info')}><Activity size={14} /> Aktualisieren</button></div></Panel>
  );
}

function Metric({ icon: Icon, label, value, accent = false }) {
  return <div className="metric"><Icon size={18} strokeWidth={1.7} /><span><small>{label}</small><strong className={accent ? 'metric-accent' : ''}>{value}</strong></span></div>;
}

function CharactersPanel({ selectedCharacter, onSelect, onOpenAll }) {
  return (
    <Panel className="characters-panel"><PanelHeader title="Deine Charaktere" action="Alle Charaktere" onAction={onOpenAll} />
      <div className="character-list">
        {characters.map((character, index) => (
          <button key={character.id} className={`character-row${selectedCharacter.id === character.id ? ' character-row--selected' : ''}`} onClick={() => onSelect(character.id)}>
            <Avatar character={character} />
            <span className="character-main"><strong>{character.name}</strong><small>ID: {character.characterId} <i /> {character.role} <i /> Level {character.level}</small></span>
            {index === 0 && selectedCharacter.id === character.id ? <span className="character-row-action">Aktiv <Check size={14} /></span> : <ChevronRight size={17} className="row-chevron" />}
          </button>
        ))}
      </div>
    </Panel>
  );
}

function ActivityPanel({ onOpenAll }) {
  return (
    <Panel className="activity-panel"><PanelHeader title="Letzte Aktivitäten" action="Alle anzeigen" onAction={onOpenAll} /><div className="activity-list">{activities.map((activity) => { const Icon = activity.icon; return <div className="activity-row" key={activity.id}><span className={`activity-icon activity-icon--${activity.tone}`}><Icon size={15} /></span><span className="activity-time">{activity.time}</span><span className="activity-line" /><span className="activity-copy"><strong>{activity.title}</strong><small>{activity.text}</small></span></div>; })}</div></Panel>
  );
}

function VehiclesPanel({ onOpenVehicle, onOpenAll }) {
  const vehicle = vehicles[0];
  return (
    <Panel className="vehicles-panel"><PanelHeader title="Meine Fahrzeuge" action="Alle Fahrzeuge" onAction={onOpenAll} /><button className="vehicle-feature" onClick={() => onOpenVehicle(vehicle.id)}><span className="vehicle-image"><img src={vehicle.image} alt="" /></span><span className="vehicle-details"><span className="vehicle-title"><strong>{vehicle.name}</strong><em>{vehicle.plate}</em></span><span className="vehicle-specs"><span><Car size={14} />{vehicle.type}</span><span><WalletCards size={14} />{vehicle.fuel}</span><span><Sparkles size={14} />{vehicle.power}</span></span><span className="condition"><span><small>Zustand</small><b>{vehicle.condition} %</b></span><span className="condition-bar"><i style={{ width: `${vehicle.condition}%` }} /></span></span></span><MoreHorizontal size={18} className="vehicle-more" /></button></Panel>
  );
}

function FactionsPanel({ onOpenFaction, onOpenAll }) {
  return (
    <Panel className="factions-panel"><PanelHeader title="Fraktionszugang" action="Alle Fraktionen" onAction={onOpenAll} /><div className="faction-list">{factions.map((faction) => <button className="faction-row" key={faction.id} onClick={() => onOpenFaction(faction.id)}><FactionEmblem faction={faction} /><span className="faction-copy"><strong>{faction.name}</strong><small>{faction.status === 'Mitglied' ? `Rang · ${faction.role}` : faction.since}</small></span><span className={`faction-badge faction-badge--${faction.tone}`}>{faction.status}</span><ChevronRight size={17} /></button>)}</div></Panel>
  );
}

function FactionEmblem({ faction, large = false }) {
  return <span className={`faction-emblem faction-emblem--${faction.tone}${large ? ' faction-emblem--large' : ''}`}><Shield size={large ? 29 : 21} strokeWidth={1.4} /><b>{faction.short}</b></span>;
}

function CharactersView({ characters: filtered, selected, onSelect, onToast }) {
  return (
    <div className="view"><PageHeading title="Charaktere" subtitle="Verwalte deine Identitäten und Fortschritte in Los Santos." action="Neuer Charakter" onAction={() => onToast('Die Charaktererstellung wird mit deinem Server-Backend verbunden.', 'info')} />
      <div className="stat-strip"><StatMini icon={UserRound} label="Charaktere" value="3" /><StatMini icon={Trophy} label="Höchstes Level" value="24" /><StatMini icon={Clock3} label="Spielzeit gesamt" value="691 Std." /><StatMini icon={WalletCards} label="Vermögen gesamt" value="$101.540" /></div>
      <div className="content-split content-split--characters"><Panel className="list-panel"><PanelHeader title="Alle Charaktere" /><div className="full-character-list">{filtered.length ? filtered.map((character) => <button key={character.id} className={`full-character-row${selected.id === character.id ? ' is-selected' : ''}`} onClick={() => onSelect(character.id)}><Avatar character={character} size="lg" /><span><strong>{character.name}</strong><small>{character.characterId} · {character.role} · Level {character.level}</small></span><span className="full-character-status"><StatusDot status={character.status} tone={character.status === 'Aktiv' ? 'online' : 'offline'} /><ChevronRight size={17} /></span></button>) : <EmptyState icon={Search} title="Keine Charaktere gefunden" text="Passe deine Suche an und versuche es erneut." />}</div></Panel><CharacterDetail character={selected} onToast={onToast} /></div>
    </div>
  );
}

function StatMini({ icon: Icon, label, value }) {
  return <div className="stat-mini"><Icon size={17} /><span><small>{label}</small><strong>{value}</strong></span></div>;
}

function CharacterDetail({ character, onToast }) {
  return <Panel className="detail-panel character-detail"><div className="detail-cover"><span className="detail-cover-grid" /></div><div className="detail-body"><div className="detail-identity"><Avatar character={character} size="xl" /><div><h2>{character.name}</h2><p>{character.characterId} · erstellt am {character.created}</p><StatusDot status={character.status} tone={character.status === 'Aktiv' ? 'online' : 'offline'} /></div></div><div className="detail-data-grid"><DataPoint label="Rolle" value={character.role} icon={ShieldCheck} /><DataPoint label="Level" value={`${character.level}`} icon={Trophy} /><DataPoint label="Kontostand" value={formatMoney(character.money)} icon={WalletCards} /><DataPoint label="Spielzeit" value={character.playtime} icon={Clock3} /></div><div className="detail-location"><MapPin size={16} /><span><small>Letzter Standort</small><strong>{character.location}</strong></span><button onClick={() => onToast('Charakterdaten sind aktuell.', 'info')}><ArrowDownRight size={15} /> Details</button></div></div></Panel>;
}

function VehiclesView({ vehicles: filtered, selected, filter, onFilter, onSelect, onToast }) {
  return <div className="view"><PageHeading title="Fahrzeuge" subtitle="Behalte deine Garage, Zustände und Stellplätze im Blick." action="Fahrzeug registrieren" onAction={() => onToast('Die Fahrzeugregistrierung wird mit deinem Server-Backend verbunden.', 'info')} actionIcon={Plus} /><div className="view-toolbar"><div className="filter-tabs">{['Alle', 'Wartung'].map((item) => <button key={item} className={filter === item ? 'is-active' : ''} onClick={() => onFilter(item)}>{item}{item === 'Wartung' && <span>1</span>}</button>)}</div><span className="toolbar-result">{filtered.length} von {vehicles.length} Fahrzeugen</span></div><div className="content-split content-split--vehicles"><Panel className="list-panel vehicle-list-panel"><PanelHeader title="Garage" />{filtered.length ? filtered.map((vehicle) => <button key={vehicle.id} className={`vehicle-list-row${selected.id === vehicle.id ? ' is-selected' : ''}`} onClick={() => onSelect(vehicle.id)}><img src={vehicle.image} alt="" /><span><strong>{vehicle.name}</strong><small>{vehicle.plate} · {vehicle.type}</small></span><span className="vehicle-list-condition"><span className={vehicle.condition < 70 ? 'is-warning' : ''}>{vehicle.condition}%</span><small>{vehicle.status}</small></span><ChevronRight size={17} /></button>) : <EmptyState icon={Car} title="Keine Wartungstermine" text="Alle Fahrzeuge sind aktuell einsatzbereit." />}</Panel><VehicleDetail vehicle={selected} onToast={onToast} /></div></div>;
}

function VehicleDetail({ vehicle, onToast }) {
  return <Panel className="detail-panel vehicle-detail"><div className="vehicle-detail-image"><img src={vehicle.image} alt="" /><span className="vehicle-detail-overlay"><span>Garage · {vehicle.location}</span><StatusDot status={vehicle.status} tone={vehicle.condition < 70 ? 'warning' : 'online'} /></span></div><div className="vehicle-detail-content"><div className="detail-title-row"><div><h2>{vehicle.name}</h2><p>{vehicle.plate}</p></div><button className="icon-button icon-button--subtle" onClick={() => onToast('Fahrzeugoptionen geöffnet.', 'info')}><MoreHorizontal size={18} /></button></div><div className="vehicle-detail-specs"><DataPoint label="Fahrzeugtyp" value={vehicle.type} icon={Car} /><DataPoint label="Antrieb" value={vehicle.fuel} icon={Gauge} /><DataPoint label="Leistung" value={vehicle.power} icon={Sparkles} /></div><div className="vehicle-health"><div><span><small>Fahrzeugzustand</small><strong>{vehicle.condition}%</strong></span><span className="health-bar"><i style={{ width: `${vehicle.condition}%` }} /></span></div><p>Letzte Nutzung <strong>{vehicle.lastUsed}</strong></p></div><button className="secondary-button" onClick={() => onToast('Fahrzeug wurde zur Ausfahrt vorgemerkt.', 'success')}><KeyRound size={16} /> Fahrzeug auswählen</button></div></Panel>;
}

function FactionsView({ factions: factionList, selected, onSelect, onToast }) {
  return <div className="view"><PageHeading title="Fraktionen" subtitle="Deine Rollen, Bewerbungen und Zugänge an einem Ort." action="Bewerbung starten" onAction={() => onToast('Die Bewerbungsstrecke wird mit deinem Server-Backend verbunden.', 'info')} actionIcon={Plus} /><div className="content-split content-split--factions"><Panel className="list-panel faction-list-panel"><PanelHeader title="Deine Fraktionen" />{factionList.map((faction) => <button key={faction.id} className={`full-faction-row${selected.id === faction.id ? ' is-selected' : ''}`} onClick={() => onSelect(faction.id)}><FactionEmblem faction={faction} large /><span><strong>{faction.name}</strong><small>{faction.status === 'Mitglied' ? `${faction.role} · ${faction.department}` : faction.since}</small></span><span className={`faction-badge faction-badge--${faction.tone}`}>{faction.status}</span><ChevronRight size={17} /></button>)}<button className="empty-action" onClick={() => onToast('Weitere Fraktionen werden vom Server geladen.', 'info')}><Plus size={17} /> Weitere Fraktion entdecken</button></Panel><FactionDetail faction={selected} onToast={onToast} /></div></div>;
}

function FactionDetail({ faction, onToast }) {
  return <Panel className="detail-panel faction-detail"><div className={`faction-detail-head faction-detail-head--${faction.tone}`}><FactionEmblem faction={faction} large /><div><StatusDot status={faction.status} tone={faction.status === 'Mitglied' ? 'online' : 'warning'} /><h2>{faction.name}</h2><p>{faction.description}</p></div></div><div className="faction-detail-body"><div className="faction-meta"><DataPoint label="Rang" value={faction.role} icon={ShieldCheck} /><DataPoint label="Dabei seit" value={faction.since.replace('Bewerbung vom ', '')} icon={Clock3} /><DataPoint label="Abteilung" value={faction.department} icon={Building2} /></div><div className="permission-box"><div><ShieldCheck size={18} /><span><strong>Zugriff aktiv</strong><small>Du kannst die Fraktionsfunktionen im Spiel nutzen.</small></span></div><button onClick={() => onToast('Fraktionsdetails wurden synchronisiert.', 'info')}><Activity size={15} /> Synchronisieren</button></div></div></Panel>;
}

function SupportView({ tickets: filtered, filter, onFilter, onNewTicket }) {
  return <div className="view"><PageHeading title="Support" subtitle="Wir helfen dir bei Fragen, Problemen und deinem Server-Erlebnis." action="Neues Ticket" onAction={onNewTicket} /><div className="support-layout"><Panel className="list-panel support-list-panel"><div className="support-list-head"><div><h2>Deine Tickets</h2><p>Alle Anfragen und deren aktueller Status.</p></div><div className="filter-tabs filter-tabs--compact">{['Alle', 'Offen', 'In Bearbeitung', 'Gelöst'].map((item) => <button key={item} className={filter === item ? 'is-active' : ''} onClick={() => onFilter(item)}>{item}</button>)}</div></div>{filtered.length ? <div className="ticket-list">{filtered.map((ticket) => <button className="ticket-row" key={ticket.id} onClick={() => {}}><span className={`ticket-icon ticket-icon--${ticket.tone}`}><Ticket size={16} /></span><span className="ticket-main"><strong>{ticket.subject}</strong><small>{ticket.id} <i /> {ticket.category}</small></span><span className={`ticket-status ticket-status--${ticket.tone}`}>{ticket.status}</span><span className="ticket-updated">{ticket.updated}</span><ChevronRight size={17} /></button>)}</div> : <EmptyState icon={Ticket} title="Keine Tickets in diesem Filter" text="Du hast hier aktuell keine offenen Anfragen." />}</Panel><SupportAside onNewTicket={onNewTicket} /></div></div>;
}

function SupportAside({ onNewTicket }) {
  return <aside className="support-aside"><div className="support-aside-icon"><LifeBuoy size={24} /></div><h2>Brauchst du Hilfe?</h2><p>Unser Support-Team ist für dich da. Erstelle ein Ticket und wir melden uns so schnell wie möglich.</p><button className="primary-button primary-button--wide" onClick={onNewTicket}><Plus size={17} /> Neues Ticket erstellen</button><div className="support-contact"><span><Mail size={15} />support@fivem-ucp.local</span><span><Clock3 size={15} />Antwort innerhalb von 24 Std.</span></div></aside>;
}

function DataPoint({ label, value, icon: Icon }) {
  return <div className="data-point"><Icon size={16} /><span><small>{label}</small><strong>{value}</strong></span></div>;
}

function EmptyState({ icon: Icon, title, text }) {
  return <div className="empty-state"><span><Icon size={22} /></span><strong>{title}</strong><p>{text}</p></div>;
}

function ModalFrame({ title, subtitle, onClose, children, className = '' }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className={`modal ${className}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-header"><div><h2 id="modal-title">{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-button icon-button--subtle" onClick={onClose} aria-label="Dialog schließen"><X size={18} /></button></div>{children}</div></div>;
}

function TicketModal({ onClose, onSubmit }) {
  return <ModalFrame title="Neues Support-Ticket" subtitle="Beschreibe dein Anliegen so genau wie möglich." onClose={onClose}><form className="ticket-form" onSubmit={onSubmit}><label>Betreff<input name="subject" placeholder="Wobei können wir dir helfen?" autoFocus required /></label><label>Kategorie<select name="category" defaultValue="Allgemein"><option>Allgemein</option><option>Charaktere</option><option>Fahrzeuge</option><option>Fraktionen</option><option>Technik</option></select></label><label>Beschreibung<textarea name="description" placeholder="Weitere Informationen zu deinem Anliegen ..." rows="5" /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Abbrechen</button><button type="submit" className="primary-button"><SendIcon /> Ticket erstellen</button></div></form></ModalFrame>;
}

function SendIcon() { return <ArrowRight size={16} />; }

function CharacterModal({ character, onClose }) {
  return <ModalFrame title={character.name} subtitle={`${character.characterId} · ${character.role}`} onClose={onClose}><div className="modal-character"><Avatar character={character} size="xl" /><div className="modal-character-stats"><DataPoint label="Level" value={character.level} icon={Trophy} /><DataPoint label="Kontostand" value={formatMoney(character.money)} icon={WalletCards} /><DataPoint label="Standort" value={character.location} icon={MapPin} /></div></div></ModalFrame>;
}

function VehicleModal({ vehicle, onClose, onToast }) {
  return <ModalFrame title={vehicle.name} subtitle={`${vehicle.plate} · ${vehicle.type}`} onClose={onClose}><div className="modal-vehicle"><img src={vehicle.image} alt="" /><div className="modal-vehicle-copy"><StatusDot status={vehicle.status} tone={vehicle.condition < 70 ? 'warning' : 'online'} /><p>Fahrzeugzustand</p><strong>{vehicle.condition}%</strong><span className="health-bar"><i style={{ width: `${vehicle.condition}%` }} /></span></div></div><div className="modal-actions"><button className="secondary-button" onClick={onClose}>Schließen</button><button className="primary-button" onClick={() => { onToast('Fahrzeug wurde ausgewählt.', 'success'); onClose(); }}><KeyRound size={16} /> Auswählen</button></div></ModalFrame>;
}

function FactionModal({ faction, onClose }) {
  return <ModalFrame title={faction.name} subtitle={faction.status} onClose={onClose}><div className="modal-faction"><FactionEmblem faction={faction} large /><div><strong>{faction.role}</strong><p>{faction.description}</p><small>{faction.department} · {faction.since}</small></div></div></ModalFrame>;
}

export default App;

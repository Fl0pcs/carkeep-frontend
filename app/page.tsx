"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Wrench,
  Bell,
  FileText,
  CreditCard,
  Settings,
  Shield,
  Calendar,
  Gauge,
  Plus,
  Search,
  Filter,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Globe,
  Menu,
  X,
  TrendingUp,
  Wallet,
  Upload,
  Download,
  Sparkles,
  User,
  LogIn,
  Trash2,
  Pencil,
  Inbox,
} from "lucide-react";

const translations = {
  en: {
    brand: "CarKeep",
    heroBadge: "Smart maintenance history for every car",
    heroTitle: "Never forget tires, brakes, oil, or anything important again.",
    heroText:
      "A premium car maintenance dashboard for private owners and small fleets. Track every service, get reminders, and keep a clean history you can trust.",
    getStarted: "Get started",
    watchDemo: "See dashboard",
    navDashboard: "Dashboard",
    navCars: "Cars",
    navServices: "Services",
    navReminders: "Reminders",
    navReports: "Reports",
    navBilling: "Billing",
    navSettings: "Settings",
    navSupport: "Support",
    welcome: "Welcome back",
    overview: "Overview",
    totalCars: "Total cars",
    upcomingServices: "Upcoming services",
    thisMonthCost: "This month cost",
    completedEntries: "Completed entries",
    addCar: "Add car",
    addService: "Add service",
    searchCars: "Search cars, plates, VIN...",
    allCars: "All cars",
    serviceHistory: "Service history",
    reminders: "Reminders",
    reports: "Reports",
    pricing: "Pricing",
    settings: "Settings",
    language: "Language",
    profile: "Profile",
    notifications: "Notifications",
    security: "Security",
    billing: "Billing",
    premium: "Premium",
    free: "Free",
    nextService: "Next service",
    mileage: "Mileage",
    cost: "Cost",
    workshop: "Workshop",
    notes: "Notes",
    date: "Date",
    type: "Type",
    status: "Status",
    dueSoon: "Due soon",
    overdue: "Overdue",
    done: "Done",
    activePlan: "Active plan",
    monthly: "Monthly",
    yearly: "Yearly",
    upgrade: "Upgrade",
    exportPdf: "Export PDF",
    uploadInvoice: "Upload invoice",
    loginTitle: "Login is connected later",
    loginText:
      "Your login UI already exists. This frontend keeps auth-ready states and placeholders so you can connect the backend later without redesigning the app.",
    backendMissing: "Backend not connected yet",
    garage: "Garage",
    timeline: "Timeline",
    insights: "Insights",
    upcoming: "Upcoming",
    latestActivity: "Latest activity",
    viewAll: "View all",
    carHealth: "Car health",
    quickActions: "Quick actions",
    recentDocuments: "Recent documents",
    noBackendBanner:
      "Frontend mode: all actions are simulated locally for preview. Connect your API later.",
    addNewCar: "Add new car",
    addNewService: "Add new service record",
    brand: "CarKeep",
    model: "Model",
    year: "Year",
    plate: "Plate number",
    vin: "VIN",
    save: "Save",
    cancel: "Cancel",
    oilChange: "Oil change",
    tires: "Tires",
    brakes: "Brakes",
    inspection: "Inspection",
    filters: "Filters",
    battery: "Battery",
    reminderEmail: "Reminder emails",
    pushAlerts: "Push alerts",
    maintenanceDigest: "Monthly maintenance digest",
    privacy: "Privacy",
    deleteAccount: "Delete account",
    connectedLater: "Connected later",
    planFreeText: "1 car, basic history, simple reminders",
    planProText: "Unlimited cars, reports, invoices, premium reminders",
    login: "Login",
    logout: "Logout",
    appReady: "Frontend ready",
    multilingual: "EN / ET / RU",
  },
  et: {
    brand: "CarKeep",
    heroBadge: "Nutikas hooldusajalugu igale autole",
    heroTitle: "Ära unusta enam kunagi rehve, pidureid, õlivahetust ega muid tähtsaid asju.",
    heroText:
      "Premium auto hoolduse juhtpaneel eraisikule ja väikesele autopargile. Hoia kõik tööd kirjas, saa meeldetuletusi ja säilita usaldusväärne ajalugu.",
    getStarted: "Alusta",
    watchDemo: "Vaata juhtpaneeli",
    navDashboard: "Avaleht",
    navCars: "Autod",
    navServices: "Hooldused",
    navReminders: "Meeldetuletused",
    navReports: "Raportid",
    navBilling: "Arveldus",
    navSettings: "Seaded",
    navSupport: "Tugi",
    welcome: "Tere tagasi",
    overview: "Ülevaade",
    totalCars: "Autode arv",
    upcomingServices: "Tulevad hooldused",
    thisMonthCost: "Selle kuu kulu",
    completedEntries: "Tehtud kanded",
    addCar: "Lisa auto",
    addService: "Lisa hooldus",
    searchCars: "Otsi autosid, numbreid, VIN-i...",
    allCars: "Kõik autod",
    serviceHistory: "Hooldusajalugu",
    reminders: "Meeldetuletused",
    reports: "Raportid",
    pricing: "Hinnastus",
    settings: "Seaded",
    language: "Keel",
    profile: "Profiil",
    notifications: "Teavitused",
    security: "Turvalisus",
    billing: "Arveldus",
    premium: "Premium",
    free: "Tasuta",
    nextService: "Järgmine hooldus",
    mileage: "Läbisõit",
    cost: "Maksumus",
    workshop: "Töökoda",
    notes: "Märkused",
    date: "Kuupäev",
    type: "Tüüp",
    status: "Staatus",
    dueSoon: "Varsti käes",
    overdue: "Hilinenud",
    done: "Tehtud",
    activePlan: "Aktiivne pakett",
    monthly: " Kuus",
    yearly: "Aastane",
    upgrade: "Uuenda paketti",
    exportPdf: "Ekspordi PDF",
    uploadInvoice: "Laadi arve üles",
    loginTitle: "Sisselogimine ühendatakse hiljem",
    loginText:
      "Sinu login UI on juba olemas. See frontend hoiab kõik auth-ready olekud ja placeholderid valmis, et saaksid backendi hiljem ilma ümberdisainita ühendada.",
    backendMissing: "Backend pole veel ühendatud",
    garage: "Garaaž",
    timeline: "Ajajoon",
    insights: "Ülevaated",
    upcoming: "Tulemas",
    latestActivity: "Viimased tegevused",
    viewAll: "Vaata kõiki",
    carHealth: "Auto seisukord",
    quickActions: "Kiirtegevused",
    recentDocuments: "Hiljutised dokumendid",
    noBackendBanner:
      "Frontend režiim: kõik tegevused on eelvaates lokaalselt simuleeritud. Ühenda API hiljem.",
    addNewCar: "Lisa uus auto",
    addNewService: "Lisa uus hoolduskirje",
    model: "Mudel",
    year: "Aasta",
    plate: "Reg. number",
    vin: "VIN",
    save: "Salvesta",
    cancel: "Tühista",
    oilChange: "Õlivahetus",
    tires: "Rehvid",
    brakes: "Pidurid",
    inspection: "Ülevaatus",
    filters: "Filtrid",
    battery: "Aku",
    reminderEmail: "Meeldetuletused e-postile",
    pushAlerts: "Push-teavitused",
    maintenanceDigest: "Igakuine hooldusülevaade",
    privacy: "Privaatsus",
    deleteAccount: "Kustuta konto",
    connectedLater: "Ühendatakse hiljem",
    planFreeText: "1 auto, lihtne ajalugu, põhilised meeldetuletused",
    planProText: "Piiramatu autod, raportid, arved, premium meeldetuletused",
    login: "Logi sisse",
    logout: "Logi välja",
    appReady: "Frontend valmis",
    multilingual: "EN / ET / RU",
  },
  ru: {
    brand: "CarKeep",
    heroBadge: "Умная история обслуживания для каждого автомобиля",
    heroTitle: "Больше не забывайте про шины, тормоза, масло и другие важные вещи.",
    heroText:
      "Премиальная панель управления обслуживанием автомобиля для частных владельцев и небольших автопарков. Храните всю историю, получайте напоминания и поддерживайте порядок.",
    getStarted: "Начать",
    watchDemo: "Открыть панель",
    navDashboard: "Панель",
    navCars: "Автомобили",
    navServices: "Обслуживание",
    navReminders: "Напоминания",
    navReports: "Отчёты",
    navBilling: "Оплата",
    navSettings: "Настройки",
    navSupport: "Поддержка",
    welcome: "С возвращением",
    overview: "Обзор",
    totalCars: "Всего авто",
    upcomingServices: "Предстоящие работы",
    thisMonthCost: "Расходы за месяц",
    completedEntries: "Завершённые записи",
    addCar: "Добавить авто",
    addService: "Добавить запись",
    searchCars: "Поиск по авто, номеру, VIN...",
    allCars: "Все автомобили",
    serviceHistory: "История обслуживания",
    reminders: "Напоминания",
    reports: "Отчёты",
    pricing: "Тарифы",
    settings: "Настройки",
    language: "Язык",
    profile: "Профиль",
    notifications: "Уведомления",
    security: "Безопасность",
    billing: "Оплата",
    premium: "Премиум",
    free: "Бесплатно",
    nextService: "Следующее обслуживание",
    mileage: "Пробег",
    cost: "Стоимость",
    workshop: "Сервис",
    notes: "Заметки",
    date: "Дата",
    type: "Тип",
    status: "Статус",
    dueSoon: "Скоро",
    overdue: "Просрочено",
    done: "Выполнено",
    activePlan: "Активный тариф",
    monthly: "Ежемесячно",
    yearly: "Ежегодно",
    upgrade: "Улучшить тариф",
    exportPdf: "Экспорт PDF",
    uploadInvoice: "Загрузить счёт",
    loginTitle: "Вход подключается позже",
    loginText:
      "Ваш интерфейс входа уже есть. Этот frontend содержит все состояния и заглушки, чтобы вы позже подключили backend без редизайна.",
    backendMissing: "Backend ещё не подключён",
    garage: "Гараж",
    timeline: "Лента",
    insights: "Аналитика",
    upcoming: "Скоро",
    latestActivity: "Последняя активность",
    viewAll: "Показать всё",
    carHealth: "Состояние авто",
    quickActions: "Быстрые действия",
    recentDocuments: "Последние документы",
    noBackendBanner:
      "Режим frontend: все действия локально симулируются для предпросмотра. API можно подключить позже.",
    addNewCar: "Добавить новый автомобиль",
    addNewService: "Добавить новую запись обслуживания",
    model: "Модель",
    year: "Год",
    plate: "Номер",
    vin: "VIN",
    save: "Сохранить",
    cancel: "Отмена",
    oilChange: "Замена масла",
    tires: "Шины",
    brakes: "Тормоза",
    inspection: "Техосмотр",
    filters: "Фильтры",
    battery: "Аккумулятор",
    reminderEmail: "Email-напоминания",
    pushAlerts: "Push-уведомления",
    maintenanceDigest: "Ежемесячная сводка",
    privacy: "Конфиденциальность",
    deleteAccount: "Удалить аккаунт",
    connectedLater: "Подключается позже",
    planFreeText: "1 авто, базовая история, простые напоминания",
    planProText: "Безлимитные авто, отчёты, счета, premium-напоминания",
    login: "Войти",
    logout: "Выйти",
    appReady: "Frontend готов",
    multilingual: "EN / ET / RU",
  },
};

const initialCars = [
  {
    id: 1,
    brand: "BMW",
    model: "530d xDrive",
    year: 2020,
    plate: "123ABC",
    vin: "WBA5N71030G123456",
    mileage: 118400,
    health: 92,
    nextService: "2026-04-14",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    brand: "Toyota",
    model: "RAV4 Hybrid",
    year: 2021,
    plate: "987XYZ",
    vin: "JTMDW3FV50D654321",
    mileage: 76400,
    health: 88,
    nextService: "2026-05-03",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
];

const initialServices = [
  {
    id: 1,
    carId: 1,
    type: "Oil change",
    date: "2026-03-01",
    mileage: 116000,
    cost: 149,
    workshop: "Nordic Garage",
    notes: "Changed oil and filter",
    status: "done",
  },
  {
    id: 2,
    carId: 1,
    type: "Brakes",
    date: "2026-04-09",
    mileage: 118900,
    cost: 420,
    workshop: "BrakeLab",
    notes: "Front pads due",
    status: "dueSoon",
  },
  {
    id: 3,
    carId: 2,
    type: "Tires",
    date: "2026-04-17",
    mileage: 77000,
    cost: 80,
    workshop: "TyrePoint",
    notes: "Seasonal swap",
    status: "dueSoon",
  },
  {
    id: 4,
    carId: 2,
    type: "Inspection",
    date: "2026-02-14",
    mileage: 74200,
    cost: 65,
    workshop: "City Center Inspection",
    notes: "Passed",
    status: "done",
  },
];

const initialDocs = [
  { id: 1, name: "BMW_Oil_Invoice.pdf", date: "2026-03-01", car: "BMW 530d" },
  { id: 2, name: "RAV4_Inspection_Report.pdf", date: "2026-02-14", car: "Toyota RAV4" },
];

const pageIcons = {
  dashboard: Gauge,
  cars: Car,
  services: Wrench,
  reminders: Bell,
  reports: FileText,
  billing: CreditCard,
  settings: Settings,
};

function StatCard({ icon: Icon, label, value, subtitle }) {
  return (
    <motion.div
      layout
      className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</h3>
          <p className="mt-2 text-sm text-white/50">{subtitle}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function SectionTitle({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {action}
    </div>
  );
}

function StatusPill({ status, t }) {
  const map = {
    done: { label: t.done, icon: CheckCircle2, cls: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20" },
    dueSoon: { label: t.dueSoon, icon: Clock3, cls: "bg-amber-500/15 text-amber-300 border-amber-400/20" },
    overdue: { label: t.overdue, icon: AlertTriangle, cls: "bg-rose-500/15 text-rose-300 border-rose-400/20" },
  };
  const item = map[status] || map.done;
  const Icon = item.icon;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${item.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  );
}

function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-slate-950/95 p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function CarCareFrontend() {
  const [lang, setLang] = useState("et");
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cars, setCars] = useState(initialCars);
  const [services, setServices] = useState(initialServices);
  const [docs] = useState(initialDocs);
  const [plan, setPlan] = useState("free");
  const [search, setSearch] = useState("");
  const [showCarModal, setShowCarModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [carForm, setCarForm] = useState({ brand: "", model: "", year: "", plate: "", vin: "" });
  const [serviceForm, setServiceForm] = useState({ carId: "1", type: "Oil change", date: "", mileage: "", cost: "", workshop: "", notes: "" });
  const t = translations[lang];

  const filteredCars = useMemo(() => {
    const q = search.toLowerCase();
    return cars.filter(
      (car) =>
        !q ||
        `${car.brand} ${car.model} ${car.plate} ${car.vin}`.toLowerCase().includes(q)
    );
  }, [cars, search]);

  const upcomingCount = services.filter((s) => s.status === "dueSoon" || s.status === "overdue").length;
  const monthCost = services.reduce((sum, s) => sum + Number(s.cost || 0), 0);

  const navItems = [
    { key: "dashboard", label: t.navDashboard },
    { key: "cars", label: t.navCars },
    { key: "services", label: t.navServices },
    { key: "reminders", label: t.navReminders },
    { key: "reports", label: t.navReports },
    { key: "billing", label: t.navBilling },
    { key: "settings", label: t.navSettings },
  ];

  const handleAddCar = () => {
    if (!carForm.brand || !carForm.model) return;
    const next = {
      id: Date.now(),
      brand: carForm.brand,
      model: carForm.model,
      year: Number(carForm.year || 2024),
      plate: carForm.plate || "NEW000",
      vin: carForm.vin || "VINPENDING123456789",
      mileage: 0,
      health: 100,
      nextService: "2026-06-01",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    };
    setCars((prev) => [next, ...prev]);
    setCarForm({ brand: "", model: "", year: "", plate: "", vin: "" });
    setShowCarModal(false);
    setPage("cars");
  };

  const handleAddService = () => {
    const next = {
      id: Date.now(),
      carId: Number(serviceForm.carId),
      type: serviceForm.type,
      date: serviceForm.date || "2026-04-01",
      mileage: Number(serviceForm.mileage || 0),
      cost: Number(serviceForm.cost || 0),
      workshop: serviceForm.workshop || "Workshop",
      notes: serviceForm.notes || "-",
      status: "dueSoon",
    };
    setServices((prev) => [next, ...prev]);
    setServiceForm({ carId: String(cars[0]?.id || 1), type: "Oil change", date: "", mileage: "", cost: "", workshop: "", notes: "" });
    setShowServiceModal(false);
    setPage("services");
  };

  const selectedPageIcon = pageIcons[page] || Gauge;
  const SelectedIcon = selectedPageIcon;

  const isDark = theme === "dark";

  return (
    <div className={isDark ? "min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.15),_transparent_25%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#020617_100%)] text-white transition-colors duration-300" : "light-theme min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(196,181,253,0.10),_transparent_25%),linear-gradient(180deg,_#eef4fb_0%,_#e8f0f8_55%,_#eef4fb_100%)] text-slate-900 transition-colors duration-300"}>
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={isDark ? "mb-4 overflow-hidden rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100 backdrop-blur-xl" : "mb-4 overflow-hidden rounded-[28px] border border-sky-200 bg-white/80 px-4 py-3 text-sm text-sky-900 shadow-sm backdrop-blur-xl"}
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{t.noBackendBanner}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
              <Sparkles className="h-3.5 w-3.5" /> {t.appReady} · {t.multilingual}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className={isDark ? "sticky top-4 rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "sticky top-4 rounded-[32px] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-2xl"}>
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight">{t.brand}</div>
                  <div className="text-xs text-white/50">{t.heroBadge}</div>
                </div>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = pageIcons[item.key];
                  const active = page === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setPage(item.key)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                        active ? "bg-white text-slate-950" : "bg-transparent text-white/75 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4.5 w-4.5" />
                        <span className="font-medium">{item.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[26px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-white/70">{t.activePlan}</span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs">{plan === "pro" ? t.premium : t.free}</span>
                </div>
                <p className="text-sm text-white/60">{plan === "pro" ? t.planProText : t.planFreeText}</p>
                <button
                  onClick={() => setPage("billing")}
                  className="mt-4 w-full rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:opacity-90"
                >
                  {t.upgrade}
                </button>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenu((v) => !v)}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-white/55">
                    <SelectedIcon className="h-4 w-4" />
                    <span className="text-sm">{t.overview}</span>
                  </div>
                  <h1 className="mt-1 text-3xl font-semibold tracking-tight">{page === "dashboard" ? t.welcome : navItems.find(n => n.key === page)?.label}</h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={isDark ? "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10" : "rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"}
                >
                  {isDark ? "Light mode" : "Dark mode"}
                </button>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <Globe className="h-4 w-4 text-white/60" />
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="bg-transparent text-sm text-white outline-none"
                  >
                    <option value="en" className="text-slate-950">English</option>
                    <option value="et" className="text-slate-950">Eesti</option>
                    <option value="ru" className="text-slate-950">Русский</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowServiceModal(true)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> {t.addService}</span>
                </button>
                <button
                  onClick={() => setShowCarModal(true)}
                  className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:opacity-90"
                >
                  <span className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> {t.addCar}</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {mobileMenu ? (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="mb-4 rounded-[28px] border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl lg:hidden"
                >
                  <div className="grid gap-2">
                    {navItems.map((item) => {
                      const Icon = pageIcons[item.key];
                      return (
                        <button
                          key={item.key}
                          onClick={() => {
                            setPage(item.key);
                            setMobileMenu(false);
                          }}
                          className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-left text-white/80"
                        >
                          <Icon className="h-4 w-4" /> {item.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {page === "dashboard" && (
              <div className="space-y-6">
                <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={isDark ? "overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl" : "overflow-hidden rounded-[36px] border border-slate-200 bg-white/85 shadow-sm backdrop-blur-2xl"}
                  >
                    <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                      <div className="p-7 lg:p-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                          <Sparkles className="h-3.5 w-3.5" /> {t.heroBadge}
                        </div>
                        <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
                          {t.heroTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">{t.heroText}</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <button className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950">{t.getStarted}</button>
                          <button onClick={() => setPage("cars")} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white">{t.watchDemo}</button>
                        </div>
                      </div>
                      <div className="relative min-h-[300px] overflow-hidden">
                        <img
                          src={cars[0].image}
                          alt="Car"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 rounded-[26px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm text-white/60">{t.carHealth}</div>
                              <div className="mt-1 text-3xl font-semibold">{cars[0].health}%</div>
                            </div>
                            <StatusPill status="dueSoon" t={t} />
                          </div>
                          <div className="mt-4 text-sm text-white/70">{cars[0].brand} {cars[0].model} · {cars[0].plate}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    <StatCard icon={Car} label={t.totalCars} value={cars.length} subtitle={t.garage} />
                    <StatCard icon={Bell} label={t.upcomingServices} value={upcomingCount} subtitle={t.upcoming} />
                    <StatCard icon={Wallet} label={t.thisMonthCost} value={`€${monthCost}`} subtitle={t.insights} />
                    <StatCard icon={TrendingUp} label={t.completedEntries} value={services.length} subtitle={t.timeline} />
                  </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                    <SectionTitle
                      title={t.latestActivity}
                      action={<button className="text-sm text-white/60 transition hover:text-white">{t.viewAll}</button>}
                    />
                    <div className="space-y-3">
                      {services.slice(0, 4).map((service) => {
                        const car = cars.find((c) => c.id === service.carId);
                        return (
                          <div key={service.id} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-3">
                              <div className="rounded-2xl bg-white/10 p-3"><Wrench className="h-4 w-4" /></div>
                              <div>
                                <div className="font-medium text-white">{service.type}</div>
                                <div className="text-sm text-white/55">{car?.brand} {car?.model} · {service.workshop}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-sm text-white/60">{service.date}</div>
                              <StatusPill status={service.status} t={t} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                      <SectionTitle title={t.quickActions} />
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { icon: Plus, label: t.addNewCar, onClick: () => setShowCarModal(true) },
                          { icon: Wrench, label: t.addNewService, onClick: () => setShowServiceModal(true) },
                          { icon: Download, label: t.exportPdf, onClick: () => setPage("reports") },
                          { icon: Upload, label: t.uploadInvoice, onClick: () => setPage("reports") },
                        ].map((item) => (
                          <button
                            key={item.label}
                            onClick={item.onClick}
                            className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
                          >
                            <item.icon className="mb-3 h-5 w-5 text-white/75" />
                            <div className="font-medium text-white">{item.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                      <SectionTitle title={t.recentDocuments} />
                      <div className="space-y-3">
                        {docs.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center gap-3">
                              <div className="rounded-2xl bg-white/10 p-3"><FileText className="h-4 w-4" /></div>
                              <div>
                                <div className="font-medium">{doc.name}</div>
                                <div className="text-sm text-white/55">{doc.car} · {doc.date}</div>
                              </div>
                            </div>
                            <button className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {page === "cars" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="relative w-full md:max-w-xl">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t.searchCars}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none placeholder:text-white/35"
                    />
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                    <Filter className="h-4 w-4" /> {t.filters}
                  </button>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  {filteredCars.map((car) => (
                    <motion.div key={car.id} layout className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl">
                      <div className="relative h-56 overflow-hidden">
                        <img src={car.image} alt={car.model} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs backdrop-blur-xl">
                          {car.plate}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-white">{car.brand} {car.model}</h3>
                            <p className="text-sm text-white/60">{car.year} · VIN {car.vin.slice(0, 8)}...</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-right backdrop-blur-xl">
                            <div className="text-xs text-white/55">{t.carHealth}</div>
                            <div className="text-lg font-semibold">{car.health}%</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4 p-5 md:grid-cols-3">
                        <div>
                          <div className="text-xs uppercase tracking-wide text-white/45">{t.mileage}</div>
                          <div className="mt-2 text-lg font-medium">{car.mileage.toLocaleString()} km</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wide text-white/45">{t.nextService}</div>
                          <div className="mt-2 text-lg font-medium">{car.nextService}</div>
                        </div>
                        <div className="flex items-end justify-end gap-2">
                          <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 hover:bg-white/10"><Pencil className="h-4 w-4" /></button>
                          <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 hover:bg-white/10"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {page === "services" && (
              <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                <SectionTitle title={t.serviceHistory} action={<button onClick={() => setShowServiceModal(true)} className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950">{t.addService}</button>} />
                <div className="overflow-hidden rounded-[24px] border border-white/10">
                  <div className="hidden grid-cols-6 gap-4 bg-white/5 px-5 py-4 text-xs uppercase tracking-wide text-white/45 md:grid">
                    <div>{t.type}</div>
                    <div>{t.date}</div>
                    <div>{t.mileage}</div>
                    <div>{t.cost}</div>
                    <div>{t.workshop}</div>
                    <div>{t.status}</div>
                  </div>
                  <div className="divide-y divide-white/10">
                    {services.map((service) => {
                      const car = cars.find((c) => c.id === service.carId);
                      return (
                        <div key={service.id} className="grid gap-3 px-5 py-4 md:grid-cols-6 md:items-center">
                          <div>
                            <div className="font-medium">{service.type}</div>
                            <div className="text-sm text-white/50 md:hidden">{car?.brand} {car?.model}</div>
                          </div>
                          <div className="text-white/70">{service.date}</div>
                          <div className="text-white/70">{service.mileage.toLocaleString()} km</div>
                          <div className="font-medium">€{service.cost}</div>
                          <div className="text-white/70">{service.workshop}</div>
                          <div><StatusPill status={service.status} t={t} /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {page === "reminders" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                  <SectionTitle title={t.reminders} />
                  <div className="space-y-3">
                    {services.filter((s) => s.status !== "done").map((service) => {
                      const car = cars.find((c) => c.id === service.carId);
                      return (
                        <div key={service.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="text-lg font-medium">{service.type}</div>
                              <div className="mt-1 text-sm text-white/55">{car?.brand} {car?.model} · {service.date}</div>
                            </div>
                            <StatusPill status={service.status} t={t} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  {[t.reminderEmail, t.pushAlerts, t.maintenanceDigest].map((label, index) => (
                    <div key={label} className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="font-medium">{label}</div>
                          <div className="mt-1 text-sm text-white/55">{t.connectedLater}</div>
                        </div>
                        <button className={`relative h-7 w-12 rounded-full ${index === 1 ? "bg-white/15" : "bg-white"}`}>
                          <span className={`absolute top-1 h-5 w-5 rounded-full bg-slate-950 transition ${index === 1 ? "left-1" : "left-6"}`}></span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {page === "reports" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                  <SectionTitle title={t.reports} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[{
                      title: "Maintenance Report",
                      text: "Clean export for your full car history",
                      icon: FileText,
                    }, {
                      title: "Sale Passport",
                      text: "Shareable trust report for future buyers",
                      icon: Shield,
                    }, {
                      title: "Cost Summary",
                      text: "Monthly and yearly expense overview",
                      icon: Wallet,
                    }, {
                      title: "Documents Archive",
                      text: "Invoices and uploaded files in one place",
                      icon: Inbox,
                    }].map((card) => (
                      <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <card.icon className="mb-3 h-5 w-5 text-white/75" />
                        <div className="font-medium">{card.title}</div>
                        <div className="mt-2 text-sm text-white/55">{card.text}</div>
                        <button className="mt-4 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950">{t.exportPdf}</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                  <SectionTitle title={t.recentDocuments} />
                  <div className="space-y-3">
                    {docs.map((doc) => (
                      <div key={doc.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="mt-1 text-sm text-white/55">{doc.car} · {doc.date}</div>
                          </div>
                          <button className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70"><Download className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {page === "billing" && (
              <div className="grid gap-6 xl:grid-cols-2">
                {[{
                  key: "free",
                  name: t.free,
                  price: "€0",
                  text: t.planFreeText,
                  features: ["1 car", "Basic history", "Simple reminders"],
                }, {
                  key: "pro",
                  name: t.premium,
                  price: "€4.99",
                  text: t.planProText,
                  features: ["Unlimited cars", "PDF reports", "Invoices & smart reminders"],
                }].map((card) => (
                  <motion.div key={card.key} layout className={`rounded-[32px] border p-6 backdrop-blur-2xl ${plan === card.key ? "border-white bg-white text-slate-950" : "border-white/10 bg-white/5 text-white"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm opacity-70">{t.activePlan}</div>
                        <h3 className="mt-2 text-3xl font-semibold">{card.name}</h3>
                        <div className="mt-3 text-5xl font-semibold tracking-tight">{card.price}<span className="text-base font-normal opacity-70">/{t.monthly.toLowerCase()}</span></div>
                        <p className="mt-4 max-w-md text-sm opacity-75">{card.text}</p>
                      </div>
                      <CreditCard className="h-6 w-6 opacity-70" />
                    </div>
                    <div className="mt-6 space-y-3">
                      {card.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="h-4 w-4" /> {feature}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setPlan(card.key)}
                      className={`mt-8 w-full rounded-2xl px-4 py-3 font-medium ${plan === card.key ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}
                    >
                      {plan === card.key ? t.done : t.upgrade}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {page === "settings" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <div className="space-y-6">
                  <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                    <SectionTitle title={t.profile} />
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { label: "Name", value: "Markus Tamm" },
                        { label: "Email", value: "markus@example.com" },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="mb-2 text-sm text-white/55">{item.label}</div>
                          <input defaultValue={item.value} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                    <SectionTitle title={t.notifications} />
                    <div className="space-y-4">
                      {[t.reminderEmail, t.pushAlerts, t.maintenanceDigest].map((label, index) => (
                        <div key={label} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div>
                            <div className="font-medium">{label}</div>
                            <div className="text-sm text-white/55">{t.connectedLater}</div>
                          </div>
                          <button className={`relative h-7 w-12 rounded-full ${index === 2 ? "bg-white/15" : "bg-white"}`}>
                            <span className={`absolute top-1 h-5 w-5 rounded-full bg-slate-950 ${index === 2 ? "left-1" : "left-6"}`}></span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                    <SectionTitle title={t.security} />
                    <div className="space-y-3 text-sm text-white/65">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">{t.loginTitle}</div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">{t.loginText}</div>
                    </div>
                  </div>
                  <div className="rounded-[32px] border border-rose-400/15 bg-rose-400/5 p-5 backdrop-blur-2xl">
                    <SectionTitle title={t.privacy} />
                    <button className="w-full rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 font-medium text-rose-200">{t.deleteAccount}</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Modal open={showCarModal} onClose={() => setShowCarModal(false)} title={t.addNewCar}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm text-white/60">Brand</div>
            <input value={carForm.brand} onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.model}</div>
            <input value={carForm.model} onChange={(e) => setCarForm({ ...carForm, model: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.year}</div>
            <input value={carForm.year} onChange={(e) => setCarForm({ ...carForm, year: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.plate}</div>
            <input value={carForm.plate} onChange={(e) => setCarForm({ ...carForm, plate: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div className="md:col-span-2">
            <div className="mb-2 text-sm text-white/60">{t.vin}</div>
            <input value={carForm.vin} onChange={(e) => setCarForm({ ...carForm, vin: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setShowCarModal(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">{t.cancel}</button>
          <button onClick={handleAddCar} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-950">{t.save}</button>
        </div>
      </Modal>

      <Modal open={showServiceModal} onClose={() => setShowServiceModal(false)} title={t.addNewService}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm text-white/60">{t.allCars}</div>
            <select value={serviceForm.carId} onChange={(e) => setServiceForm({ ...serviceForm, carId: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              {cars.map((car) => <option key={car.id} value={car.id} className="text-slate-950">{car.brand} {car.model}</option>)}
            </select>
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.type}</div>
            <select value={serviceForm.type} onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              {[t.oilChange, t.tires, t.brakes, t.inspection, t.filters, t.battery].map((item) => <option key={item} value={item} className="text-slate-950">{item}</option>)}
            </select>
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.date}</div>
            <input type="date" value={serviceForm.date} onChange={(e) => setServiceForm({ ...serviceForm, date: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.mileage}</div>
            <input value={serviceForm.mileage} onChange={(e) => setServiceForm({ ...serviceForm, mileage: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.cost}</div>
            <input value={serviceForm.cost} onChange={(e) => setServiceForm({ ...serviceForm, cost: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.workshop}</div>
            <input value={serviceForm.workshop} onChange={(e) => setServiceForm({ ...serviceForm, workshop: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div className="md:col-span-2">
            <div className="mb-2 text-sm text-white/60">{t.notes}</div>
            <textarea value={serviceForm.notes} onChange={(e) => setServiceForm({ ...serviceForm, notes: e.target.value })} rows={4} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setShowServiceModal(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">{t.cancel}</button>
          <button onClick={handleAddService} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-950">{t.save}</button>
        </div>
      </Modal>

      <style jsx global>{`
        .light-theme {
          color: #0f172a;
        }
        .light-theme .text-white,
        .light-theme .text-cyan-100 {
          color: #0f172a !important;
        }
        .light-theme .text-white\/80,
        .light-theme .text-white\/75,
        .light-theme .text-white\/70,
        .light-theme .text-white\/65,
        .light-theme .text-white\/60,
        .light-theme .text-white\/55,
        .light-theme .text-white\/50,
        .light-theme .text-white\/45,
        .light-theme .text-white\/40,
        .light-theme .text-white\/35 {
          color: rgba(15, 23, 42, 0.72) !important;
        }
        .light-theme .border-white\/10 {
          border-color: rgba(148, 163, 184, 0.35) !important;
        }
        .light-theme .bg-white\/5 {
          background: rgba(255, 255, 255, 0.78) !important;
        }
        .light-theme .bg-white\/10 {
          background: rgba(255, 255, 255, 0.92) !important;
        }
        .light-theme .bg-black\/30,
        .light-theme .bg-black\/35 {
          background: rgba(255, 255, 255, 0.82) !important;
        }
        .light-theme .from-slate-950,
        .light-theme .via-slate-950\/35,
        .light-theme .via-slate-950\/20 {
          --tw-gradient-from: rgba(255,255,255,0.15) var(--tw-gradient-from-position) !important;
          --tw-gradient-to: rgba(255,255,255,0) var(--tw-gradient-to-position) !important;
          --tw-gradient-stops: var(--tw-gradient-from), rgba(255,255,255,0.04) var(--tw-gradient-via-position), var(--tw-gradient-to) !important;
        }
        .light-theme input,
        .light-theme textarea,
        .light-theme select {
          color: #0f172a !important;
        }
        .light-theme input::placeholder {
          color: rgba(15, 23, 42, 0.45) !important;
        }
        .light-theme .hover\\:bg-white\\/10:hover,
        .light-theme .hover\\:bg-white\\/8:hover,
        .light-theme .hover\\:bg-white\\/5:hover {
          background: rgba(226, 232, 240, 0.95) !important;
        }
        .light-theme .hover\\:text-white:hover {
          color: #0f172a !important;
        }
        .light-theme button,
        .light-theme a,
        .light-theme [role="button"] {
          transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
        }
        .light-theme button:hover,
        .light-theme a:hover,
        .light-theme [role="button"]:hover {
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        }
        .light-theme .rounded-2xl:hover,
        .light-theme .rounded-3xl:hover {
          transform: translateY(-1px);
        }
        .light-theme .bg-white:hover {
          background: #e2e8f0 !important;
        }
      `}</style>
    </div>
  );
}

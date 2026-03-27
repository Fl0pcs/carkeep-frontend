"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Download,
  FileText,
  Filter,
  Globe,
  Gauge,
  Inbox,
  Menu,
  Pencil,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  Trash2,
  TrendingUp,
  Upload,
  Wallet,
  Wrench,
  X,
} from "lucide-react";

type Lang = "en" | "et" | "ru";
type Theme = "dark";
type AuthMode = "login" | "signup";
type PageKey = "dashboard" | "cars" | "services" | "reminders" | "reports" | "billing" | "settings";
type ServiceStatus = "done" | "dueSoon" | "overdue";

type CarItem = {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  vin: string;
  mileage: number;
  health: number;
  nextService: string;
  image: string;
};

type ServiceItem = {
  id: string;
  carId: string;
  type: string;
  date: string;
  mileage: number;
  cost: number;
  workshop: string;
  notes: string;
  status: ServiceStatus;
  completed: boolean;
};

type DocItem = {
  id: string;
  name: string;
  date: string;
  car: string;
};

type Toast = {
  id: number;
  type: "success" | "error" | "info";
  text: string;
};

const defaultCarImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";

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
    settings: "Settings",
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
    completed: "Completed",
    yes: "Yes",
    no: "No",
    dueSoon: "Due soon",
    overdue: "Overdue",
    done: "Done",
    activePlan: "Active plan",
    monthly: "Monthly",
    upgrade: "Upgrade",
    exportPdf: "Export report",
    uploadInvoice: "Upload invoice",
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
      "Core app mode: auth, cars, services, edit, delete, report export, and invoice placeholder are connected.",
    addNewCar: "Add new car",
    editCar: "Edit car",
    addNewService: "Add new service record",
    editService: "Edit service record",
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
    appReady: "App ready",
    multilingual: "EN / ET / RU",
    noCarsYet: "No cars yet",
    loadingCars: "Loading cars...",
    loadingServices: "Loading services...",
    noServicesYet: "No services yet",
    markDone: "Mark done",
    markUndone: "Mark not done",
    editMileage: "Mileage",
    invoiceSoon: "Invoice upload placeholder is active. Real file storage is the next backend upgrade.",
    reportExported: "Report exported",
  },
  et: {
    brand: "CarKeep",
    heroBadge: "Nutikas hooldusajalugu igale autole",
    heroTitle:
      "Ära unusta enam kunagi rehve, pidureid, õlivahetust ega muid tähtsaid asju.",
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
    settings: "Seaded",
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
    completed: "Tehtud",
    yes: "Jah",
    no: "Ei",
    dueSoon: "Varsti käes",
    overdue: "Hilinenud",
    done: "Tehtud",
    activePlan: "Aktiivne pakett",
    monthly: "Kuus",
    upgrade: "Uuenda paketti",
    exportPdf: "Ekspordi raport",
    uploadInvoice: "Laadi arve üles",
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
      "Põhifunktsioonid töötavad: auth, autod, hooldused, muutmine, kustutamine, raporti eksport ja arve placeholder.",
    addNewCar: "Lisa uus auto",
    editCar: "Muuda autot",
    addNewService: "Lisa uus hoolduskirje",
    editService: "Muuda hoolduskirjet",
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
    appReady: "Äpp valmis",
    multilingual: "EN / ET / RU",
    noCarsYet: "Autosid veel pole",
    loadingCars: "Laen autosid...",
    loadingServices: "Laen hooldusi...",
    noServicesYet: "Hooldusi veel pole",
    markDone: "Märgi tehtuks",
    markUndone: "Märgi tegemata",
    editMileage: "Läbisõit",
    invoiceSoon: "Arve uploadi placeholder töötab. Päris failisalvestus on järgmine backend upgrade.",
    reportExported: "Raport eksporditud",
  },
  ru: {
    brand: "CarKeep",
    heroBadge: "Умная история обслуживания для каждого автомобиля",
    heroTitle:
      "Больше не забывайте про шины, тормоза, масло и другие важные вещи.",
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
    settings: "Настройки",
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
    completed: "Сделано",
    yes: "Да",
    no: "Нет",
    dueSoon: "Скоро",
    overdue: "Просрочено",
    done: "Выполнено",
    activePlan: "Активный тариф",
    monthly: "Ежемесячно",
    upgrade: "Улучшить тариф",
    exportPdf: "Экспорт отчёта",
    uploadInvoice: "Загрузить счёт",
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
      "Базовые функции работают: auth, автомобили, обслуживание, редактирование, удаление, экспорт отчёта и placeholder счёта.",
    addNewCar: "Добавить новый автомобиль",
    editCar: "Изменить автомобиль",
    addNewService: "Добавить новую запись обслуживания",
    editService: "Изменить запись обслуживания",
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
    appReady: "Приложение готово",
    multilingual: "EN / ET / RU",
    noCarsYet: "Пока нет автомобилей",
    loadingCars: "Загрузка автомобилей...",
    loadingServices: "Загрузка обслуживания...",
    noServicesYet: "Пока нет записей",
    markDone: "Отметить выполненным",
    markUndone: "Отметить невыполненным",
    editMileage: "Пробег",
    invoiceSoon: "Placeholder загрузки счёта работает. Настоящее файловое хранилище — следующий backend upgrade.",
    reportExported: "Отчёт экспортирован",
  },
} as const;

const pageIcons: Record<PageKey, React.ComponentType<{ className?: string }>> = {
  dashboard: Gauge,
  cars: Car,
  services: Wrench,
  reminders: Bell,
  reports: FileText,
  billing: CreditCard,
  settings: Settings,
};

function getServiceStatus(date: string, completed?: boolean): ServiceStatus {
  if (completed) return "done";
  if (!date) return "done";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "overdue";
  if (diff <= 14) return "dueSoon";
  return "done";
}

function computeNextService(services: ServiceItem[], carId: string) {
  const upcoming = services
    .filter((s) => s.carId === carId && !s.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0]?.date || "Not set";
}

function computeCarHealth(services: ServiceItem[], carId: string) {
  const relevant = services.filter((s) => s.carId === carId);
  if (relevant.some((s) => getServiceStatus(s.date, s.completed) === "overdue")) return 62;
  if (relevant.some((s) => getServiceStatus(s.date, s.completed) === "dueSoon")) return 82;
  return 96;
}

function downloadTextFile(filename: string, content: string, type = "application/json") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function StatCard({ icon: Icon, label, value, subtitle }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; subtitle: string }) {
  return (
    <motion.div layout className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
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

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {action}
    </div>
  );
}

function StatusPill({ status, t }: { status: ServiceStatus; t: (typeof translations)[Lang] }) {
  const map = {
    done: { label: t.done, icon: CheckCircle2, cls: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20" },
    dueSoon: { label: t.dueSoon, icon: Clock3, cls: "bg-amber-500/15 text-amber-300 border-amber-400/20" },
    overdue: { label: t.overdue, icon: AlertTriangle, cls: "bg-rose-500/15 text-rose-300 border-rose-400/20" },
  };
  const item = map[status];
  const Icon = item.icon;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${item.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  );
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
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
  const [lang, setLang] = useState<Lang>("et");
  const [theme] = useState<Theme>("dark");
  const [page, setPage] = useState<PageKey>("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cars, setCars] = useState<CarItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [docs] = useState<DocItem[]>([]);
  const [plan, setPlan] = useState("free");
  const [search, setSearch] = useState("");
  const [showCarModal, setShowCarModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [carsLoading, setCarsLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [carForm, setCarForm] = useState({ brand: "", model: "", year: "", plate: "", vin: "", mileage: "" });
  const [serviceForm, setServiceForm] = useState({ carId: "", type: "Oil change", date: "", mileage: "", cost: "", workshop: "", notes: "", completed: false });
  const [session, setSession] = useState<any>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const t = translations[lang];
  const isDark = theme === "dark";

  const toast = (text: string, type: Toast["type"] = "info") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, text, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 2800);
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchCars = async (userId: string) => {
    setCarsLoading(true);
    const { data, error } = await supabase.from("cars").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (error) {
      console.error(error.message);
      toast(error.message, "error");
      setCars([]);
      setCarsLoading(false);
      return;
    }
    const mapped = (data || []).map((car: any): CarItem => ({
      id: car.id,
      brand: car.brand || "",
      model: car.model || "",
      year: car.year || 2024,
      plate: car.plate || "",
      vin: car.vin || "",
      mileage: car.mileage || 0,
      health: 96,
      nextService: "Not set",
      image: defaultCarImage,
    }));
    setCars(mapped);
    setCarsLoading(false);
  };

  const fetchServices = async (userId: string) => {
    setServicesLoading(true);
    const { data, error } = await supabase.from("service_records").select("*").eq("user_id", userId).order("date", { ascending: false });
    if (error) {
      console.error(error.message);
      toast(error.message, "error");
      setServices([]);
      setServicesLoading(false);
      return;
    }
    const mapped = (data || []).map((service: any): ServiceItem => ({
      id: service.id,
      carId: service.car_id,
      type: service.type || "",
      date: service.date || "",
      mileage: service.mileage || 0,
      cost: Number(service.cost || 0),
      workshop: service.workshop || "",
      notes: service.notes || "",
      completed: Boolean(service.completed),
      status: getServiceStatus(service.date, Boolean(service.completed)),
    }));
    setServices(mapped);
    setServicesLoading(false);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchCars(session.user.id);
      fetchServices(session.user.id);
    } else {
      setCars([]);
      setServices([]);
    }
  }, [session]);

  useEffect(() => {
    if (cars.length > 0 && !serviceForm.carId) {
      setServiceForm((prev) => ({ ...prev, carId: cars[0].id }));
    }
  }, [cars, serviceForm.carId]);

  const carsWithMeta = useMemo(() => {
    return cars.map((car) => ({
      ...car,
      nextService: computeNextService(services, car.id),
      health: computeCarHealth(services, car.id),
    }));
  }, [cars, services]);

  const filteredCars = useMemo(() => {
    const q = search.toLowerCase();
    return carsWithMeta.filter((car) => !q || `${car.brand} ${car.model} ${car.plate} ${car.vin}`.toLowerCase().includes(q));
  }, [carsWithMeta, search]);

  const upcomingCount = services.filter((s) => {
    const status = getServiceStatus(s.date, s.completed);
    return status === "dueSoon" || status === "overdue";
  }).length;
  const monthCost = services.reduce((sum, s) => sum + Number(s.cost || 0), 0);

  const navItems: { key: PageKey; label: string }[] = [
    { key: "dashboard", label: t.navDashboard },
    { key: "cars", label: t.navCars },
    { key: "services", label: t.navServices },
    { key: "reminders", label: t.navReminders },
    { key: "reports", label: t.navReports },
    { key: "billing", label: t.navBilling },
    { key: "settings", label: t.navSettings },
  ];

  const resetCarForm = () => {
    setEditingCarId(null);
    setCarForm({ brand: "", model: "", year: "", plate: "", vin: "", mileage: "" });
  };

  const resetServiceForm = () => {
    setEditingServiceId(null);
    setServiceForm({ carId: cars[0]?.id || "", type: "Oil change", date: "", mileage: "", cost: "", workshop: "", notes: "", completed: false });
  };

  const openEditCar = (car: CarItem) => {
    setEditingCarId(car.id);
    setCarForm({
      brand: car.brand,
      model: car.model,
      year: String(car.year || ""),
      plate: car.plate,
      vin: car.vin,
      mileage: String(car.mileage || ""),
    });
    setShowCarModal(true);
  };

  const openEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({
      carId: service.carId,
      type: service.type,
      date: service.date,
      mileage: String(service.mileage || ""),
      cost: String(service.cost || ""),
      workshop: service.workshop,
      notes: service.notes,
      completed: service.completed,
    });
    setShowServiceModal(true);
  };

  const handleSaveCar = async () => {
    if (!carForm.brand || !carForm.model || !session?.user?.id) return;

    if (editingCarId) {
      const { data, error } = await supabase
        .from("cars")
        .update({
          brand: carForm.brand,
          model: carForm.model,
          year: Number(carForm.year || 2024),
          plate: carForm.plate || "",
          vin: carForm.vin || "",
          mileage: Number(carForm.mileage || 0),
        })
        .eq("id", editingCarId)
        .select()
        .single();

      if (error) {
        toast(error.message, "error");
        return;
      }

      setCars((prev) => prev.map((car) => (car.id === editingCarId ? { ...car, brand: data.brand, model: data.model, year: data.year || 2024, plate: data.plate || "", vin: data.vin || "", mileage: data.mileage || 0 } : car)));
      toast(lang === "et" ? "Auto uuendatud" : lang === "ru" ? "Автомобиль обновлён" : "Car updated", "success");
    } else {
      const { data, error } = await supabase
        .from("cars")
        .insert({
          user_id: session.user.id,
          brand: carForm.brand,
          model: carForm.model,
          year: Number(carForm.year || 2024),
          plate: carForm.plate || "",
          vin: carForm.vin || "",
          mileage: Number(carForm.mileage || 0),
        })
        .select()
        .single();

      if (error) {
        toast(error.message, "error");
        return;
      }

      setCars((prev) => [{
        id: data.id,
        brand: data.brand || "",
        model: data.model || "",
        year: data.year || 2024,
        plate: data.plate || "",
        vin: data.vin || "",
        mileage: data.mileage || 0,
        health: 96,
        nextService: "Not set",
        image: defaultCarImage,
      }, ...prev]);
      toast(lang === "et" ? "Auto lisatud" : lang === "ru" ? "Автомобиль добавлен" : "Car added", "success");
    }

    resetCarForm();
    setShowCarModal(false);
    setPage("cars");
  };

  const handleSaveService = async () => {
    if (!session?.user?.id || !serviceForm.carId) return;

    const payload = {
      user_id: session.user.id,
      car_id: serviceForm.carId,
      type: serviceForm.type,
      date: serviceForm.date || new Date().toISOString().slice(0, 10),
      mileage: Number(serviceForm.mileage || 0),
      cost: Number(serviceForm.cost || 0),
      workshop: serviceForm.workshop || "",
      notes: serviceForm.notes || "",
      completed: Boolean(serviceForm.completed),
      status: Boolean(serviceForm.completed) ? "done" : getServiceStatus(serviceForm.date, false),
    };

    if (editingServiceId) {
      const { data, error } = await supabase.from("service_records").update(payload).eq("id", editingServiceId).select().single();
      if (error) {
        toast(error.message, "error");
        return;
      }
      setServices((prev) => prev.map((service) => (service.id === editingServiceId ? {
        id: data.id,
        carId: data.car_id,
        type: data.type || "",
        date: data.date || "",
        mileage: data.mileage || 0,
        cost: Number(data.cost || 0),
        workshop: data.workshop || "",
        notes: data.notes || "",
        completed: Boolean(data.completed),
        status: getServiceStatus(data.date, Boolean(data.completed)),
      } : service)));
      toast(lang === "et" ? "Hooldus uuendatud" : lang === "ru" ? "Запись обновлена" : "Service updated", "success");
    } else {
      const { data, error } = await supabase.from("service_records").insert(payload).select().single();
      if (error) {
        toast(error.message, "error");
        return;
      }
      setServices((prev) => [{
        id: data.id,
        carId: data.car_id,
        type: data.type || "",
        date: data.date || "",
        mileage: data.mileage || 0,
        cost: Number(data.cost || 0),
        workshop: data.workshop || "",
        notes: data.notes || "",
        completed: Boolean(data.completed),
        status: getServiceStatus(data.date, Boolean(data.completed)),
      }, ...prev]);
      toast(lang === "et" ? "Hooldus lisatud" : lang === "ru" ? "Запись добавлена" : "Service added", "success");
    }

    resetServiceForm();
    setShowServiceModal(false);
    setPage("services");
  };

  const toggleServiceDone = async (service: ServiceItem) => {
    const nextCompleted = !service.completed;
    const { data, error } = await supabase
      .from("service_records")
      .update({ completed: nextCompleted, status: nextCompleted ? "done" : getServiceStatus(service.date, false) })
      .eq("id", service.id)
      .select()
      .single();

    if (error) {
      toast(error.message, "error");
      return;
    }

    setServices((prev) => prev.map((item) => (item.id === service.id ? {
      ...item,
      completed: Boolean(data.completed),
      status: getServiceStatus(data.date, Boolean(data.completed)),
    } : item)));
  };

  const handleDeleteCar = async (carId: string) => {
    const confirmed = window.confirm(lang === "et" ? "Kas kustutada see auto?" : lang === "ru" ? "Удалить этот автомобиль?" : "Delete this car?");
    if (!confirmed) return;
    const { error } = await supabase.from("cars").delete().eq("id", carId);
    if (error) {
      toast(error.message, "error");
      return;
    }
    setCars((prev) => prev.filter((car) => car.id !== carId));
    setServices((prev) => prev.filter((service) => service.carId !== carId));
    toast(lang === "et" ? "Auto kustutatud" : lang === "ru" ? "Автомобиль удалён" : "Car deleted", "success");
  };

  const handleDeleteService = async (serviceId: string) => {
    const confirmed = window.confirm(lang === "et" ? "Kas kustutada see hooldus?" : lang === "ru" ? "Удалить эту запись?" : "Delete this service record?");
    if (!confirmed) return;
    const { error } = await supabase.from("service_records").delete().eq("id", serviceId);
    if (error) {
      toast(error.message, "error");
      return;
    }
    setServices((prev) => prev.filter((service) => service.id !== serviceId));
    toast(lang === "et" ? "Hooldus kustutatud" : lang === "ru" ? "Запись удалена" : "Service deleted", "success");
  };

  const handleExportReport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      user: session?.user?.email || "",
      cars: carsWithMeta,
      services,
    };
    downloadTextFile("carkeep-report.json", JSON.stringify(payload, null, 2));
    toast(t.reportExported, "success");
  };

  const handleUploadInvoice = () => {
    toast(t.invoiceSoon, "info");
    setPage("reports");
  };

  const handleDeleteAccount = () => {
    toast(lang === "et" ? "Konto kustutamine vajab eraldi turvalist voogu" : lang === "ru" ? "Удаление аккаунта требует отдельного безопасного потока" : "Account deletion needs a separate secure flow", "info");
  };

  const handleAuth = async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").upsert({ id: data.user.id, email: data.user.email });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) throw error;
      }
    } catch (error: any) {
      setAuthError(error?.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const heroCar = carsWithMeta[0] ?? null;
  const SelectedIcon = pageIcons[page];

  if (!session) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,_#eef4fb_0%,_#e8f0f8_55%,_#eef4fb_100%)] px-4 py-10 text-slate-900">
        <div className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm">
              Smart maintenance platform
            </div>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-900">
              Car maintenance, finally kept in one clean place.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Track oil changes, tires, brakes, inspections, invoices, and future reminders. Clean history for you, and more trust when you sell the car.
            </p>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-6 flex rounded-2xl bg-slate-100 p-1">
              <button onClick={() => setAuthMode("login")} className={`flex-1 rounded-2xl px-4 py-3 text-sm font-medium ${authMode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                Log in
              </button>
              <button onClick={() => setAuthMode("signup")} className={`flex-1 rounded-2xl px-4 py-3 text-sm font-medium ${authMode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                Sign up
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" placeholder="Your password" />
              </div>
              {authError ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{authError}</div> : null}
              <button onClick={handleAuth} disabled={authLoading} className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50">
                {authLoading ? "Please wait..." : authMode === "login" ? "Log in" : "Create account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.15),_transparent_25%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#020617_100%)] text-white transition-colors duration-300">
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={isDark ? "mb-4 overflow-hidden rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100 backdrop-blur-xl" : "mb-4 overflow-hidden rounded-[28px] border border-sky-200 bg-white/80 px-4 py-3 text-sm text-sky-900 shadow-sm backdrop-blur-xl"}>
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
                    <button key={item.key} onClick={() => setPage(item.key)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${active ? "bg-white text-slate-950" : "bg-transparent text-white/75 hover:bg-white/8 hover:text-white"}`}>
                      <span className="flex items-center gap-3">
                        <Icon className="h-4.5 w-4.5" />
                        <span className="font-medium">{item.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileMenu((v) => !v)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-white/55">
                    <SelectedIcon className="h-4 w-4" />
                    <span className="text-sm">{t.overview}</span>
                  </div>
                  <h1 className="mt-1 text-3xl font-semibold tracking-tight">{page === "dashboard" ? t.welcome : navItems.find((n) => n.key === page)?.label}</h1>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                
                <button onClick={handleLogout} className={isDark ? "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10" : "rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"}>
                  {t.logout}
                </button>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <Globe className="h-4 w-4 text-white/60" />
                  <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="bg-transparent text-sm text-white outline-none">
                    <option value="en" className="text-slate-950">English</option>
                    <option value="et" className="text-slate-950">Eesti</option>
                    <option value="ru" className="text-slate-950">Русский</option>
                  </select>
                </div>
                <button onClick={() => { resetServiceForm(); setShowServiceModal(true); }} disabled={cars.length === 0} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10 disabled:opacity-50">
                  <span className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> {t.addService}</span>
                </button>
                <button onClick={() => { resetCarForm(); setShowCarModal(true); }} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:opacity-90">
                  <span className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> {t.addCar}</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {mobileMenu ? (
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mb-4 rounded-[28px] border border-white/10 bg-slate-950/90 p-4 backdrop-blur-xl lg:hidden">
                  <div className="grid gap-2">
                    {navItems.map((item) => {
                      const Icon = pageIcons[item.key];
                      return (
                        <button key={item.key} onClick={() => { setPage(item.key); setMobileMenu(false); }} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-left text-white/80">
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
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={isDark ? "overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl" : "overflow-hidden rounded-[36px] border border-slate-200 bg-white/85 shadow-sm backdrop-blur-2xl"}>
                    <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                      <div className="p-7 lg:p-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                          <Sparkles className="h-3.5 w-3.5" /> {t.heroBadge}
                        </div>
                        <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">{t.heroTitle}</h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">{t.heroText}</p>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <button className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950">{t.getStarted}</button>
                          <button onClick={() => setPage("cars")} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white">{t.watchDemo}</button>
                        </div>
                      </div>
                      <div className="relative min-h-[300px] overflow-hidden">
                        {heroCar ? (
                          <>
                            <img src={heroCar.image} alt="Car" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5 rounded-[26px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="text-sm text-white/60">{t.carHealth}</div>
                                  <div className="mt-1 text-3xl font-semibold">{heroCar.health}%</div>
                                </div>
                                <StatusPill status={getServiceStatus(heroCar.nextService, false)} t={t} />
                              </div>
                              <div className="mt-4 text-sm text-white/70">{heroCar.brand} {heroCar.model} · {heroCar.plate}</div>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-600">{t.noCarsYet}</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    <StatCard icon={Car} label={t.totalCars} value={carsWithMeta.length} subtitle={t.garage} />
                    <StatCard icon={Bell} label={t.upcomingServices} value={upcomingCount} subtitle={t.upcoming} />
                    <StatCard icon={Wallet} label={t.thisMonthCost} value={`€${monthCost}`} subtitle={t.insights} />
                    <StatCard icon={TrendingUp} label={t.completedEntries} value={services.filter((s) => s.completed).length} subtitle={t.timeline} />
                  </div>
                </section>
              </div>
            )}

            {page === "cars" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="relative w-full md:max-w-xl">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchCars} className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none placeholder:text-white/35" />
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                    <Filter className="h-4 w-4" /> {t.filters}
                  </button>
                </div>
                {carsLoading ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">{t.loadingCars}</div>
                ) : filteredCars.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">{t.noCarsYet}</div>
                ) : (
                  <div className="grid gap-4 xl:grid-cols-2">
                    {filteredCars.map((car) => (
                      <motion.div key={car.id} layout className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl">
                        <div className="relative h-56 overflow-hidden">
                          <img src={car.image} alt={car.model} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs backdrop-blur-xl">{car.plate}</div>
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
                            <button onClick={() => openEditCar(car)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 hover:bg-white/10"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteCar(car.id)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 hover:bg-white/10"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {page === "services" && (
              <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                <SectionTitle title={t.serviceHistory} action={<button onClick={() => { resetServiceForm(); setShowServiceModal(true); }} disabled={cars.length === 0} className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950 disabled:opacity-50">{t.addService}</button>} />
                {servicesLoading ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">{t.loadingServices}</div>
                ) : services.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">{t.noServicesYet}</div>
                ) : (
                  <div className="space-y-3">
                    {services.map((service) => {
                      const car = carsWithMeta.find((c) => c.id === service.carId);
                      const status = getServiceStatus(service.date, service.completed);
                      return (
                        <div key={service.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                              <div className="font-medium text-white">{service.type}</div>
                              <div className="text-sm text-white/60">{car?.brand} {car?.model} · {service.date} · {service.workshop}</div>
                              <div className="mt-2 text-sm text-white/60">{t.editMileage}: {service.mileage.toLocaleString()} km · €{service.cost}</div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <StatusPill status={status} t={t} />
                              <button onClick={() => toggleServiceDone(service)} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">
                                {service.completed ? t.markUndone : t.markDone}
                              </button>
                              <button onClick={() => openEditService(service)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 hover:bg-white/10"><Pencil className="h-4 w-4" /></button>
                              <button onClick={() => handleDeleteService(service.id)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/70 hover:bg-white/10"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {page === "reminders" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                  <SectionTitle title={t.reminders} />
                  <div className="space-y-3">
                    {services.filter((s) => getServiceStatus(s.date, s.completed) !== "done").map((service) => {
                      const car = carsWithMeta.find((c) => c.id === service.carId);
                      return (
                        <div key={service.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="font-medium text-white">{service.type}</div>
                              <div className="text-sm text-white/60">{car?.brand} {car?.model} · {service.date}</div>
                            </div>
                            <StatusPill status={getServiceStatus(service.date, service.completed)} t={t} />
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
                          <div className="font-medium text-white">{label}</div>
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
                    {[
                      { title: "Maintenance Report", text: "Clean export for your full car history", icon: FileText, onClick: handleExportReport },
                      { title: "Sale Passport", text: "Shareable trust report for future buyers", icon: Shield, onClick: handleExportReport },
                      { title: "Cost Summary", text: "Monthly and yearly expense overview", icon: Wallet, onClick: handleExportReport },
                      { title: "Documents Archive", text: "Invoices and uploaded files in one place", icon: Inbox, onClick: handleUploadInvoice },
                    ].map((card) => (
                      <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <card.icon className="mb-3 h-5 w-5 text-white/75" />
                        <div className="font-medium text-white">{card.title}</div>
                        <div className="mt-2 text-sm text-white/55">{card.text}</div>
                        <button onClick={card.onClick} className="mt-4 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950">{card.title === "Documents Archive" ? t.uploadInvoice : t.exportPdf}</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={isDark ? "rounded-[32px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl" : "rounded-[32px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-2xl"}>
                  <SectionTitle title={t.recentDocuments} />
                  <div className="space-y-3">
                    {(docs.length ? docs : [{ id: "demo", name: "CarKeep_Report.json", date: new Date().toISOString().slice(0, 10), car: t.brand }]).map((doc) => (
                      <div key={doc.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium text-white">{doc.name}</div>
                            <div className="mt-1 text-sm text-white/55">{doc.car} · {doc.date}</div>
                          </div>
                          <button onClick={handleExportReport} className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/70"><Download className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {page === "billing" && (
              <div className="grid gap-6 xl:grid-cols-2">
                {[
                  { key: "free", name: t.free, price: "€0", text: t.planFreeText, features: ["1 car", "Basic history", "Simple reminders"] },
                  { key: "pro", name: t.premium, price: "€4.99", text: t.planProText, features: ["Unlimited cars", "PDF reports", "Invoices & smart reminders"] },
                ].map((card) => (
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
                    <button onClick={() => { setPlan(card.key); toast(lang === "et" ? "Plaan uuendatud" : lang === "ru" ? "План обновлён" : "Plan updated", "success"); }} className={`mt-8 w-full rounded-2xl px-4 py-3 font-medium ${plan === card.key ? "bg-slate-950 text-white" : "bg-white text-slate-950"}`}>
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
                        { label: "Email", value: session?.user?.email || "markus@example.com" },
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
                            <div className="font-medium text-white">{label}</div>
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
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">Supabase auth is connected.</div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">Cars and services load from and save to Supabase. Before launch, add privacy policy, terms, and real invoice file storage.</div>
                    </div>
                  </div>
                  <div className="rounded-[32px] border border-rose-400/15 bg-rose-400/5 p-5 backdrop-blur-2xl">
                    <SectionTitle title={t.privacy} />
                    <button onClick={handleDeleteAccount} className="w-full rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 font-medium text-rose-200">{t.deleteAccount}</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Modal open={showCarModal} onClose={() => { setShowCarModal(false); resetCarForm(); }} title={editingCarId ? t.editCar : t.addNewCar}>
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
            <input type="number" value={carForm.year} onChange={(e) => setCarForm({ ...carForm, year: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.plate}</div>
            <input value={carForm.plate} onChange={(e) => setCarForm({ ...carForm, plate: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.vin}</div>
            <input value={carForm.vin} onChange={(e) => setCarForm({ ...carForm, vin: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.editMileage}</div>
            <input type="number" value={carForm.mileage} onChange={(e) => setCarForm({ ...carForm, mileage: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => { setShowCarModal(false); resetCarForm(); }} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">{t.cancel}</button>
          <button onClick={handleSaveCar} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-950">{t.save}</button>
        </div>
      </Modal>

      <Modal open={showServiceModal} onClose={() => { setShowServiceModal(false); resetServiceForm(); }} title={editingServiceId ? t.editService : t.addNewService}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm text-white/60">{t.allCars}</div>
            <select value={serviceForm.carId} onChange={(e) => setServiceForm({ ...serviceForm, carId: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              {carsWithMeta.map((car) => (
                <option key={car.id} value={car.id} className="text-slate-950">{car.brand} {car.model}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.type}</div>
            <select value={serviceForm.type} onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
              {[t.oilChange, t.tires, t.brakes, t.inspection, t.filters, t.battery].map((item) => (
                <option key={item} value={item} className="text-slate-950">{item}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.date}</div>
            <input type="date" value={serviceForm.date} onChange={(e) => setServiceForm({ ...serviceForm, date: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.editMileage}</div>
            <input type="number" value={serviceForm.mileage} onChange={(e) => setServiceForm({ ...serviceForm, mileage: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.cost}</div>
            <input type="number" value={serviceForm.cost} onChange={(e) => setServiceForm({ ...serviceForm, cost: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div>
            <div className="mb-2 text-sm text-white/60">{t.workshop}</div>
            <input value={serviceForm.workshop} onChange={(e) => setServiceForm({ ...serviceForm, workshop: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div className="md:col-span-2">
            <div className="mb-2 text-sm text-white/60">{t.notes}</div>
            <textarea value={serviceForm.notes} onChange={(e) => setServiceForm({ ...serviceForm, notes: e.target.value })} rows={4} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
              <input type="checkbox" checked={serviceForm.completed} onChange={(e) => setServiceForm({ ...serviceForm, completed: e.target.checked })} />
              <span>{t.completed}: {serviceForm.completed ? t.yes : t.no}</span>
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => { setShowServiceModal(false); resetServiceForm(); }} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">{t.cancel}</button>
          <button onClick={handleSaveService} className="rounded-2xl bg-white px-4 py-3 font-medium text-slate-950">{t.save}</button>
        </div>
      </Modal>

      <div className="fixed right-4 top-4 z-[70] space-y-3">
        {toasts.map((item) => (
          <div key={item.id} className={`rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-xl ${item.type === "success" ? "border-emerald-400/20 bg-emerald-500/15 text-emerald-100" : item.type === "error" ? "border-rose-400/20 bg-rose-500/15 text-rose-100" : "border-sky-400/20 bg-sky-500/15 text-sky-100"}`}>
            {item.text}
          </div>
        ))}
      </div>

      
    </div>
  );
}

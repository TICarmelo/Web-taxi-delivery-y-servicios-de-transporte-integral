export type ServiceType = 'delivery' | 'personal_shopper' | 'ride_hailing';

export type UserRole = 'guest' | 'client' | 'employee';

export type AppView = 
  | 'home' 
  | 'ride_hailing' 
  | 'personal_shopper' 
  | 'delivery' 
  | 'dashboard' 
  | 'services'
  | 'employee_area'
  | 'admin_area';

export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  user?: UserProfile;
  employee?: EmployeeProfile;
}

export interface EmployeeProfile {
  id: string;
  employeeCode: string;
  name: string;
  avatar: string;
  roleTitle: 'Conductor' | 'Repartidor' | 'Shopper';
  phone: string;
  status: 'active' | 'in_route' | 'offline';
  todayCompletedCount: number;
  todayEarningsUsd: number;
  todayOnlineTime: string;
  activeAssignment?: {
    id: string;
    type: 'Delivery' | 'Carrera' | 'Personal Shopper';
    destination: string;
    status: 'En Camino' | 'En Espera' | 'Recolectando';
    customerName: string;
    customerPhone: string;
  };
  recentActivities: {
    id: string;
    type: string;
    time: string;
    status: string;
    amount: string;
  }[];
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  tripsCount: number;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  etaMinutes: number;
}

export interface RideVehicleOption {
  id: string;
  name: string;
  type: 'standard' | 'premium' | 'xl' | 'moto';
  priceUsd: number;
  priceBs: number;
  etaMinutes: number;
  capacity: number;
  description: string;
  image: string;
}

export type RideStep = 1 | 2 | 3 | 4;

export interface RideOrder {
  id: string;
  origin: string;
  destination: string;
  originCoords?: { x: number; y: number };
  destinationCoords?: { x: number; y: number };
  vehicle: RideVehicleOption;
  driver?: Driver;
  status: 'searching' | 'driver_assigned' | 'in_route' | 'arrived' | 'completed' | 'cancelled';
  priceUsd: number;
  priceBs: number;
  paymentMethod: string;
  createdAt: string;
  etaMinutes: number;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'viveres' | 'farmacia' | 'retail' | 'especialidad' | 'panaderia' | 'licores';
  weight: string;
  price: number;
  image: string;
  description?: string;
  popular?: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  note?: string;
}

export interface ShopperChatMessage {
  id: string;
  sender: 'user' | 'shopper' | 'system';
  text: string;
  timestamp: string;
  image?: string;
  voiceNoteDuration?: number;
}

export type ShopperProgressStep = 'asignacion' | 'compras' | 'revision' | 'entrega';

export interface ShopperOrder {
  id: string;
  status: ShopperProgressStep;
  shopperName: string;
  shopperAvatar: string;
  storeName: string;
  items: CartItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
  deliveryAddress: string;
  notes?: string;
  chatMessages: ShopperChatMessage[];
}

export interface DeliveryPackageOrder {
  id: string;
  senderName: string;
  senderPhone: string;
  pickupAddress: string;
  recipientName: string;
  recipientPhone: string;
  dropoffAddress: string;
  packageType: 'documentos' | 'paquete_pequeno' | 'caja_mediana' | 'alimentos';
  notes: string;
  status: 'asignando' | 'recolectando' | 'en_camino' | 'entregado';
  price: number;
  trackingCode: string;
  courierName?: string;
  courierAvatar?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  role: string;
  rating: number;
  totalTrips: number;
  savedAddresses: {
    id: string;
    label: string;
    address: string;
    details: string;
    isDefault?: boolean;
  }[];
  paymentMethods: {
    id: string;
    type: 'visa' | 'mastercard' | 'pagomovil' | 'zelle' | 'cash';
    title: string;
    details: string;
    isDefault?: boolean;
  }[];
}

export interface PastOrder {
  id: string;
  type: ServiceType;
  title: string;
  status: 'En camino' | 'Completado' | 'En progreso' | 'Cancelado';
  itemsSummary: string;
  price: number;
  date: string;
  driverOrShopperName: string;
  driverOrShopperAvatar: string;
}

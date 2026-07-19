import { UserRole } from '@/types/Resad TYPESCRIPT_FILES/enums'
import type { AdminUser } from '@/types/Resad TYPESCRIPT_FILES/models'

const users: AdminUser[] = [
  {
    id: 3,
    full_name: 'Elvin Hesenov',
    phone: '+994516667766',
    address: null,
    img_url: null,
    role: UserRole.COMMERCE,
    password: '$2b$10$kh8thM3wx1FaiBPLkAivBu17usbcvgaDhlBPpO2D2gteGo0ZvgP/m',
    created_at: '2025-06-12T05:47:24.588Z',
  },
  {
    id: 4,
    full_name: 'Nigar Aliyeva',
    phone: '+994557891234',
    address: 'Baki, Nesimi rayonu',
    img_url: null,
    role: UserRole.COMMERCE,
    password: '$2b$10$kh8thM3wx1FaiBPLkAivBu17usbcvgaDhlBPpO2D2gteGo0ZvgP/n',
    created_at: '2025-06-13T09:12:03.101Z',
  },
  {
    id: 5,
    full_name: 'Kamran Guliyev',
    phone: '+994503334455',
    address: null,
    img_url: null,
    role: UserRole.COMMERCE,
    password: '$2b$10$kh8thM3wx1FaiBPLkAivBu17usbcvgaDhlBPpO2D2gteGo0ZvgP/o',
    created_at: '2025-06-14T11:30:44.520Z',
  },
  {
    id: 2,
    full_name: 'Tiktak Admin',
    phone: '+994105554422',
    address: null,
    img_url: null,
    role: UserRole.ADMIN,
    password: '$2b$10$kh8thM3wx1FaiBPLkAivBu17usbcvgaDhlBPpO2D2gteGo0ZvgP/p',
    created_at: '2025-06-12T05:44:27.813Z',
  },
]

export default users

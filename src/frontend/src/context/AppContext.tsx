import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {createActor,canisterId} from '../../../declarations/backend';


const api = createActor(canisterId);
api.list_groups();
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  likedByUser: boolean;
  group: string;
  timestamp: Date;
}

export interface CarGroup {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  mods: string[];
  imageUrl: string;
  owner: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

interface AppState {
  posts: Post[];
  currentGroup: string | null;
  groups: CarGroup[];
  isLoggedIn: boolean;
  currentUser: User | null;
  cars: Car[];
}

type AppAction = 
  | { type: 'ADD_POST'; payload: Omit<Post, 'id' | 'likes' | 'likedByUser' | 'timestamp'> }
  | { type: 'TOGGLE_LIKE'; payload: { postId: string } }
  | { type: 'SET_CURRENT_GROUP'; payload: { groupId: string | null } }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_CAR'; payload: Omit<Car, 'id'> }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialGroups: CarGroup[] = [
  { id: 'all', name: 'All Cars', icon: '🚗', color: 'primary' },
  { id: 'sports', name: 'Sports Cars', icon: '🏎️', color: 'racing' },
  { id: 'classic', name: 'Classic Cars', icon: '🚙', color: 'primary' },
  { id: 'electric', name: 'Electric Cars', icon: '⚡', color: 'electric' },
  { id: 'luxury', name: 'Luxury Cars', icon: '✨', color: 'primary' },
  { id: 'trucks', name: 'Trucks & SUVs', icon: '🚛', color: 'primary' },
];

const initialPosts: Post[] = [
  {
    id: '1',
    title: 'Just bought my dream Porsche 911!',
    content: 'After years of saving, I finally got my hands on a 2023 Porsche 911 Carrera S. The sound of that flat-six engine is pure music to my ears. Can\'t wait to take it to the track!',
    author: 'SpeedDemon92',
    likes: 24,
    likedByUser: false,
    group: 'sports',
    timestamp: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    title: 'Restored 1969 Mustang Boss 429',
    content: 'Just finished a 3-year restoration project on this beautiful Boss 429. Every bolt has been restored to factory spec. The Cobra Jet engine purrs like a kitten but roars like a lion!',
    author: 'ClassicCarLover',
    likes: 42,
    likedByUser: true,
    group: 'classic',
    timestamp: new Date('2024-01-14T15:45:00'),
  },
  {
    id: '3',
    title: 'Tesla Model S Plaid: 0-60 in 1.99 seconds!',
    content: 'Had the chance to test drive the new Model S Plaid today. The acceleration is absolutely insane - it literally pins you to your seat. The future of performance cars is electric!',
    author: 'ElectricFuture',
    likes: 18,
    likedByUser: false,
    group: 'electric',
    timestamp: new Date('2024-01-13T09:15:00'),
  },
  {
    id: '4',
    title: 'Best modifications for daily driving?',
    content: 'Looking to modify my Honda Civic Type R for better daily usability without losing too much performance. What are your recommendations for suspension, exhaust, and interior upgrades?',
    author: 'DailyDriver',
    likes: 7,
    likedByUser: false,
    group: 'sports',
    timestamp: new Date('2024-01-12T14:20:00'),
  },
];

const initialCars: Car[] = [
  {
    id: '1',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2023,
    mods: ['Sport Exhaust', 'Carbon Fiber Wheels', 'Lowered Suspension'],
    imageUrl: '/placeholder-car.jpg',
    owner: 'SpeedDemon92',
    description: 'A pristine 2023 Porsche 911 Carrera S with carefully selected performance modifications. The flat-six engine produces an incredible sound through the sport exhaust, while the carbon fiber wheels and lowered suspension provide exceptional handling and a more aggressive stance.',
  },
  {
    id: '2',
    make: 'Ford',
    model: 'Mustang Boss 429',
    year: 1969,
    mods: ['Restored Engine', 'Custom Paint', 'Vintage Interior'],
    imageUrl: '/placeholder-car.jpg',
    owner: 'ClassicCarLover',
    description: 'A fully restored 1969 Ford Mustang Boss 429, one of the rarest and most powerful Mustangs ever built. This beauty has been painstakingly restored to factory specifications with a few tasteful custom touches including a period-correct paint job and authentic vintage interior.',
  },
];

const initialState: AppState = {
  posts: initialPosts,
  currentGroup: 'all',
  groups: initialGroups,
  isLoggedIn: false,
  currentUser: null,
  cars: initialCars,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_POST':
      const newPost: Post = {
        ...action.payload,
        id: Date.now().toString(),
        likes: 0,
        likedByUser: false,
        timestamp: new Date(),
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
      };
    
    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId
            ? {
                ...post,
                likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
                likedByUser: !post.likedByUser,
              }
            : post
        ),
      };
    
    case 'SET_CURRENT_GROUP':
      return {
        ...state,
        currentGroup: action.payload.groupId,
      };

    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload.user,
      };

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
      };

    case 'ADD_CAR':
      const newCar: Car = {
        ...action.payload,
        id: Date.now().toString(),
      };
      return {
        ...state,
        cars: [...state.cars, newCar],
      };

    case 'UPDATE_USER':
      return {
        ...state,
        currentUser: state.currentUser ? { ...state.currentUser, ...action.payload } : null,
      };
    
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  filteredPosts: Post[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const filteredPosts = state.currentGroup === 'all' 
    ? state.posts 
    : state.posts.filter(post => post.group === state.currentGroup);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredPosts }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { canisterId, createActor } from '../../../declarations/backend';

// 2. Create an actor
const api = createActor(canisterId);

// 3. Call the method and handle promise correctly
(async () => {
  try {
    const result = await api.list_groups();
    console.log("Groups:", result);
  } catch (err) {
    console.error("Error calling list_groups:", err);
  }
})();

// Types
export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Post {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  groupId: string;
  liked?: boolean;
}

export interface Group {
  id: string;
  name: string;
  icon?: string;
}

export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  type: string;
  engine: string;
  horsepower: number;
  description: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  selectedGroup: string | null;
  selectedCar: string | null;
  posts: Post[];
  groups: Group[];
  cars: Car[];
  isCreatePostOpen: boolean;
}

// Mock data
const mockGroups: Group[] = [
  { id: 'beask', name: 'Beask' },
  { id: 'tuning', name: 'Tuning' },
  { id: 'electric', name: 'Electric' },
  { id: 'canviad', name: 'Canviad' },
  { id: 'off-road', name: 'Off-road' },
  { id: 'cefalafi', name: 'Cefalafi' },
  { id: 'evocortan', name: 'Evocortan' },
  { id: 'gratsit', name: 'Gratsit' },
];

const mockCars: Car[] = [
  {
    id: '1',
    name: 'AMG GT',
    model: 'Mercedes-AMG GT S',
    year: 2024,
    type: 'Sports Car',
    engine: '4.0L V8 Biturbo',
    horsepower: 630,
    description: 'Pure driving emotion meets cutting-edge technology. The AMG GT delivers exceptional performance with its hand-crafted V8 engine and race-inspired engineering.'
  },
  {
    id: '2',
    name: 'Model S Plaid',
    model: 'Tesla Model S Plaid',
    year: 2024,
    type: 'Electric Sedan',
    engine: 'Triple Motor Electric',
    horsepower: 1020,
    description: 'The quickest accelerating sedan ever built. With three electric motors and advanced autopilot, the Model S Plaid redefines performance and efficiency.'
  },
  {
    id: '3',
    name: 'Wrangler Rubicon',
    model: 'Jeep Wrangler Rubicon',
    year: 2024,
    type: 'Off-Road SUV',
    engine: '3.6L V6',
    horsepower: 285,
    description: 'Trail-rated capability meets legendary off-road heritage. Built for adventure with removable doors, fold-down windshield, and Rock-Trac 4WD system.'
  },
  {
    id: '4',
    name: 'Mustang GT',
    model: 'Ford Mustang GT',
    year: 2024,
    type: 'Muscle Car',
    engine: '5.0L V8',
    horsepower: 486,
    description: 'American muscle icon with modern performance. The legendary 5.0L V8 delivers raw power and that unmistakable Mustang sound that turns heads everywhere.'
  },
  {
    id: '5',
    name: 'Civic Type R',
    model: 'Honda Civic Type R',
    year: 2024,
    type: 'Hot Hatch',
    engine: '2.0L Turbo I4',
    horsepower: 315,
    description: 'Track-focused engineering in a practical package. The Type R combines everyday usability with race-bred performance and precision handling.'
  },
  {
    id: '6',
    name: 'Supra 3.0',
    model: 'Toyota GR Supra 3.0',
    year: 2024,
    type: 'Sports Car',
    engine: '3.0L Inline-6 Turbo',
    horsepower: 382,
    description: 'Pure sports car DNA reborn. Co-developed with BMW, the Supra delivers balanced performance, precise handling, and that classic rear-wheel-drive experience.'
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    username: 'CarEnthusiast',
    content: 'Just got back from a track day with my AMG GT. The handling is absolutely incredible - feels like the car is connected to your thoughts. Anyone else been to Circuit de Monaco recently?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 8,
    shares: 3,
    groupId: 'tuning',
  },
  {
    id: '2',
    username: 'ElectricDriver',
    content: 'Finally made the switch to electric with a Model S Plaid. The instant torque is addictive and the autopilot features are getting better every update. Still missing the engine sound though...',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 17,
    comments: 12,
    shares: 5,
    groupId: 'electric',
  },
  {
    id: '3',
    username: 'OffRoadAddict',
    content: 'Took the Jeep through some serious mud trails this weekend. Nothing beats the freedom of exploring places most cars can\'t go. Who else is planning some off-road adventures?',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 31,
    comments: 15,
    shares: 7,
    groupId: 'off-road',
  },
  {
    id: '4',
    username: 'ClassicRestorer',
    content: 'After 3 years of restoration, my 1967 Mustang is finally roadworthy again. Original 289 V8, all matching numbers. There\'s something special about bringing these classics back to life.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 45,
    comments: 22,
    shares: 9,
    groupId: 'beask',
  },
];

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SELECTED_GROUP'; payload: string | null }
  | { type: 'SET_SELECTED_CAR'; payload: string | null }
  | { type: 'ADD_POST'; payload: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'> }
  | { type: 'TOGGLE_LIKE'; payload: { postId: string } }
  | { type: 'SET_CREATE_POST_OPEN'; payload: boolean }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  selectedGroup: null,
  selectedCar: null,
  posts: mockPosts,
  groups: mockGroups,
  cars: mockCars,
  isCreatePostOpen: false,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    
    case 'SET_SELECTED_GROUP':
      return {
        ...state,
        selectedGroup: action.payload,
      };
    
    case 'SET_SELECTED_CAR':
      return {
        ...state,
        selectedCar: action.payload,
      };
    
    case 'ADD_POST':
      const newPost: Post = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
        isCreatePostOpen: false,
      };
    
    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        ),
      };
    
    case 'SET_CREATE_POST_OPEN':
      return {
        ...state,
        isCreatePostOpen: action.payload,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
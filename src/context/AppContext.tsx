import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  lastLogin?: Date;
}

interface Class {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  instructor: string;
  location: string;
  participants: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  location: string;
  responsible: string;
  impact: string;
  status: 'created' | 'updated' | 'deleted';
  images?: string[];
  videos?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

interface AppContextType {
  participants: Participant[];
  classes: Class[];
  activities: Activity[];
  addParticipant: (participant: Omit<Participant, 'id' | 'createdAt'>) => void;
  addClass: (classItem: Omit<Class, 'id'>) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
  updateParticipant: (id: string, participant: Partial<Participant>) => void;
  updateClass: (id: string, classItem: Partial<Class>) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  deleteParticipant: (id: string) => void;
  deleteClass: (id: string) => void;
  deleteActivity: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-8888',
      area: 'Educação',
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '(11) 99999-7777',
      area: 'Saúde',
      status: 'active',
      createdAt: new Date(),
    },
  ]);

  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      title: 'Introdução à Tecnologia',
      description: 'Aula sobre tecnologia e inovação',
      date: new Date(),
      duration: 120,
      instructor: 'Prof. Carlos',
      location: 'Sala 101',
      participants: 25,
      status: 'completed',
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Atividade Comunitária - Limpeza de Parque',
      description: 'Limpeza e manutenção do parque local',
      date: new Date(),
      duration: 180,
      location: 'Parque Central',
      responsible: 'João Silva',
      impact: 'Parque limpo, comunidade engajada',
      status: 'created',
      createdAt: new Date(),
    },
  ]);

  const addParticipant = (participant: Omit<Participant, 'id' | 'createdAt'>) => {
    const newParticipant: Participant = {
      ...participant,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setParticipants([...participants, newParticipant]);
  };

  const addClass = (classItem: Omit<Class, 'id'>) => {
    const newClass: Class = {
      ...classItem,
      id: Math.random().toString(36).substr(2, 9),
    };
    setClasses([...classes, newClass]);
  };

  const addActivity = (activity: Omit<Activity, 'id' | 'createdAt'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setActivities([...activities, newActivity]);
  };

  const updateParticipant = (id: string, participant: Partial<Participant>) => {
    setParticipants(participants.map(p => (p.id === id ? { ...p, ...participant } : p)));
  };

  const updateClass = (id: string, classItem: Partial<Class>) => {
    setClasses(classes.map(c => (c.id === id ? { ...c, ...classItem } : c)));
  };

  const updateActivity = (id: string, activity: Partial<Activity>) => {
    setActivities(activities.map(a => (a.id === id ? { ...a, ...activity } : a)));
  };

  const deleteParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        participants,
        classes,
        activities,
        addParticipant,
        addClass,
        addActivity,
        updateParticipant,
        updateClass,
        updateActivity,
        deleteParticipant,
        deleteClass,
        deleteActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, ReactNode } from "react"

interface Participant {
  id: string
  name: string
  curso: string
  area: string
  status: "active" | "inactive"
  createdAt: Date
  lastLogin?: Date
}

interface Class {
  id: string
  title: string
  description: string
  date: Date
  duration: number
  instructor: string
  location: string
  participants: number
  status: "scheduled" | "completed" | "cancelled"
  documents?: Array<{
    id: string
    name: string
    url: string
    uploadedAt: Date
  }>
}

interface Activity {
  id: string
  title: string
  description: string
  date: Date
  duration: number
  location: string
  responsible: string
  impact: string
  status: "created" | "updated" | "deleted"
  classId?: string // Relacionamento com aula
  images?: string[]
  videos?: string[]
  createdAt: Date
  updatedAt?: Date
}

interface AppContextType {
  participants: Participant[]
  classes: Class[]
  activities: Activity[]
  addParticipant: (participant: Omit<Participant, "id" | "createdAt">) => void
  addClass: (classItem: Omit<Class, "id">) => void
  addActivity: (activity: Omit<Activity, "id" | "createdAt">) => void
  updateParticipant: (id: string, participant: Partial<Participant>) => void
  updateClass: (id: string, classItem: Partial<Class>) => void
  updateActivity: (id: string, activity: Partial<Activity>) => void
  deleteParticipant: (id: string) => void
  deleteClass: (id: string) => void
  deleteActivity: (id: string) => void
  addDocumentToClass: (
    classId: string,
    document: { name: string; url: string },
  ) => void
  removeDocumentFromClass: (classId: string, documentId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "João Silva",
      curso: "Engenharia de Software",
      area: "Educação",
      status: "active",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Maria Santos",
      curso: "Medicina",
      area: "Saúde",
      status: "active",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Carlos Oliveira",
      curso: "Engenharia de Software",
      area: "Tecnologia",
      status: "active",
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Ana Souza",
      curso: "Design",
      area: "Design",
      status: "active",
      createdAt: new Date(),
    },
  ])

  const [classes, setClasses] = useState<Class[]>([
    {
      id: "1",
      title: "Introdução à Tecnologia",
      description: "Aula sobre tecnologia e inovação",
      date: new Date(),
      duration: 120,
      instructor: "Prof. Carlos",
      location: "Sala 101",
      participants: 25,
      status: "completed",
    },
  ])

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Atividade Comunitária - Limpeza de Parque",
      description: "Limpeza e manutenção do parque local",
      date: new Date(),
      duration: 180,
      location: "Parque Central",
      responsible: "João Silva",
      impact: "Parque limpo, comunidade engajada",
      status: "created",
      createdAt: new Date(),
    },
  ])

  const addParticipant = (
    participant: Omit<Participant, "id" | "createdAt">,
  ) => {
    const newParticipant: Participant = {
      ...participant,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }
    setParticipants([...participants, newParticipant])
  }

  const addClass = (classItem: Omit<Class, "id">) => {
    const newClass: Class = {
      ...classItem,
      id: Math.random().toString(36).substr(2, 9),
    }
    setClasses([...classes, newClass])
  }

  const addActivity = (activity: Omit<Activity, "id" | "createdAt">) => {
    const newActivity: Activity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }
    setActivities([...activities, newActivity])
  }

  const updateParticipant = (id: string, participant: Partial<Participant>) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, ...participant } : p)),
    )
  }

  const updateClass = (id: string, classItem: Partial<Class>) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, ...classItem } : c)))
  }

  const updateActivity = (id: string, activity: Partial<Activity>) => {
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, ...activity } : a)),
    )
  }

  const deleteParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id))
  }

  const deleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id))
  }

  const deleteActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id))
  }

  const addDocumentToClass = (
    classId: string,
    document: { name: string; url: string },
  ) => {
    setClasses(
      classes.map((c) =>
        c.id === classId
          ? {
              ...c,
              documents: [
                ...(c.documents || []),
                {
                  id: Math.random().toString(36).substr(2, 9),
                  name: document.name,
                  url: document.url,
                  uploadedAt: new Date(),
                },
              ],
            }
          : c,
      ),
    )
  }

  const removeDocumentFromClass = (classId: string, documentId: string) => {
    setClasses(
      classes.map((c) =>
        c.id === classId
          ? {
              ...c,
              documents: (c.documents || []).filter((d) => d.id !== documentId),
            }
          : c,
      ),
    )
  }

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
        addDocumentToClass,
        removeDocumentFromClass,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface Participant {
  id: string
  name: string
  curso: string
  area: string
  status: "active" | "inactive"
  photo?: string
  imagePosition?: string
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
  instagramUrl?: string
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

interface Material {
  id: string
  title: string
  description: string
  type: "pdf" | "video" | "link" | "arquivo"
  url: string
  uploadDate: string
}

interface AppContextType {
  participants: Participant[]
  classes: Class[]
  activities: Activity[]
  materials: Material[]
  addParticipant: (participant: Omit<Participant, "id" | "createdAt">) => void
  addClass: (classItem: Omit<Class, "id">) => void
  addActivity: (activity: Omit<Activity, "id" | "createdAt">) => void
  addMaterial: (material: Omit<Material, "id" | "uploadDate">) => void
  updateParticipant: (id: string, participant: Partial<Participant>) => void
  updateClass: (id: string, classItem: Partial<Class>) => void
  updateActivity: (id: string, activity: Partial<Activity>) => void
  deleteParticipant: (id: string) => void
  deleteClass: (id: string) => void
  deleteActivity: (id: string) => void
  deleteMaterial: (id: string) => void
  addDocumentToClass: (
    classId: string,
    document: { name: string; url: string },
  ) => void
  removeDocumentFromClass: (classId: string, documentId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw, (_, value) => {
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return new Date(value)
      }
      return value
    }) as T
  } catch {
    return fallback
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [participants, setParticipants] = useState<Participant[]>(() =>
    loadFromStorage<Participant[]>("uc_participants", [
      {
        id: "1",
        name: "Caio Ladeira Dornellas",
        curso: "Engenharia de Software",
        area: "Marketing",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2025/05/imagem-do-whatsapp-de-2025-05-17-as-15.33.47_125063a8.jpg",
        imagePosition: "center 40%",
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Carlos Eduardo Dias da Silva",
        curso: "Sistemas de Informação",
        area: "Professor",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2025/06/imagem-do-whatsapp-de-2025-06-23-as-12.24.44_27ce8b8f.jpg",
        imagePosition: "center 20%",
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Felipe Augusto",
        curso: "Engenharia de Software",
        area: "Marketing",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2025/06/imagem-do-whatsapp-de-2025-06-23-as-09.28.41_85b8a0e4.jpg",
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Jackson Aparecido Faria Oliveira",
        curso: "Sistemas de Informação",
        area: "Desenvolvedor",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2026/06/whatsapp-image-2026-06-12-at-20.58.27.jpeg",
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "Jean de Souza Morais",
        curso: "Sistemas de Informação",
        area: "Desenvolvedor",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2025/05/img.jpg",
        createdAt: new Date(),
      },
      {
        id: "6",
        name: "Luiz Fernando Pereira",
        curso: "Engenharia de Software",
        area: "Professor",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2026/06/whatsapp-image-2026-06-11-at-21.12.10.jpeg",
        createdAt: new Date(),
      },
      {
        id: "7",
        name: "Manuela Oliveira Baganha",
        curso: "Administração",
        area: "Marketing",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2026/06/whatsapp-image-2026-06-10-at-21.32.45.jpeg",
        imagePosition: "center 30%",
        createdAt: new Date(),
      },
      {
        id: "8",
        name: "Pedro Lucas Atalaia Fernandes",
        curso: "Sistemas de Informação",
        area: "Desenvolvedor",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2025/05/img_20220507_071254-1.jpg",
        imagePosition: "center 30%",
        createdAt: new Date(),
      },
      {
        id: "9",
        name: "Vinícius Machado Vianna",
        curso: "Engenharia de Software",
        area: "Professor/Lider",
        status: "active",
        photo: "https://uniconnectjf.wordpress.com/wp-content/uploads/2025/05/imagem-do-whatsapp-de-2025-05-17-as-15.40.45_674292aa.jpg",
        createdAt: new Date(),
      },
    ])
  )

  const [classes, setClasses] = useState<Class[]>(() =>
    loadFromStorage<Class[]>("uc_classes", [
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
  )

  const [activities, setActivities] = useState<Activity[]>(() =>
    loadFromStorage<Activity[]>("uc_activities", [
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
  )

  const [materials, setMaterials] = useState<Material[]>(() =>
    loadFromStorage<Material[]>("uc_materials", [])
  )

  useEffect(() => { localStorage.setItem("uc_participants", JSON.stringify(participants)) }, [participants])
  useEffect(() => { localStorage.setItem("uc_classes", JSON.stringify(classes)) }, [classes])
  useEffect(() => { localStorage.setItem("uc_activities", JSON.stringify(activities)) }, [activities])
  useEffect(() => { localStorage.setItem("uc_materials", JSON.stringify(materials)) }, [materials])

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

  const addMaterial = (material: Omit<Material, "id" | "uploadDate">) => {
    const newMaterial: Material = {
      ...material,
      id: Math.random().toString(36).substr(2, 9),
      uploadDate: new Date().toISOString(),
    }
    setMaterials((prev) => [newMaterial, ...prev])
  }

  const deleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id))
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
        materials,
        addParticipant,
        addClass,
        addActivity,
        addMaterial,
        updateParticipant,
        updateClass,
        updateActivity,
        deleteParticipant,
        deleteClass,
        deleteActivity,
        deleteMaterial,
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

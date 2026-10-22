import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'gatherly-events'

const readStoredEvents = () => {
  if (typeof window === 'undefined') return []

  try {
    const storedEvents = window.localStorage.getItem(STORAGE_KEY)
    if (!storedEvents) return []

    const parsedEvents = JSON.parse(storedEvents)
    if (Array.isArray(parsedEvents)) return parsedEvents

    console.error('Saved Gatherly events are invalid. Starting with an empty event list.')
  } catch (error) {
    console.error('Unable to read saved Gatherly events.', error)
  }

  return []
}

const events = ref(readStoredEvents())
const totalEvents = computed(() => events.value.length)
const activeEvents = computed(() => events.value.filter((event) => !event.done))
const completedEvents = computed(() => events.value.filter((event) => event.done))

watch(
  events,
  (nextEvents) => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEvents))
    } catch (error) {
      console.error('Unable to save Gatherly events to local storage.', error)
    }
  },
  { deep: true },
)

const createEvent = (eventData) => {
  let id = Date.now()
  while (events.value.some((event) => event.id === id)) id += 1

  const newEvent = {
    id,
    title: eventData.title.trim(),
    category: eventData.category.trim(),
    date: eventData.date,
    location: eventData.location.trim(),
    price: Number(eventData.price) || 0,
    desc: eventData.desc.trim(),
    done: false,
  }

  events.value.unshift(newEvent)
  return newEvent
}

const completeEvent = (id) => {
  const event = events.value.find((item) => item.id === Number(id))
  if (!event || event.done) return false

  event.done = true
  return true
}

const deleteEvent = (id) => {
  const eventIndex = events.value.findIndex((item) => item.id === Number(id))
  if (eventIndex === -1) return false

  events.value.splice(eventIndex, 1)
  return true
}

const getEventById = (id) => {
  const numericId = Number(id)
  if (!Number.isFinite(numericId)) return undefined

  return events.value.find((event) => event.id === numericId)
}

export const useEvents = () => ({
  events,
  totalEvents,
  activeEvents,
  completedEvents,
  createEvent,
  completeEvent,
  deleteEvent,
  getEventById,
})

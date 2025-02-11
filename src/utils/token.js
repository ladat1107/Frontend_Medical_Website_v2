import { STORAGE } from "@/constant/storage"

export const localToken = {
    get: () => JSON.parse(localStorage.getItem(STORAGE.token)),
    set: (token) => { localStorage.setItem(STORAGE.token, JSON.stringify(token)) },
    remove: () => { localStorage.removeItem(STORAGE.token) }
}
export const localUser = {
    get: () => JSON.parse(localStorage.getItem(STORAGE.user)),
    set: (user) => { localStorage.setItem(STORAGE.user, JSON.stringify(user)) },
    remove: () => { localStorage.removeItem(STORAGE.user) }
}

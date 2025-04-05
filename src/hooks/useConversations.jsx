import { getConversationsForStaff } from "@/services/doctorService"
import userService from "@/services/userService"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

export const useConversation = (receiverId = null) => {
    return useQuery({
        queryKey: ['conversation', receiverId],
        queryFn: () => userService.getConversation({ receiverId: receiverId }),
        placeholderData: keepPreviousData,
    })
}

export const useConversationForStaff = () => {
    return useQuery({
        queryKey: ['conversationForStaff'],
        queryFn: () => getConversationsForStaff(),
        placeholderData: keepPreviousData,
    })
}

export const useCreateMessage = () => {
    return useMutation({
        mutationFn: async (data) => {
            return userService.createMessage(data);
        },
    })
}

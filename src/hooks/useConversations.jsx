import { getConversationsForStaff } from "@/services/doctorService"
import userService from "@/services/userService"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

export const useConversation = ({ receiverId = null, enabled = true }) => {
    return useQuery({
        queryKey: ['conversation', receiverId],
        queryFn: () => userService.getConversation({ receiverId: receiverId }),
        placeholderData: keepPreviousData,
        refetchInterval: enabled ? 3000 : false,
        enabled,
    })
}

export const useConversationForStaff = ({ enabled = true }) => {
    return useQuery({
        queryKey: ['conversationForStaff'],
        queryFn: () => getConversationsForStaff(),
        placeholderData: keepPreviousData,
        refetchInterval: enabled ? 3000 : false,
        enabled,
    })
}

export const useCreateMessage = () => {
    return useMutation({
        mutationFn: async (data) => {
            return userService.createMessage(data);
        },
    })
}

export const useGetNumberMessageUnread = (enabled = true) => {
    console.log(enabled);
    return useQuery({
        queryKey: ['numberMessageUnread'],
        queryFn: () => userService.getNumberMessageUnread(),
        refetchInterval: enabled ? 3000 : false, // chỉ refetch nếu enabled
        enabled, // có thể dùng để bật/tắt toàn bộ query
    });
};


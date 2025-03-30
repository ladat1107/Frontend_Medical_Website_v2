import { useEffect, useState, useCallback } from "react";
import useSocket from "./useSocket";
import { useMutation } from "./useMutation";
import userService from "@/services/userService";
import { useSelector } from "react-redux";
import { STATUS_MESSAGE } from "@/constant/value";

const useChatSocket = (receiverId) => {
    const { user } = useSelector(state => state.authen);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    // Get conversation data
    const {
        data: chatData,
        loading: chatLoading,
        execute: fetchConversation
    } = useMutation(() =>
        userService.getConversation({ receiverId: user?.staff ? receiverId : null })
    );

    // Get socket connection
    const socket = useSocket('chat');

    // Get conversation ID from chat data
    const conversationId = chatData?.DT?.id || null;

    // Initialize conversation data
    useEffect(() => {
        if (user?.id) {
            fetchConversation();
        }
    }, [user?.id, receiverId]);

    // Update messages when chat data is loaded
    useEffect(() => {
        if (chatData?.EC === 0 && chatData?.DT?.messageData) {
            setMessages(chatData.DT.messageData || []);
        }
    }, [chatData]);

    // Socket connection management
    useEffect(() => {
        if (!socket) return;

        const handleConnect = () => {
            setIsConnected(true);
            setError(null);
        };

        const handleDisconnect = () => {
            setIsConnected(false);
            setJoinedRoom(false);
        };

        const handleConnectError = (err) => {
            console.error("Socket connection error:", err);
            setError(`Connection error: ${err.message}`);
            setIsConnected(false);
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('connect_error', handleConnectError);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('connect_error', handleConnectError);
        };
    }, [socket]);

    // Room joining logic
    useEffect(() => {
        if (!socket || !isConnected || !conversationId) return;

        socket.emit("joinRoom", conversationId);

        const handleRoomJoined = (data) => {
            if (data.success && data.conversationId === conversationId) {
                setJoinedRoom(true);
            }
        };

        socket.on("roomJoined", handleRoomJoined);

        return () => {
            socket.off("roomJoined", handleRoomJoined);
        };
    }, [socket, isConnected, conversationId]);

    // Message receiving logic
    useEffect(() => {
        if (!socket || !isConnected) return;

        const handleReceiveMessage = (data) => {
            if (data?.EC === 0 && data?.DT) {
                setMessages(prevMessages => {
                    const messageExists = prevMessages.some(msg => msg.id === data.DT.id);
                    if (messageExists) {
                        return prevMessages;
                    }
                    return [...prevMessages, data.DT];
                });
            } else {
                setError(data?.EM || "Unknown error receiving message");
            }
        };

        const handleMessageError = (error) => {
            console.error("Message error:", error);
            setError(error.error || "Error sending message");

            if (error.tempMessageId) {
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === error.tempMessageId ? { ...msg, status: STATUS_MESSAGE.FAILED } : msg
                    )
                );
            }
        };

        const handleMessageStatus = (data) => {
            if (data?.EC === 0 && data?.DT) {
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === data.DT.id ? { ...msg, status: data.DT.status } : msg
                    )
                );
            }
        };

        const handleTypingStatus = (data) => {
            if (data?.conversationId === conversationId) {
                setIsTyping(data.isTyping);
            }
        };

        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("messageError", handleMessageError);
        socket.on("messageStatus", handleMessageStatus);
        socket.on("typingStatus", handleTypingStatus);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("messageError", handleMessageError);
            socket.off("messageStatus", handleMessageStatus);
            socket.off("typingStatus", handleTypingStatus);
        };
    }, [socket, isConnected, conversationId]);

    // Send message function
    const sendMessage = useCallback((data) => {
        if (!socket || !isConnected || !conversationId) {
            setError("Cannot send message: not connected");
            return false;
        }

        // Add temporary message with sending status
        const tempMessage = {
            id: Date.now(),
            senderId: data.userId,
            content: data.content,
            link: data.link,
            status: STATUS_MESSAGE.SENDING,
            createdAt: new Date()
        };

        setMessages(prevMessages => {
            const tempMessageExists = prevMessages.some(msg => msg.id === tempMessage.id);
            if (tempMessageExists) {
                return prevMessages;
            }
            return [...prevMessages, tempMessage];
        });

        socket.emit("sendMessage", {
            conversationId,
            userId: data.userId,
            content: data.content,
            link: data.link,
            tempMessageId: tempMessage.id
        });

        return true;
    }, [socket, isConnected, conversationId]);

    // Typing status functions
    const startTyping = useCallback(() => {
        if (!socket || !isConnected || !conversationId) return;
        socket.emit("typing", { conversationId, isTyping: true });
    }, [socket, isConnected, conversationId]);

    const stopTyping = useCallback(() => {
        if (!socket || !isConnected || !conversationId) return;
        socket.emit("typing", { conversationId, isTyping: false });
    }, [socket, isConnected, conversationId]);

    return {
        messages,
        sendMessage,
        isConnected,
        joinedRoom,
        loading: chatLoading,
        error,
        conversationId,
        isTyping,
        startTyping,
        stopTyping
    };
};

export default useChatSocket;
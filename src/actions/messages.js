export const newMessage = (message, type = "info", time = 0) => ({
    type: "ADD_MESSAGE",
    payload: {
        id: Math.round(Math.random() * 100000),
        message, 
        type,
        time
    }
});

export const removeMessage = (id) => ({
    type: "REMOVE_MESSAGE",
    id
});
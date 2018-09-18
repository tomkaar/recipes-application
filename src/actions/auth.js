
export const userLogin = (user) => ({
    type: "USER_LOGIN",
    user: user
});

export const userLogout = () => ({
    type: "USER_LOGIN",
    user: ""
});

export const auth = {
  login: (user: any) => {
    localStorage.setItem("userid", user.id.toString());
    localStorage.setItem("username", user.username);
    localStorage.setItem("token", user.token);
  },
  logout: () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  },
  isLoggedIn: () => !!localStorage.getItem("token"),
  getUser: () => ({
    id: Number(localStorage.getItem("userid")),
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
    type: localStorage.getItem("type")
  }),
};
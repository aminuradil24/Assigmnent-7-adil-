export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("bazardor-user") || "null");
  } catch {
    return null;
  }
}

export function getAccount() {
  try {
    return JSON.parse(localStorage.getItem("bazardor-account") || "null");
  } catch {
    return null;
  }
}

export function saveAccount(account) {
  localStorage.setItem("bazardor-account", JSON.stringify(account));
}

export function saveUser(user) {
  localStorage.setItem("bazardor-user", JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem("bazardor-user");
}

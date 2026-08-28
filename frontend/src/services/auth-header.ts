export default function authHeader(): Record<string, string> {
  try {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user && user.accessToken) {
      return { Authorization: `Bearer ${user.accessToken}` };
    }
  } catch (error) {
    console.error("Erro");
  }

  return {};
}

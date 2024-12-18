import { login } from "@/lib/actions/auth";

export default function Login() {
  return (
    <form action={login}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

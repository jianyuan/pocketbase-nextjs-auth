import { login } from "@/lib/actions/auth";

export default async function Login() {
  return (
    <form action={login} className="flex flex-col gap-2">
      <h1 className="mb-8 text-2xl">Log in</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input input-bordered"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}

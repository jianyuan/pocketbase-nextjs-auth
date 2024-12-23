import { register } from "@/lib/actions/auth";

export default async function Login() {
  return (
    <form action={register} className="flex flex-col gap-2">
      <h1 className="mb-8 text-2xl">Register</h1>
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
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm password"
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
}

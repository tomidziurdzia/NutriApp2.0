import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertCircle } from "lucide-react";
import usePatient from "@/hooks/usePatient";

const SignInPatient = () => {
  const { signin, data } = usePatient();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await signin(values);
    if (data.success) return navigate("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl text-center text-white">Sign In Patient</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-white" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="tomidziurdzia@gmail.com"
            className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="block text-white" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="**********"
            className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        {data?.error && (
          <Alert variant="destructive" className="bg-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alert!</AlertTitle>
            <AlertDescription>{data.error?.message}</AlertDescription>
          </Alert>
        )}
        <Button className="bg-white shadow-md hover:bg-white/60 text-primary text-xl font-semibold">
          Sign In
        </Button>
      </form>
      <Link to="/auth/sign-up" className="text-white text-center">
        Don't have an account? Sign up
      </Link>
      <Link to="/auth/sign-in" className="text-white text-center">
        Are you a doctor? Login
      </Link>
    </div>
  );
};

export default SignInPatient;

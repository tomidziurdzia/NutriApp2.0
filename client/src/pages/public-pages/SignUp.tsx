import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useDoctor from "@/hooks/useDoctor.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertCircle, RocketIcon } from "lucide-react";

const SignUp = () => {
  const { signup, data } = useDoctor();
  const [showForm, setShowForm] = useState(true);

  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await signup(values);

    if (data.success) {
      setShowForm(!showForm);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl text-center text-white">Sign Up</h2>
      {showForm ? (
        <>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="mb-2">
                <label className="block text-white" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Tomas"
                  className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-white" htmlFor="lastname">
                  Lastname
                </label>
                <input
                  type="text"
                  placeholder="Dziurdzia"
                  className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                  name="lastname"
                  id="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
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
            <div className="flex gap-4">
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
              <div className="mb-2">
                <label className="block text-white" htmlFor="repeatPassword">
                  Repeat Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                  name="repeatPassword"
                  id="repeatPassword"
                  value={values.repeatPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            {data?.error && (
              <Alert variant="destructive" className="bg-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Alert!</AlertTitle>
                <AlertDescription>{data.error?.message}</AlertDescription>
              </Alert>
            )}
            <Button className="bg-white shadow-md hover:bg-white/60 text-primary text-xl font-semibold">
              Sign Up
            </Button>
          </form>

          <Link to="/auth/sign-in" className="text-white text-center">
            Already have an account? Log in
          </Link>
        </>
      ) : (
        <Alert variant="success" className="bg-white">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>{data?.error?.message}</AlertTitle>
          <div className="p-2">
            <Link
              to="/auth/sign-in"
              className="text-center bg-primary hover:bg-primary-foreground p-2 text-white"
            >
              Log in
            </Link>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default SignUp;

import jwt from "jsonwebtoken";

type Payload = { id: string };

export const generateToken = (payload: Payload, expiresIn: string): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): Payload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
};

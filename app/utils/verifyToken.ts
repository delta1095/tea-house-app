import jwt from "jsonwebtoken";

export const verifyToken = (value: string) => {
  const decoded = jwt.verify(value, process.env.JWT_SECRET!);
};

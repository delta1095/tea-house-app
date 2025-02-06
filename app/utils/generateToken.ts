import jwt from "jsonwebtoken";

export const generateToken = (user: {
  id: string;
  username: string;
  name: string | null;
  role: number;
  isAdmin: boolean;
}) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "12h" }
  );
};

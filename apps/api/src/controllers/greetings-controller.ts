import type { RequestHandler } from "express";

// TODO: Remove this controller (example only)

const sayHello: RequestHandler = (req, res): void => {
  res.json({ message: "Hello, World!" });
}

const greet: RequestHandler = (req, res): void => {
  const name = req.params.name;
  res.json({ message: `Hello, ${name}!` });
};

export default { sayHello, greet };

const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const SECRET_KEY = "SECRET_KEY";
const path = require("path");
const express = require("express");

server.use("/images", (req, res, next) => {
  express.static(path.join(__dirname, "public"))(req, res, next);
});
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Login endpoint
server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username, password }).value();

  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Logout endpoint (just for mock purposes)
server.post("/auth/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// JWT verification middleware
server.use((req, res, next) => {
  if (
    req.path === "/auth/login" ||
    req.path === "/auth/logout" ||
    req.path.startsWith("/images")
  ) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Custom routes if needed
server.use(
  jsonServer.rewriter({
    "/cattle/:id": "/cattle/:id",
  })
);

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

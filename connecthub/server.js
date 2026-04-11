app.use(cors({
  origin: ["http://localhost:3000"]
}));

app.use(session({
  secret: "secret",
  cookie: { maxAge: 1000 * 60 * 60 }
}));
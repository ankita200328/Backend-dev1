const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 min session
}));

// ===============================
// ✅ Exercise 1: Multi-Step Form
// ===============================

// Step 1 form
app.get("/step1", (req, res) => {
    res.send(`
        <form method="POST" action="/step1">
            Name: <input name="name"/><br/>
            Email: <input name="email"/><br/>
            <button>Next</button>
        </form>
    `);
});

app.post("/step1", (req, res) => {
    req.session.user = {
        name: req.body.name,
        email: req.body.email
    };
    res.redirect("/step2");
});

// Step 2
app.get("/step2", (req, res) => {
    res.send(`
        <form method="POST" action="/step2">
            Address: <input name="address"/><br/>
            <button>Finish</button>
        </form>
    `);
});

app.post("/step2", (req, res) => {
    req.session.user.address = req.body.address;
    res.redirect("/confirm");
});

// Final
app.get("/confirm", (req, res) => {
    res.send(req.session.user);
});

// ===============================
// ✅ Exercise 2: Language Cookie
// ===============================

app.get("/set-lang/:lang", (req, res) => {
    res.cookie("lang", req.params.lang, { maxAge: 1000000 });
    res.send("Language set!");
});

app.get("/lang", (req, res) => {
    const lang = req.cookies.lang || "en";
    res.send("Current Language: " + lang);
});

// ===============================
// ✅ Exercise 3: Admin Panel
// ===============================

// Login page
app.get("/login", (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            Username: <input name="username"/><br/>
            <button>Login</button>
        </form>
    `);
});

// Login logic
app.post("/login", (req, res) => {
    const username = req.body.username;

    if (username === "admin") {
        req.session.user = { role: "admin" };
    } else {
        req.session.user = { role: "user" };
    }

    // ✅ Cart migration (Exercise 5)
    const cookieCart = req.cookies.cart || [];
    req.session.cart = cookieCart;
    res.clearCookie("cart");

    res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
    res.send("Logged in as: " + req.session.user.role);
});

// Admin middleware
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        res.send("Access Denied");
    }
}

// Admin route
app.get("/admin", isAdmin, (req, res) => {
    res.send("Welcome Admin!");
});

// ===============================
// ✅ Exercise 4: Session Timeout
// ===============================

app.get("/timeout", (req, res) => {
    res.send(`
        <h1>Session Page</h1>
        <script>
            setTimeout(() => {
                alert("Session will expire soon!");
            }, 50000);
        </script>
    `);
});

// ===============================
// ✅ Exercise 5: Cart System
// ===============================

// Add to cart (guest)
app.get("/add-cart/:item", (req, res) => {
    let cart = req.cookies.cart || [];

    if (typeof cart === "string") {
        cart = [cart];
    }

    cart.push(req.params.item);
    res.cookie("cart", cart);

    res.send("Item added to cart!");
});

// View cart
app.get("/cart", (req, res) => {
    if (req.session.cart) {
        res.send("Session Cart: " + JSON.stringify(req.session.cart));
    } else {
        res.send("Cookie Cart: " + JSON.stringify(req.cookies.cart));
    }
});

// ===============================

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
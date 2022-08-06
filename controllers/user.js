import bcrypt from "bcrypt";
import { registerUser, findUserByEmail } from "../services/user.js"
import { Users } from "../models/UserModel.js";
import { createToken } from "../auth.js";

// Register
export const register = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password)
            res.status(400).json({ msg: "required field missing" });
        let newUser
        await bcrypt.hash(req.body.password, 10).then(hash => {
            newUser = new Users({
                name: req.body.name,
                password: hash,
                email: req.body.email,
                isAdmin: req.body.isAdmin || false
            });

        }).catch(err => {
            res.status(500).json({ err });
        });

        const data = await registerUser(newUser);
        res.status(200).json(data);

    }
    catch (err) {
        res.status(500).json({ msg: err });
    }

}

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user)
            res.status(401).json({ msg: "Wrong Credentials!" });

        await bcrypt.compare(password, user.password).then(match => {
            if (!match) {
                res.status(401).json("Incorrect password!");
            } else {
                const token = createToken(user);
                res.status(200).json({ msg: "login successful", token: token });
            }
        })
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}


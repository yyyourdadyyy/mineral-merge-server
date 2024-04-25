import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Register
export const reg = async(req, res) => {
    try {
        const {username, password}  = req.body

        const isUsed = await User.findOne({username})
        if (isUsed) {
            return res.json({
                message: "Имя уже занято",
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = User({
            username,
            password:hash,
        })

        const token = jwt.sign({
            id: newUser._id,
        }, process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        await newUser.save()

        res.json({
            newUser, token, message: "Регистрация прошла успешно",
        })
    } catch (error) {
        res.json({message: "Ошибка при регистрации", error})
    }
}
//Login
export const login = async(req, res) => {
    try {
        const {username, password}  = req.body
        const user = await User.findOne({username})
        if(!user) {
            return res.json({
                message: 'Пользователь не найден'
            })
        }
        const isPassCorrect = await bcrypt.compare(password, user.password)
        if (!isPassCorrect) {
            return res.json({
                message: 'Неверный пароль'
            })
        }
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )
        res.json({
            token, user, message: "Вы вошли в систему",
        })
    } catch (error) {
        res.json({message: "Ошибка при авторизации", error})
    }
}
//Get Me
// http://localhost:3002/api/auth/me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует.',
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
        res.json({ message: 'Нет доступа.' })
    }
}
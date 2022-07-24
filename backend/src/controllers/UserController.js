const models = require("../models");
const argon2 = require("argon2")
const Joi = require("joi")
const jwt = require('jsonwebtoken');
const formatErrors = require("../services/formatErrors");

class UserController {
  static hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

  static register = async (req, res) => {
    const { email, password, password_confirmation, role } = req.body

    const [result] = await models.user.findByMail(email)

    const rules = Joi.object({
      email: Joi.string().email().max(255).required(),
      password: Joi.string().max(4).required(),
      password_confirmation: Joi.any().equal(Joi.ref('password')).required(),
      role: Joi.string().valid('ROLE_USER','ROLE_ADMIN').max(255)
    });

    const { error: validationErrors, value } = rules.validate({
        email,
        password,
        password_confirmation,
        role
      },
      {abortEarly: false}
    )

    let formatedErrors = formatErrors(validationErrors)

    if (result.length) {
      formatedErrors = {...formatedErrors, email: "Cet email existe déjà"}

      return res.status(409).send(formatedErrors)
    }

    if (validationErrors) {
      return res.status(422).send(formatedErrors)
    }

    try {
      const hash = await argon2.hash(password, this.hashingOptions);
      const user = {email, password: hash, role}

      models.user
        .insert(user)
        .then(([result]) => {
          res.status(201).json({ id: result.insertId, email, role })
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({
            error: err.message,
          });
        });
    }
    catch (err) {
      res.status(500).send({
        error: `Erreur lors du chiffrement du mot de passe : ${err.message}`,
      })
    }
  };

  static isLogged = (req, res) => {
      const token = req.cookies.access_token;

      if (!token) {
        return res.sendStatus(401);
      }
      try {
        const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
        return res.status(200).json({id: user.id, email: user.email, role: user.role})
      } catch {
        return res.sendStatus(401);
      }
  }

  static login = (req, res) => {
    const { email, password } = req.body;

    const validationErrors = Joi.object({
      email: Joi.string().email().max(255).required(),
      password: Joi.string().max(255).required()
    }).validate({email, password}).error

    if (validationErrors) {
      res.status(422).send(validationErrors)
    }

    models.user
      .findByMail(email)
      .then(async ([rows]) => {
        if (rows[0] == null) {
          res.status(403).send({error : "Email ou mot de passe incorrect"})
        } else {
          const { id, email, password: hash, role } = rows[0];

          const isValidPwd = await argon2.verify(hash, password)

          if (!isValidPwd) {
            res.status(403).send({error : "Email ou mot de passe incorrect"})
          }

          const token = jwt.sign({ id: id, email: email, role: role },
            process.env.JWT_AUTH_SECRET,
            {
              expiresIn: "1h",
            });

          res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .send({id,email,role})
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };

  static browse = (req, res) => {
    models.user
      .findAll()
      .then(([rows]) => {
        return res.status(200).json(rows)
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };

  static logout = (req, res) => {
    res.clearCookie('access_token')
    res.sendStatus(200)
  };

  static edit = (req, res) => {
    const user = req.body;

    user.id = parseInt(req.params.id, 10);

    models.user
      .update(user)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.user
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };



}

module.exports = UserController;

import userService from "../services/User.service.js";
import { generateToken, customResponse } from "../utils/utils.js";

async function register(req, res, next) {
  try {
    const result = await userService.create(req.body);

    const response = {
      token: await generateToken({ id: result.id }),
      user: result,
    };

    return customResponse(res, 201, response);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await userService.login(req.body);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
  }

  return customResponse(res, 200, "Cerrar sesión exitosamente");
}

async function getActualUser(req, res, next) {
  try {
    return customResponse(res, 200, req.user);
  } catch (error) {
    next(error);
  }
}

export { getActualUser, login, logout, register };

import AuthDao from "../dao/DB/Auth.dao.js";
import BaseService from "./Base.service.js";

class AuthService extends BaseService {
  constructor() {
    super(AuthDao);
  }
}

export default new AuthService();

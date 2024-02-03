import * as chai from "chai";
import request from "supertest";
import server from "../server.js";
import { checkUserNameToken } from "../services/auth.js";

const { expect } = chai;

describe("Auth API", () => {
  it("should authenticate a user", (done) => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "testpassword" })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("token");
        done();
      });
  });
});

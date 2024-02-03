import * as chai from "chai";
import request from "supertest";
import server from "../server.js";

const { expect } = chai;

describe("Index Route", () => {
  it("should return a welcome message", (done) => {
    request(server)
      .get("/")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain("Welcome");
        done();
      });
  });
});

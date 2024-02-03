import * as chai from "chai";
import request from "supertest";
import server from "../server.js";

const { expect } = chai;

describe("Carts API", () => {
  it("should retrieve a user's cart", (done) => {
    request(server)
      .get("/api/carts/alguien")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

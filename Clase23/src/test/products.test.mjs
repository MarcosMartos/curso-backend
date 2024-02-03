import * as chai from "chai";
import request from "supertest";
import server from "../server.js";

const { expect } = chai;

describe("Products API", () => {
  it("should retrieve all products", (done) => {
    request(server)
      .get("/api/products")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

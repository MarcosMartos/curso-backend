import * as chai from "chai";
import request from "supertest";
import server from "../server.js";

const { expect } = chai;

describe("Blog API", () => {
  it("should retrieve all blog posts", (done) => {
    request(server)
      .get("/api/blog")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

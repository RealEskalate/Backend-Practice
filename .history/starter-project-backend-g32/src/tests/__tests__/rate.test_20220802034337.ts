import supertest from "supertest";
import app from "../../app";
const request = supertest(app);

const { connect, disconnect, clear } = require("../../setupdb");
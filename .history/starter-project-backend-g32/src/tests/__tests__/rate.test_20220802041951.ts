import supertest from "supertest";
import app from "../../app";
const request = supertest(app);
let rate: number = 0;

import { connect, disconnect } from "../setupdb";


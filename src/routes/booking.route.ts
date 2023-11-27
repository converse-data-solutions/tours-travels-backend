import Router from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
} from "../controller/booknow.controller";
import { verify } from "../controller/user.controller";

const bookingRouter = Router();

bookingRouter.post("/create", createBooking);
bookingRouter.delete("/:id", verify, deleteBooking);
bookingRouter.get("/:id", verify, getBookingById);
bookingRouter.get("/get/alllist", verify, getAllBookings);

export default bookingRouter;

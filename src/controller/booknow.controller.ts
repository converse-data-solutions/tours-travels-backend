import { RequestHandler } from "express";
import fs from "fs-extra";
import { Booking } from "../models/booknow.model";

export const createBooking: RequestHandler = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const bookingList = await Booking.create({ ...req.body });

    return res.status(200).json({
      isSuccess: true,
      message: "booking successfully",
      data: bookingList,
    });
  } catch (ex: any) {
    return res.status(400).json({
      isSuccess: false,
      message: "booking not submitted or created",
      data: ex.errors,
    });
  }
};

export const deleteBooking: RequestHandler = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const { id } = req.params;
    const deletedBooking: Booking | null = await Booking.findByPk(id);
    await Booking.destroy({ where: { id } });

    return res.status(200).json({
      isSuccess: true,
      message: "Package deleted successfully",
      data: deletedBooking,
    });
  } catch (ex: any) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "", data: ex.errors });
  }
};

export const getAllBookings: RequestHandler = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const getAllBookingsInfo: Booking[] = await Booking.findAll();

    const responseData = {
      isSuccess: true,
      message: " All Booking details get successfully",
      data: getAllBookingsInfo,
    };

    return res.status(200).json(responseData);
  } catch (ex: any) {
    res.status(400).json({
      isSuccess: false,
      message: "Booking details not get",
      data: ex.errors,
    });
  }
};

export const getBookingById = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const getBookingInfoById = await Booking.findByPk(id);

    return res.status(200).json({
      isSuccess: true,
      message: `The Booking details of the ${id} get successfully `,
      data: getBookingInfoById,
    });
  } catch (ex: any) {
    return res.status(400).json({
      isSuccess: false,
      message: "the booking details not get",
      data: ex.errors,
    });
  }
};

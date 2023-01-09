import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

// let buildUrlEmail = (doctorId, token) => {
//   let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
//   return result;
// };
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language
        });
        // let schedule = await db.Schedule.findOne({
        //     where: {
        //         doctorId: data.doctorId,
        //         date: data.date,
        //         timeType: data.timeType,
        //         status: true,
        //     },
        //     raw: false,
        // });

        // if (schedule) {
        //     schedule.status = false;
        //     await schedule.save();
        //     resolve({
        //         errCode: 0,
        //         errMessage: "Update the schedule succeed !",
        //     });
        // } else {
        //     resolve({
        //         errCode: 2,
        //         errMessage: "schedule has been disabled or does not exist !",
        //     });
        // }
        resolve({
          data: user,
          errCode: 0,
          errMessage: "Save infor patient succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          //Kiem tra status
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
            // date: data.date
          },
          raw: false, //Moi su dung duoc ham update
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();

          resolve({
            errCode: 0,
            errMessage: "Update the appointment succed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exits",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getHistoryPatient = (patientId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!patientId && !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S3",
            patientId: user[0].id,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "doctorData",
              attributes: ["email", "firstName", "address", "gender"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataDoctor",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  getHistoryPatient: getHistoryPatient,
};

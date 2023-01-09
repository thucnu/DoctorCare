import patientService from '../services/patientService';

let postBookAppointment = async (req,res)=>{
    try{
        let infor = await patientService.postBookAppointment(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(400).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let postVerifyBookAppointment = async (req,res)=>{
    try{
        let infor = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(400).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getHistoryPatient = async (req,res)=>{
    try{
        let infor = await patientService.getHistoryPatient(req.query.patientId, req.query.date);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e)
        return res.status(400).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    getHistoryPatient: getHistoryPatient
}
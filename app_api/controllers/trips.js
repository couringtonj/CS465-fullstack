const { Model } = require('mongoose');
const mongoose=require('mongoose');
const Module=mongoose.model('trips');

//GET: /trips -lists all the trips
const tripsList=async(req,res)=>{
    Model
        .find({})
        .exec((err,trips)=>{
            if(!trips){
                return res
                    .status(404)
                    .json({"message":"No trips found!"});
            }else if(err){
                return res
                    .status(404)
                    .json(err);
            }
        });

};
//GET: /trips/:tripCode -returns a single trip
const tripsFindByCode=async(req,res)=>{
    Model
        .find({'code':req.params.tripCode})
        .exec((err,trip)=>{
            if(!trip){
                return res
                    .status(404)
                    .json({"message":"No trip found!"});
            }else if(err){
                return res
                    .status(404)
                    .json(err);
            }else{
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

modules.export={
    tripsList,
    tripsFindByCode
};
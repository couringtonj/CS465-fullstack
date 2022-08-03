const { Model } = require('mongoose');
const mongoose=require('mongoose');
const readline = require('readline');
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

const tripsAddTrip=async(req,res)=>{
    mongoose.model
    .create({
        code:req.body.code,
        name:req.body.name,
        length:req.body.length,
        start:req.body.start,
        resort:req.body.resort,
        perPerson:req.body.perPerson,
        image:req.body.image,
        description:req.body.description
    },
    (err,trip)=>{
        if(err){
            return res
                .status(400)
                .json(err);
        }else{
            return res
                .status(201)
                .json(trip);
        }
    });
}
const tripsUpdateTrip=async(req,res)=>{
    console.log(req.body);
    mongoose.model
    .findOneAndUpdate({'code':req.params.tripCode},{
        code:req.body.code,
        name:req.body.name,
        length:req.body.length,
        start:req.body.start,
        resort:req.body.resort,
        perPerson:req.body.perPerson,
        image:req.body.image,
        description:req.body.description
    },{new:true})
    .then(trip=>{
        if(!trip){
            return res
                .status(404)
                .send({
                    message:"Trip not found with code "+req.params.tripCode
                });
        }
        res.send(trip);


    }).catch(err=>{
        if(err.kind==='ObjectId'){
            .status(404)
                .send({
                    message:"Trip not found with code "+req.params.tripCode
                });
        }
        return res 
            .status(500)
            .json(err)
    });

}
modules.export={
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};

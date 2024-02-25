const mongoose = require('mongoose');
const { integer } = require('neo4j-driver');

const railSchema = new mongoose.Schema({
        TrainNo: Number,
        TrainName: String,
        SEQ:String,
        StationCode: String,
        StationName: String,
        Arrivaltime: String,
        DepartureTime: String,
        Distance: String,
        SourceStation: String,
        SourceStationName: String,
        DestinationStation: String,
        DestinationStationName: String
});

const railModel = mongoose.model('rails', railSchema);

module.exports = railModel;

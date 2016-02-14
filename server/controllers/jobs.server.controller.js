var mongoose = require('mongoose');
var Job      = mongoose.model('Job');
var Owner    = mongoose.model('Owner');

exports.postJobs = function(req, res) {
  var newJob = new Job();

  Owner.findOne({_id: req.body.owner }, function(err, owner) {
    if (err) { throw err; }

    if (!owner) {
      res.status(403).send({
        description: 'forbidden'
      });
    } else {
      newJob.size = req.body.size;
      newJob.price = req.body.price;
      newJob.notes = req.body.notes;
      newJob.owner = owner._id;

      newJob.save(function(err) {
        if (err) { throw err; }
        res.status(201).send({ description: 'job created!' });
      });
    }
  });
};

exports.getJobs = function(req, res) {

  Job.find({})
  .populate('owner')
  .exec(function(err, jobs) {
    if(err) {
      return res.status(400).send({
        'description': 'error'
      });
    } else {
      res.json(jobs);
    }
  });

};

exports.getOneJob = function(req, res) {
  Job.findOne({_id: req.params.jobId})
  .populate('owner')
  .exec(function(err,job){
    if(err) {
      return res.status(400).send({
        'description': 'unexpected error'
      });
    } else {
      res.status(200).send(job);
    }
  });
};

exports.jobShovelerAccept = function(req, res){
  Job.findOne({_id: req.params.jobId})
  .exec(function(err, job){
    if(err) {
      return res.status(400).send({
        'description': 'unexpected error'
      });
    } else {
      job.has_shoveler = true;
      job.shoveler = req.body.shovelerId;
      job.save(function(err){
        if(err) {
          return res.status(400).send({
            'description': 'unexpected error'
          });
        } else {
          res.status(201).send();
        }
      });
    }
  });
};

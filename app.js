var express = require('express'),
    app = express(),
    cors = require('cors'),
    mongo = require('mongodb'),
    router =  express.Router();

app.use(cors());

var url='mongodb://localhost:27017/school'

app.listen(3000,function(){
    console.log('Server running at 3000...');
    
});

app.use('/',router);

router.get('/get-data',function(req,res){
    console.log('GET request...');
    var resultArray=[];
    mongo.connect(url,function(err,db){
        if(err)
            console.log(err);
        else{
            console.log('Mongodb connected..');
            var obj = db.collection('students').find();
           
            obj.forEach(function(row,err){
                if(err)
                    console.log(err);
                else
                    resultArray.push(row);
            },function(){
                db.close();
                res.json(resultArray);
            });
        }
    });
    
});

var bee = require("beeline");
var db = require("./src/db.js")
var router = bee.route({ // Create a new router
    "/user/`username`": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        res.writeHeader(200, {"Content-Type": "text/html;charset=utf-8"});  
        res.write("Hello World!"+ tokens.username);  
        res.end();  
    }    
    ,
    "/post": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        var mstring ="\
        <ul>\
        <li>one line \
        <li>two line \
        <li>three line \
        </ul> \
        "
        res.writeHeader(200, {"Content-Type": "text/html;charset=utf-8"});  
        res.write(mstring);  
        res.end();  
    }    
    ,
    "/post1": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        var mstring = function(){/*
            <ul>
            <li>one line 
            <li>two line 
            <li>three line             
            </ul> 
        */}.toString().slice(14,-3)
        res.writeHeader(200, {"Content-Type": "text/html;charset=utf-8"});  
        res.write(mstring);  
        res.end();  
    }    
    ,"/event": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        var mstring = function(){/*
            all events:<br/>
            <ul>
                <li>one line 
                <li>two line 
                <li>three line
            </ul> 
        */}.toString().slice(14,-3)
        res.writeHeader(200, {"Content-Type": "text/html;charset=utf-8"});  
        db.get_events(function(events){
            var events_str =  "<li>" + events.join("<li>");
            res.write(mstring);  
            res.end();      
        });
        // events.forEach(function(event){

        // })
        
    }   
    ,"/clearall": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        var mstring = function(){/*
            cleared
        */}.toString().slice(14,-3)
        res.writeHeader(200, {"Content-Type": "text/html;charset=utf-8"});  
        db.flushdb()
        res.write(mstring)
        res.end()        
    } 
     ,"/uibox": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        var mstring = function(){/*
           <form action="/save" method="post">
            <input name="event" id="event" text="something happened"/>
            </form>
        */}.toString().slice(14,-3)
        res.writeHeader(200, {"Content-Type": "text/html;charset=utf-8"});  
        res.write(mstring);  
        res.end()        
    }   
    ,"/save": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        var mstring = function(){/*
           saved. 
        */}.toString().slice(14,-3)
        res.writeHeader(200, {"Content-Type": "text/html;charset=utf-8"});  
        var url = require('url')
        var qs = require('querystring')
        if(req.method=='POST') {
                var body='';
                req.on('data', function (data) {
                    body +=data;
                });
                req.on('end',function(){                    
                    var post =  qs.parse(body);
                    console.log(post);
                    var thing = post.event
                    console.log("thing:"+thing);
                    db.post(thing,function(){
                        // console.log("t1")
                        db.get_events(function(events){
                            // console.log("t2")
                            var events_str =  "<li>" + events.join("<li>");
                            res.write(mstring+events_str);  
                            res.end();      
                        })
                    })        
                });
        }
    }  
});
// Starts serve with routes defined above:
require("http").createServer(router).listen(8001);
console.log("up to run ... http://localhost:8001/")
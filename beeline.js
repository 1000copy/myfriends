var bee = require("beeline");
var router = bee.route({ // Create a new router
    "/user/`username`": function(req, res, tokens, values) {
        // Called when req.url === "/cheggit" or req.url === "/cheggit?woo=poo"
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write("Hello World!"+ tokens.username);  
        res.end();  
    }    
});
// Starts serve with routes defined above:
require("http").createServer(router).listen(8001);
console.log("up to run ... http://localhost:8001/")
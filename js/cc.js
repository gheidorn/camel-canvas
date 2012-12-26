var CamelCanvas = (function (context) {
    var SIZE_ENDPOINT = 20;
    var TYPE_ENDPOINT = "Endpoint";
    var TYPE_EXCHANGE = "Exchange";
    var my = {}, canvas, ctx, someConfig = 1;
    var items = [];
    var endpointsCtr = 0, exchangesCtr = 0;

    my.init = function() {
        canvas = document.getElementById('cc');
        //console.log(canvas);
        canvas.onselectstart = function () { return false; }
        //canvas.addEventListener("mousedown", canvasMouseDown, false);
        //canvas.addEventListener("mouseup", canvasMouseUp, false);
        // Check the element is in the DOM and the browser supports canvas
        if(canvas.getContext) {
            // Initaliase a 2-dimensional drawing context
            ctx = canvas.getContext('2d');
        }
    }

    function canvasMouseDown(e) {
        console.log("mousedown on canvas");
        console.log(e.clientX);

        /*
        ctx.strokeStyle = "#694489";
        ctx.beginPath();
        ctx.rect(e.clientX,e.clientY,50, 100);
        ctx.closePath();
        ctx.stroke();
        */
    }

    function canvasMouseUp(e) {
        console.log("mouseup on canvas");
        console.log(e.clientX);
        
        //ctx.clearRect(e.clientX,e.clientY,51, 101);
    }

    my.backgroundColor = "#cacaca";
    
    my.addEndpoint = function(name) {
        var e = new Endpoint();
        e.type = TYPE_ENDPOINT;
        e.name = name;
        e.size = SIZE_ENDPOINT;
        e.context = ctx;
        items.push(e);
        endpointsCtr++;
        console.log("added new endpoint [" + name + "] to items [size=" + items.length + "]");
    }
    
    my.addExchange = function(name, from, to) {
        var e = new Exchange();
        e.type = TYPE_EXCHANGE;
        e.name = name;
        e.from = from;
        e.to = to;
        e.context = ctx;
        
        items.push(e);
        exchangesCtr++;
        console.log("added new exchange [" + name + "] to items [size=" + items.length + "]");
    }
    
    my.draw = function () {
        // calculate space between nodes
        var gap = (canvas.width - 40) / endpointsCtr;
        
        // draw endpoints other than the first
        for(var i=0; i<items.length; i++) {
            if(items[i] instanceof Endpoint) {
                items[i].x = 50;
                items[i].y = (gap * i) + 20;
                console.log("set coords for endpoint " + items[i].name);
            } else if(items[i] instanceof Exchange) {
                var fromObj = getItemByName(items[i].from);
                var toObj = getItemByName(items[i].to);
                items[i].fromX = fromObj.x;
                items[i].fromY = fromObj.y;
                items[i].toX = toObj.x;
                items[i].toY = toObj.y;
                console.log("set from and to coords for exchange " + items[i].name);
            } else {
                console.log("unexpected object type in items[]");
            }

            items[i].draw();
        }
    };

    function someMethod() {
        // do something
        console.log('CamelCanvas loading...');
    }

    function Endpoint() {
        this.name = "DefaultEndpointName";
        this.type = "DefaultEndpointType";
        this.x = 0;
        this.y = 0;
        this.size = 0;
    }
    
    Endpoint.prototype.draw = function() {
        var textOffSet = this.size + 10;
        var textColor = "#000"
        //ctx.strokeStyle = "#694489";
        ctx.fillStyle = "#BDA0CB";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
        ctx.closePath();
        //ctx.stroke();
        console.log("drawing Endpoint at " + this.x + ", " + this.y);
        ctx.fill();
        
        ctx.fillText(this.name, this.x + textOffSet, this.y);
        console.log("drawing Endpoint label at " + (this.x + textOffSet) + ", " + (this.y + 20));
    }
    
    function Exchange() {
    }
    
    Exchange.prototype.draw = function() {
        ctx.strokeStyle = "#694489";
        ctx.beginPath();
        ctx.moveTo(this.fromX, this.fromY);
        ctx.lineTo(this.toX, this.toY);
        ctx.closePath();
        console.log("drawing Exchange from " + this.fromX + ", " + this.fromY + " to " + this.toX + ", " + this.toY);
        ctx.stroke();
        
        var textX = (Math.abs(this.fromX - this.toX) / 2) + 10;
        var textY = Math.abs(this.fromY - this.toY) / 2;

        ctx.fillText(this.name, this.fromX + textX, this.fromY + textY);
        console.log("drawing Exchange label at " + (this.fromX + textX) + ", " + (this.fromY + textY));
    }
    
    function getItemByName(name) {
        for(var i=0; i<items.length; i++) {
            if(items[i].name === name) {
                // console.log(items[i]);
                return items[i];
            }
        }
    }
    
    return my;
}());
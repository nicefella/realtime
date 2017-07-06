
    var RealTimeData = function(layers, ranges, bounds) {
        this.layers = layers;
        this.bounds = bounds || [];
        this.ranges = ranges || [];
        this.timestamp = ((new Date()).getTime() / 1000)|0;
    };

    RealTimeData.prototype.rand = function(bound) {
        bound = bound || 100;
        return parseInt(Math.random() * bound) + 50;
    };

    RealTimeData.prototype.history = function(entries) {
        if (typeof(entries) != 'number' || !entries) {
            entries = 60;
        }

        var history = [];
        for (var k = 0; k < this.layers; k++) {
            var config = { label: "layer-"+k, values: [] };
            if(this.ranges[k]) {
                config.range = this.ranges[k];
            console.log(config);
            }

            history.push(config);
        }

        for (var i = 0; i < entries; i++) {
            for (var j = 0; j < this.layers; j++) {
                history[j].values.push({time: this.timestamp, y: this.rand(this.bounds[j])});
            }
            this.timestamp++;
        }

        return history;
    };

    RealTimeData.prototype.next = function() {
        var entry = [];
        for (var i = 0; i < this.layers; i++) {
            entry.push({ time: this.timestamp, y: this.rand(this.bounds[i]) });
        }
        this.timestamp++;
        return entry;
    }


module.exports.RealTimeData = RealTimeData;
 //   window.RealTimeData = RealTimeData;



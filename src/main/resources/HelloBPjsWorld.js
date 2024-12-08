/* global bp */
var curr_count = bp.Event("counter");


bp.registerBThread("starter", function(){
  curr_count = bp.Event("game_count", {type:"counter", value:1});
  bp.sync({request:curr_count});
});

bp.registerBThread("Boom", function(){
    var checkEvents = bp.EventSet("counters", function(evt) {
       return (evt.data==null ) ?
                 false :
                 evt.data.type && evt.data.type=="counter" ;
     });

    var anyEventExceptNoBoomCheck = bp.EventSet("anyEventExceptNoBoomCheck", function(evt) {
        return evt.name !== "noBoomCheck";
    });

    while(true) {
        var check = bp.sync({waitFor: checkEvents});

        if ((curr_count.data.value + 1)%7==0 || (curr_count.data.value + 1).toString().indexOf('7') > -1)  {
            bp.sync({request:bp.Event("Boom!")});

            i = 2;
            while( (curr_count.data.value + i) % 7 == 0 || (curr_count.data.value + i).toString().indexOf('7') > -1) {
                i++;

                bp.sync({request:bp.Event("Boom!")});

            }
            curr_count.data.value = curr_count.data.value + i - 1;
        }

        bp.sync({request:bp.Event("noBoomCheck")});

    }
});

bp.registerBThread("Increaser", function(){

    var counterEvt = bp.EventSet("counters", function(evt) {
    return (evt.data==null) ?
              false :
              evt.data.type && evt.data.type=="counter"
    });

    var counter= bp.sync({waitFor:counterEvt});

    var booms = bp.EventSet("BoomSet", function(evt) {
            // Check if the event has a specific name
            return (evt.name === "noBoomCheck" );
        });

    while (true) {

        counter = bp.sync({waitFor:booms});
        curr_count.data.value = curr_count.data.value + 1;


        bp.sync({request:bp.Event("game_count", {type:"counter", value:curr_count.data.value})});
    }
});

bp.registerBThread("Limit_Count_30", function() {
  var countersAt31 = bp.EventSet("done", function(evt) {
    return (evt.data==null) ?
            false :
            evt.data.type=="counter" && evt.data.value==31;
  });
  bp.sync({block:countersAt31});
});

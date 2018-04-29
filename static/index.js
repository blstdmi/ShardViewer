var ws = new WebSocket("ws://perkelle.com:3333/ws");

ws.onmessage = function(evt) {
    var msg = evt.data.toString();
    var parsed = JSON.parse(msg);
    var id = parsed["ID"],
        status = parsed["Status"];

    var table = document.getElementById("statuses"),
        tbody = table.tBodies[0];
    $('tr').each(function(i, el) {
        if(el.parentElement.tagName !== "THEAD") {
            var $tds = $(this).find('td'),
                elementId = $tds.eq(0).text(),
                currentStatus = $tds.eq(1).text();

            if(elementId == id) {
                if (currentStatus !== status) {
                    el.remove();
                    if (status !== "CONNECTED") {
                        var tr = tbody.insertRow(0);

                        var idTd = document.createElement('td');
                        idTd.innerHTML = id;

                        var statusTd = document.createElement('td');
                        statusTd.innerHTML = status;

                        tr.appendChild(idTd);
                        tr.appendChild(statusTd);
                        $(tr).children('td').addClass("error");
                        $(tr).children('td').addClass("shard-" + id);
                    }
                    else {
                        var tr = tbody.insertRow(id);

                        var idTd = document.createElement('td');
                        idTd.innerHTML = id;

                        var statusTd = document.createElement('td');
                        statusTd.innerHTML = status;

                        tr.appendChild(idTd);
                        tr.appendChild(statusTd);
                        $(tr).children('td').addClass("positive");
                        $(tr).children('td').addClass("shard-" + id);
                    }
                }
            }
        }
    });
};

function colourShards() {
    $('tr').each(function(i, el) {
        var $tds = $(this).find('td'),
            id = $tds.eq(0).text(),
            status = $tds.eq(1).text();

        if(status !== "CONNECTED") {
            $tds.addClass("error")
        }
        else {
            $tds.addClass("positive");
        }
    });
}

colourShards();
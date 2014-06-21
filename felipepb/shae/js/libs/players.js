var PlayersLoader = PlayersLoader || {
    lastId: 0,
    list: new Array(),
    loadMore: function () {
		console.log('load more: ' + PlayersLoader.lastId);
        $.ajax({
            type: "GET",
            accepts: "application/json",
            crossDomain: true,
            contentType: 'application/json',
            headers: { 'Accept': 'application/json', 'X-ZUMO-APPLICATION': 'NFxVmTKKNrzyoUMZUmdsAzMxnCCQOv20'},
            url: "https://tww.azure-mobile.net/api/shae?id=" + PlayersLoader.lastId,
            data: null,
            success: function (results) {
                if (!results)
                    return;

                for (var i = results.length - 1; i >= 0; i--) {
					PlayersLoader.list.push(results[i]);
					var content = '<div style="margin:10px">'+
                                      '<img src="' + results[i].Picture + '" border="0" />' +
									  '<a href="' + results[i].FB + '">' + results[i].Name + '</a><br />' +
									  results[i].Date
							      '</div>';
					$('#content').prepend(content);
				}
                
				if (results.length > 0)
                    PlayersLoader.lastId = results[0].Id;
            },
            dataType: "json"
        });
    } 
};

$(document).ready(function () {
	PlayersLoader.loadMore();
	window.setInterval(PlayersLoader.loadMore, 30000);
});
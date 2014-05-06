var bloco = {
	color : function(linha)
	{
		switch(linha) {
			case 0:
				return "green";
				break;
			case 1:
				return "blue";
				break;
			case 2:
				return "red";
				break;
			case 3:
				return "yellow";
				break;
			case 4:
				return "orange";
				break;
			default:
				return "black";
		}
	}
};
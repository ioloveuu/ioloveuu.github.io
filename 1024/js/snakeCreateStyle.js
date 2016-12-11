
		var table = document.getElementsByTagName('table')[0];
		var num = 15;									//棋盘格的长度及宽度
		var tbody = document.createElement('tbody');
		for(var i=0;i<num;i++){
			var tr = document.createElement('tr');
			tbody.appendChild(tr)
			for(var j=0;j<num;j++){
				tr.appendChild(document.createElement('td'));
			}
		}
		table.appendChild(tbody);
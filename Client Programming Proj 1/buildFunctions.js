
		function loadXMLDoc(filename){
			if(window.XMLHttpRequest){
				xhttp=new XMLHttpRequest();
			}else{

				xhttp=new ActiveXObject("Microsoft.XMLHTTP");	
			}
			xhttp.open("GET",filename,false);
			xhttp.send();

			// using to parse for IE9 and below
			if (window.DOMParser){
			  parser=new DOMParser();
			  xmlDoc=parser.parseFromString(xhttp.responseText,"text/xml");
			 }
			 else{ // code for IE
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(xhttp.responseText); 
			 } 
			return xmlDoc.childNodes[0];
			// parses everything to text instead of XML
		}

		function init (attr) {
			// generates selects and options

			// kill code
			// if(attr != 'first'){
				
			// }

			// Do nothing if undefined or empty
			if(attr != "" || attr != undefined){

				// kill code
				// while(temp != temp.parentNode.lastChild){
				// //which.parentNode.removeChild(which.parentNode.lastChild);

				// 	console.log("here");
				// 	document.getElementById('selectDiv').removeChild(temp.parentNode.lastChild);
				// }

				var xmlDoc= loadXMLDoc('formtest.xml');
				
				//var body = document.getElementsByTagName('body')[0];
				var div = document.getElementById('selectDiv');
				var brEle = document.createElement('br');
				
				var questions = xmlDoc.getElementsByTagName('question');
				
				// sets index for the correct options
				var index = "";
				for(var i = 0; i < questions.length; i++){

					if(attr == questions[i].getAttribute('prev')){
						index = i;
					}

				}

				// Creates selects

				var select = document.createElement('select');
				select.setAttribute('id', index);

				if(ie7){
					select.setAttribute('onchange', function(){init(this.value)});
				}else{
					select.setAttribute('onchange', "init(this.value)");
				}
				

			
				// Creates "default" option
				var emptyOption = document.createElement('option');
				var tempText = document.createTextNode("Select one");
				emptyOption.setAttribute('value', "");
				emptyOption.appendChild(tempText);
				select.appendChild(emptyOption);

				// Creates options depending on previous selected option and appends to selects
				for(var j = 0; j < questions[index].getElementsByTagName('opt').length; j++){
					var option = document.createElement('option');
					var text = document.createTextNode(questions[index].getElementsByTagName('opt')[j].childNodes[0].textContent);
					option.setAttribute('value', questions[index].getElementsByTagName('opt')[j].getAttribute('value'));
					option.appendChild(text);

					select.appendChild(option);

				}
				
				// Creates question text
				var tempText = document.createTextNode(questions[index].getElementsByTagName('q')[0].textContent);
				var hEle = document.createElement('h4');

				hEle.appendChild(tempText);
				div.appendChild(hEle);

				div.appendChild(select);

			}

		}

		// Creates form with name and email inputs
		function showForm(){

			var br = document.createElement('br');
			var br2 = document.createElement('br');

			var form = document.createElement('form');
			form.setAttribute('method', 'get');
			form.setAttribute('name','infoForm');
			form.setAttribute('id', 'info');
			

			if(ie7){
				form.setAttribute('onsubmit', function(){return validateForm()});
			}else{
				form.setAttribute('onsubmit', 'return validateForm()');
			}
			

			var lText= document.createTextNode('Your Name: ');
			var lText2 = document.createTextNode('E-mail: ');
			var name = document.createElement('label');
			var email = document.createElement('label');

			var input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('name', 'username');
			input.setAttribute('id', 'nameInput');

			var input2 = document.createElement('input');
			input2.setAttribute('type', 'text');
			input2.setAttribute('name', 'email');
			input2.setAttribute('id', 'emailInput');


			var submit = document.createElement('input');
			submit.setAttribute('type', 'submit');
			submit.setAttribute('value', 'Submit');
			submit.setAttribute('name', 'submitBtn');


			name.appendChild(lText);
			email.appendChild(lText2);
			form.appendChild(br);
			form.appendChild(name);
			form.appendChild(input);
			form.appendChild(br2);
			form.appendChild(email);
			form.appendChild(input2);

			form.appendChild(submit);

			document.getElementsByTagName('body')[0].appendChild(form);

		}

		// Validates form
		// if no inputs, form does not get submitted and user is prompted
		 function validateForm(){
		 	
			var nameVal = document.getElementById('nameInput').value;
			var mailVal = document.getElementById('emailInput').value;
			var pos = mailVal.indexOf("@");
			var dotPos = mailVal.lastIndexOf(".");
			if(nameVal == null || nameVal == "") {
				alert("Please fill out the form");
				return false;
			}
			if(pos < 1 || dotPos < pos+2 || dotPos+2 > mailVal.length){
				alert("Please fill out the form");
				return false;
			}else{
				storage();
				return true;
			}

		 }

		function setOpacity(Opacity)//sets opacity for image
		{
			var imageToFade = document.getElementById("banner");
			imageToFade.style.opacity = Opacity;
			imageToFade.style.filter = 'alpha(opacity=' + (Opacity * 100) + ');';
		}

		function fadeIn() // image fade
		{
			setOpacity(0);
			for(i = 0; i <= 1; i+= 0.01){
			}

			for (i = 0; i <= 1; i += 0.001) 
			{
				setTimeout("setOpacity(" + i +")", i * 2000);
			}

		}

		function storage(){
			if(window.localStorage){
				localStorage.setItem("name", document.getElementById('nameInput').value);
				
			}else{
				if(GetCookie('cookieName') == null){
					SetCookie('cookieName', document.getElementById('nameInput').value);
					
				}
			}
		}

		function hello(){
			if(window.localStorage){
				var text = document.createTextNode(localStorage.getItem("name"));
				document.getElementById('localStorageVal').appendChild(text);
			}else{
				var text = document.createTextNode(GetCookie("cookieName"));
				document.getElementById('localStorageVal').appendChild(text);
			}
		}
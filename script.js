var data = (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')):{
		todo: [],
		completed: []
	};

	renderToDoList();


	function dataObjectUpdated(){

		localStorage.setItem('todolist', JSON.stringify(data));

	}
	
	const addBtn = document.querySelector('.add');
	const taskInput = document.querySelector('.task');

	function removeItem(e){

		const item = this.parentNode.parentNode;
		const list = item.parentNode;
		const id = list.id;
		var value = item.innerText;

		if( id === "todo") {
			data.todo.splice(data.todo.indexOf(value), 1);
		} else {
			data.completed.splice(data.completed.indexOf(value), 1);
		}

		e.target.parentNode.parentNode.remove();
console.log(e.target);
		//removeAll();

		dataObjectUpdated();
	}

	function completeItem(e){

		const item = this.parentNode.parentNode;
		const list = item.parentNode;
		const id = list.id;
		var value = item.textContent;
console.log(e.target.parentNode.parentNode);
		//item.classList.toggle('opacity');

		if( id === "todo") {
			data.todo.splice(data.todo.indexOf(value), 1);
			data.completed.push(value);	

		} else {
			data.completed.splice(data.completed.indexOf(value), 1);
			data.todo.push(value);
			
		}

		let target = ( id === 'todo') ? document.querySelector('#completed') : document.querySelector('#todo');

		list.removeChild(item);
		target.insertBefore(item, target.childNodes[0]);


		//removeAll();

		dataObjectUpdated();

	}


	function addItemToDo(taskValue, completed){

		const ul = (completed) ? document.querySelector('#completed') : document.querySelector('#todo');

		const li = document.createElement('li');
		li.textContent = taskValue;

		const div = document.createElement('div');
		li.appendChild(div);
		div.classList.add('icons');
		div.innerHTML = '<i class="fa fa-check-circle completed" aria-hidden="true"></i><i class="fa fa-trash remove" aria-hidden="true"></i>';


		ul.insertBefore(li, ul.childNodes[0]);

		const remove = document.querySelector('.remove');
		remove.addEventListener('click',removeItem,false);

		const complete = document.querySelector('.completed')
		complete.addEventListener('click',completeItem,false);


		//removeAll();

	}

	document.body.addEventListener('keydown', function(e){

		if( e.key === "Enter"){

			const taskValue = taskInput.value;

			if( taskInput.value ){
				addItemToDo(taskValue);
			}

			taskInput.value = "";
		}

	}, false);


	addBtn.addEventListener('click', function(){

		const taskValue = taskInput.value;

		if( taskInput.value ){

			data.todo.push(taskValue);

			addItemToDo(taskValue);
		}

		taskInput.value = "";

		dataObjectUpdated();

	}, false);

// //Pokazuje i usuwa przycisk w zależności od ilości elementów na liście
// //Czyści listy Todo i complete
// 		const clearListToDo = document.createElement('button');
// 				clearListToDo.textContent = "Wyczyść listę";
// 				clearListToDo.classList.add("del-btn");
// 				clearListToDo.id = "clearListToDo";
// 		const clearListComplete = document.createElement('button');
// 				clearListComplete.textContent = "Wyczyść listę";
// 				clearListComplete.classList.add("del-btn");
// 				clearListComplete.id = "clearListComplete";


// function removeAll(){


// 		var liToDo = document.querySelectorAll('#todo li');
// 		var liComplete = document.querySelectorAll('#completed li');

// 		var ulToDo = document.querySelector('#todo');
// 		var ulComplete = document.querySelector('#completed');

// //lista todo

// 		if( liToDo.length > 2  ) {
				
// 			if( !document.querySelector('#clearListToDo') ) {

// 				ulToDo.appendChild(clearListToDo);
// 			}
		
// 			clearListToDo.addEventListener('click', function(e){
// 				const itemsToRemove = document.querySelectorAll('#todo li');

// 				this.remove();
// 				for(let i = 0; i < itemsToRemove.length ; i++){
// 					ulToDo.removeChild(itemsToRemove[i]);

// 					data.todo.length = 0;
// 					dataObjectUpdated();

// 				}
				
// 			},false);
// 		} else if ( liToDo.length <= 2  && document.querySelector('#clearListToDo')) {

// 			clearListToDo.remove();
// 		}

// //lista Complete

// 		if( liComplete.length > 2  ) {

				
// 			if( !document.querySelector('#clearListComplete') ) {

// 				ulComplete.appendChild(clearListComplete);
// 			}
		
// 			clearListComplete.addEventListener('click', function(e){
// 				const itemsToRemove = document.querySelectorAll('#completed li');
// 				this.remove();

// 				for(let i = 0; i < itemsToRemove.length ; i++){
// 					ulComplete.removeChild(itemsToRemove[i]);

// 					data.completed.length = 0;
// 					dataObjectUpdated();
// 				}
				
// 			},false);
// 		} else if ( liComplete.length <= 2 && document.querySelector('#clearListComplete')) {
// 			clearListComplete.remove();
// 		}


// }
		
	function renderToDoList(){
		if ( !data.todo.length && !data.completed.length ) return;



		for( let i = 0; i < data.todo.length; i++){
			const value = data.todo[i];
			addItemToDo(value);
		}

		for( let i = 0; i < data.completed.length; i++){
			const value = data.completed[i];
			addItemToDo(value, true);
		}
	}
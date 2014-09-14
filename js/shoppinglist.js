var Actions = {
	onReady: function() {
		this.input = $("#item");
		this.listItems = $("#unchecked-list ul");
		this.checkedItems = $("#checked-list ul");

		// Set listeners for checkboxes
		Actions.checkboxChecked();

		// Mouse over action
		Actions.onMouseAction();

		// Listeners for button
		Actions.onButtonClicked();
		
		// Listens to enter key pressed on textbox inputs
		Actions.onKeyPressed();


		// Other action listeners
		Actions.deleteItem();
		Actions.editItem();

	},

	// Adds item to listItems array and returns the new array
	addListItem: function(item, list){
		var content = '<label for="' + item.toLowerCase() + '">' + item + '</label>';
			content += '<input type="checkbox" id="' + item.toLowerCase() + '" value="' + item + '">';
			content += '<img id="delete" src="img/delete.png" alt="Delete" title="Delete">';
			content += '<img id="edit" src="img/edit.png" alt="Edit" title="Edit">';
		list.append('<li>'+ content +'</li>');
	},

// Actions
	validateInput: function(input){
		input = $.trim(input);
		if(input === "" || input === " "){
			$("#error").text("Empty item cannot be added to the list");
			return false;
		} else if(/[+-.,!@#$%^&*();\/|<>"']/.test(input)){
			$("#error").text("Invalid characters supplied");
			return false;
		} else {
			$("#error").text("");
			return true;
		}
	},

	checkList: function(point, evt){
		if(point === "after"){
			if(!Actions.listItems.has("li").length){
				Actions.listItems.text("Shopping list empty");
			};
			if(!Actions.checkedItems.has("li").length){
				Actions.checkedItems.text("Nothing purchased yet");
			};
		} else if(point === "before"){
			if(!Actions.listItems.has("li").length){
				Actions.listItems.text("");
			};
			if(!Actions.checkedItems.has("li").length && evt.target.type === "checkbox"){
				Actions.checkedItems.text("");
			};
		}
	},

	addItem: function(evt){
		item = Actions.input.val();
		if(Actions.validateInput(item)){
			Actions.checkList("before", evt);
			Actions.addListItem(item, Actions.listItems);
			Actions.input.val("")
			Actions.input.focus();
		}
	},

	addEditForm: function(act){
		var $label = act.siblings("label");
		var $checkbox = act.siblings("input[type=checkbox]");
		var editForm = "<input type='text' id='editInput' value='"+ $label.text() +"' >";
			editForm += "<input type='hidden' id='prevLabelText' value='"+ $label.text() +"' >";
			editForm += "<button id='update' type='button'>Update</button>";
			editForm += "<button id='cancel' type='button'>Cancel</button>";
			$label.html(editForm);
	},

	cancelEdit: function(evt, act){
		evt.preventDefault();
		var $hiddenInput = act.siblings("input[type=hidden]");
		var labelText = $hiddenInput.val();
		$hiddenInput.parent().text(labelText);
	},

	deleteItem: function(){
		$(document).on("click", "#delete", function(){
			if(confirm("Are you sure you want to delete this item from your list?")){
				$(this).parent().remove();
			}
			Actions.checkList("after");
		});
	},

	editItem: function(){
		$(document).on("click", "#edit", function(){
			Actions.addEditForm($(this));
		});
	},

	saveEdit: function(evt, act){
		var $editInput;
		evt.preventDefault();
		if((evt.type === "click" && act.attr("id") === "update") || evt.type === "keyup"){
			(evt.type === "keyup") ? $editInput = act : $editInput = act.siblings("input[type=text]");
			var labelText = $editInput.val();
				if(confirm("Are you sure you want to rename this item?")){
					if(labelText === "" || labelText === " "){
						alert("Item name cannot be empty, if you want to remove, use the delete button");
						Actions.cancelEdit(evt,act)
					} else {
						$editInput.parent().html(labelText);
					}
				}
		} 
	},

	checkboxChecked: function(){
		$(document).on("change", "input[type=checkbox]",function(evt){
			if(this.checked){
				Actions.checkList("before", evt);
				$(this).parent().appendTo(Actions.checkedItems);
				Actions.checkList("after", evt);
			} else {
				Actions.checkList("before", evt);
				$(this).parent().appendTo(Actions.listItems);
				Actions.checkList("after", evt);
			}
		});
	},


// Mouse movement action
	listMouseOver: function(){
			$(document).on("mouseover", "li", function(){
				$(this).children("img").show();
			}
		)},

	listMouseOut: function(){
		$(document).on("mouseout", "li", function(){
			$(this).children("img").hide();
		})
	},

	onMouseAction: function() {
		Actions.listMouseOut();
		Actions.listMouseOver();
	},

// Key actions
	enterUpdateEdit: function(){
		$(document).on("keyup", "#editInput", function(evt){
			if(evt.which === 13){
				Actions.saveEdit(evt, $(this));
			}
		});
	},

	enterSubmitItem: function(){
		$(document).on("keyup", "#item", function(evt){
			if(evt.which === 13){
				Actions.addItem(evt);
			}
		});
	},

	escapeCancel: function(){
		$(document).on("keyup", "#editInput", function(evt){
			if(evt.which === 27){
				Actions.cancelEdit(evt, $(this));
			}
		})
	},

	onKeyPressed: function() {
		Actions.enterUpdateEdit();
		Actions.enterSubmitItem();
		Actions.escapeCancel();
	},

// Button Actions
	buttonSubmitItem:  function(){
		$("#add-list").click(function(evt){
			Actions.addItem(evt);
		});
	},

	cancelEditButton: function() {
		$(document).on("click", "#cancel", function(evt){
			Actions.cancelEdit(evt, $(this));
		})
	},

	updateEditButton: function() {
		$(document).on("click", "#update", function(evt){
			Actions.saveEdit(evt, $(this));
		});
	},

	onButtonClicked: function() {
		Actions.buttonSubmitItem();
		Actions.cancelEditButton();
		Actions.updateEditButton();
	}

}

$(document).ready(function(){
	Actions.onReady();
})
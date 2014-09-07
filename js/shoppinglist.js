var $input = $("#item");
var $listItems = $("#unchecked-list ul");
var $checkedItems = $("#checked-list ul");

// Adds item to listItems array and returns the new array
var addListItem = function(item, list){
	var content = '<label for="' + item.toLowerCase() + '">' + item + '</label>';
		content += '<input type="checkbox" id="' + item.toLowerCase() + '" value="' + item + '">';
		content += '<img id="delete" src="img/delete.png" alt="Delete" title="Delete">';
		content += '<img id="edit" src="img/edit.png" alt="Edit" title="Edit">';
	list.append('<li>'+ content +'</li>');
}

var Actions = {
	onReady: function() {
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

	validateInput: function(input){
		if(input === "" || input === " "){
			$("#error").text("Empty item cannot be added to the list");
			return false;
		} else {
			return true;
		}
	},

	checkList: function(point, evt){
		if(point === "after"){
			if(!$listItems.has("li").length){
				$listItems.text("Shopping list empty");
			};
			if(!$checkedItems.has("li").length){
				$checkedItems.text("Nothing purchased yet");
			};
		} else if(point === "before"){
			if(!$listItems.has("li").length){
				$listItems.text("");
			};
			if(!$checkedItems.has("li").length && evt.target.type === "checkbox"){
				$checkedItems.text("");
			};
		}
	},


	submitItem: function(evt){
		item = $input.val();
		if(Actions.validateInput(item)){
			Actions.checkList("before", evt);
			addListItem(item, $listItems);
			$input.val("")
			$input.focus();
		}
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
			var $label = $(this).siblings("label");
			var $checkbox = $(this).siblings("input[type=checkbox]");
			var editForm = "<input type='text' id='editInput' value='"+ $label.text() +"' >";
				editForm += "<input type='hidden' id='prevLabelText' value='"+ $label.text() +"' >";
				editForm += "<button id='update' type='button'>Update</button>";
				editForm += "<button id='cancel' type='button'>Cancel</button>";
				$label.html(editForm);
		});
	},

	editAction: function(evt){
		evt.preventDefault();
		var elementId = "#" + evt.target.id;
		if((evt.type === "click" && evt.target.id === "update") || evt.type === "keypress"){
			if(confirm("Are you sure you want to rename this item?")){
				var $editInput = $(elementId).prevAll("input[type=text]");
				var labelText = $editInput.val();
					$editInput.siblings().remove();
					$editInput.parent().html(labelText);
					$editInput.remove();
			}
		} else {
			var $hiddenInput = $(elementId).prevAll("input[type=hidden]");
			var labelText = $hiddenInput.val();
				$hiddenInput.parent().html(labelText);
		}
	},

	checkboxChecked: function(){
		$(document).on("change", "input[type=checkbox]",function(evt){
			if(this.checked){
				Actions.checkList("before", evt);
				$(this).parent().appendTo($checkedItems);
				Actions.checkList("after", evt);
			} else {
				Actions.checkList("before", evt);
				$(this).parent().appendTo($listItems);
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


// Enter key actions
	enterUpdateEdit: function(){
		$(document).on("keypress", "#editInput", function(evt){
			if(evt.keyCode === 13){
				Actions.editAction(evt);
			}
		});
	},

	enterSubmitItem: function(){
		$(document).on("keypress", "#item", function(evt){
			if(evt.keyCode === 13){
				Actions.submitItem(evt);
			}
		});
	},


	onKeyPressed: function() {
		Actions.enterUpdateEdit();
		Actions.enterSubmitItem();
	},

// Button Actions
	buttonSubmitItem:  function(){
		$("#add-list").click(function(evt){
			Actions.submitItem(evt);
		});
	},

	cancelEdit: function() {
		$(document).on("click", "#cancel", function(evt){
			Actions.editAction(evt);
		})
	},

	buttonUpdateEdit: function() {
		$(document).on("click", "#update", function(evt){
			Actions.editAction(evt);
		});
	},

	onButtonClicked: function() {
		Actions.buttonSubmitItem();
		Actions.cancelEdit();
		Actions.buttonUpdateEdit();
	}

}

$(document).ready(function(){
	Actions.onReady();
})
var $input = $("#item");
var $listItems = $("#unchecked-list ul");
var $checkedItems = $("#checked-list ul");

// Adds item to listItems array and returns the new array
var addListItem = function(item, list){
	var content = '<label for="' + item.toLowerCase() + '">' + item + '</label>';
		content += '<input type="checkbox" id="' + item.toLowerCase() + '" value="' + item + '">';
		content += '<img id="delete" src="img/delete.png" alt="">';
		content += '<img id="edit" src="img/edit.png" alt="">';
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
			Actions.checkList("before", evt);
			addListItem(item, $listItems);
			$input.val("")
			$input.focus();
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
			var editForm = "<input type='text' id='editInput' value='"+ $label.text() +"' >";
				editForm += "<button id='update'>Update</button>";
				editForm += "<button id='cancel'>Cancel</button>";
				$label.html(editForm);
		});
	},

	editAction: function(){
		var labelText = $(this).prev("input[type=text]").val();
			$(this).siblings().remove();
			$(this).parent().html(labelText);
			$(this).remove();
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
				Actions.editAction();
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
		$(document).on("click", "#cancel", function(){
			Actions.editAction();
		})
	},

	buttonUpdateEdit: function() {
		$(document).on("click", "#update", function(){
			Actions.editAction();
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
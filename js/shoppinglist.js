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
		Actions.checkboxChecked();
		Actions.listMouseOver();
		Actions.listMouseOut();
		Actions.onButtonClicked();
		Actions.deleteItem();
	},

	checkList: function(point){
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
			if(!$checkedItems.has("li").length){
				$checkedItems.text("");
			};
		}
	},

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
			
		});
	},

	checkboxChecked: function(){
		$(document).on("change", "input[type=checkbox]",function(evt){
			if(this.checked){
				Actions.checkList("before");
				$(this).parent().appendTo($checkedItems);
				Actions.checkList("after");
			} else {
				Actions.checkList("before");
				$(this).parent().appendTo($listItems);
				Actions.checkList("after");
			}
		});
	},

	onButtonClicked: function(){
		$("#add-list").click(function(){
			item = $input.val();
			Actions.checkList("before");
			addListItem(item, $listItems);
			$input.val("")
			$input.focus();
		});
	}
}

$(document).ready(function(){
	Actions.onReady();
	

})
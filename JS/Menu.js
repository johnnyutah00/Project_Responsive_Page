

$(function () {

    getMenuType(1);

    $("#brewedCoffeeMenu").click(function () {getMenuType(1)});
    $("#specialtyCoffeeMenu").click(function () {getMenuType(2)});
    $("#icedCoffeeMenu").click(function () {getMenuType(3)});
    $("#teaMenu").click(function () {getMenuType(4)});
    $("#otherDrinksMenu").click(function () {getMenuType(5)});

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    /**
     * This function will retrieve the appropriate JSON file for the menu type selected as well as update the menu categories list to reflect the category currently selected
     */
    function getMenuType(type) {
        updateMenuCategoryNav();
        switch (type) {
            case 1:
                $("#brewedCoffeeMenu").addClass("active");
                $.getJSON("./json/brewedCoffee.json", updateMenu);
                break;
            case 2:
                $("#specialtyCoffeeMenu").addClass("active");
                $.getJSON("./json/specialtyCoffee.json", updateMenu);
                break;
            case 3:
                $("#icedCoffeeMenu").addClass("active");
                $.getJSON("./json/icedCoffee.json", updateMenu);
                break;
            case 4:
                $("#teaMenu").addClass("active");
                $.getJSON("./json/tea.json", updateMenu);
                break;
            case 5:
                $("#otherDrinksMenu").addClass("active");
                $.getJSON("./json/other.json", updateMenu);
                break;
        }
    }

    /**
     * This function merely removes all active classes from the menu categories navigation list
     */
    function updateMenuCategoryNav()
    {
        $("#menuCategoryNav").find("li").each(function () {
           if($(this).find("a").hasClass("active"))
           {
               $(this).find("a").removeClass("active");
           }
        });
    }

    /**
     * This function fills the page with the drink items for each menu category
     * @param jsonObject
     * @param status
     */
    function updateMenu(jsonObject, status) //this function is filthy and I'm sorry -- Nathan
    {
        //remove currently displayed items
        $("#menuItems").empty();

        var itemCount = 2; //initial item count must be two to create initial div row
        var rowNumber = 0; //this variable tracks the number of row there are

        for(var i = 0; i < jsonObject.length; i++) //for each item in the json file
        {
            if(itemCount === 2) //if there are two items in the current row, create a new row with two columns and set the item count back to zero
            {
                rowNumber++; //increases variable recording number of rows

                //I tried adding items using nth of type before but it wasn't working; hence I decided to just create corresponding IDs instead for each column in a row
                $("#menuItems").append("<div class='row'><div class='col-lg-6 mb-4' id='R" + rowNumber + "C1" + "'></div><div class='col-lg-6 mb-4' id='R" + rowNumber + "C2" + "'></div></div>");

                itemCount = 0; //set item count back to zero
            }
            itemCount++; //increase item count for current item being added
            var sTemp = "#R" + rowNumber + "C" + itemCount; //create id to access correct row and column for item being added
            //add the item
            $(sTemp).append("<img class='rounded w-25 float-left mr-4' src='" + jsonObject[i].imagePath + "' alt='coffee image'/><h5>" + jsonObject[i].title + "</h5><p>" + jsonObject[i].desc +"</p>");
        }
    }
});
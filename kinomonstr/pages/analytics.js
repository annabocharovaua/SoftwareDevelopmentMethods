/**
 * Creates an HTML element with the specified tag name, ID, inner text, and appends it to the parent element.
 * If the parentId is "body", the element is appended to the document body.
 *
 * @function CreateElement
 * @param {string} nameElement - The tag name of the element to be created (e.g., "div", "table", "tr").
 * @param {string} idElement - The ID to assign to the created element.
 * @param {string} innerText - The text content to be inserted into the created element.
 * @param {string} parentId - The ID of the parent element to which the new element will be appended. If "body", it appends to the document body.
 * @returns {HTMLElement} The created element.
 */
function CreateElement(nameElement, idElement, innerText, parentId) {
    let element = document.createElement(nameElement);
    element.id = idElement;
    element.innerText = innerText;
    if (parentId == "body")
         document.body.appendChild(element);
    else
         document.getElementById(parentId).appendChild(element);
    return element;
}

/**
 * Creates a table to display film statistics by calling the CreateElement function 
 * to create and populate a table with film data. The table includes columns for 
 * film ID, name, rating, session count, average ticket price, total tickets sold, and total amount.
 * The film data is fetched from the server via a GET request to the `/getFilmsStatisticsFromDB` endpoint.
 *
 * @function CreateTable2
 * @returns {void} This function does not return any value. It dynamically creates a table and populates it with film statistics data.
 */
function CreateTable2 () {
     CreateElement("table", "films-statistics-table-2", "", "main-products-container").classList.add("table", "table-striped", "table-hover");
     CreateElement("thead", "films-statistics-thead-2", "", "films-statistics-table-2")
     CreateElement("tr", "films-statistics-tr1-2", "", "films-statistics-thead-2")
     CreateElement("td", "films-statistics-thead-tr1-td1-2", "Id фільма", "films-statistics-tr1-2").classList.add("text-center");
     CreateElement("td", "films-statistics-thead-tr1-td2-2", "Назва", "films-statistics-tr1-2").classList.add("text-center");
     CreateElement("td", "films-statistics-thead-tr1-td3-2", "Рейтинг", "films-statistics-tr1-2").classList.add("text-center");
     CreateElement("td", "films-statistics-thead-tr1-td4-2", "Кількість сеансів", "films-statistics-tr1-2").classList.add("text-center");
     CreateElement("td", "films-statistics-thead-tr1-td5-2", "Середня ціна квитка", "films-statistics-tr1-2").classList.add("text-center");
     CreateElement("td", "films-statistics-thead-tr1-td6-2", "Загальна кількість проданих квитків", "films-statistics-tr1-2").classList.add("text-center");
     CreateElement("td", "films-statistics-thead-tr1-td7-2", "Сума", "films-statistics-tr1-2").classList.add("text-center");

     CreateElement("tbody", "films-statistics-tbody-2", "", "films-statistics-table-2")

     fetch('/getFilmsStatisticsFromDB', {
          method: 'GET',
      })
      .then(result2 => result2.text())
      .then(result2 => {
          let filmsStatisticsTable = JSON.parse(result2);
          for (let i = 0; i < filmsStatisticsTable.length; i++) {
                  CreateElement("tr", "films-statistics-tr-2" + i + "-body", "", "films-statistics-tbody-2")
                  CreateElement("td", "films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td1", filmsStatisticsTable[i]['film_id'], "films-statistics-tr-2" + i + "-body").classList.add("text-center");
                  CreateElement("td", "films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td2", filmsStatisticsTable[i]['film_name'], "films-statistics-tr-2" + i + "-body")
                  CreateElement("td", "films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td3", (filmsStatisticsTable[i]['film_rating']).toFixed(1), "films-statistics-tr-2" + i + "-body").classList.add("text-center");
                  CreateElement("td", "films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td4", filmsStatisticsTable[i]['session_count'], "films-statistics-tr-2" + i + "-body").classList.add("text-center");
                  CreateElement("td", "films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td5", parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2), "films-statistics-tr-2" + i + "-body").classList.add("text-center");
                  CreateElement("td", "films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td6", filmsStatisticsTable[i]['total_tickets_sold'], "films-statistics-tr-2" + i + "-body").classList.add("text-center");
                  CreateElement("td", "films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td7", parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'], "films-statistics-tr-2" + i + "-body").classList.add("text-center");
          }
      });
}

/**
 * Fills in the films statistics table based on the provided date range and additional parameters.
 * This function populates the table with film statistics for the specified date range and other conditions.
 *
 * @function FillInFilmsStatisticsTable
 * @param {number|string} [startDate=0] - The start date for the statistics filter. If not provided, defaults to 0 (no filter).
 * @param {number|string} [endDate=0] - The end date for the statistics filter. If not provided, defaults to 0 (no filter).
 * @param {number} [notOnLoad=0] - A flag indicating whether the function should be triggered on initial page load. Default is 0 (false).
 * @param {number} [isSecondPeriod=0] - A flag to indicate whether the second period statistics should be fetched. Default is 0 (false).
 * @returns {void} - Populates the statistics table with the relevant data based on the input parameters.
 */
function FillInFilmsStatisticsTable(startDate = 0, endDate = 0, notOnLoad = 0, isSecondPeriod = 0) {
    if (startDate == 0 && endDate == 0 && notOnLoad == 0) { 
        CreateElement("h2", "h2-films-statistics", "Таблиця статистики фільмів", "main-products-container").classList.add("text-center");
        CreateElement("table", "films-statistics-table", "", "main-products-container").classList.add("table", "table-striped", "table-hover");
        CreateElement("thead", "films-statistics-thead", "", "films-statistics-table")
        CreateElement("tr", "films-statistics-tr1", "", "films-statistics-thead")
        CreateElement("td", "films-statistics-thead-tr1-td1", "Id фільма", "films-statistics-tr1").classList.add("text-center");
        CreateElement("td", "films-statistics-thead-tr1-td2", "Назва", "films-statistics-tr1").classList.add("text-center");
        CreateElement("td", "films-statistics-thead-tr1-td3", "Рейтинг", "films-statistics-tr1").classList.add("text-center");
        CreateElement("td", "films-statistics-thead-tr1-td4", "Кількість сеансів", "films-statistics-tr1").classList.add("text-center");
        CreateElement("td", "films-statistics-thead-tr1-td5", "Середня ціна квитка", "films-statistics-tr1").classList.add("text-center");
        CreateElement("td", "films-statistics-thead-tr1-td6", "Загальна кількість проданих квитків", "films-statistics-tr1").classList.add("text-center");
        CreateElement("td", "films-statistics-thead-tr1-td7", "Сума", "films-statistics-tr1").classList.add("text-center");

        CreateElement("tbody", "films-statistics-tbody", "", "films-statistics-table")

        fetch('/getFilmsStatisticsFromDB', {
            method: 'GET',
        })
        .then(result2 => result2.text())
        .then(result2 => {
            let filmsStatisticsTable = JSON.parse(result2);
            let total_profit = 0;
            for (let i = 0; i < filmsStatisticsTable.length; i++) {
                    CreateElement("tr", "films-statistics-tr" + i + "-body", "", "films-statistics-tbody")
                    CreateElement("td", "films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td1", filmsStatisticsTable[i]['film_id'], "films-statistics-tr" + i + "-body").classList.add("text-center");
                    CreateElement("td", "films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td2", filmsStatisticsTable[i]['film_name'], "films-statistics-tr" + i + "-body")
                    CreateElement("td", "films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td3", (filmsStatisticsTable[i]['film_rating']).toFixed(1), "films-statistics-tr" + i + "-body").classList.add("text-center");
                    CreateElement("td", "films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td4", filmsStatisticsTable[i]['session_count'], "films-statistics-tr" + i + "-body").classList.add("text-center");
                    CreateElement("td", "films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td5", parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2), "films-statistics-tr" + i + "-body").classList.add("text-center");
                    CreateElement("td", "films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td6", filmsStatisticsTable[i]['total_tickets_sold'], "films-statistics-tr" + i + "-body").classList.add("text-center");
                    CreateElement("td", "films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td7", parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'], "films-statistics-tr" + i + "-body").classList.add("text-center");
                    total_profit +=parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'];
               }
               if (document.getElementById("b-total-profit") == undefined)
                   CreateElement("b", "b-total-profit", "Загальний дохід: " + total_profit.toFixed(2) + " грн", "total-profit").setAttribute('style', "font-size: 1.5em;");
              else
                document.getElementById("b-total-profit").innerText = "Загальний дохід: " + total_profit.toFixed(2) + " грн";    
          });
   }
   else if (notOnLoad == 0 && isSecondPeriod == 0) { 

        fetch('/getFilmIdsFromDB', {
             method: 'GET',
        })
             .then(result1 => result1.text())
             .then(result1 => {
                  let filmIdsTable = JSON.parse(result1);
                  for (let i = 0; i < filmIdsTable.length; i++) {
                        if (document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td4"))
                            document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td4").innerText = 0;
                        if (document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td5"))
                            document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td5").innerText = 0;
                        if (document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td6"))
                            document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td6").innerText = 0;
                        if (document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td7"))
                            document.getElementById("films-statistics-tr" + filmIdsTable[i]['film_id'] + "-td7").innerText = 0;

                  }

                  fetch('/getFilmsStatisticsForThePeriodFromDB', {
                       method: 'POST',
                       body: JSON.stringify({
                            "startDate": startDate,
                            "endDate": endDate,
                       })
                  })
                       .then(result2 => result2.text())
                       .then(result2 => {
                            let filmsStatisticsTable = JSON.parse(result2);
                            let total_profit = 0;
                            for (let i = 0; i < filmsStatisticsTable.length; i++) {
                                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td4").innerText = filmsStatisticsTable[i]['session_count'];
                                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td5").innerText = parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2);
                                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td6").innerText = filmsStatisticsTable[i]['total_tickets_sold'];
                                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td7").innerText = parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'];
                                total_profit +=parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'];
                            }
                            var startDate = document.getElementById("start-date").value;
                            var endDate = document.getElementById("end-date").value;
                            if (document.getElementById("b-total-profit"))
                              document.getElementById("b-total-profit").innerText = "Загальний дохід за період з " + startDate + " до " + endDate + " становить: " + total_profit.toFixed(2) + " грн";
                       });
             });
   }
   else if (notOnLoad == 0 && isSecondPeriod != 0) { // при изменении даты во втором периоде

     fetch('/getFilmIdsFromDB', {
          method: 'GET',
     })
          .then(result1 => result1.text())
          .then(result1 => {
               let filmIdsTable = JSON.parse(result1);
               for (let i = 0; i < filmIdsTable.length; i++) {
                     if (document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td4"))
                         document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td4").innerText = 0;
                     if (document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td5"))
                         document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td5").innerText = 0;
                     if (document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td6"))
                         document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td6").innerText = 0;
                     if (document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td7"))
                         document.getElementById("films-statistics-tr-2" + filmIdsTable[i]['film_id'] + "-td7").innerText = 0;

               }

               fetch('/getFilmsStatisticsForThePeriodFromDB', {
                    method: 'POST',
                    body: JSON.stringify({
                         "startDate": startDate,
                         "endDate": endDate,
                    })
               })
                    .then(result2 => result2.text())
                    .then(result2 => {
                         let filmsStatisticsTable = JSON.parse(result2);
                         let total_profit = 0;
                         for (let i = 0; i < filmsStatisticsTable.length; i++) {
                             document.getElementById("films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td4").innerText = filmsStatisticsTable[i]['session_count'];
                             document.getElementById("films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td5").innerText = parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2);
                             document.getElementById("films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td6").innerText = filmsStatisticsTable[i]['total_tickets_sold'];
                             document.getElementById("films-statistics-tr-2" + filmsStatisticsTable[i]['film_id'] + "-td7").innerText = parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'];
                             total_profit +=parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'];
                         }
                         var startDate = document.getElementById("start-date-2").value;
                         var endDate = document.getElementById("end-date-2").value;
                         if (document.getElementById("b-total-profit-2"))
                           document.getElementById("b-total-profit-2").innerText = "Загальний дохід за період з " + startDate + " до " + endDate + " становить: " + total_profit.toFixed(2) + " грн";
                    });
          });
     }
   else if (notOnLoad == 1) { // при возврате на весь период
        fetch('/getFilmsStatisticsFromDB', {
            method: 'GET',
        })
        .then(result2 => result2.text())
        .then(result2 => {
            let filmsStatisticsTable = JSON.parse(result2);
            let total_profit = 0;
            for (let i = 0; i < filmsStatisticsTable.length; i++) {
                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td4").innerText = filmsStatisticsTable[i]['session_count'];
                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td5").innerText = parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2);
                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td6").innerText = filmsStatisticsTable[i]['total_tickets_sold'];
                document.getElementById("films-statistics-tr" + filmsStatisticsTable[i]['film_id'] + "-td7").innerText = parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'];
                total_profit +=parseFloat(filmsStatisticsTable[i]['average_ticket_price']).toFixed(2) * filmsStatisticsTable[i]['total_tickets_sold'];
           }
           if (document.getElementById("b-total-profit") == undefined)
               CreateElement("b", "b-total-profit", "Загальний дохід: " + total_profit.toFixed(2), "total-profit").setAttribute('style', "font-size: 1.5em;");
          else
            document.getElementById("b-total-profit").innerText = "Загальний дохід: " + total_profit.toFixed(2);
        });
   }
}

/**
 * Fills in the film statistics table for the specified date range and period.
 * This function calls `FillInFilmsStatisticsTable` to populate the statistics.
 *
 * @function FillInTables
 * @param {string} [startDate=0] - The start date of the period in YYYY-MM-DD format.
 * @param {string} [endDate=0] - The end date of the period in YYYY-MM-DD format.
 * @param {number} [notOnLoad=0] - Flag indicating whether the data is being loaded for the first time (0) or as an update (1).
 * @param {number} [isSecondPeriod=0] - Flag indicating whether the second period data is being processed (1) or not (0).
 * @returns {void} - Calls the `FillInFilmsStatisticsTable` function to fill the statistics table.
 */
function FillInTables(startDate = 0, endDate = 0, notOnLoad = 0, isSecondPeriod = 0) {
    FillInFilmsStatisticsTable(startDate, endDate, notOnLoad, isSecondPeriod);
}

/**
 * Handles the change of dates for the first date range, fetches the total number of visitors for the selected period,
 * and updates the display with the result.
 * This function also calls `FillInTables` to update the film statistics table.
 *
 * @function OnChangeDates
 * @returns {void} - Fetches the total number of visitors for the selected period and updates the display.
 */
function OnChangeDates() {
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;
    fetch('/getSumOfAllVisitorsForThePeriodFromDB', {
         method: 'POST',
         body: JSON.stringify({
              "startDate": startDate,
              "endDate": endDate,
         })
    })
         .then(result => result.text())
         .then(result => {
              document.getElementById("b-sales-amount").innerText = "Загальна кількість відвідувачів за період з " + startDate + " до " + endDate + " становить: " + result;
         });
    FillInTables(startDate, endDate);
}

/**
 * Handles the change of dates for the second date range, fetches the total number of visitors for the selected period,
 * and updates the display with the result.
 * This function also calls `FillInTables` with the `isSecondPeriod` flag set to true to update the film statistics table.
 *
 * @function OnChangeDates2
 * @returns {void} - Fetches the total number of visitors for the second selected period and updates the display.
 */
function OnChangeDates2() {
     var startDate = document.getElementById("start-date-2").value;
     var endDate = document.getElementById("end-date-2").value;
     fetch('/getSumOfAllVisitorsForThePeriodFromDB', {
          method: 'POST',
          body: JSON.stringify({
               "startDate": startDate,
               "endDate": endDate,
          })
     })
          .then(result => result.text())
          .then(result => {
               document.getElementById("b-sales-amount-2").innerText = "Загальна кількість відвідувачів за період з " + startDate + " до " + endDate + " становить: " + result;
          });
     FillInTables(startDate, endDate, 0, true);
 }

 /**
 * Updates the page content based on the selected period and dynamically adjusts the displayed data.
 * This function handles three types of periods: "Весь період" (Entire Period), "Певний період" (Specific Period),
 * and "Порівняння періодів" (Comparison of Periods).
 * It dynamically creates or removes date input fields, fetches data from the backend, and updates the page elements.
 *
 * @function PeriodChanged
 * @returns {void} - The function does not return any value. It updates the DOM based on the user's selection.
 * 
 * @description
 * - If the "Весь період" option is selected, the total number of visitors is fetched and displayed. 
 *   It also removes specific period-related elements and calls the `FillInTables()` function.
 * - If the "Певний період" option is selected, it creates date input fields for selecting a start and end date.
 *   The `OnChangeDates()` function is called to update the statistics.
 * - If the "Порівняння періодів" option is selected, it creates two sets of date input fields for comparison and calls
 *   `OnChangeDates()` and `OnChangeDates2()` functions to update the statistics for both periods.
 *   It also generates tables and profit-related elements for both periods.
 */
function PeriodChanged() {
    if (document.getElementById("period").value === "Весь період") {
         fetch('/getSumOfAllVisitorsFromDB', {
              method: 'GET',
         })
              .then(result => result.text())
              .then(result => {
                   if (document.getElementById("b-sales-amount") == undefined) {
                    CreateElement("b", "b-sales-amount", "Загальна кількість відвідувачів: " + result, "sales-amount").setAttribute('style', "font-size: 1.5em;");
                    }
                   else
                        document.getElementById("b-sales-amount").innerText = "Загальна кількість відвідувачів: " + result;
              });

          if (document.getElementById("periodStartEnd-2")) {
               document.getElementById("periodStartEnd-2").remove();
               document.getElementById("sales-amount-2").remove();
               document.getElementById("films-statistics-table-2").remove();
               document.getElementById("total-profit-2").remove();
               document.getElementById("name-1").innerText = "";
          }
         if (document.getElementById("start-date-div") == undefined)
              FillInTables();
         else {
              document.getElementById("start-date-div").remove();
              document.getElementById("end-date-div").remove();
              FillInTables(0, 0, 1);
         }

         fetch('/getTotalProfitFromDB', {
          method: 'GET',
          })
          .then(result => result.text())
          .then(result => {
          });
    }
    else if (document.getElementById("period").value === "Певний період") {
         if (!document.getElementById("start-date")) {
              CreateElement("div", "start-date-div", "", "periodStartEnd").classList.add("col-md-4", "mb-3");
              CreateElement("label", "start-date-label", "Початкова дата: ", "start-date-div").setAttribute('style', "font-size: 1.4em;");
              document.getElementById("start-date-label").classList.add("pt-3");
              CreateElement("input", "start-date", "", "start-date-div").classList.add("form-control");
              document.getElementById("start-date").setAttribute('type', "date");
              document.getElementById("start-date").value = "2024-11-01";
              document.getElementById("start-date").setAttribute('onchange', "OnChangeDates()");

              CreateElement("div", "end-date-div", "", "periodStartEnd").classList.add("col-md-4", "mb-3");
              CreateElement("label", "end-date-label", "Кінцева дата: ", "end-date-div").setAttribute('style', "font-size: 1.4em;");
              document.getElementById("end-date-label").classList.add("pt-3");
              CreateElement("input", "end-date", "2024-11-01", "end-date-div").classList.add("form-control");
              document.getElementById("end-date").setAttribute('type', "date");
              document.getElementById("end-date").value = new Date().toISOString().slice(0, 10);
              document.getElementById("end-date").setAttribute('onchange', "OnChangeDates()");
         }
          if (document.getElementById("periodStartEnd-2")) {
               document.getElementById("periodStartEnd-2").remove();
               document.getElementById("sales-amount-2").remove();
               document.getElementById("films-statistics-table-2").remove();
               document.getElementById("total-profit-2").remove();
               document.getElementById("name-1").innerText = "";
          }
          OnChangeDates();
    }
    else if (document.getElementById("period").value === "Порівняння періодів") {
          document.getElementById("name-1").innerText = "Перший період";

          if (!document.getElementById("start-date")) {
               CreateElement("div", "start-date-div", "", "periodStartEnd").classList.add("col-md-4", "mb-3");
               CreateElement("label", "start-date-label", "Початкова дата: ", "start-date-div").setAttribute('style', "font-size: 1.4em;");
               document.getElementById("start-date-label").classList.add("pt-3");
               CreateElement("input", "start-date", "", "start-date-div").classList.add("form-control");
               document.getElementById("start-date").setAttribute('type', "date");
               document.getElementById("start-date").value = "2024-11-01";
               document.getElementById("start-date").setAttribute('onchange', "OnChangeDates()");

               CreateElement("div", "end-date-div", "", "periodStartEnd").classList.add("col-md-4", "mb-3");
               CreateElement("label", "end-date-label", "Кінцева дата: ", "end-date-div").setAttribute('style', "font-size: 1.4em;");
               document.getElementById("end-date-label").classList.add("pt-3");
               CreateElement("input", "end-date", "2024-11-01", "end-date-div").classList.add("form-control");
               document.getElementById("end-date").setAttribute('type', "date");
               document.getElementById("end-date").value = new Date().toISOString().slice(0, 10);
               document.getElementById("end-date").setAttribute('onchange', "OnChangeDates()");
          }
          OnChangeDates();

          if (!document.getElementById("start-date-2")) {
               CreateElement("div", "periodStartEnd-2", "", "main-products-container").classList.add("form-row");
               CreateElement("p", "name-2", "Другий період", "periodStartEnd-2").setAttribute('style', "font-size: 1.4em;");
               document.getElementById("name-2").classList.add("text-center");
               CreateElement("div", "start-date-div-2", "", "periodStartEnd-2").classList.add("col-md-4", "mb-3");
               CreateElement("label", "start-date-label-2", "Початкова дата 2: ", "start-date-div-2").setAttribute('style', "font-size: 1.4em;");
               document.getElementById("start-date-label-2").classList.add("pt-3");
               CreateElement("input", "start-date-2", "", "start-date-div-2").classList.add("form-control");
               document.getElementById("start-date-2").setAttribute('type', "date");
               document.getElementById("start-date-2").value = "2024-11-01";
               document.getElementById("start-date-2").setAttribute('onchange', "OnChangeDates2()");

               CreateElement("div", "end-date-div-2", "", "periodStartEnd-2").classList.add("col-md-4", "mb-3");
               CreateElement("label", "end-date-label-2", "Кінцева дата 2: ", "end-date-div-2").setAttribute('style', "font-size: 1.4em;");
               document.getElementById("end-date-label-2").classList.add("pt-3");
               CreateElement("input", "end-date-2", "2024-11-01", "end-date-div-2").classList.add("form-control");
               document.getElementById("end-date-2").setAttribute('type', "date");
               document.getElementById("end-date-2").value = new Date().toISOString().slice(0, 10);
               document.getElementById("end-date-2").setAttribute('onchange', "OnChangeDates2()");
               CreateElement("div", "sales-amount-2", "", "main-products-container").classList.add("custom-ml-1", "py-1", "px-1");
               document.getElementById("sales-amount-2").setAttribute('style', "clear: both;");
               if (document.getElementById("b-sales-amount-2") == undefined) {
                    CreateElement("b", "b-sales-amount-2", "", "sales-amount-2").setAttribute('style', "font-size: 1.5em;");
               }

               CreateTable2();

               CreateElement("div", "total-profit-2", "", "main-products-container").classList.add("custom-ml-1", "py-1", "px-");

               if (document.getElementById("b-total-profit-2") == undefined)
                    CreateElement("b", "b-total-profit-2", "Загальний дохід: ", "total-profit-2").setAttribute('style', "font-size: 1.5em;");
               else
                    document.getElementById("b-total-profit-2").innerText = "Загальний дохід: " + result;
          }
          OnChangeDates2();
     }
}

PeriodChanged();
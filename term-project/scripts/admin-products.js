document.addEventListener("DOMContentLoaded", function(event) {
    const table = document.querySelector("#all-products");
    const rows = table.getElementsByTagName("tr");
    let headers = document.querySelectorAll("th");
    let editBtns = document.querySelectorAll(".edit");

    editBtns.forEach((btn, i) => {
        btn.addEventListener("click", function() {
            window.location.href = "product-edit.html"; //during functionality, send rows[i] through the controller to be edited
        })
    });

    //Filter headers (take out ID and Name after implementing sort and/or search)
    headers.forEach((cHeader, i) => {
        if (cHeader.textContent == "Category" || cHeader.textContent == "ID" || cHeader.textContent == "Name") { 
            cHeader.appendChild(generateDropdown(i));
        }
        if (cHeader.textContent == "ID" || cHeader.textContent == "Name" || cHeader.textContent == "Price") {
            //cHeader.appendChild(generateSort(i));
        }
    });

    function generateDropdown(index) {
        let columnData = [];
        let rows = document.querySelectorAll("tr");
        rows.forEach((row, i) => {
            if(i == 0) {
                columnData.push("");
                return;
            }
            let cells = row.getElementsByTagName("td");
            columnData.push(cells[index].innerText); //only the cell for the generating column
        });
    
        //Remove duplicates
        let uniqueColumnData = [...new Set(columnData)];
    
        let select = document.createElement("select");
    
        uniqueColumnData.map((data, i) => {
            let option = document.createElement("option");
            option.setAttribute("value", data);
    
            let optionText;
            if (data.length > 50) {
                optionText = document.createTextNode(data.substring(0,50) + "...");
            } else {
                optionText = document.createTextNode(data);
            }
            option.appendChild(optionText);
    
            select.appendChild(option);
        });
    
        select.setAttribute("id", index);
        select.addEventListener("change", function() {
            filterTable(this.value, index);
            clearSelect(this.id);
        });
    
        return select;
    }

    function clearSelect(id) {
        let selects = document.querySelectorAll("select");
        selects.forEach((select, i) => {
            if (id != i) {
                select.value = '';
            }
        });
    }
    
    function filterTable(filter, colIndex) {
        console.log("Filtering category: " + filter);
        
    
        //Loop through non-header rows
        for(let i = 1; i < rows.length; i++) {
            const cell = rows[i].getElementsByTagName("td")[colIndex];
    
            const cellText = cell.textContent || cell.innerText;
            if (cellText == filter || cellText.includes(filter)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
    
    
    function generateSort(index) {
        console.log("sorting column " + index);
        //add triangles for asc/desc
        //create sortTable function to sort the table in x direction
    }
});



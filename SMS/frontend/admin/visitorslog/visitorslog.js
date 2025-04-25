(async function(){
    console.log("DOM fully loaded"); 
    const visitorTable = document.getElementById("visitorTable");
    console.log("Found table:", visitorTable);
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");

    let allVisitors = [];
    try
    {
        const response = await fetch("http://localhost:3000/api/visitorsLog");
        allVisitors = await response.json();
        console.log("Visitors data:", allVisitors);

        if(response.ok)
        {
            renderVisitors(allVisitors);
        }
        else
        {
            console.error("Failed to fetch visitors data", allVisitors);
        }
    }catch(error)
    {
        console.error("Error fetching visitors data: ", error);
    }

    function renderVisitors(visitors){
        visitorTable.innerHTML = "";
        
        if(visitors.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="7" style="text-align: center;">No visitors found</td>`;
            visitorTable.appendChild(tr);
            return;
        }
        
        visitors.forEach(visitor => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td data-label="Name">${visitor.visitorName}</td>
                <td data-label="Contact">${visitor.visitorContact}</td>
                <td data-label="Flat">${visitor.flatNum}</td>
                <td data-label="Type">${visitor.visitorType}</td>
                <td data-label="Entry Time">${formatDateTime(visitor.visitorEntryTime)}</td>
                <td data-label="Exit Time">${
                    !visitor.visitorExitTime
                      ? "--"
                      : formatDateTime(visitor.visitorExitTime)
                  }</td>
                <td data-label="Status">${visitor.visitorExitStatus}</td>
            `;
            visitorTable.appendChild(tr);
        });
    }

    // Add enter key functionality to search input
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            searchBtn.click();
        }
    });

    searchBtn.addEventListener("click", ()=>{
        const query = searchInput.value.toLowerCase();
        const filtered = allVisitors.filter(v=>v.visitorName.toLowerCase().includes(query));
        renderVisitors(filtered);
    });

    function formatDateTime(dateString)
    {
        if(!dateString)
        {
            return "--";
        }
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            day:"2-digit",
            month:"short",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true
        });
    }
})();
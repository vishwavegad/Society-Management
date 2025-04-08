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
        visitors.forEach(visitor => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${visitor.visitorName}</td>
                <td>${visitor.visitorContact}</td>
                <td>${visitor.flatNum}</td>
                <td>${visitor.visitorType}</td>
                <td>${formatDateTime(visitor.visitorEntryTime)}</td>
                <td>${
                    !visitor.visitorExitTime
                      ? "--"
                      : formatDateTime(visitor.visitorExitTime)
                  }</td>
                <td>${visitor.visitorExitStatus}</td>
            `
            visitorTable.appendChild(tr);
        });
    }

    searchBtn.addEventListener("click", ()=>{
        const query = searchInput.value.toLowerCase();
        const filtered = allVisitors.filter(v=>v.visitorName.toLowerCase().includes(query));
        renderVisitors(filtered);
    })

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
        })
    }
})();
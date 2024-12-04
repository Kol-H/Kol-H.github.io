
        let saveButton = document.getElementById("saveBtn");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        function submitForm() {
            let params = new FormData(document.getElementById("editForm")); // pass in entire form tag
            let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
            let productid = params.get("productID");
            console.log("@SUBMITFORM productID: " + productid);
            console.log(params.get("categoryID"));
            try{
            fetch(("http://localhost:3000/broadleaf/admin/" + productid), {
                method: "PUT",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: jsonBody,
            })
                //.then(goToPage(""))
                .catch(alert);
        } catch (err) {
            res.type("text");
            res.status(500).send("Server error: " + err);
        }
        }



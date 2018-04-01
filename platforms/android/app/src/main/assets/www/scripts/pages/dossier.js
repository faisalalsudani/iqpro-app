// Dossier, let's show the data we have.

var Dossier = {
    load: function (con) {
        let row = createElement("div", "row", "dossier");

        // Nav to Main menu + User name.
        let nav_bar = PageElements.createNavBar(con, "MainMenu", con.settings.user.med_voorletters + " " + con.settings.user.med_geslachtsnaam);
        row.appendChild(nav_bar);

        // Create sub nav.
        let tabs = this.createDossierNav(con);
        row.appendChild(tabs);

        // Create div for content.
        let dossier_content = createElement("div", "col-xs-12 row", "dossier-content");
        row.appendChild(dossier_content);

        // Retrieve data from server / JSON string.
        Connection.getDossierById(con, con.current_dossier_id, this.createDossier, this.dossierError);

        return row;
    },


    /**
     * Function to create the Nav menu for the Dossier.
     */
    createDossierNav: function(con) {
      let tabs = createElement("div", "col-xs-12 row", "nav-tabs");// TABS MENU

      let menu_items = con.lang.menu_tabs; // let menu_content = con.lang.menu_content;

      for (let i = 0; i < menu_items.length; i++) {
          let menu_item = createElement("div", "col-xs-3 nav-btn-tab");
          menu_item.setAttribute("id", "nav-btn-tab-" + i);
          let menu_item_name = createElement("h4", "tab");
          menu_item_name.innerHTML = menu_items[i];
          menu_item.appendChild(menu_item_name);

          if (i === 0) {
            menu_item.classList.add("active");
          }

          menu_item.addEventListener("click", function () {
              toggle(i, menu_item);
              if (i === 0) {
                  Dossier.showClientData(con);
              } else if ( i === 1) {
                  Dossier.showClientMemos(con);
              } else if ( i === 2) {
                  Dossier.showBetrokkenen(con);
              } else {
                  Dossier.showUren(con);
              }
          });

          tabs.appendChild(menu_item);

          function toggle(i, menu_item) {

            // Toggle title css
            let nav_buttons = document.getElementsByClassName("nav-btn-tab");
            Array.from(nav_buttons).forEach(
                function(element, index, array) {
                  if (element.id === "nav-btn-tab-" + i) { // clicked button
                    element.classList = "col-xs-3 nav-btn-tab active";
                  } else {
                    element.classList = "col-xs-3 nav-btn-tab";
                  }
              }
          );
        }
      }

      return tabs;
    },

    /**
     * We have received the news. Now make it usefull.
     */
    createDossier: function (con, raw_dossier) {
        con.current_dossier = JSON.parse(raw_dossier);
        Dossier.showClientData(con);
    },

    showUren: function (con) {
        console.log(con);
        let client_parent = document.getElementById("dossier-content");
        cleanNode(client_parent);

        let uren_part = createElement("div", "row uren-part");
        let uren_table = createElement("table", "table table-striped");

        let uren_table_thead = createElement("thead");
        let uren_table_tr = createElement("tr");
        for (var u = 0; u < con.lang.uren_tab.length; u++) {
            let uren_table_th = createElement("th");
            uren_table_th.innerHTML = con.lang.uren_tab[u];
            uren_table_tr.appendChild(uren_table_th);
            uren_table_thead.appendChild(uren_table_tr)
        }

        let uren_table_tbody = createElement("tbody");
        console.log(con);
        if (con.current_dossier !== undefined) {
            for (var t = 0; t < con.planning.length; t++) {
                if (con.planning[t].inzet.inz_datum !== undefined) {
                    let uren_table_body_tr = createElement("tr");

                    let uren_table_body_th_medewerker = createElement("th");
                    uren_table_body_th_medewerker.innerHTML = Accouche.createKlantNaam(con, t);
                    uren_table_body_tr.appendChild(uren_table_body_th_medewerker)

                    let uren_table_body_th_date = createElement("th");
                    uren_table_body_th_date.innerHTML = Accouche.createInzetDate(con, t);
                    uren_table_body_tr.appendChild(uren_table_body_th_date)

                    let uren_table_body_th_uren = createElement("th");
                    uren_table_body_th_uren.innerHTML = Accouche.createInzetHours(con, t);
                    uren_table_body_tr.appendChild(uren_table_body_th_uren)

                    uren_table_tbody.appendChild(uren_table_body_tr)
                }
            }
        }

        uren_table.appendChild(uren_table_thead)
        uren_table.appendChild(uren_table_tbody)
        uren_part.appendChild(uren_table);
        client_parent.appendChild(uren_part);

    },

    showClientData: function (con) {
        let client_parent = document.getElementById("dossier-content");
        cleanNode(client_parent);

        let inzet_part = createElement("div", "row inzet-part");

  			if (con.current_dossier !== undefined) {
  				// Client
  				let client_div = createElement("div", "col-xs-12 inzet-client");
  				let client_name = createElement("h3", "inzet-client");
  				client_name.innerHTML = Accouche.createClientName(con.current_dossier.Client);
  				client_div.appendChild(client_name);
  				// Street w/ Number
  				let client_street = createElement("h4", "inzet-street");
  				client_street.innerHTML = Accouche.createClientStreetNumber(con.current_dossier);
  				client_div.appendChild(client_street);
  				// Zipcode w/ City
  				let client_zip_c = createElement("h4", "inzet-zip-city");
  				client_zip_c.innerHTML = Accouche.createZipCity(con.current_dossier);
  				client_div.appendChild(client_zip_c);
  				// Telefoon
  				let client_phone = createElement("h4", "inzet-phone");
                let client_phone_call = createElement("a");
                client_phone_call.setAttribute("href","tel:" + Accouche.createPhoneNumber(con.current_dossier.Client))
                client_phone_call.innerHTML = Accouche.createPhoneNumber(con.current_dossier.Client);
                client_phone.appendChild(client_phone_call);
  				client_div.appendChild(client_phone);
  				inzet_part.appendChild(client_div);
                // Gebortedatum
                let  gebortedatum_title = createElement("h4", "gebortedatum_title", "gebortedatum_title");
                let  gebortedatum = createElement("span", "gebortedatum");
                gebortedatum_title.innerHTML = con.lang.gebortedatum_title;
                gebortedatum.innerHTML = Accouche.createGebortedatum(con.current_dossier.Client);
                gebortedatum_title.appendChild(gebortedatum);
                client_div.appendChild(gebortedatum_title);
                inzet_part.appendChild(client_div);
                // Bevalling datum
                let  bevalling_datum_title = createElement("h4", "inzet-bevalling-title", "bevalling-title");
                let  bevalling_datum = createElement("span", "inzet-bevalling-datum");
                bevalling_datum_title.innerHTML = con.lang.bevalling_datum_title;
                bevalling_datum.innerHTML = Accouche.createBevallingdatum(con.current_dossier.Bevalling);
                bevalling_datum_title.appendChild(bevalling_datum);
                client_div.appendChild(bevalling_datum_title);
                inzet_part.appendChild(client_div);
                // Datum aterme
                let  aterme_title = createElement("h4", "aterme_title", "aterme_title");
                let  aterme_datum = createElement("span", "aterme_datum");
                aterme_title.innerHTML = con.lang.aterme_title;
                aterme_datum.innerHTML = Accouche.createAtermedatum(con.current_dossier);
                aterme_title.appendChild(aterme_datum);
                client_div.appendChild(aterme_title);
                inzet_part.appendChild(client_div);
                // Datum inzorg
                let  inzorg_title = createElement("h4", "inzorg_title", "inzorg_title");
                let  inzorg_datum = createElement("span", "inzorg_datum");
                inzorg_title.innerHTML = con.lang.inzorg_title;
                inzorg_datum.innerHTML = Accouche.createInzorgdatum(con.current_dossier);
                inzorg_title.appendChild(inzorg_datum)
                client_div.appendChild(inzorg_title);
                inzet_part.appendChild(client_div);
                // Google maps
                let google_map = createElement("div", "col-xs-12 google-map", "map");
                google_map.innerHTML = Accouche.createGooglemap(con.current_dossier.Client);
                google_map_url = createElement("a");
                google_map_url.setAttribute("href", Accouche.createGooglemapUrl(con.current_dossier.Client))

                google_map.addEventListener("click", function () {
                    google_map_url.click();
                });


                client_parent.appendChild(inzet_part);
                client_parent.appendChild(google_map);
                }
    },

    showClientMemos: function (con, new_memo) {
        let client_parent = document.getElementById("dossier-content");
        cleanNode(client_parent);

        let memo_part = createElement("div", "row memo-part", "memo-part");

        if (con.current_dossier !== undefined) {
            // Memo sorting.
            let sorted_memos = Accouche.sortMemos(con.current_dossier.Memo);

            // Create and show the memo's.
            for (let i = 0; i < sorted_memos.length; i++){
                let memo_divider = createElement("hr", "memo-divider");
                let memo_div = createElement("div", "col-xs-12 memo-client","memo-client");
                // Memo title && Belangrijk
                let memo_title = createElement("h4", "memo-title");
                let memo_belangrijk =  createElement("p", "memo-belangrijk");
                memo_title.innerHTML = Accouche.createMemotitle(sorted_memos[i]);
                memo_belangrijk.innerHTML = Accouche.createMemobelangrijk(sorted_memos, i, con);
                memo_title.appendChild(memo_belangrijk);
                memo_div.appendChild(memo_title);
                // Memo datum
                let memo_datum =  createElement("p", "memo-datum");
                memo_datum.innerHTML = Accouche.createMemodatum(sorted_memos, i);
                memo_div.appendChild(memo_datum);

                memo_div.appendChild(memo_divider);

                // Memo content
                let memo_content = createElement("p", "memo-content");
                memo_content.innerHTML = Accouche.createMemocontent(sorted_memos, i);
                memo_div.appendChild(memo_content);


                memo_part.appendChild(memo_div);
            }

        client_parent.appendChild(memo_part);
        Dossier.newMemoForm(con);

        }
    },

    // Form for adding new memo's
    newMemoForm: function (con) {
        let client_parent = document.getElementById("dossier-content");

        let new_memo_div = createElement("div", "new-memo","new-memo-div");
        let close_memo = createElement("span", "close-new-memo glyphicon glyphicon-remove");
        // close_memo.innerHTML = "x";
        close_memo.style.display = "none";
        new_memo_div.appendChild(close_memo);
        let new_memo_button = createElement("button", "new-memo-btn");
        new_memo_button.innerHTML = con.lang.new_memo;
        new_memo_div.appendChild(new_memo_button);

        let new_memo_form = createElement("form", "new-memo-form", "new-memo");
        let new_memo_title = createElement("label", "new-memo-title");
        new_memo_title.innerHTML = "Notitie onderwerp";
        let new_memo_onderwerp = createElement("input", "new-memo-onderwerp","new-memo-title");
        new_memo_onderwerp.setAttribute("name", "mem_onderwerp");
        new_memo_title.appendChild(new_memo_onderwerp);
        new_memo_form.appendChild(new_memo_title);

        let new_memo_important_label = createElement("label", "new-memo-label");
        new_memo_important_label.innerHTML = con.lang.important_memo;
        let new_memo_important = createElement("input", "new-memo-important", "new-memo-important");
        new_memo_important.setAttribute("type", "checkbox");
        new_memo_important.setAttribute("value", false);
        new_memo_important_label.appendChild(new_memo_important)
        new_memo_form.appendChild(new_memo_important_label);

        let new_memo_input = createElement("textarea", "memo-textarea", "new-memo-body");
        new_memo_input.setAttribute("type", "text");
        new_memo_input.setAttribute("rows", "4");
        new_memo_input.setAttribute("name", "mem");

        let memo_save = createElement("input", "memo-submit", "memo-submit");
        memo_save.setAttribute("value", "Opslaan");
        new_memo_form.appendChild(new_memo_input);
        $(new_memo_form).hide();
        new_memo_form.appendChild(memo_save);
        new_memo_div.appendChild(new_memo_form)
        client_parent.appendChild(new_memo_div);

        new_memo_button.addEventListener("click", function () {
            $(new_memo_form).show("slow");
            $(close_memo).show("slow");

            $("#new-memo-title").focus();

            $('#new-memo-important').change(function() {
                if(this.checked) {
                    $("#new-memo-body").focus();
                } else {
                    $("#new-memo-body").focus();
                }
            });

            // Close the textarea.
            close_memo.addEventListener("click", function () {
                $(new_memo_form).hide("slow");
                $(close_memo).hide("slow");
            });

            // POST memo
            memo_save.addEventListener("click", function (event) {
                new_memo_title = document.getElementById("new-memo-title");
                new_memo_input = document.getElementById("new-memo-body");
                if (new_memo_title.value.length == 0) {
                    return false;
                } else {
                    // Get the date from the form.
                    let new_memo_title_value = $("#new-memo-title").val();
                    let new_memo_important_value = $('#new-memo-important').is(':checked');

                    $('#new-memo-important').change(function() {
                        if(this.checked) {
                            let new_memo_important_value = true;
                        }
                    });

                    let new_memo_body_value = $("#new-memo-body").val();

                    let memo = {
                        "mem_onderwerp" : new_memo_title_value,
                        "mem_memo" : new_memo_body_value,
                        "mem_important" :new_memo_important_value,
                        "mem_aangemaakt_datum" : new Date()
                    };

                    Connection.postMemo(con, con.current_dossier_id, memo, Dossier.succesPostMemo, Dossier.rorPostMemo);
                    $(new_memo_form).hide("slow");
                    $(close_memo).hide("slow");
                    let memo_div_parent = document.getElementById("new-memo-div");
                    memo_div_parent.remove();
                }
            });

        });
    },


    showBetrokkenen: function (con) {
        let client_parent = document.getElementById("dossier-content");
        cleanNode(client_parent);

        let betrokkenen_part = createElement("div", "row betrokkenen-part");
        if (con.current_dossier !== undefined) {
            let betrokkenen_div = createElement("div", "col-xs-12 betrokkenen-client");
            let divider = createElement("hr");

            let verloskundigepraktijk_title = createElement("h4", "betrokkenen-title");
            verloskundigepraktijk_title.innerHTML = Accouche.verloskundigepraktijkTitle(con);
            betrokkenen_div.appendChild(verloskundigepraktijk_title);

            let verloskundigepraktijk_telefoon = createElement("a", "verloskundigepraktijk-telefoon");
            verloskundigepraktijk_telefoon.setAttribute("href","tel:" + Accouche.verloskundigepraktijkTelefoon(con))
            verloskundigepraktijk_telefoon.innerHTML = Accouche.verloskundigepraktijkTelefoon(con);
            betrokkenen_div.appendChild(verloskundigepraktijk_telefoon);

            let verloskundigepraktijk_adres_straat = createElement("h4", "verloskundigepraktijk-plaats");
            verloskundigepraktijk_adres_straat.innerHTML = Accouche.verloskundigepraktijkStraat(con);
            let verloskundigepraktijk_adres_huisnummer = createElement("span", "verloskundigepraktijk-huisnummer");
            verloskundigepraktijk_adres_huisnummer.innerHTML = Accouche.verloskundigepraktijkHuisnummer(con);
            betrokkenen_div.appendChild(verloskundigepraktijk_adres_straat);
            verloskundigepraktijk_adres_straat.appendChild(verloskundigepraktijk_adres_huisnummer);

            let verloskundigepraktijk_adres_plaats = createElement("h4", "verloskundigepraktijk-plaats");
            verloskundigepraktijk_adres_plaats.innerHTML = Accouche.verloskundigepraktijkPlaats(con);
            let verloskundigepraktijk_adres_zip = createElement("span", "verloskundigepraktijk-plaats");
            verloskundigepraktijk_adres_zip.innerHTML = " " + Accouche.verloskundigepraktijkZip(con);
            betrokkenen_div.appendChild(verloskundigepraktijk_adres_plaats);
            verloskundigepraktijk_adres_plaats.appendChild(verloskundigepraktijk_adres_zip);

            verloskundigepraktijk_adres_plaats.appendChild(divider);

            let ziekenhuis_title = createElement("h4", "ziekenhuis");
            ziekenhuis_title.innerHTML = con.lang.ziekenhuis_title;
            let ziekenhuis = createElement("p", "ziekenhuis");
            ziekenhuis.innerHTML = Accouche.ziekenhuisNaam(con);
            let ziekenhuis_adres = createElement("span", "ziekenhuis-adres");
            ziekenhuis_adres.innerHTML = " (" + Accouche.ziekenhuisAdres(con) + ")";
            ziekenhuis.appendChild(ziekenhuis_adres);
            ziekenhuis_title.appendChild(ziekenhuis);
            betrokkenen_div.appendChild(ziekenhuis_title);

            // Create and show the betrokkenen.
            betrokkenen_part.appendChild(betrokkenen_div);
            client_parent.appendChild(betrokkenen_part);
        }
    },

    createPlanning: function (plan) {
        let pln = createElement("div", "col-xs-12 plan-div");
        let pln_row = createElement("div", "row");

        // Date
        let date = createElement("div", "col-xs-3", "planning-date");
        date.innerHTML = "<h5>" + plan.plan_date + "</h5>";
        pln_row.appendChild(date);

        // Employee
        let emp = createElement("div", "col-xs-3", "planning-employee");
        emp.innerHTML = "<h5>" + plan.plan_employee + "</h5>";
        pln_row.appendChild(emp);

        // Hours todo
        let todo = createElement("div", "col-xs-4", "planning-employee");
        todo.innerHTML = "<h5>" + plan.plan_start + "-" + plan.plan_end + "</h5>";
        pln_row.appendChild(todo);

        // Worked
        let worked = createElement("div", "col-xs-2", "planning-employee");
        worked.innerHTML = "<h5>" + plan.hours_worked + "</h5>";
        pln_row.appendChild(worked);

        pln.appendChild(pln_row);
        return pln;
    },

    dossierError: function (status, error) {
      console.log(status + " " + error);
    },

    /**
     * We have posted a memo, and have succeeded!
     * @con                     The container data.
     * @data                    Raw data from server, should be JSON.
     */
    succesPostMemo: function (con, data) {
        con.current_dossier = JSON.parse(data);
        Dossier.succesMessage(con);
        Dossier.showClientMemos(con);
    },

    // Show succes message if posting memo succed.
    succesMessage: function (con) {
        let succes_message_div = createElement("div", "succes-message-container");
        let succes_message = createElement("p", "succes-message", "succes-message");
        succes_message.innerHTML = con.lang.succes_memo;
        $(succes_message_div).append(succes_message);
        $(succes_message_div).insertAfter("#nav-tabs");
        $(succes_message_div).hide();
        $(succes_message_div).show("slow");

        setTimeout(function() { $(succes_message_div).hide("slow"); }, 3000);

    },

    errorPostMemo: function (con, data) {
        console.log(data);
    }
  }


var Accouche = {

    /**
     * Let's create the Client name.
     */
    createClientName: function (client) {
        let name = "";

        if (client.cli_voorletters != null) {
            name = name + client.cli_voorletters;
        }

        if (client.cli_tussenvoegsel != null) {
            name = name + " " + client.cli_tussenvoegsel;
        }

        if (client.cli_geslachtsnaam != null) {
            name = name + " " + client.cli_geslachtsnaam;
        }

        return name;
    },

    /**
     * Find out the street number, there can be more then one way to get there.
     */
    createClientStreetNumber: function (inzet) {
        let street = "";

        if (inzet.Client !== undefined) {
            if (inzet.Client.cli_straat !== null) {
                street += inzet.Client.cli_straat;
            }

            if (inzet.Client.cli_huisnummer !== null) {
                street += " " + inzet.Client.cli_huisnummer;
            }

        } else if (inzet.Dossier !== undefined) {
            if (inzet.Dossier.dos_kraamzorg_straat !== null) {
                street += inzet.Dossier.dos_kraamzorg_straat;
            }

            if (inzet.Dossier.dos_kraamzorg_huisnummer !== null) {
                street += " " + inzet.Dossier.dos_kraamzorg_huisnummer;
            }

        }

        if (street.length === 0) {
            if (inzet.dos_kraamzorg_straat !== null) {
                street += inzet.dos_kraamzorg_straat;
            }

            if (inzet.dos_kraamzorg_huisnummer !== null) {
                street += " " + inzet.dos_kraamzorg_huisnummer;
            }
        }

        return street;
    },

    /**
     * Zip code can be found, from different places.
     */
    createZipCity: function (inzet) {
        let zip = "";
        if (inzet.Client !== undefined) {
            if (inzet.Client.cli_postcode != null) {
                zip += inzet.Client.cli_postcode;
            }

            if (inzet.Client.cli_plaats != null) {
                zip += " " + inzet.Client.cli_plaats;
            }

        } else if (inzet.Dossier !== undefined) {
            if (inzet.Dossier.dos_kraamzorg_postcode != null) {
                zip += inzet.Dossier.dos_kraamzorg_postcode;
            }

            if (inzet.Dossier.dos_kraamzorg_plaats != null) {
                zip += " " + inzet.Dossier.dos_kraamzorg_plaats;
            }
        }

        if (zip.length === 0) {
            if (inzet.dos_kraamzorg_postcode != null) {
                zip += inzet.dos_kraamzorg_postcode;
            }

            if (inzet.dos_kraamzorg_plaats != null) {
                zip += " " + inzet.dos_kraamzorg_plaats;
            }
        }

        return zip;
    },

    /**
     * Translate from yyyy-mm-dd -> dd-mm-yyyy.
     * second half found @ https://stackoverflow.com/a/23593099/4421627
     */
    getDdMmYyyyDate: function (yyyy_mm_dd) {
        var date = new Date(yyyy_mm_dd);
        let month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    },

    createPhoneNumber: function (client) {
        let number = "";

        if (client.Telefoonnummers !== undefined) {
            number = client.Telefoonnummers[0].tel_nummer;
        }

        return number;
    },

    createBevallingdatum: function (bevalling) {
        let bevalling_datum = "";

        if (bevalling.bev_datum !== null) {
            if (bevalling.bev_datum.length > 0) {
                bevalling_datum = this.getDdMmYyyyDate(bevalling.bev_datum);
            }
        }

        return bevalling_datum;
    },

    createAtermedatum: function (inzet) {
        let aterme_datum = "";

        if (inzet.dos_datum_aterme !== null) {
            aterme_datum = this.getDdMmYyyyDate(inzet.dos_datum_aterme);
        }

        return aterme_datum;
    },

    createGebortedatum: function (client) {
        let gebortedatum = "";

        if (client.cli_datum_geboorte !== null) {
            gebortedatum = this.getDdMmYyyyDate(client.cli_datum_geboorte);
        }

        return gebortedatum;
    },

    createInzorgdatum: function (inzet) {
        let inzorg_datum = "";

        if (inzet.dos_datum_inzorg !== null) {
            inzorg_datum = this.getDdMmYyyyDate(inzet.dos_datum_inzorg);
        }

        return inzorg_datum;
    },

    /**
     * Sort the Memo's on importance.
     * @memos                   A list of memo's we want to sort.
     */
    sortMemos: function (memos) {
        memos.sort(function (memo_a, memo_b) {
            return (memo_a.mem_important === memo_b.mem_important) ? 0 : memo_a.mem_important ? 0 : 1;
        });

        return memos;
    },

    /**
     * Create the title of the memo.
     * @memo                    Single memo.
     */
    createMemotitle: function (memo) {
        let memo_title = "";

        if (memo.mem_onderwerp !== undefined) {
            memo_title = memo.mem_onderwerp;
        }

        return memo_title;
    },

    createMemodatum: function (memo, i) {
      let memo_datum = "";

      if (memo[i].mem_aangemaakt_datum !== undefined ) {
          memo_datum = this.getDdMmYyyyDate(memo[i].mem_aangemaakt_datum);
      }

      return memo_datum;
    },

    createMemocontent: function (memo, i) {
      let memo_datum = "";

      if (memo[i].mem_memo !== undefined) {
          memo_datum = memo[i].mem_memo;
      }

      return memo_datum;
    },

    createMemobelangrijk: function (memo, i, con) {
        let memo_belangrijk = "";
        if (memo[i].mem_important === true) {
            memo_belangrijk = "<span class='glyphicon glyphicon-star belangrijk'></span>"
        }
      return memo_belangrijk;
    },

    /**
     * To show the google map, give it the inzet and it will return the image of where the client is.
     * @inzet                           The complete inzet object.
     */
    createGooglemap: function (inzet) {
        if (inzet.cli_plaats !== null) {
            let city = inzet.cli_straat + "," + inzet.cli_postcode;

            let google_map_img = "<img border='0' src='https://maps.googleapis.com/maps/api/staticmap?center=" + city + "&markers=color:0xFFAAD4%7C"+ city +"&amp;zoom=13&amp;size=400x400'>"

            return google_map_img;
        }
    },

    /**
     * Creating a Google map URL that is used for to link to Google maps itself, either webpage or App.
     * @inzet                           The complete inzet object.
     */
    createGooglemapUrl: function (inzet) {
        let city = inzet.cli_straat + "," + inzet.cli_postcode;
        let city_url = "https://maps.google.com/?q=" + city;
        return city_url;
    },


    // Create betrokkenen
    verloskundigepraktijkTitle: function (con) {
        let verloskundigepraktijkTitle = "";

        if (con.current_dossier.Verloskundigepraktijk !== undefined) {
            verloskundigepraktijkTitle = con.current_dossier.Verloskundigepraktijk.rel_omschrijving;
        }
        return verloskundigepraktijkTitle;
    },

    verloskundigepraktijkTelefoon: function (con) {
        let verloskundigepraktijk_telefoon = "";

        if (con.current_dossier.Verloskundigepraktijk !== undefined) {
            verloskundigepraktijk_telefoon = con.current_dossier.Verloskundigepraktijk.Telefoonnummers[0].tel_nummer;
        }
        return verloskundigepraktijk_telefoon;
    },

    verloskundigepraktijkPlaats: function (con) {
        let verloskundigepraktijk_plaats = "";

        if (con.current_dossier.Verloskundigepraktijk !== undefined) {
            verloskundigepraktijk_plaats = con.current_dossier.Verloskundigepraktijk.rel_bezoek_plaats;
        }
        return verloskundigepraktijk_plaats;
    },

    verloskundigepraktijkHuisnummer: function (con) {
        let verloskundigepraktijk_huisnummer = "";

        if (con.current_dossier.Verloskundigepraktijk !== undefined) {
            verloskundigepraktijk_huisnummer = con.current_dossier.Verloskundigepraktijk.rel_bezoek_huisnummer;
        }
        return verloskundigepraktijk_huisnummer;
    },

    verloskundigepraktijkStraat: function (con) {
        let verloskundigepraktijk_straat = "";

        if (con.current_dossier.Verloskundigepraktijk !== undefined) {
            verloskundigepraktijk_straat = con.current_dossier.Verloskundigepraktijk.rel_bezoek_straat;
        }
        return verloskundigepraktijk_straat;
    },

    verloskundigepraktijkZip: function (con) {
        let verloskundigepraktijk_zip = "";

        if (con.current_dossier.Verloskundigepraktijk !== undefined) {
            verloskundigepraktijk_zip = con.current_dossier.Verloskundigepraktijk.rel_bezoek_postcode;
        }
        return verloskundigepraktijk_zip;
    },

    ziekenhuisNaam: function (con) {
        let ziekenhuis_title = "";

        if (con.current_dossier.Ziekenhuis !== undefined) {
            ziekenhuis_title = con.current_dossier.Ziekenhuis.rel_omschrijving;
        }
        return ziekenhuis_title;
    },

    ziekenhuisAdres: function (con) {
        let ziekenhuis_adres = "";

        if (con.current_dossier.Ziekenhuis !== undefined) {
            ziekenhuis_adres = con.current_dossier.Ziekenhuis.rel_bezoek_plaats;
        }
        return ziekenhuis_adres;
    },

    // Show the hours
    createInzetDate: function (con, t) {
        let inzet_date = "";
        if (con.current_dossier !== undefined) {
            inzet_date = this.getDdMmYyyyDate(con.planning[t].inzet.inz_datum);
        }
        return inzet_date;
    },

    createInzetHours: function (con, t) {
        let inzet_uren = "";
        if (con.current_dossier !== undefined) {
            console.log(con.planning[t]);
            inzet_uren = con.planning[t].inzet.inz_aantal_declareren;
            if (inzet_uren !== null) {
                if (inzet_uren.indexOf('.00') > -1){
                    var inzet_uren_trim = inzet_uren.substring(0, inzet_uren.length - 3);
                    inzet_uren = inzet_uren_trim + " " + con.lang.hour_short;
                } else {
                    inzet_uren = inzet_uren + " " + con.lang.hour_short;
                }
            }
        }
        return inzet_uren;
    },

    createKlantNaam: function (con, t) {
        let inzet_medewerker = "";
        if (con.current_dossier !== undefined) {
            var cli_voorletters = con.planning[t].inzet.Dossier.Client.cli_voorletters;
            var cli_tussenvoegsel = con.planning[t].inzet.Dossier.Client.cli_tussenvoegsel;
            var cli_geslachtsnaam = con.planning[t].inzet.Dossier.Client.cli_geslachtsnaam;

            if (!(con.planning[t].inzet.Dossier.Client.cli_tussenvoegsel)) {
                inzet_medewerker =  cli_voorletters + cli_geslachtsnaam;
            } else {
                inzet_medewerker =  cli_voorletters + " " + cli_tussenvoegsel + " " + cli_geslachtsnaam;
            }
        }
        return inzet_medewerker;
    }
}

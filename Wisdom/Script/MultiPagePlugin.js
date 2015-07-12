 jQuery.fn.MultiPage = function (opts) {

            var $this = $(this);
            $this.addClass("");


            /////  LOADING IS SYNC, TO GET DONE BEFORE THE JQUERYMOBILE PLUGIN IS LOADED:
            $.getJSON(opts.url, fnLoadData, function () {
                alert(msg);
            }, { asynch: false });


            //////////////////////////////////////////////////////////////////////////////////////////
            //////////  CALLBACK FUNCTION:
            function fnLoadData(data) {

                var philosopher = opts.Philosopher;
                var philosopherQuotes = data[philosopher].Data;


                ///////////// DATA NODES PATTERN:
                /////////////      [{"Title":"Philosopher Book","Text":"<p>Very little is needed to make a happy life: it is all within yourself</p><p>in your way of thinking </p>","Image":""}
                $.each(philosopherQuotes, function (index, obj) {
                    index++;
                    var $page = $("<div/>", { "data-role": "page", id: "page" + index }).appendTo($this);


                    //////////  The Header includes 2 buttons:
                    var $header = $("<div />", { "data-role": "header", "data-position": "fixed" }).appendTo($page);
                    var $title = $("<h1/>").appendTo($header);
                    $title.html("<i>" + obj.Title + "</i>");
                    $("<a/>", { href: "#page1", class: "ui-btn ui-icon-home ui-btn-icon-left  ui-shadow  ui-corner-all" })
                        .text("Home").appendTo($header);
                    $("<a/>", { href: "Wisdom/Pages/WisdomSearch.html", class: "ui-btn ui-icon-home ui-btn-icon-left  ui-shadow  ui-corner-all" })
                        .text("Search").appendTo($header);

                    ////////// This are the contents:
                    var $content = $("<div />", { "data-role": "content", class: "content" }).appendTo($page);
                    $content.html(index.toString() + " " + obj.Text);

                    //$("<img/>", { class: "responsive img-rounded", src: obj.Image, alt: obj.Title }).appendTo($a);                        
                    $content.append("<p class='Philosopher'><em>" + opts.Philosopher + "</em></p>");


                    ////////// Two more buttons: (optional)
                    var $buttons = $("<div />", { "data-role": "controlgroup", "data-type": "horizontal", class: "container centered" }).appendTo($content);
                    $("<a/>",
                        {
                            href: opts.btnOptionsUrl , "data-rel": "dialog", "data-transition": "pop",
                            class: "ui-btn ui-icon-grid ui-btn-icon-left  ui-shadow  ui-corner-all"
                        }).text("Options").appendTo($buttons);
                    $("<a/>",
                        {
                            href: opts.btnInfoUrl , "data-rel": "dialog", "data-transition": "pop",
                            class: "ui-btn ui-icon-info ui-btn-icon-right ui-shadow ui-corner-all"
                        }).text("Information").appendTo($buttons);


                    ////////// Page's index calculation:
                    var iLen = philosopherQuotes.length;
                    var iPrev = (index - 1) >= 0 ? (index - 1) : 0;
                    var iNext = (index + 1) <= iLen ? (index + 1) : iLen;


                    //////////  The Footer includes the "Prev" & "Next" buttons:
                    var $footer = $("<div/>", { "data-role": "footer", "data-position": "fixed", class: "centered footer" }).appendTo($page);
                    var $group = $("<div/>", { "data-role": "controlgroup", "data-type": "horizontal" }).appendTo($footer);
                    $("<a/>",
                            {
                                href: "#page" + iPrev, "data-transition": "flip",
                                class: "ui-btn ui-icon-arrow-l ui-btn-icon-left  ui-shadow  ui-corner-all"
                            }).text("Prev").appendTo($group);
                    $("<a/>",
                            {
                                href: "#page" + iNext, "data-transition": "fade",
                                class: "ui-btn  ui-icon-arrow-r ui-btn-icon-right  ui-shadow  ui-corner-all"
                            }).text("Next").appendTo($group);
                    $("<p><i>" + opts.copyright + "</i></p>")
                    .appendTo($footer);



                });

               
            }

            return $this;
        }
